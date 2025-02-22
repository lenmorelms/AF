import express from "express";
import asyncHandler from "express-async-handler";
import Fixture from "../Models/Fixture.js";
import Prediction from "../Models/Prediction.js";
import { protect } from "../Middleware/auth.js";

const predictionRouter = express.Router();

// ROUTES FOR PLAYERS FOR FIXTURES, PREDICTIONS AND RESULTS COMBINED
// get tournament rounds
predictionRouter.route("/:tournamentId/rounds").get(asyncHandler(async (req, res) => {
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
// get tournament fixtures
predictionRouter.route("/:tournamentId/:userId").get(asyncHandler(async (req, res) => {
    try {
        const tournamentId = req.params.tournamentId;
        const userId = req.params.userId;
        const tournamentFixtures = await Fixture.find({ tournamentId }).limit(10).sort({ date: -1, time: -1 });
        let tournamentPlayerFixtures = [];

        if(tournamentFixtures) {
            let fixtureCount = 1;
            for(let tournamentFixture of tournamentFixtures) {
                const checkPlayerPrediction = await Prediction.find({ userId, tournamentId, fixtureId: tournamentFixture._id });
                if(checkPlayerPrediction.length === 0) {
                 tournamentFixture = { ...tournamentFixture, playerPredicted: false, fixtureCount };
                    tournamentPlayerFixtures.push(tournamentFixture);
                } else {
                    tournamentFixture = {
                        ...tournamentFixture,
                        playerPredicted: true,
                        fixtureCount,
                        playerResult: checkPlayerPrediction[0]
                    };
                    tournamentPlayerFixtures.push(tournamentFixture);
                }
                fixtureCount++;
            };
            // res.status(201).json({tournamentPlayerFixtures})
            const renderedTournamentFixtures = tournamentPlayerFixtures.map(obj => ({
                "_id": obj["_doc"]["_id"],
                "date": obj["_doc"]["date"],
                "dateTime": obj["_doc"]["dateTime"],
                "round": obj["_doc"]["round"],
                "time": obj["_doc"]["time"],
                "homeTeamId": obj["_doc"]["homeTeamId"],
                "actualHomeScore": obj["_doc"]["actualHomeScore"],
                "awayTeamId": obj["_doc"]["awayTeamId"],
                "actualAwayScore": obj["_doc"]["actualAwayScore"],
                "result": obj["_doc"]["result"],
                "playerPredicted": obj["playerPredicted"],
                "fixtureCount": obj["fixtureCount"],
                "playerResult": obj["playerResult"]
            }));
            res.status(200).json(renderedTournamentFixtures);
            //
        } else {
            res.status(400).json({ message: "Failed to get tournament fixtures" });
        }
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error..."); 
    }
}));
// get tournament round fixtures
predictionRouter.route("/:tournamentId/:userId/:round").get(asyncHandler(async (req, res) => {
    try {
        const tournamentId = req.params.tournamentId;
        const userId = req.params.userId;
        const round = req.params.round;
        const tournamentFixtures = await Fixture.find({ tournamentId, round }).sort({ date: -1, time: -1 });
        let tournamentPlayerFixtures = [];

        if(tournamentFixtures) {
            let fixtureCount = 1;
            for(let tournamentFixture of tournamentFixtures) {
                const checkPlayerPrediction = await Prediction.find({ userId, tournamentId, fixtureId: tournamentFixture._id });
                if(checkPlayerPrediction.length === 0) {
                 tournamentFixture = { ...tournamentFixture, playerPredicted: false, fixtureCount };
                    tournamentPlayerFixtures.push(tournamentFixture);
                } else {
                    tournamentFixture = {
                        ...tournamentFixture,
                        playerPredicted: true,
                        fixtureCount,
                        playerResult: checkPlayerPrediction[0]
                    };
                    tournamentPlayerFixtures.push(tournamentFixture);
                }
                fixtureCount++;
            };
            const renderedTournamentFixtures = tournamentPlayerFixtures.map(obj => ({
                "_id": obj["_doc"]["_id"],
                "date": obj["_doc"]["date"],
                "round": obj["_doc"]["round"],
                "time": obj["_doc"]["time"],
                "homeTeamId": obj["_doc"]["homeTeamId"],
                "actualHomeScore": obj["_doc"]["actualHomeScore"],
                "awayTeamId": obj["_doc"]["awayTeamId"],
                "actualAwayScore": obj["_doc"]["actualAwayScore"],
                "result": obj["_doc"]["result"],
                "playerPredicted": obj["playerPredicted"],
                "fixtureCount": obj["fixtureCount"],
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
// post player tournament predictions
predictionRouter.route("/:tournamentId/:userId").post(asyncHandler(async (req, res) => {
    try {
        const { tournamentId, userId } = req.params;
        const { fixtureId, round, predictedHomeScore, predictedAwayScore } = req.body;

        const checkPlayerPrediction = await Prediction.findOne({ userId, tournamentId, fixtureId });
        if(checkPlayerPrediction) {
            res.status(400).json({ message: "Prediction already exixst" });
        } else {
            const prediction = new Prediction({ userId, tournamentId, fixtureId, round, predictedHomeScore, predictedAwayScore });
            await prediction.save();
            res.status(201).json({ message: "Prediction saved", prediction });
        }
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error..."); 
    } 
}));
// edit player prediction [***WIP***]
predictionRouter.route("/:tournamentId/:round/:fixtureId/:userId").put(asyncHandler(async (req, res) => {
    try {
        // 
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error..."); 
    } 
}));

export default predictionRouter;