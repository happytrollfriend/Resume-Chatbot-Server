const ChatbotRespones = require("../models/chatbotRespones");

var richContent = async (intent) => {
  let dbObj = ChatbotRespones.find();
  let doc = await dbObj.exec();

  let content = [];
  doc.forEach((item) => {
    if (item.intent === intent) {
      content.push(item);
    }
  });
  console.log(content.length);
  return content;
};

module.exports = richContent;
