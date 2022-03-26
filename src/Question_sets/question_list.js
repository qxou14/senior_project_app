const Question_sets = [
  {
    question: "When is your birthday? ",
    options: [
      {
        text: "01/02/1949",
        isAns: false,
      },

      {
        text: "02/03/1949",
        isAns: false,
      },
      {
        text: "01/02/1942",
        isAns: false,
      },
      {
        text: "07/12/1977",
        isAns: true,
      },
    ],
  },
  {
    question: "What is the name of your pet? ",
    options: [
      {
        text: "Jason",
        isAns: false,
      },
      {
        text: "Amy",
        isAns: false,
      },
      {
        text: "Steve",
        isAns: false,
      },
      {
        text: "lyle",
        isAns: true,
      },
    ],
  },
  {
    question: "Which phone number do you recognize?",
    options: [
      {
        text: "917-222-3123",
        isAns: true,
      },
      {
        text: "212-212-3231",
        isAns: false,
      },
      {
        text: "403-291-3213",
        isAns: false,
      },
      {
        text: "209-132-3432",
        isAns: false,
      },
    ],
  },
];

module.exports = {
  Question_sets,
};
