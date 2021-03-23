const dialogflow = require("dialogflow-fulfillment");
const mongoose = require("mongoose");
const db = mongoose.connection;

// https://www.monster.com/career-advice/article/web-developer-resume-sample

// Default Intent

function defaultWelcomeIntent(agent) {
  var payload = {
    richContent: [
      [
        {
          text: [
            "Hi! This is Jim March. A Resume Chat Bot for you know me more :)",
            "All the Resume data is reference by",
          ],
          type: "description",
          title: "Welcome!",
        },

        {
          type: "chips",
          options: [
            { text: "Introduction" },
            { text: "Education" },
            { text: "Skills" },
            { text: "Working Experience" },
            { text: "Projects" },
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
}

// Introduction

// var testArray = [];
// testArray.push(intentModel("TestTitle"));
// testArray.push(intentModel("TestTitle"));

function introduction(agent) {
  var payload = {
    richContent: [
      [
        {
          type: "description",
          title: "Introduction",
          text: [
            "Creative web developer dedicated to building and optimizing the performance of user-centric, high-impact websites for nationwide, F500 and global companies.",
            "Leverage technical, analytical and problem-solving skills to create dynamic, high-speed websites, apps and platforms fueling competitive advantage and revenue growth.",
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
}

// Education

function education(agent) {
  agent.add(
    new dialogflow.Payload("UNSPECIFIED", payload, {
      sendAsMessage: true,
      rawPayload: true,
    })
  );
}

// Project

function project(agent) {
  var payload = {
    richContent: [
      [
        {
          event: {
            name: "",
            languageCode: "",
            parameters: {},
          },
          type: "list",
          title: "Global Cosmetics Company",
        },
        {
          type: "divider",
        },
        {
          rawUrl:
            "https://media.licdn.com/dms/image/C510BAQEfAtBOOrDEqA/company-logo_200_200/0?e=2159024400&v=beta&t=DoztLzoDPtUttLsvKxV02UBdLMCXcHj8qBrqPaqPUk0",
          type: "image",
          accessibilityText: "Global Cosmetics Company",
        },
        {
          type: "list",
          event: {
            languageCode: "",
            name: "",
            parameters: {},
          },
          subtitle:
            "Developed API platform for segmentation, personalized recommendations and omni-channel messaging that reduced cart-abandonment rate by 37%, leading to a $1.25M increase in online sales within 90 days of solution launch.",
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
}

// Skills

function skills(agent) {
  agent.add(
    new dialogflow.Payload("UNSPECIFIED", payload, {
      sendAsMessage: true,
      rawPayload: true,
    })
  );
}

// Working Experience

function workingExperience(agent) {
  agent.add(
    new dialogflow.Payload("UNSPECIFIED", payload, {
      sendAsMessage: true,
      rawPayload: true,
    })
  );
}

// Final Comfirmation

function finalConfirmation(agent) {
  var name = agent.context.get("comfirmation").parameters["person.original"];
  var email = agent.context.get("comfirmation").parameters["email.original"];
  var today = new Date();

  db.collection("receivedusers").insertOne({
    name: name,
    email: email,
    receiveDate: today,
  });

  console.log(name);
  console.log(email);
  console.log(today);
  agent.add(`Hello ${name}, your email: ${email}. We confirmed your meeting.`);
}

// Introduction Project Skills Working Experience education Default Welcome Intent

module.exports = {
  defaultIntent: defaultWelcomeIntent,
  introduction: introduction,
  project: project,
  workingExperience: workingExperience,
  education: education,
  skills: skills,
  finalConfirmation: finalConfirmation,
};
