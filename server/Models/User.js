import mongoose from "mongoose";
// import { type } from "server/reply";

const UserSchema = mongoose.Schema(
  { 
    userId : {
      type: String,
      required: true,
    },
    tournaments: {
        type: Array,
        required: true,
        default: [],
    },
    leagues: {
        type: Array,
        required: true,
        default: [],
    },
    isAdmin: {
        type: Boolean,
        required: true,
        default: false,
    },
    verified: {
      type: Boolean,
      default: true,
    },
    verificationToken: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", UserSchema);

export default User;