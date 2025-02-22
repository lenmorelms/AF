import mongoose from "mongoose";

const PredictionSchema = mongoose.Schema(
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
        round: {
            type: Number,
            required: true,
        },
        predictedHomeScore: {
            type: Number,
        },
        predictedAwayScore: {
            type: Number,
        },
    },
    {
        timestamps: true,
    }
);

const Prediction = mongoose.model("Prediction", PredictionSchema);

export default Prediction;