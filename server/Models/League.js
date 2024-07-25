import mongoose from "mongoose";

const LeagueSchema = mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
        },
        tournamentId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
        },
        name: {
            type: String,
            required: true,
        },
        inviteLink: {
            type: String,
            required: true,
        },
    },
    {
      timestamps: true,
    }
);

const League = mongoose.model("League", LeagueSchema);

export default League;