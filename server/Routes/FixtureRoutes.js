import express from "express";
import asyncHandler from "express-async-handler";
import mongoose from "mongoose";
import { adminProtect } from "../Middleware/auth.js";
import Fixture from "../Models/Fixture.js";
import Prediction from "../Models/Prediction.js";
import PlayerTable from "../Models/TournamentPlayerTable.js";

const fixtureRouter = express.Router();

// get tournament fixtures
fixtureRouter.route("/:tournamentId").get(adminProtect, asyncHandler(async (req, res) => {
    try {
        const { tournamentId } = req.params;
        const fixtures = await Fixture.find({ tournamentId }).limit(20).sort({ date: -1, time: -1 });
        if(fixtures) {
            res.status(200).json({ fixtures }); 
        } else {
            res.status(400).json({ message: "Failed to get fixtures" });
        }
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error...");
    }
}));
// get tournamnet round fixtures
fixtureRouter.route("/:tournamentId/:round").get(adminProtect, asyncHandler(async (req, res) => {
    try {
        const { tournamentId, round } = req.params;
        const fixtures = await Fixture.find({ tournamentId, round }).sort({ date: -1, time: -1 });
        if(fixtures) {
          res.status(200).json({ fixtures });
        } else {
            res.status(400).json({ message: "Failed to get fixtures" });
        }
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error..."); 
    } 
}));
// get a single tournament fixture
fixtureRouter.route("/:tournamentId/get/:fixtureId").get(adminProtect, asyncHandler(async (req, res) => {
    try {
        const { tournamentId, fixtureId } = req.params;
        const fixtures = await Fixture.findOne({ _id: fixtureId, tournamentId });
        if(fixtures) {
            res.status(200).json({ fixtures }); 
        } else {
            res.status(400).json({ message: "Failed to get fixtures" });
        }
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error...");
    }
}));
// get tournament rounds
fixtureRouter.route("/:tournamentId/fixtures/rounds").get(adminProtect, asyncHandler(async (req, res) => {
    try {
        const { tournamentId } = req.params;
        const tournamentRounds = await Fixture.distinct('round', { tournamentId: tournamentId });
        if(tournamentRounds) {
            res.status(200).json({ tournamentRounds });
        } else {
            res.status(400).json({ message: "Failed to get tournament rounds" });
        }
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error..."); 
    }
}));
// create tournament fixture
fixtureRouter.route("/:tournamentId").post(adminProtect, asyncHandler(async (req, res) => {
    try {
        const { tournamentId } = req.params;
        const { dateTime, round, homeTeamId, awayTeamId } = req.body;
        // Check if fixture exists
        const fixture = await Fixture.findOne({ tournamentId, round, homeTeamId, awayTeamId });
        if(fixture) {
            res.status(400).json({ message: "Fixture already exists" });
        } else {
            const newFixture = new Fixture({ tournamentId, dateTime, round, homeTeamId, awayTeamId });
            await newFixture.save();
            res.status(201).json({ message: "Fixture created successfully", newFixture });
        }
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error...");
    } 
}));
// add tournament results
fixtureRouter.route("/:tournamentId/:fixtureId").put(adminProtect, asyncHandler(async (req, res) => {
    const session = await mongoose.startSession();
    let transactionCommitted = false;
    try {
        session.startTransaction();
        const { tournamentId, fixtureId } = req.params;
        const { actualHomeScore, actualAwayScore } = req.body;
        const fixture = await Fixture.findById(fixtureId);

        if (!fixture) {
            if (!transactionCommitted) {  // Only abort if not already committed
                await session.abortTransaction();
            }
            return res.status(404).json({ message: "Fixture not found" });
        }

        if(fixture.result === true) {
            res.status(400).json({ message: "Result already exists" })
        } else {
            fixture.actualHomeScore = actualHomeScore;
            fixture.actualAwayScore = actualAwayScore;
            fixture.result = true;
            const updatedFixture = await fixture.save();
            // res.status(201).json({ message: "Added result successfully", fixture });
            // LOGIC FOR AWARDING POINTS
            if(updatedFixture) {
                const playerResults = await Prediction.find({ tournamentId, fixtureId });
                for (let key in playerResults) {
                    if (playerResults.hasOwnProperty(key)) {
                        const playerResult = playerResults[key];                     
                        if(updatedFixture.actualHomeScore === playerResult.predictedHomeScore && updatedFixture.actualAwayScore === playerResult.predictedAwayScore) {
                            const playerTable = await PlayerTable.findOne({ tournamentId, userId: playerResult.userId });
                            if(playerTable) {
                                playerTable.predicted += 1;
                                playerTable.correctScore += 1;
                                playerTable.totalPoints += 3;

                                await playerTable.save();
                            }
                        } else if((updatedFixture.actualHomeScore > updatedFixture.actualAwayScore && playerResult.predictedHomeScore > playerResult.predictedAwayScore)
                                    || (updatedFixture.actualAwayScore > updatedFixture.actualHomeScore && playerResult.predictedAwayScore > playerResult.predictedHomeScore)
                                    || (updatedFixture.actualHomeScore === updatedFixture.actualAwayScore && playerResult.predictedHomeScore === playerResult.predictedAwayScore) ) {
                            const playerTable = await PlayerTable.findOne({ tournamentId, userId: playerResult.userId });
                            if(playerTable) {
                                playerTable.predicted += 1;
                                playerTable.correctResult += 1;
                                playerTable.totalPoints += 2;

                                await playerTable.save();
                            }
                        } else if((updatedFixture.actualHomeScore+updatedFixture.actualAwayScore) / (playerResult.predictedHomeScore+playerResult.predictedAwayScore) <= 1.5) {
                            const playerTable = await PlayerTable.findOne({ tournamentId, userId: playerResult.userId });
                            if(playerTable) {
                                playerTable.predicted += 1;
                                playerTable.closeResult += 1;
                                playerTable.totalPoints += 1;

                                await playerTable.save();
                            }
                        } else {
                            const playerTable = await PlayerTable.findOne({tournamentId, userId: playerResult.userId});
                            if(playerTable) {
                                playerTable.predicted += 1;
                                playerTable.noPoints += 1;
                                playerTable.totalPoints += 0;
                            
                                await playerTable.save();
                            }
                        }
                    }
                }
                await session.commitTransaction();
                transactionCommitted = true;
                res.status(201).json({ updatedFixture });
            } //end
        }
    } catch (err) {
        if (!transactionCommitted) {  // Only abort if not already committed
            await session.abortTransaction();
        }
        console.error(err.message);
        res.status(500).send("Server Error...");
    } finally {
        session.endSession();
    }
}));
// delete tournament fixture [***WIP***]
fixtureRouter.route("/:tournamentId/:id").delete(adminProtect, asyncHandler(async (req, res) => {
    try {
        const { tournamentId, id } = req.params;
        const fixture = Fixture.findOne({ _id: id, tournamentId: tournamentId });
        if(fixture) {
            await Fixture.deleteOne({  _id: id, tournamentId: tournamentId });
            res.status(200).json({ message: "Fixture deleted successfully." });
        } else {
            return res.status(204).json({ message: "Fixture not found" });
        }
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error...");
    } 
}));

export default fixtureRouter;