import mongoose from "mongoose";

const TournamentPlayerTableSchema = mongoose.Schema(
    {
        tournamentId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
        },
        userId: {
            // type: mongoose.Schema.Types.ObjectId,
            type: String,
            required: true,
        },
        username: {
            type: String,
            required: true,
        },
        team: {
            type: String,
            required: true,
        },
        leagues: {
            type: Array,
            required: true,
            default: [],
        },
        predicted: {
            type: Number,
            required: true,
            default: 0,
        },
        correctScore: {
            type: Number,
            required: true,
            default: 0,
        },
        correctResult: {
            type: Number,
            required: true,
            default: 0,
        },
        closeResult: {
            type: Number,
            required: true,
            default: 0,
        },
        noPoints: {
            type: Number,
            required: true,
            default: 0,
        },
        totalPoints: {
            type: Number,
            required: true,
            default: 0,
        },
    },
    {
        timestamps: true,
    }
);

const PlayerTable = mongoose.model("TournamentPlayerTable", TournamentPlayerTableSchema);

export default PlayerTable;