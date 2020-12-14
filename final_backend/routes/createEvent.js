const express = require("express");
const router = express.Router();

const firebase = require("firebase");
const db = firebase.firestore();
const events = db.collection("events");

//Creates event and returns document ID to user
router.get("/", (req, res) => {
  console.log("creatEvent");
  const queryParams = req.query;
  queryParams["invitees"] = [];

  events
    .add(queryParams)
    .then((docRef) => {
      console.log("doc ID: ", docRef.id);
      return res.send({ docID: docRef.id });
    })
    .catch((error) => {
      console.warn("create event error ", error);
      return res.send(error);
    });
});

module.exports = router;
