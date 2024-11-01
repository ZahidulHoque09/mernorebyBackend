const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema(
  {
    firstName: {
      type: String,
      required: [true, "First name is missing !!!"],
      trim: true,
    },

    lastName: {
      type: String,

      trim: true,
    },

    email: {
      type: String,
      required: [true, "Email is missing !!!"],
      trim: true,
    },

    mobile: {
      type: String,
      required: [true, "Mobile no is missing !!!"],
      trim: true,
      max: [11, "Max length is 11"],
      min: [11, "Min length is 11"],
    },
    address1: {
      type: String,
      required: [true, "Address 1 is missing !!!"],
      trim: true,
    },
    address2: {
      type: String,

      trim: true,
    },
    city: {
      type: String,

      trim: true,
    },
    postcode: {
      type: String,

      trim: true,
    },
    division: {
      type: String,

      trim: true,
    },
    district: {
      type: String,

      trim: true,
    },
    password: {
      type: String,
      required: [true, "Password is missing !!!"],
      trim: true,
    },

    role: {
      type: String,
      enum: ["user", "admin", "merchant"],
      default: "user",
    },
    avatar: {
      type: String,
    },

    otp: {
      type: Number,
    },

    resetOtp: {
      type: Number,
    },

    isVerified: {
      type: Boolean,
      default: false,
    },
  },

  /* ===== Take another information===== */

  {
    timestamps: true,
  }
);

module.exports = mongoose.model("user", userSchema);
