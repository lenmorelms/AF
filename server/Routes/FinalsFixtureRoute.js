import express from "express";
import asyncHandler from "express-async-handler";
import mongoose from "mongoose";
import FinalsFixture from "../Models/FinalsFixture.js";
import FinalsPrediction from "../Models/FinalsPrediction.js";
import FinalsPlayerTable from "../Models/FinalsTournamentPlayerTable.js";

const finalsFixtureRouter = express.Router();

// Add Fixtures
finalsFixtureRouter.route("/:tournamentId").post(asyncHandler(async (req, res) => {
    try {
        const { tournamentId } = req.params;
        const { date, time, homeTeamId, awayTeamId } = req.body;
        // Check if fixture exists
        const fixture = await FinalsFixture.findOne({ tournamentId, date, time, homeTeamId, awayTeamId });
        if(fixture) {
            res.status(400).json({ message: "Fixture already exists" });
        } else {
            const newFixture = new FinalsFixture({ tournamentId, date, time, homeTeamId, awayTeamId });
            await newFixture.save();
            res.status(201).json({ message: "Fixture created successfully", newFixture });
        }
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error...");
    } 
}));

finalsFixtureRouter.route("/:tournamentId/:fixtureId").put(asyncHandler(async (req, res) => {
    const session = await mongoose.startSession();
    let transactionCommitted = false;
    try {
        session.startTransaction();
        const { tournamentId, fixtureId } = req.params;
        const { actualHalfTimeHomeScore, actualHalfTimeAwayScore, actualFullTimeHomeScore, actualFullTimeAwayScore,
            actualHomeCornerKicks, actualAwayCornerKicks, actualHomeBallPosession, actualAwayBallPosession, 
            actualFirstGoalMinutes, actualFirstTeamToScore
         } = req.body;
        const fixture = await FinalsFixture.findById(fixtureId);

        if (!fixture) {
            if (!transactionCommitted) {  // Only abort if not already committed
                await session.abortTransaction();
            }
            return res.status(404).json({ message: "Fixture not found" });
        }

        if(fixture.result === true) {
            res.status(400).json({ message: "Result already exists" })
        } else {
            fixture.actualHalfTimeHomeScore = actualHalfTimeHomeScore;
            fixture.actualHalfTimeAwayScore = actualHalfTimeAwayScore;
            fixture.actualFullTimeHomeScore = actualFullTimeHomeScore;
            fixture.actualFullTimeAwayScore = actualFullTimeAwayScore;
            fixture.actualHomeCornerKicks = actualHomeCornerKicks;
            fixture.actualAwayCornerKicks = actualAwayCornerKicks;
            fixture.actualHomeBallPosession = actualHomeBallPosession;
            fixture.actualAwayBallPosession = actualAwayBallPosession;
            fixture.actualFirstGoalMinutes = actualFirstGoalMinutes;
            fixture.actualFirstTeamToScore = actualFirstTeamToScore;
            fixture.result = true;
            const updatedFixture = await fixture.save();
            // res.status(201).json({ message: "Added result successfully", fixture });
            // LOGIC FOR AWARDING POINTS
            if(updatedFixture) {
                const playerResults = await FinalsPrediction.find({ tournamentId, fixtureId });
                for (let key in playerResults) {
                    if (playerResults.hasOwnProperty(key)) {
                        const playerResult = playerResults[key];  
                        // HALF TIME   
                        if(updatedFixture.actualHalfTimeHomeScore === playerResult.predictedHalfTimeHomeScore && updatedFixture.actualHalfTimeAwayScore === playerResult.predictedHalfTimeAwayScore) {
                            const playerTable = await FinalsPlayerTable.findOne({ tournamentId, userId: playerResult.userId });
                            if(playerTable) {
                                playerTable.halfTimeScore += 1;
                                playerTable.totalPoints += 3;

                                await playerTable.save();
                            }
                            console.log("Halftime close -> TRUE")
                        }
                        // FULL TIME
                        if(updatedFixture.actualFullTimeHomeScore === playerResult.predictedFullTimeHomeScore && updatedFixture.actualFullTimeAwayScore === playerResult.predictedFullTimeAwayScore) {
                            const playerTable = await FinalsPlayerTable.findOne({ tournamentId, userId: playerResult.userId });
                            if(playerTable) {
                                playerTable.fullTimeScore += 1;
                                playerTable.totalPoints += 3;

                                await playerTable.save();
                            }
                            console.log("Fulltime -> TRUE")
                        } else if((updatedFixture.actualFullTimeHomeScore+updatedFixture.actualFullTimeAwayScore) / (playerResult.predictedFullTimeHomeScore+playerResult.predictedFullTimeAwayScore) <= 1.5
                            || (updatedFixture.actualFullTimeHomeScore+updatedFixture.actualFullTimeAwayScore) / (playerResult.predictedFullTimeHomeScore+playerResult.predictedFullTimeAwayScore) >= -1.5) {
                            const playerTable = await FinalsPlayerTable.findOne({ tournamentId, userId: playerResult.userId });
                            if(playerTable) {
                                playerTable.fullTimeCloseScore += 1;
                                playerTable.totalPoints += 2;

                                await playerTable.save();
                            }
                            console.log("Fulltime close -> TRUE")
                        } else if((updatedFixture.actualFullTimeHomeScore > updatedFixture.actualFullTimeAwayScore && playerResult.predictedFullTimeHomeScore > playerResult.predictedFullTimeAwayScore)
                                    || (updatedFixture.actualFullTimeAwayScore > updatedFixture.actualFullTimeHomeScore && playerResult.predictedFullTimeAwayScore > playerResult.predictedFullTimeHomeScore)
                                    || (updatedFixture.actualFullTimeHomeScore === updatedFixture.actualFullTimeAwayScore && playerResult.predictedFullTimeHomeScore === playerResult.predictedFullTimeAwayScore) ) {
                            const playerTable = await FinalsPlayerTable.findOne({ tournamentId, userId: playerResult.userId });
                            if(playerTable) {
                                playerTable.fullTimeResultScore += 1;
                                playerTable.totalPoints += 1;

                                await playerTable.save();
                            }
                            console.log("Fulltime result -> TRUE")
                        } 
                        // FIRST TEAM TO SCORE
                        if (updatedFixture.actualFirstTeamToScore === playerResult.predictedFirstTeamToScore) {
                            const playerTable = await FinalsPlayerTable.findOne({ tournamentId, userId: playerResult.userId });
                            if(playerTable) {
                                playerTable.firstTeamToScore += 1;
                                playerTable.totalPoints += 2;

                                await playerTable.save();
                            }
                            console.log("First team to score -> TRUE")
                        }
                        // FIRST GOAL MINUTES
                        if (updatedFixture.actualFirstGoalMinutes === playerResult.predictedFirstGoalMinutes) {
                            const playerTable = await FinalsPlayerTable.findOne({ tournamentId, userId: playerResult.userId });
                            if(playerTable) {
                                playerTable.firstGoalMinutes += 1;
                                playerTable.totalPoints += 5;

                                await playerTable.save();
                            }
                            console.log("first goal-> TRUE")
                        } else if ((updatedFixture.actualFirstGoalMinutes - playerResult.predictedFirstGoalMinutes) <= 3 || (updatedFixture.actualFirstGoalMinutes - playerResult.predictedFirstGoalMinutes) >= -3) {
                            const playerTable = await FinalsPlayerTable.findOne({ tournamentId, userId: playerResult.userId });
                            if(playerTable) {
                                playerTable.firstGoalMinutes += 1;
                                playerTable.totalPoints += 1;

                                await playerTable.save();
                            }
                            console.log("First goal minutes close 3 mins -> TRUE")
                        } else if ((updatedFixture.actualFirstGoalMinutes - playerResult.predictedFirstGoalMinutes) <= 5 || (updatedFixture.actualFirstGoalMinutes - playerResult.predictedFirstGoalMinutes) >= -5) {
                            const playerTable = await FinalsPlayerTable.findOne({ tournamentId, userId: playerResult.userId });
                            if(playerTable) {
                                playerTable.firstGoalMinutes += 1;
                                playerTable.totalPoints += 3;

                                await playerTable.save();
                            }
                            console.log("First goal minutes close 5 mins -> TRUE")
                        }
                        // CORNER KICKS
                        if (updatedFixture.actualHomeCornerKicks === playerResult.predictedHomeCornerKicks) {
                            const playerTable = await FinalsPlayerTable.findOne({ tournamentId, userId: playerResult.userId });
                            if(playerTable) {
                                playerTable.homeCornerKicks += 1;
                                playerTable.totalPoints += 3;

                                await playerTable.save();
                            }
                            console.log("Home Coner Kicks -> TRUE")
                        }
                        if (updatedFixture.actualAwayCornerKicks === playerResult.predictedAwayCornerKicks) {
                            const playerTable = await FinalsPlayerTable.findOne({ tournamentId, userId: playerResult.userId });
                            if(playerTable) {
                                playerTable.awayCornerKicks += 1;
                                playerTable.totalPoints += 3;

                                await playerTable.save();
                            }
                            console.log("Away Coner Kicks -> TRUE")
                        }
                        if ((updatedFixture.actualHomeCornerKicks === playerResult.predictedHomeCornerKicks) && (updatedFixture.actualAwayCornerKicks === playerResult.predictedAwayCornerKicks)) {
                            const playerTable = await FinalsPlayerTable.findOne({ tournamentId, userId: playerResult.userId });
                            if(playerTable) {
                                playerTable.totalPoints += 0;

                                await playerTable.save();
                            }
                        }
                        else if((updatedFixture.actualHomeCornerKicks+updatedFixture.actualAwayCornerKicks) / (playerResult.predictedHomeCornerKicks+playerResult.predictedAwayCornerKicks) <= 1.5
                            || (updatedFixture.actualHomeCornerKicks+updatedFixture.actualAwayCornerKicks) / (playerResult.predictedHomeCornerKicks+playerResult.predictedAwayCornerKicks) >= -1.5) {
                            const playerTable = await FinalsPlayerTable.findOne({ tournamentId, userId: playerResult.userId });
                            if(playerTable) {
                                playerTable.closeCornerKicks += 1;
                                playerTable.totalPoints += 2;

                                await playerTable.save();
                            }
                            console.log("Close Coner Kicks -> TRUE")
                        } else if((updatedFixture.actualHomeCornerKicks > updatedFixture.actualAwayCornerKicks && playerResult.predictedHomeCornerKicks > playerResult.predictedAwayCornerKicks)
                            || (updatedFixture.actualAwayCornerKicks > updatedFixture.actualHomeCornerKicks && playerResult.predictedAwayCornerKicks > playerResult.predictedHomeCornerKicks)
                            || (updatedFixture.actualHomeCornerKicks === updatedFixture.actualAwayCornerKicks && playerResult.predictedHomeCornerKicks === playerResult.predictedAwayCornerKicks) ) {
                            const playerTable = await FinalsPlayerTable.findOne({ tournamentId, userId: playerResult.userId });
                            if(playerTable) {
                                playerTable.resultCornerKicks += 1;
                                playerTable.totalPoints += 1;

                                await playerTable.save();
                            }
                            console.log("Result Coner Kicks -> TRUE")
                        } 
                        // BALL POSSESSION
                        if (updatedFixture.actualHomeBallPosession === playerResult.predictedHomeBallPosession) {
                            const playerTable = await FinalsPlayerTable.findOne({ tournamentId, userId: playerResult.userId });
                            if(playerTable) {
                                playerTable.homeBallPosession += 1;
                                playerTable.totalPoints += 5;

                                await playerTable.save();
                            }
                            console.log("Home Ball Possession -> TRUE")
                        }
                        if (updatedFixture.actualAwayBallPosession === playerResult.predictedAwayBallPosession) {
                            const playerTable = await FinalsPlayerTable.findOne({ tournamentId, userId: playerResult.userId });
                            if(playerTable) {
                                playerTable.awayBallPosession += 1;
                                playerTable.totalPoints += 5;

                                await playerTable.save();
                            }
                            console.log("Away Ball Possession -> TRUE")
                        }
                        if ((updatedFixture.actualHomeBallPosession === playerResult.predictedHomeBallPosession) && (updatedFixture.actualAwayBallPosession === playerResult.predictedAwayBallPosession)) {
                            const playerTable = await FinalsPlayerTable.findOne({ tournamentId, userId: playerResult.userId });
                            if(playerTable) {
                                playerTable.totalPoints += 0;

                                await playerTable.save();
                            }
                        }
                         else if((updatedFixture.actualHomeBallPosession+updatedFixture.actualAwayBallPosession) / (playerResult.predictedHomeBallPosession+playerResult.predictedAwayBallPosession) <= 1.5
                            || (updatedFixture.actualHomeBallPosession+updatedFixture.actualAwayBallPosession) / (playerResult.predictedHomeBallPosession+playerResult.predictedAwayBallPosession) >= -1.5) {
                            const playerTable = await FinalsPlayerTable.findOne({ tournamentId, userId: playerResult.userId });
                            if(playerTable) {
                                playerTable.closeBallPosession += 1;
                                playerTable.totalPoints += 3;

                                await playerTable.save();
                            }
                            console.log("Close Ball Possession -> TRUE")
                        } else if((updatedFixture.actualHomeBallPosession > updatedFixture.actualAwayBallPosession && playerResult.predictedHomeBallPosession > playerResult.predictedAwayBallPosession)
                            || (updatedFixture.actualAwayBallPosession > updatedFixture.actualHomeBallPosession && playerResult.predictedAwayBallPosession > playerResult.predictedHomeBallPosession)
                            || (updatedFixture.actualHomeBallPosession === updatedFixture.actualAwayBallPosession && playerResult.predictedHomeBallPosession === playerResult.predictedAwayBallPosession) ) {
                            const playerTable = await FinalsPlayerTable.findOne({ tournamentId, userId: playerResult.userId });
                            if(playerTable) {
                                playerTable.resultBallPosession += 1;
                                playerTable.totalPoints += 1;

                                await playerTable.save();
                            }
                            console.log("Result Ball Possession -> TRUE")
                        }
                        // else {
                        //     const playerTable = await FinalsPlayerTable.findOne({tournamentId, userId: playerResult.userId});
                        //     if(playerTable) {
                        //         playerTable.predicted += 1;
                        //         playerTable.noPoints += 1;
                        //         playerTable.totalPoints += 0;
                            
                        //         await playerTable.save();
                        //     }
                        //     console.log("No points -> TRUE")
                        // }
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



export default finalsFixtureRouter;