if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");
const app = express();
const dialogflow = require("dialogflow-fulfillment");

const mongoose = require("mongoose");

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true });
const db = mongoose.connection;
db.on("error", (error) => console.error(error));
db.once("open", () => console.log("Connected to Mongoose"));

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
            type: "chips",
            options: [
              {
                text: "Chip 1",
                image: {
                  src: {
                    rawUrl: "https://example.com/images/logo.png",
                  },
                  link: "https://example.com",
                },
              },
              {
                text: "Chip 2",
                image: {
                  src: {
                    rawUrl: "https://example.com/images/logo.png",
                  },
                },
                link: "https://example.com",
              },
            ],
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

  function finalConfirmation(agent) {
    var name = agent.context.get("comfirmation").parameters["person.original"];
    var email = agent.context.get("comfirmation").parameters["email.original"];
    var today = new Date();
    var time =
      today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();

    db.collection("receivedusers").insertOne({
      name: name,
      email: email,
      appointmentDate: time,
    });

    // console.log(name);
    // console.log(email);
    // console.log(time);
    agent.add(
      `Hello ${name}, your email: ${email}. We confirmed your meeting.`
    );
  }

  var intent = new Map();

  intent.set("webhookTest", test);
  intent.set("testServerPayload", payloadTest);
  intent.set("finalConfirmation", finalConfirmation);

  agent.handleRequest(intent);
});

app.listen(process.env.PORT || 3000, () => {
  console.log("Server is running in port 3000");
});
