const mongoose = require("mongoose");

const serieSchema = new mongoose.Schema({
  title: { type: String, required: true },
  year: { type: Number, required: true },
  img: { type: String, required: true },
  synopsis: { type: String, required: false },
  category: { type: String, required: false },
  director: { type: String, required: false },
});

module.exports = mongoose.model("series", serieSchema);
