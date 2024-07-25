import mongoose from "mongoose";

const TournamentSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        category: {
            type: String,
            required: true,
        },
        country: {
            type: String,
            required: true,
        },
        teams: {
            type: Array,
            required: true,
            default: [],
        },
    },
    {
        timestamps: true,
    }
);

const Tournament = mongoose.model("Tournament", TournamentSchema);

export default Tournament;