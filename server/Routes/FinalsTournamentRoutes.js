import express from "express";
import asyncHandler from "express-async-handler";
import Tournament from "../Models/Tournament.js";
import FinalsPlayerTable from "../Models/FinalsTournamentPlayerTable.js";
import mongoose from "mongoose";
import User from "../Models/User.js";

const finalsTournamentRouter = express.Router();

finalsTournamentRouter.route("/player/join/:id").put(asyncHandler(async (req, res) => {
    const session = await mongoose.startSession();
    try {
      session.startTransaction();

      const tournamentId = req.params.id;
      const { userId, username, tournament, team } = req.body;

      // First, ensure the tournament exists
      const tournamentData = await Tournament.findOne({ name: tournament }).session(session);
      if (!tournamentData) {
        await session.abortTransaction();
        return res.status(404).json({ message: "Tournament not found" });
      }

      // Check if the user exists;
      let user = await User.findOne({ userId }).session(session);
      if (!user) {
        return res.status(404).json({ message: "Sign up before joining a tournament" });
      }

      // Now, check if the player is already part of the tournament.
      const tournamentExist = user.tournaments.some(
        (item) => item.tourName === tournament
      );
      if (tournamentExist) {
        await session.abortTransaction();
        return res.status(400).json({ message: "Already part of the tournament" });
      }  
      // Add tournament to the user model.
      user.tournaments.push({
        tournId: tournamentId,
        tourName: tournament,
        playerTeam: team,
      });
      const updatedUser = await user.save({ session });


      // Update tournament member count.
      tournamentData.memberCount += 1;
      await tournamentData.save({ session });

      // Add user to the tournament player table.
      const addPlayerToTable = new FinalsPlayerTable({
        tournamentId,
        userId,
        username,
        team,
      });
      await addPlayerToTable.save({ session });

      if (updatedUser && addPlayerToTable) {
        await session.commitTransaction();
        return res.status(201).json({ updatedUser, addPlayerToTable });
      } else {
        await session.abortTransaction();
        return res.status(401).json({ message: "Failed to join tournament, Try Again" });
      }
    } catch (err) {
      await session.abortTransaction();
      console.error(err.message);
      res.status(500).send("Server Error...");
    } finally {
      session.endSession();
    }
}));
finalsTournamentRouter.route("/player/table/:id").get(asyncHandler(async (req, res) => {
try {
  const id = req.params.id;
  let tournamentLeaderboard;
      tournamentLeaderboard = await FinalsPlayerTable.find({ tournamentId: id }).sort({ total_points: -1 });
       // Add position field to each player
       const startingPosition = 1;
       tournamentLeaderboard.forEach((player, index) => {
           player._doc.position = startingPosition + index;
       })
  if(tournamentLeaderboard) {
      res.status(200).json({ tournamentLeaderboard });

  } else {
      res.status(404).json({ message: "Player leaderboard not found" });
  }
} catch (err) {
  console.error(err.message);
  res.status(500).send("Server Error..."); 
}
}));

export default finalsTournamentRouter;



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
//       const addPlayerToTable = new PlayerTable({
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