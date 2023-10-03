const { Schema, model } = require("mongoose");
const addressSchema = new Schema(
  {
    street: String,
    city: String,
    zip: String,
    country: String,
  },
  {
    timestamps: true,
  }
);
const addressModel = new model("Address", addressSchema, "addresses");

module.exports = addressModel;
