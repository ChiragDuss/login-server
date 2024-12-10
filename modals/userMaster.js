const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const Schema = mongoose.Schema;

// Define the schema
const UserMasterSchema = new Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    number: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    createdBy: { type: String, ref: "user" },
  },
  {
    timestamps: true, // Automatically add `createdAt` and `updatedAt` fields
  }
);

UserMasterSchema.methods.generateToken = function () {
  try {
    const secretKey = process.env.JWT_SELECT_KEY;

    return jwt.sign(
      {
        userId: this._id.toString(),
        email: this.email,
      },
      secretKey,
      {
        expiresIn: "30d",
      }
    );
  } catch (error) {
    console.error("Error generating token:", error);
    throw new Error("Token generation failed");
  }
};

// Create the model
const UserMaster = mongoose.model("userMaster", UserMasterSchema);

module.exports = UserMaster;
