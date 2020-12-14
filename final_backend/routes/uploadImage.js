const { query } = require("express");
const express = require("express");
const router = express.Router();

const firebase = require("firebase");
const db = firebase.firestore();
const events = db.collection("events");

router.get("/", (req, res) => {
  const queryParams = req.query;
  const eventID = queryParams["eventID"];
  const filepath = queryParams["filepath"];

  events
    .doc(eventID)
    .update({
      images: firebase.firestore.FieldValue.arrayUnion(filepath),
    })
    .then(() => {
      return res.send("success");
    })
    .catch((error) => {
      console.warn("upload path error", error);
      return res.send(error);
    });
});

module.exports = router;
