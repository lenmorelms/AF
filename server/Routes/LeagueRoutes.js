import express from "express";
import asyncHandler from "express-async-handler";
import { protect } from "../Middleware/auth.js";
import League from "../Models/League.js";
import generateUniqueId from "../utils/generateCode.js";
import User from "../Models/User.js";
import mongoose from "mongoose";
import PlayerTable from "../Models/TournamentPlayerTable.js";

const leagueRouter = express.Router();

// get all leagues
leagueRouter.route("/").get(protect, asyncHandler(async (req, res) => {
    try {
        const leagues = await League.find();
        if(leagues) {
            res.status(200).json({ leagues });
        } else {
            res.status(404).json({ message: "No leaugues available" });
        }
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error..."); 
    } 
}));
// get leagues for a specific tournament
leagueRouter.route("/tournament/:tournamentId").get(protect, asyncHandler(async (req, res) => {
    try {
        const { tournamentId } = req.params;
        const leagues = await League.find({ tournamentId });
        if(leagues) {
            res.status(200).json({ leagues });
        } else {
            res.status(404).json({ message: "No leaugues available" });
        }
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error..."); 
    } 
}));
// get player leagues for a specific tournament
leagueRouter.route("/tournament/:tournamentId/player").get(protect, asyncHandler(async (req, res) => {
    try {
        const { _id } = req.user;
        const { tournamentId } = req.params;
        const leagues = await League.find({ userId: _id, tournamentId });
        if(leagues) {
            res.status(200).json({ leagues });
        } else {
            res.status(404).json({ message: "No leaugues available" });
        }
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error..."); 
    } 
}));
// get player league ranks for a specific tournament
leagueRouter.route("/ranks/:tournamentId/player").post(protect, asyncHandler(async (req, res) => {
    try {
        const { _id } = req.user;
        const { tournamentId }= req.params;
        const { playerTeam, leagues } = req.body;

        var leagueRanks = [];
        // get team ranks
        const teamRank = PlayerTable.find({ tournamentId, team: playerTeam }).sort({ total_points: -1 });
        res.status(200).json({ teamRank });
        // Add position field to each player and Extract logged in player position
        // const startingPosition = 0;
        // teamRank.forEach((player, index) => {
        //     player.position = startingPosition + index;
        // }).then(() => {
        //     for(let player of teamRank) {
        //         if(player.userId === _id) {
        //             leagueRanks.push(player);
        //             break;
        //         }
        //     }
        // });

        // get league ranks if player is part of leagues [leagues.length > 0]
        // if(leagues.length > 0) {
        //     for (let leagueId of leagues ) {
        //         const leagueRank = PlayerTable.find({ tournamentId, leagues: { $elemMatch: { $eq: leagueId } } }).sort({ total_points: -1 });
        //         // Add position field to each player and Extract logged in player position
        //         const startingPosition = 0;
        //         leagueRank.forEach((player, index) => {
        //             player.position = startingPosition + index;
        //         }).then(() => {
        //             for(let player of leagueRank) {
        //                 if(player.userId === _id) {
        //                     leagueRanks.push(player);
        //                     break;
        //                 }
        //             }
        //         });
        //     }
        // }
        // if(leagueRanks) {
            // res.status(200).json({ teamRank });
        // } else {
        //     res.status(404).json({ message: "League ranks not found" });
        // }

    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error..."); 
    }
}));
// get a specific league
leagueRouter.route("/:id").get(protect, asyncHandler(async (req, res) => {
    try {
        const leagueId = req.params.id;
        const league = await League.findById(leagueId);
        if(league) {
            res.status(200).json({ league });
        } else {
            res.status(404).json({ message: "No league found" });
        }
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error..."); 
    } 
}));
// delete tournament league [***WIP***]
leagueRouter.route("/:id").delete(protect, asyncHandler(async (req, res) => {
    try {
        const  leagueId  = req.params.id;
        const { _id } = req.user;
        const user = await User.findById(_id);
        const league = await League.findById(leagueId);
        if(league) {
            await League.deleteOne({ _id: leagueId }).then(async() => {
                if(user) {
                    const newLeaguesArray = user.leagues.filter(item => item.leagueId !== leagueId);
                    user.leagues = newLeaguesArray;
                    await user.save();
                    res.status(200).json({ message: "League deleted successfully" });
                } 
            });
            // res.status(200).json({ message: "League deleted successfully" });
        } else {
            res.status(204).json({ message: "League does not exist" });
        }
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error..."); 
    } 
}));
// create a tournament league
leagueRouter.route("/:tournamentId/:userId").post(protect, asyncHandler(async (req, res) => {
    try {
        const { tournamentId, userId } = req.params;
        const { name } = req.body;
        const inviteLink = generateUniqueId(8);

        const checkLeague = await League.findOne({ tournamentId, name });
        if(checkLeague) {
            res.status(400).json({ message: "A league with the same name exists" });
        } else {
            const league = new League({ userId, tournamentId, name, inviteLink });
            await league.save();

            // join player to the league
            await joinLeague(userId, tournamentId, league._id, name, req, res);
            // res.status(201).json({ message: "   Created league successfully", league });
        }
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error..."); 
    }
}));
// join league [***WIP***] intergrate into the join league function
leagueRouter.route("/:leagueCode/join").put(protect, asyncHandler(async (req, res) => {
    // const { leagueId } = req.params;
    // const { _id, } = req.user;
    // const leagueName = req.body.League;

    // await joinLeague(_id, leagueId, leagueName, req, res);

    const session = await mongoose.startSession();
    let transactionCommitted = false;
    try {
        session.startTransaction();
        const leagueCode = req.params.leagueCode;
        const { _id,  } = req.user;
        // const leagueName = req.body.League;

        const league = await League.findOne({ inviteLink: leagueCode });
        const user = await User.findById(_id);
        const tournamentPlayerTable = await PlayerTable.findOne({ tournamentId: league.tournamentId , userId: _id });
        // first check is league code is valid
        if(league) {
        if(user) {
            // Check if player is part of league
            const leagueExist = (user.leagues).some(item => item.leagueName === league.name);
            // check if leagueId is in of playerTable leagues array
            const checkLeagueId = (tournamentPlayerTable.leagues).some(item => item == league._id);
            if(leagueExist) {
                await session.commitTransaction();
                transactionCommitted = true;
                res.status(400).json({ message: "Already part of the league" });
             } else {
                // Add league to user model
                user.leagues.push({ tournamentId: `${league.tournamentId}`, leagueId: `${league._id}`, leagueName: `${league.name}` });
                await user.save();

                // update member count
                league.memberCount = league.memberCount+=1;
                await league.save();

                if(checkLeagueId) {
                    await session.commitTransaction();
                    transactionCommitted = true;
                    res.status(400).json({ message: "Already part of the league" });
                } else {
                    // Add league to tournament player table
                    tournamentPlayerTable.leagues.push(league._id);
                    const updatedPlayerTable = await tournamentPlayerTable.save();

                    if (updatedPlayerTable) {
                        await session.commitTransaction();
                        transactionCommitted = true;  // Set flag to true
                        res.status(201).json({ user, updatedPlayerTable });
                    }
                }
                
             }
        } else {
            res.status(400).json({ message: "Failed to join league, Try Again"});
        }
        } else {
            res.status(400).json({ message: "Invalid Invite code" });
        }
    } catch (err) {
        if (!transactionCommitted) {  // Only abort if not already committed
            await session.abortTransaction();
        }
        console.error(err.message);
        res.status(500).send("Server Error..."); 
    } finally {
        await session.endSession();
    }
}));


export default leagueRouter;


// Join League Function [***WIP***] PLAYER SHOULD JOIN USING LINK
const joinLeague = async (userId, tournamentId, leagueId, leagueName, req, res) => {
    const session = await mongoose.startSession();
    let transactionCommitted = false;
    try {
        session.startTransaction();
        const league = await League.findById(leagueId);
        const user = await User.findById(userId);
        const tournamentPlayerTable = await PlayerTable.findOne({ tournamentId: league.tournamentId , userId: userId });
        if(user) {
            // Check if player is part of league
            const leagueExist = (user.leagues).some(item => item.leagueName === leagueName);
            // check if leagueId is in of playerTable leagues array
            const checkLeagueId = (tournamentPlayerTable.leagues).some(item => item == leagueId);
            if(leagueExist) {
                await session.commitTransaction();
                transactionCommitted = true;
                res.status(400).json({ message: "Already part of the league" });
             } else {
                // Add league to user model
                user.leagues.push({ tournamentId: `${tournamentId}`, leagueId: `${leagueId}`, leagueName: `${leagueName}` });
                await user.save();

                // update member count
                league.memberCount = league.memberCount+=1;
                await league.save();

                if(checkLeagueId) {
                    await session.commitTransaction();
                    transactionCommitted = true;
                    res.status(400).json({ message: "Already part of the league" });
                } else {
                    // Add league to tournament player table
                    tournamentPlayerTable.leagues.push(league._id);
                    const updatedPlayerTable = await tournamentPlayerTable.save();

                    if (updatedPlayerTable) {
                        await session.commitTransaction();
                        transactionCommitted = true;  // Set flag to true
                        res.status(201).json({ user, updatedPlayerTable });
                    }
                }
                
             }
        } else {
            res.status(400).json({ message: "Failed to join league, Try Again"});
        }
    } catch (err) {
        if (!transactionCommitted) {  // Only abort if not already committed
            await session.abortTransaction();
        }
        console.error(err.message);
        res.status(500).send("Server Error..."); 
    } finally {
        await session.endSession();
    }
}