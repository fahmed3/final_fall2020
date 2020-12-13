// Backend Application for Final Project
const express = require("express");
const app = express();
const port = process.env.PORT || 4000;

// Configuration Values for Firebase
const firebaseConfig = {
  apiKey: "AIzaSyA7d8Jj5yANuHMXooqUjeOgJPRePZVlVaw",
  authDomain: "final-project-fall2020.firebaseapp.com",
  projectId: "final-project-fall2020",
  storageBucket: "final-project-fall2020.appspot.com",
  messagingSenderId: "642509716845",
  appId: "1:642509716845:web:319f20d725a409c597ee64",
};

const firebase = require("firebase");
firebase.initializeApp(firebaseConfig);

const indexRoute = require("./routes/index.js");
const createEvent = require("./routes/createEvent.js");
const joinEvent = require("./routes/joinEvent.js");
const profile = require("./routes/profile.js");
const event = require("./routes/event.js");

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use("/", indexRoute);
app.use("/profile", profile);
app.use("/create", createEvent);
app.use("/join", joinEvent);
app.use("/event", event);

app.listen(port, () => console.log(`Backend is running at port:${port}`));
