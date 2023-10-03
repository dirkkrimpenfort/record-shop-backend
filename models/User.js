const { Schema, model } = require("mongoose");
const userSchema = new Schema(
  {
    firstName: { type: String },
    lastName: { type: String },
    email: {
      type: String,
      unique: true,
      required: true,
      match: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
      message: "Ungültige E-Mail Adresse",
    },
    emailVerified: { type: Boolean, default: false },
    password: { type: String, required: true },
    address: {
      type: Schema.Types.ObjectId,
      ref: "Address",
    },
  },

  {
    timestamps: true,
  }
);

userSchema.index({ email: 1 }, { unique: true });

const userModel = new model("User", userSchema, "users");
module.exports = userModel;
