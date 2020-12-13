const express = require("express");
const router = express.Router();

const firebase = require("firebase");
const db = firebase.firestore();
const events = db.collection("events");

router.get("/", (req, res) => {
  console.log("creatEvent");
  const queryParams = req.query;
  queryParams["invitees"] = [queryParams["eventCreatorId"]];

  events
    .doc()
    .set(queryParams)
    .then(function (doc) {
      res.send("success");
    })
    .catch(function (e) {
      console.warn("Error", e);
      res.send([{ ERROR_SUBMITTING: e.toString() }]);
    });
});

module.exports = router;
