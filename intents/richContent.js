const IntentModel = require("./intentModels");
const Introduction = require("../models/introduction");
// let testArray = [];
// chatbotDoc.forEach((item, index) => {
//   testArray.push(chatbotDoc[index]);
// });
// console.log(testArray);

var richContent = async () => {
  let dbObj = Introduction.find();
  let doc = await dbObj.exec();
  console.log(doc);
  let content = [];
  doc.forEach((item, index) => {
    content.push(doc.content[index]);
  });
  return content;
};

module.exports = richContent;
