import mongoose from "mongoose";

const UserSchema = mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    username: {
        type: String,
        required: true,
        unique: true,
    },
    age: {
        type: Number,
        required: false,
    },
    gender: {
      type: String,
      required: false,
    },
    country: {
        type: String,
        required: true,
    },
    password: {
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
      default: false,
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