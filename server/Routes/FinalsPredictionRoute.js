import express from "express";
import asyncHandler from "express-async-handler";
import mongoose from "mongoose";
import FinalsFixture from "../Models/FinalsFixture.js";
import FinalsPrediction from "../Models/FinalsPrediction.js";

const finalsPredictionRouter = express.Router();

finalsPredictionRouter.route("/:tournamentId/:userId").get(asyncHandler(async (req, res) => {
    try {
        const tournamentId = req.params.tournamentId;
        const userId = req.params.userId;
        const finalsTournamentFixtures = await FinalsFixture.find({ tournamentId });
        let tournamentPlayerFixtures = [];

        if(finalsTournamentFixtures) {
            for(let finalsTournamentFixture of finalsTournamentFixtures) {
                const checkPlayerPrediction = await FinalsPrediction.find({ userId, tournamentId, fixtureId: finalsTournamentFixture._id });
                console.log(checkPlayerPrediction)
                if(checkPlayerPrediction.length === 0) {
                    finalsTournamentFixture = { ...finalsTournamentFixture, playerPredicted: false };
                    tournamentPlayerFixtures.push(finalsTournamentFixture);
                } else {
                    finalsTournamentFixture = {
                        ...finalsTournamentFixture,
                        playerPredicted: true,
                        playerResult: checkPlayerPrediction
                    };
                    tournamentPlayerFixtures.push(finalsTournamentFixture);
                }
            };
            // res.status(201).json({finalsTournamentFixtures})
            const renderedTournamentFixtures = tournamentPlayerFixtures.map(obj => ({
                "_id": obj["_doc"]["_id"],
                "date": obj["_doc"]["date"],
                "time": obj["_doc"]["time"],
                "homeTeamId": obj["_doc"]["homeTeamId"],
                "awayTeamId": obj["_doc"]["awayTeamId"],
                "actualHalfTimeHomeScore": obj["_doc"]["actualHalfTimeHomeScore"],
                "actualHalfTimeAwayScore": obj["_doc"]["actualHalfTimeAwayScore"],
                "actualFullTimeHomeScore": obj["_doc"]["actualFullTimeHomeScore"],
                "actualFullTimeAwayScore": obj["_doc"]["actualFullTimeAwayScore"],
                "actualHomeCornerKicks": obj["_doc"]["actualHomeCornerKicks"],
                "actualAwayCornerKicks": obj["_doc"]["actualAwayCornerKicks"],
                "actualHomeBallPosession": obj["_doc"]["actualHomeBallPosession"],
                "actualAwayBallPosession": obj["_doc"]["actualAwayBallPosession"],
                "actualFirstGoalMinutes": obj["_doc"]["actualFirstGoalMinutes"],
                "actualFirstTeamToScore": obj["_doc"]["actualFirstTeamToScore"],
                "result": obj["_doc"]["result"],
                "playerPredicted": obj["playerPredicted"],
                "playerResult": obj["playerResult"]
            }));
            res.status(200).json(renderedTournamentFixtures);
            
        } else {
            res.status(400).json({ message: "Failed to get tournament fixtures" });
        }
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error..."); 
    }
}));

finalsPredictionRouter.route("/:tournamentId/:userId").post(asyncHandler(async (req, res) => {
    try {
        const { tournamentId, userId } = req.params;
        const { fixtureId, predictedHalfTimeHomeScore, predictedHalfTimeAwayScore, predictedFullTimeHomeScore,
            predictedFullTimeAwayScore, predictedHomeCornerKicks, predictedAwayCornerKicks, predictedHomeBallPosession, predictedAwayBallPosession,
            predictedFirstGoalMinutes, predictedFirstTeamToScore} = req.body;

        const checkPlayerPrediction = await FinalsPrediction.findOne({ userId, tournamentId, fixtureId });
        if(checkPlayerPrediction) {
            res.status(400).json({ message: "Prediction already exixst" });
        } else {
            const prediction = new FinalsPrediction({ userId, tournamentId, fixtureId, predictedHalfTimeHomeScore, predictedHalfTimeAwayScore, predictedFullTimeHomeScore,
                predictedFullTimeAwayScore, predictedHomeCornerKicks, predictedAwayCornerKicks, predictedHomeBallPosession, predictedAwayBallPosession,
                predictedFirstGoalMinutes, predictedFirstTeamToScore });
            await prediction.save();
            res.status(201).json({ message: "Prediction saved", prediction });
        }
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error..."); 
    } 
}));

export default finalsPredictionRouter;