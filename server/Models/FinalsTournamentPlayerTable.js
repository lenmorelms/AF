import mongoose from "mongoose";

const FinalsTournamentPlayerTableSchema = mongoose.Schema(
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
        // predicted: {
        //     type: Number,
        //     required: true,
        //     default: 0,
        // },
        halfTimeScore: {
            type: Number,
            required: true,
            default: 0,
        },
        fullTimeScore: {
            type: Number,
            required: true,
            default: 0,
        },
        fullTimeResultScore: {
            type: Number,
            required: true,
            default: 0,
        },
        fullTimeCloseScore: {
            type: Number,
            required: true,
            default: 0,
        },
        homeCornerKicks: {
            type: Number,
            required: true,
            default: 0,
        },
        awayCornerKicks: {
            type: Number,
            required: true,
            default: 0,
        },
        closeCornerKicks: {
            type: Number,
            required: true,
            default: 0,
        },
        resultCornerKicks: {
            type: Number,
            required: true,
            default: 0,
        },
        homeBallPosession: {
            type: Number,
            required: true,
            default: 0,
        },
        awayBallPosession: {
            type: Number,
            required: true,
            default: 0,
        },
        closeBallPosession: {
            type: Number,
            required: true,
            default: 0,
        },
        resultBallPosession: {
            type: Number,
            required: true,
            default: 0,
        },
        firstGoalMinutes: {
            type: Number,
            required: true,
            default: 0,
        },
        firstTeamToScore: {
            type: Number,
            required: true,
            default: 0,
        },
        // correctResult: {
        //     type: Number,
        //     required: true,
        //     default: 0,
        // },
        // closeResult: {
        //     type: Number,
        //     required: true,
        //     default: 0,
        // },
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

const FinalsPlayerTable = mongoose.model("FinalsTournamentPlayerTable", FinalsTournamentPlayerTableSchema);

export default FinalsPlayerTable;