import mongoose from "mongoose";

// SCHEMA

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  is_admin: {
    type: Boolean,
    default: false,
  },
  created_on: {
    type: Date,
    default: Date.now,
    required: true,
  },
  updated_on: {
    type: Date,
    default: Date.now,
    required: false,
  },
});

// MODEL

const userModel = mongoose.model("user", userSchema);

export { userModel as USERMODEL };
