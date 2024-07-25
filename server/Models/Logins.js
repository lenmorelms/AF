import mongoose from "mongoose";

const LoginSchema = mongoose.LoginSchema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
        },
        loginTime: {
            type: String,
            required: true,
            default: Date.now(),
        },
    },
    {
        timestamps: true,
    }
);

const Logins = mongoose.model("Logins", LoginSchema);

export default Logins;