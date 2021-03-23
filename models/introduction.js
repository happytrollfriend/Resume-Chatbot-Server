const mongoose = require("mongoose");

const introductionSchema = new mongoose.Schema({
  content: {
    type: Object,
  },
});

module.exports = mongoose.model("Introduction", introductionSchema);
