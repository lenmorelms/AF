import mongoose from "mongoose";

const FinalsPredictionSchema = mongoose.Schema(
    {
        userId: {
            type: String,
            required: true,
        },
        tournamentId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
        },
        fixtureId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
        },
        predictedHalfTimeHomeScore: {
            type: Number,
        },
        predictedHalfTimeAwayScore: {
            type: Number,
        },
        predictedFullTimeHomeScore: {
            type: Number,
        },
        predictedFullTimeAwayScore: {
            type: Number,
        },
        predictedHomeCornerKicks: {
            type: Number,
            required: true,
            default: 0,
        },
        predictedAwayCornerKicks: {
            type: Number,
            required: true,
            default: 0,
        },
        predictedHomeBallPosession: {
            type: Number,
            required: true,
            default: 0,
        },
        predictedAwayBallPosession: {
            type: Number,
            required: true,
            default: 0,
        },
        predictedFirstGoalMinutes: {
            type: Number,
            required: true,
            default: 0,
        },
        predictedFirstTeamToScore: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

const FinalsPrediction = mongoose.model("FinalsPrediction", FinalsPredictionSchema);

export default FinalsPrediction;