import express from "express";
import asyncHandler from "express-async-handler";
// import protect from "../Middleware/auth";
import { protect, adminProtect } from "../Middleware/auth.js";
import Tournament from "../Models/Tournament.js";
import mongoose from "mongoose";
import User from "../Models/User.js";
import PlayerTable from "../Models/TournamentPlayerTable.js";

const tournamentRouter = express.Router();

// create tournament
tournamentRouter.route("/").post(adminProtect, asyncHandler(async (req, res) => {
    try {
        const { name, category, country, teams } = req.body;
        const checkTournament = await Tournament.findOne({ name });
        if(checkTournament) {
            res.status(400).json({ message: "Tournament already exists" });
        } else {
            const tournament = new Tournament({ name, category, country, teams });
            await tournament.save();
            res.status(201).json({ message: "Tournament created successfully", tournament });
        }
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error..."); 
    }
}));
// get all tournaments
tournamentRouter.route("/").get(asyncHandler(async (req, res) => {
    try {
        const tournaments = await Tournament.find();
        if(tournaments) {
            res.status(200).json({ tournaments });
        } else {
            res.status(404).json({ message: "No tournaments available" });
        }
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error..."); 
    } 
}));
// get all tournaments admin
tournamentRouter.route("/admin").get(adminProtect, asyncHandler(async (req, res) => {
    try {
        const tournaments = await Tournament.find();
        if(tournaments) {
            res.status(200).json({ tournaments });
        } else {
            res.status(404).json({ message: "No tournaments available" });
        }
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error..."); 
    } 
}));
// get tournament by id
tournamentRouter.route("/:id").get(asyncHandler(async (req, res) => {
    try {
        const tournament = await Tournament.findById(req.params.id);
        if(tournament) {
            res.status(200).json({ tournament });
        } else {
            res.status(404).json({ message: "Tournament does not exist" });
        }
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error...");
    } 
}));
// get tournament by id admin
tournamentRouter.route("/admin/:id").get(adminProtect, asyncHandler(async (req, res) => {
    try {
        const tournament = await Tournament.findById(req.params.id);
        if(tournament) {
            res.status(200).json({ tournament });
        } else {
            res.status(404).json({ message: "Tournament does not exist" });
        }
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error...");
    } 
}));
// update tournament [***WIP***]
tournamentRouter.route("/:id").put(adminProtect, asyncHandler(async (req, res) => {
    try {
        const tournament = await Tournament.findById(req.params.id);
        if(tournament) {
            tournament.name = req.body.name || tournament.name;
            tournament.category = req.body.category || tournament.category;
            tournament.country = req.body.country || tournament.country;
            tournament.teams = req.body.teams || tournament.teams;
            await tournament.save();
        } else {
            res.status(204).json({ message: "Tournament does not exist" });
        }
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error...");
    } 
}));
// delete tournament [***WIP***]
tournamentRouter.route("/:id").delete(adminProtect, asyncHandler(async (req, res) => {
    try {
        const tournament = await Tournament.findById(req.params.id);
        if(tournament) {
            await Tournament.deleteOne({ _id: req.params.id });
            res.status(200).json({ message: "Tournament deleted successfully." });
        } else {
            return res.status(204).json({ message: "Tournament does not exist" });
        }
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error...");
    } 
}));
// player join tournament
tournamentRouter.route("/player/join/:id").put(protect, asyncHandler(async (req, res) => {
    const session = await mongoose.startSession();
    try {
        session.startTransaction();
        const tournamentId = req.params.id;
        const { userId, username, tournament, team } = req.body;
        const user = await User.findById(userId).session(session);
        const tournamentData = await Tournament.findOne({ name: tournament }).session(session);
        if (user && tournamentData) {
            // Check if player is part of tournament
            const tournamentExist = (user.tournaments).some(item => item.tourName === tournament);
            if(tournamentExist) {
                res.status(400).json({ message: "Already part of the tournament" });
            } else {
                // Add tournament to user model
                user.tournaments.push({tournId: `${tournamentId}`, tourName:`${tournament}`, playerTeam: `${team}`});
                const updatedUser = await user.save({ session });

                // update member count
                tournamentData.memberCount = tournamentData.memberCount+=1;
                await tournamentData.save({ session });

                // Add user to tournament player table
                const addPlayerToTable = new PlayerTable({ tournamentId, userId, username, team });
                await addPlayerToTable.save({ session });
                if (updatedUser && addPlayerToTable) {
                    await session.commitTransaction();
                    res.status(201).json({updatedUser, addPlayerToTable });
                } else {
                    res.status(401).json({ message: "Failed to join tournament, Try Again"});
                }
            }
        }
    } catch (err) {
        await session.abortTransaction();
        console.error(err.message);
        res.status(500).send("Server Error...");
    } finally {
        session.endSession();
    }
}));
// player opt out of tournament[***WIP***]
tournamentRouter.route("/player/:id").put(protect, asyncHandler(async (req, res) => {
    try {
        const tournamentId = req.params.id;
        // get user schema

        // FIRST CHECK IF *tournamentId* IS VALID
        const user = await User.findById(req.user._id);
        if (user) {
            const tournamentArray = user.tournaments;
            const newTournamentsArray = tournamentArray.filter(tournament => tournament.tournId !== tournamentId);
            user.tournaments = newTournamentsArray;
            await user.save();
            res.status(200).json({ message: "Tournament deleted successfully" });
        }
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error..."); 
    }
}));
// Player points 
tournamentRouter.route("/player/points/:id").get(protect, asyncHandler(async (req, res) => {
    try {
        const userId = req.user._id;
        const tournamentId = req.params.id;
        const playerPoints = await PlayerTable.findOne({ tournamentId, userId });
        if(playerPoints) {
            res.status(200).json(playerPoints);
        } else {
            res.status(404).json({ message: "Player not found" });
        }
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error..."); 
    }
}))
// ### Tournamnet Tables
// Tournament
tournamentRouter.route("/player/table/:id").get(protect, asyncHandler(async (req, res) => {
        const pageSize = 5000; // due to low user count, we gon query all the users per query
        const page = Number(req.query.pageNumber) || 1;
    try {
        const id = req.params.id;
        const { team, leagueId } = req.body;
        let tournamentLeaderboard;
        let count = 0;
        if(team && leagueId) {
            count = await PlayerTable.countDocuments({ tournamentId: id, team, leagues: { $elemMatch: { $eq: leagueId } }  });
            tournamentLeaderboard = await PlayerTable.find({ tournamentId: id, team, leagues: { $elemMatch: { $eq: leagueId } }})
                .limit(pageSize)
                .skip(pageSize * (page - 1))
                .sort({ total_points: -1 });
            
            // Add position field to each player
            const startingPosition = (page - 1) * pageSize + 1;
            tournamentLeaderboard.forEach((player, index) => {
                player._doc.position = startingPosition + index;
            });
        } else if(team) {
            count = await PlayerTable.countDocuments({ tournamentId: id, team });
            tournamentLeaderboard = await PlayerTable.find({ tournamentId: id, team })
                .limit(pageSize)
                .skip(pageSize * (page - 1))
                .sort({ total_points: -1 });
            
            // Add position field to each player
            const startingPosition = (page - 1) * pageSize + 1;
            tournamentLeaderboard.forEach((player, index) => {
                player._doc.position = startingPosition + index;
            });
        } else if(leagueId) {
            count = await PlayerTable.countDocuments({ tournamentId: id, leagues: { $elemMatch: { $eq: leagueId } } });
            tournamentLeaderboard = await PlayerTable.find({ tournamentId: id, leagues: { $elemMatch: { $eq: leagueId } } })
                .limit(pageSize)
                .skip(pageSize * (page - 1))
                .sort({ total_points: -1 });
            
            // Add position field to each player
            const startingPosition = (page - 1) * pageSize + 1;
            tournamentLeaderboard.forEach((player, index) => {
                player._doc.position = startingPosition + index;
            }); 
        } else {
            count = await PlayerTable.countDocuments({ tournamentId: id });
            tournamentLeaderboard = await PlayerTable.find({ tournamentId: id })
                .limit(pageSize)
                .skip(pageSize * (page - 1))
                .sort({ total_points: -1 });
            
            // Add position field to each player
            const startingPosition = (page - 1) * pageSize + 1;
            tournamentLeaderboard.forEach((player, index) => {
                player._doc.position = startingPosition + index;
            })
        }

        if(tournamentLeaderboard) {
            res.status(200).json({ tournamentLeaderboard, count, page, pages: Math.ceil(count / pageSize) });

        } else {
            res.status(404).json({ message: "Player leaderboard not found" });
        }
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error..."); 
    }
}));
// team
tournamentRouter.route("/player/team/table/:id/:team").get(protect, asyncHandler(async (req, res) => {
    const pageSize = 5000; // due to low user count, we gon query all the users per query
    const page = Number(req.query.pageNumber) || 1;
    try {
        const { id, team } = req.params;
        const count = await PlayerTable.find({ tournamentId: id, team });
        const tournamentLeaderboard = await PlayerTable.find({ tournamentId: id, team })
            .limit(pageSize)
            .skip(pageSize * (page - 1))
            .sort({ total_points: -1 });
        // Add position field to each player
        const startingPosition = (page - 1) * pageSize + 1;
        tournamentLeaderboard.forEach((player, index) => {
            player._doc.position = startingPosition + index;
        });
        if(tournamentLeaderboard) {
            res.status(200).json({ tournamentLeaderboard, count, page, pages: Math.ceil(count / pageSize) });

        } else {
            res.status(404).json({ message: "Player leaderboard not found" });
        }
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error..."); 
    }
}));
// league
tournamentRouter.route("/player/league/table/:id/:leagueId").get(protect, asyncHandler(async (req, res) => {
    const pageSize = 5000; // due to low user count, we gon query all the users per query
    const page = Number(req.query.pageNumber) || 1;
    try {
        const { id, leagueId } = req.params;
        const count = await PlayerTable.find({ tournamentId: id, leagues: { $elemMatch: { $eq: leagueId } } });
        const tournamentLeaderboard = await PlayerTable.find({ tournamentId: id, leagues: { $elemMatch: { $eq: leagueId } } })
            .limit(pageSize)
            .skip(pageSize * (page - 1))
            .sort({ total_points: -1 });
        
        // Add position field to each player
        const startingPosition = (page - 1) * pageSize + 1;
        tournamentLeaderboard.forEach((player, index) => {
            player._doc.position = startingPosition + index;
        });
        if(tournamentLeaderboard) {
            res.status(200).json({ tournamentLeaderboard, count, page, pages: Math.ceil(count / pageSize) });

        } else {
            res.status(404).json({ message: "Player leaderboard not found" });
        }
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error..."); 
    }
}));

export default tournamentRouter;