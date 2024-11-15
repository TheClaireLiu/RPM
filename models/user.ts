//models/user.ts

import mongoose from "mongoose";
import {number} from "prop-types";
const userSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
    required: [true, "Please provide an email"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Please provide a password"],
  },
  locale: String,
  isVerified: {
    type: Boolean,
    default: false,
  },
  isAdmin:{
    type: Number,
    default: false,
  },
  forgotPasswardToken: String,
  forgotPasswardTokenExpiry: Date,
  verifyToken: String,
  verifyTokenExpiry: Date,
  // the record creates timestamp
  ct: Date,
  // 0 for valid, 1 for delete
  isDelete: {
    type: Number,
    default: 0,
  },
});

const User = mongoose.models.users || mongoose.model("users", userSchema);

export default User;
