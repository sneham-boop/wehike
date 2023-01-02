const faqData = {
  0: {
    icon: "lightbulb",
    question: "How did you come up with this idea?",
    answer:
      "weHike is based on was my finals project weRun. My partner Marianne and I finished weRun (link) prior to the demo day and then I ended up adding a few more features to the app and put my own little twist to it! I often go hiking with my dog and wish there was a way to involve other people or plan new hiking routes together.",
  },
  1: {
    icon: "table_rows",
    question: "What tech stack was used?",
    answer:
      "This is a full-stack application built with ReactJS. Canva was used for styling the logo and a few other design elements. An Express server on Heroku is currently being used for backend with a PostgreSQL database hosted on Supabase (P.S. ask me why I did it this way!). I have used the Google Maps API for calculating routes, distances and marking locations. I've also used their auto-complete feature to be able to select a TO and FROM location while selecting a new route.",
  },
  2: {
    icon: "school",
    question: "What did you learn?",
    answer: "Clear communication was critical while working together on the same codebase. Marianne and I often worked on both backend/frontend together and merge conflicts were common. Overtime we learnt to resolve them more efficiently. Also, working on each others code allowed us to better understand our coding habits and minimize bugs.",
  },
  3: {
    icon: "bug_report",
    question: "How can I test this application?",
    answer: "This project is live. You can log in as one of the test users (email: jane@jane.com, password: password) or create your own account.",
  },
  4: {
    icon: "construction",
    question: "What would you do differently the next time?",
    answer: "I had to redo the entire database and a huge part of the server routes during deployment. I will likely select a cloud-based database service right at the start of the project to save time moving forward.",
  },
  5: {
    icon: "add_circle",
    question: "What other features would you like to add to weRUN?",
    answer: "I would love to add a chat feature for event planners to communicate with people about any event changes.",
  },
  6: {
    icon: "sentiment_very_satisfied",
    question: "Did you do any user testing?",
    answer: "I had my friends and colleagues test this app and used their input to improve the apps responsiveness on various devices.",
  },
};

export default faqData;
