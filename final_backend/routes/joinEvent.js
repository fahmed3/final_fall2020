const express = require("express");
const router = express.Router();

const firebase = require("firebase");
const db = firebase.firestore();
const events = db.collection("events");

router.get("/", (req, res) => {
  console.log("joinEvent");

  const queryParams = req.query;

  events
    .doc(queryParams["eventID"])
    .update({
      invitees: firebase.firestore.FieldValue.arrayUnion(
        `${queryParams["userID"]}`
      ),
    })
    .then(function (doc) {
      res.send("success");
    })
    .catch(function (error) {
      console.warn("JOINING_ERROR", error);
      res.send([{ ERROR_SUBMITTING: e.toString() }]);
    });
});

module.exports = router;
