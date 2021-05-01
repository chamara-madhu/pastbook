const mongoose = require("mongoose");

const photoSchema = mongoose.Schema(
  {
    photos: { type: Array, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("photo", photoSchema);
