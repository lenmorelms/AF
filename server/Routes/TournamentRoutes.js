import express from "express";
import asyncHandler from "express-async-handler";
// import  from "../Middleware/auth";
import { protect, adminProtect } from "../Middleware/auth.js";
import Tournament from "../Models/Tournament.js";
import mongoose from "mongoose";
import User from "../Models/User.js";
import PlayerTable from "../Models/TournamentPlayerTable.js";
import clerkAuthMiddleware from "../Middleware/clerkAuthMiddleware.js";
import FinalsPlayerTable from "../Models/FinalsTournamentPlayerTable.js";

const tournamentRouter = express.Router();

// create tournament
tournamentRouter.route("/").post(asyncHandler(async (req, res) => {
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
tournamentRouter.route("/admin").get(asyncHandler(async (req, res) => {
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
tournamentRouter.route("/admin/:id").get(asyncHandler(async (req, res) => {
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
tournamentRouter.route("/:id").put(asyncHandler(async (req, res) => {
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
tournamentRouter.route("/:id").delete(asyncHandler(async (req, res) => {
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
// player join tournament
// tournamentRouter.route("/player/join/:id").put(asyncHandler(async (req, res) => {
//     const session = await mongoose.startSession();
//     try {
//       session.startTransaction();

//       const tournamentId = req.params.id;
//       const { userId, username, tournament, team } = req.body;

//       // First, ensure the tournament exists
//       const tournamentData = await Tournament.findOne({ name: tournament }).session(session);
//       if (!tournamentData) {
//         await session.abortTransaction();
//         return res.status(404).json({ message: "Tournament not found" });
//       }

//       // Check if the user exists; if not, create a new user record.
//       let user = await User.findOne({ userId }).session(session);
//       if (!user) {
//         user = new User({ userId, tournaments: [] });
//         await user.save({ session });
//       }

//       // Now, check if the player is already part of the tournament.
//       const tournamentExist = user.tournaments.some(
//         (item) => item.tourName === tournament
//       );
//       if (tournamentExist) {
//         await session.abortTransaction();
//         return res.status(400).json({ message: "Already part of the tournament" });
//       }  
//       // Add tournament to the user model.
//       user.tournaments.push({
//         tournId: tournamentId,
//         tourName: tournament,
//         playerTeam: team,
//       });
//       const updatedUser = await user.save({ session });


//       // Update tournament member count.
//       tournamentData.memberCount += 1;
//       await tournamentData.save({ session });

//       // Add user to the tournament player table.
//       const addPlayerToTable = new FinalsPlayerTable({
//         tournamentId,
//         userId,
//         username,
//         team,
//       });
//       await addPlayerToTable.save({ session });

//       if (updatedUser && addPlayerToTable) {
//         await session.commitTransaction();
//         return res.status(201).json({ updatedUser, addPlayerToTable });
//       } else {
//         await session.abortTransaction();
//         return res.status(401).json({ message: "Failed to join tournament, Try Again" });
//       }
//     } catch (err) {
//       await session.abortTransaction();
//       console.error(err.message);
//       res.status(500).send("Server Error...");
//     } finally {
//       session.endSession();
//     }
// }));
tournamentRouter.route("/player/join/:id").put(asyncHandler(async (req, res) => {
    const session = await mongoose.startSession();
    try {
        session.startTransaction();

        const tournamentId = req.params.id;
        const { userId, username, tournament, team } = req.body;

        // Ensure the tournament exists
        const tournamentData = await Tournament.findOne({ name: tournament }).session(session);
        if (!tournamentData) {
            await session.abortTransaction();
            return res.status(404).json({ message: "Tournament not found" });
        }

        // Check if user exists, if not, create one
        let user = await User.findOne({ userId }).session(session);
        if (!user) {
            user = new User({ userId, tournaments: [] });
            await user.save({ session });
        }

        // Use `$addToSet` to prevent duplicate tournament entries
        const updatedUser = await User.findOneAndUpdate(
            { userId },
            {
                $addToSet: {
                    tournaments: {
                        tournId: tournamentId,
                        tourName: tournament,
                        playerTeam: team,
                    },
                },
            },
            { new: true, session }
        );

        // If user was not modified, they are already in the tournament
        if (!updatedUser) {
            await session.abortTransaction();
            return res.status(400).json({ message: "Already part of the tournament" });
        }

        // Update tournament member count
        await Tournament.updateOne(
            { name: tournament },
            { $inc: { memberCount: 1 } },
            { session }
        );

        // Add player to FinalsPlayerTable
        const addPlayerToTable = await FinalsPlayerTable.create(
            [{ tournamentId, userId, username, team }],
            { session }
        );

        await session.commitTransaction();
        return res.status(201).json({ updatedUser, addPlayerToTable });
    } catch (err) {
        await session.abortTransaction();
        console.error(err.message);
        res.status(500).send("Server Error...");
    } finally {
        session.endSession();
    }
}));

// player opt out of tournament[***WIP***]
tournamentRouter.route("/player/:id").put(asyncHandler(async (req, res) => {
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
tournamentRouter.route("/player/points/:id/:userId").get(asyncHandler(async (req, res) => {
    try {
        const userId = req.params.userId;
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
}));
// ### Tournamnet Tables
// Tournament
tournamentRouter.route("/player/table/:id").get(asyncHandler(async (req, res) => {
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
tournamentRouter.route("/player/team/table/:id/:team").get(asyncHandler(async (req, res) => {
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
tournamentRouter.route("/player/league/table/:id/:leagueId").get(asyncHandler(async (req, res) => {
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