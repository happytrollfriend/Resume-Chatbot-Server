// Info response type

// type: info

var infoResponse = (
  title = "",
  subtitle = "",
  rawUrl = "",
  actionLink = ""
) => {
  return {
    type: "info",
    title: title,
    subtitle: subtitle,
    image: {
      src: {
        rawUrl: rawUrl,
      },
    },
    actionLink: actionLink,
  };
};

// Description response type
var descriptionResponse = (title = "", text = ["", ""]) => {
  return {
    type: "description",
    title: title,
    text: text,
  };
};

// Image response type

// Button response type

// List response type

// Accordion response type

// Suggestion chip response type

// Combining response types

module.exports = {
  infoResponse: infoResponse,
  descriptionResponse: descriptionResponse,
};
