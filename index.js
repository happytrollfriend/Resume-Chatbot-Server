if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");
const app = express();
const dialogflow = require("dialogflow-fulfillment");
const ChatbotDocument = require("./models/chatbotDocument");
const ChatbotRespone = require("./models/chatbotRespones");
const IntentRespone = require("./intents/intent");
const IntentModels = require("./intents/intentModels");
const RichContent = require("./intents/richContent");

const mongoose = require("mongoose");

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true });
const db = mongoose.connection;
db.on("error", (error) => console.error(error));
db.once("open", () => console.log("Connected to Mongoose"));

app.get("/", (req, res) => {
  res.send("Screaming");
});

app.post("/", express.json(), async (req, res) => {
  let query = ChatbotDocument.find();
  let chatbotDoc = await query.exec();
  let chatbotResQuery = ChatbotRespone.find();
  let chatbotRes = await chatbotResQuery.exec();
  const agent = new dialogflow.WebhookClient({
    request: req,
    response: res,
  });
  // https://www.monster.com/career-advice/article/web-developer-resume-sample

  // Introduction Project Skills Working Experience education Default Welcome Intent
  async function test(agent) {
    let value = await RichContent("introduction");
    console.log(value[0].content.type);

    agent.add("123");
  }

  function payloadTest(agent) {
    var payload = {
      richContent: [
        [
          {
            type: "image",
            rawUrl: `${chatbotDoc[0].coverImagePath}`,
            accessibilityText: "Example logo",
          },
          {
            type: "info",
            title: "Dialog",
            subtitle: "fw",
            actionLink: `${chatbotDoc[0].coverImagePath}`,
          },
        ],
      ],
    };

    agent.add(
      new dialogflow.Payload("UNSPECIFIED", payload, {
        sendAsMessage: true,
        rawPayload: true,
      })
    );

    console.log("sent payload from server");
  }

  var intent = new Map();

  intent.set("Default Welcome Intent", IntentRespone);
  intent.set("webhookTest", test);
  intent.set("testServerPayload", payloadTest);
  intent.set("finalConfirmation", IntentRespone);
  intent.set("introduction", IntentRespone);
  intent.set("project", IntentRespone);
  agent.handleRequest(intent);
});

app.listen(process.env.PORT || 3000, () => {
  console.log("Server is running in port 3000");
});
