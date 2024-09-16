import mongoose from "mongoose";

const FixtureSchema = mongoose.Schema(
    {
        date: {
            type: Date,
            required: false,
            default: null,
        },
        time: {
            type: String,
            required: false,
            default: null,
        },
        dateTime: {
            type: String,
            required: true,
        },
        tournamentId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
        },
        round: {
            type: Number,
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
        actualHomeScore: {
            type: Number,
            required: true,
            default: 0,
        },
        actualAwayScore: {
            type: Number,
            required: true,
            default: 0,
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

const Fixture = mongoose.model("Fixture", FixtureSchema);

export default Fixture;