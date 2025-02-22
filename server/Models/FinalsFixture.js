import mongoose from "mongoose";

const FinalsFixtureSchema = mongoose.Schema(
    {
        date: {
            type: String,
            required: false,
            default: null,
        },
        time: {
            type: String,
            required: false,
            default: null,
        },
        tournamentId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
        },
        homeTeamId: {
            type: String,
            required: true,
        },
        awayTeamId: {
            type: String,
            required: true,
        },
        actualHalfTimeHomeScore: {
            type: Number,
            required: true,
            default: 0,
        },
        actualHalfTimeAwayScore: {
            type: Number,
            required: true,
            default: 0,
        },
        actualFullTimeHomeScore: {
            type: Number,
            required: true,
            default: 0,
        },
        actualFullTimeAwayScore: {
            type: Number,
            required: true,
            default: 0,
        },
        actualHomeCornerKicks: {
            type: Number,
            required: true,
            default: 0,
        },
        actualAwayCornerKicks: {
            type: Number,
            required: true,
            default: 0,
        },
        actualHomeBallPosession: {
            type: Number,
            required: true,
            default: 0,
        },
        actualAwayBallPosession: {
            type: Number,
            required: true,
            default: 0,
        },
        actualFirstGoalMinutes: {
            type: Number,
            required: true,
            default: 0,
        },
        actualFirstTeamToScore: {
            type: String,
        },
        result: {
            type: Boolean,
            required: true,
            default: false,
        },
    },
    {
        timestamps: true,
    }
);

const FinalsFixture = mongoose.model("FinalsFixture", FinalsFixtureSchema);

export default FinalsFixture;