const express = require("express");
const router = express.Router();

const firebase = require("firebase");
const db = firebase.firestore();

router.get("/", (req, res) => {
  const queryParams = req.query;
  const events = db.collection("events").doc(queryParams["eventID"]);

  events
    .get()
    .then((documentSnapshot) => {
      res.send(documentSnapshot.data());
    })
    .catch((error) => {
      console.warn("event error", error);
      res.send(error);
    });
});

module.exports = router;
