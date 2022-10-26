const faqData = {
  0: {
    icon: "lightbulb",
    question: "How did you come up with this idea?",
    answer:
      "weRUN was my finals project for the Lighthouse Labs web development bootcamp. It was my partners idea and is based on the Parkrun organization, https://www.parkrun.com/about/. It is an international community of runners that organizes free community based running events all over the world. We chose to focus on Canada alone.",
  },
  1: {
    icon: "table_rows",
    question: "What tech stack was used?",
    answer:
      "This is a full-stack application built with React and React bootstrap for the frontend. Canva was used for styling. An Express server on Heroku is used for backend with a PostgreSQL database hosted on Supabase. Also, I have used Google Maps API for calculating routes, distances and marking locations.",
  },
  2: {
    icon: "school",
    question: "What did you learn?",
    answer: "I learnt that clear communication was a key element while working together on the same codebase. Merge conflicts were common and overtime my teammate and I learnt to resolve them more efficiently. Also, working on each others code allowed us to better understand eachothers coding habits and minimize bugs as a result.",
  },
  3: {
    icon: "bug_report",
    question: "How can I test this application?",
    answer: "You can log in as one of the test users (email: jane@jane.com, password: password) or create your own account.",
  },
  4: {
    icon: "construction",
    question: "What would you do differently the next time?",
    answer: "I had to redo a big part of the database and server related code during deployment and next time I will better plan my initial actions to allow for a more seemless deployment experience.",
  },
  5: {
    icon: "add_circle",
    question: "What other features would you like to add to weRUN?",
    answer: "I would love to add a chat feature for planners and runners to communicate with eachother about event changes.",
  },
  6: {
    icon: "sentiment_very_satisfied",
    question: "Did you do any user testing?",
    answer: "I had my friends and colleagues test this app and used their input to improve the apps responsiveness on various devices.",
  },
};

export default faqData;
