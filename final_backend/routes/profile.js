const express = require("express");
const router = express.Router();

const firebase = require("firebase");
const db = firebase.firestore();
const events = db.collection("events");

router.get("/", (req, res) => {
  const eventsArray = [];
  console.log("profile");
  const queryParams = req.query;
  events
    .where("eventCreatorId", "==", queryParams["id"])
    .get()
    .then((querySnapshot) => {
      // Loop through each query snapshot and add to array
      querySnapshot.forEach((doc) => {
        eventsArray.push(doc.data());
      });
      return res.send(eventsArray);
    })
    .catch(function (e) {
      console.warn("error", e);
      return res.send([{ ERROR_PROFILE: e.toString() }]);
    });
});

module.exports = router;
