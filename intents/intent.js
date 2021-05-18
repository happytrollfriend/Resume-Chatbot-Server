const dialogflow = require("dialogflow-fulfillment");
const mongoose = require("mongoose");
const db = mongoose.connection;
const ChatbotRespone = require("../models/chatbotRespones");
const RichContent = require("./richContent");

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
        {
          type: "chips",
          options: [
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

// Education

function education(agent) {
  var payload = {
    richContent: [
      [
        {
          actionLink:
            "http://www.ouhk.edu.hk/wcsprd/Satellite?pagename=OUHK/tcSingPage&lang=eng",
          type: "info",
          title: "Bachelor of Applied Science in Internet and Web Development",
          subtitle: "SOMETOWN UNIVERSITY",
          image: {
            src: {
              rawUrl:
                "https://cdn0.techbang.com/system/images/452264/original/3487db5a5e99a1edb03c3a02c05377bf.png?1533022751",
            },
          },
        },
        {
          type: "chips",
          options: [
            { text: "Introduction" },
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
        {
          type: "chips",
          options: [
            { text: "Introduction" },
            { text: "Education" },
            { text: "Skills" },
            { text: "Working Experience" },
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

// Skills

function skills(agent) {
  var payload = {
    richContent: [
      [
        {
          text: [
            "HTML5",
            "CSS3",
            "JavaScript",
            "RWD",
            "JQuery",
            "Vuejs",
            "Bootstrap",
          ],
          title: "Skills",
          type: "description",
        },
        {
          type: "chips",
          options: [
            { text: "Introduction" },
            { text: "Education" },

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

// Working Experience

function workingExperience(agent) {
  var payload = {
    richContent: [
      [
        {
          type: "description",
          text: [
            "Work collaboratively with clients and in-house agency teams to provide rapid, robust and client-acclaimed front- and back-end web development optimizing user experience, search engine ranking, sales, brand positioning and related metrics.",
            "2046 to Present",
          ],
          title: "Web Developer ABC AGENCY, INC. - Sometown, NY",
        },
        {
          title:
            "WordPress Web Developer Intern, DEF AGENCY, INC. — Sometown, NY",
          type: "description",
          text: ["Work for workpress web development", "2045 to 2046"],
        },
        {
          type: "chips",
          options: [
            { text: "Introduction" },
            { text: "Education" },
            { text: "Skills" },

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

// Final Comfirmation

function finalConfirmation(agent) {
  const name = agent.context.get("comfirmation").parameters["person.original"];
  let email = agent.context.get("comfirmation").parameters["email.original"];
  let today = new Date();

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

async function intentRespone(agent) {
  var requestIntent = agent.intent;
  var richContent = await RichContent(requestIntent);
  var payloadRichContent = [];

  richContent.forEach((item) => {
    payloadRichContent.push(item.content);
  });

  var payload = {
    richContent: [payloadRichContent],
  };
  console.log(requestIntent);
  console.log(payloadRichContent);
  // { richContent: [ [ [Object] ] ] }
  agent.add(
    new dialogflow.Payload("UNSPECIFIED", payload, {
      sendAsMessage: true,
      rawPayload: true,
    })
  );
}

// Introduction Project Skills Working Experience education Default Welcome Intent

// module.exports = intentRespone;

module.exports = {
  defaultIntent: defaultWelcomeIntent,
  introduction: introduction,
  project: project,
  workingExperience: workingExperience,
  education: education,
  skills: skills,
  finalConfirmation: finalConfirmation,
};

// education
// {
//   "richContent": [
//     [
//       {
//         "actionLink": "http://www.ouhk.edu.hk/wcsprd/Satellite?pagename=OUHK/tcSingPage&lang=eng",
//         "type": "info",
//         "title": "Bachelor of Applied Science in Internet and Web Development",
//         "subtitle": "SOMETOWN UNIVERSITY",
//         "image": {
//           "src": {
//             "rawUrl": "https://cdn0.techbang.com/system/images/452264/original/3487db5a5e99a1edb03c3a02c05377bf.png?1533022751"
//           }
//         }
//       }
//     ]
//   ]
// }

// Skills

// {
//   "richContent": [
//     [
//       {
//         "text": [
//           "HTML5",
//           "CSS3",
//           "JavaScript",
//           "RWD",
//           "JQuery",
//           "Vuejs",
//           "Bootstrap"
//         ],
//         "title": "Skills",
//         "type": "description"
//       }
//     ]
//   ]
// }
