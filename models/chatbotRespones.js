const mongoose = require("mongoose");

const chatbotResponeSchema = new mongoose.Schema({
  intent: {
    type: String,
    required: true,
  },
  content: {
    type: Object,
    required: true,
  },
});

module.exports = mongoose.model("chatbotRespones", chatbotResponeSchema);
