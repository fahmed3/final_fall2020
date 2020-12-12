const express = require("express");
const router = express.Router();

//Require Firebase
const firebase = require("firebase");

//Initialize Firestore Database
const db = firebase.firestore();

//Reference a specific collection
const events = db.collection("events");

//router.get("/", (req, res) => res.send(sampleJSON));
router.get("/", (req, res) => {
  const queryParams = req.query;
  events
    .doc()
    .set(queryParams)
    .then(function (doc) {
      res.send("success");
    })
    .catch(function (e) {
      console.log("Error", e);
      res.send([{ ERROR_SUBMITTING: e.toString() }]);
    });
});

module.exports = router;
