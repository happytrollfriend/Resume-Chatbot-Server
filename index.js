const express = require("express");
const app = express();
const dialogflow = require("dialogflow-fulfillment");

app.get("/", (req, res) => {
  res.send("Screaming");
});

app.post("/", express.json(), (req, res) => {
  const agent = new dialogflow.WebhookClient({
    request: req,
    response: res,
  });

  function test(agent) {
    agent.add("Sending content from the server");
    console.log("sent text content from server");
  }

  function payloadTest(agent) {
    var payload = {
      richContent: [
        [
          {
            type: "description",
            title: "Web Server Payload Card",
            text: ["Web Server test successful.", "successfully"],
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

  intent.set("webhookTest", test);
  intent.set("testServerPayload", payloadTest);
  agent.handleRequest(intent);
});

app.listen(process.env.PORT || 3000, () => {
  console.log("Server is running in port 3000");
});
