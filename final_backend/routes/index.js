const express = require("express");
const router = express.Router();

const firebase = require("firebase");
const db = firebase.firestore();
const users = db.collection("users");

// router.get("/", (req, res) => {
//   console.log("home page for index");
//   res.send("Home page, won't even be used");
// });

router.get("/all-events", (req, res) => {
  console.log("all-events");
  const eventsArray = [];
  let event_ids = [];
  const queryParams = req.query;

  users
    .doc(queryParams["userID"])
    .get()
    .then((documentSnapshot) => {
      if (documentSnapshot.exists) {
        event_ids = documentSnapshot.data()["all_events"];
        return res.send(event_ids);
      } else {
        console.warn("document not found");
        return res.send([]);
      }
    })
    .catch(function (error) {
      console.warn("all-events error", error);
      return res.send(error);
    });
});

module.exports = router;
