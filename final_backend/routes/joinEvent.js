const express = require("express");
const router = express.Router();

const firebase = require("firebase");
const db = firebase.firestore();

//Updates both events and users collections
router.get("/", (req, res) => {
  const queryParams = req.query;
  const userName = queryParams["userName"];

  const events = db.collection("events").doc(queryParams["eventID"]);
  const user_ref = db.collection("users").doc(queryParams["userID"]);

  db.runTransaction(function (transaction) {
    return transaction.get(events).then(function (doc) {
      if (!doc.exists) {
        console.warn("doc does not exist");
        res.send(null);
      }

      d = doc.data();
      event_name = d["eventName"];

      transaction.update(events, {
        invitees: firebase.firestore.FieldValue.arrayUnion(userName),
      });
      transaction.update(user_ref, {
        all_events: firebase.firestore.FieldValue.arrayUnion({
          eventID: `${queryParams["eventID"]}`,
          eventName: event_name,
        }),
      });
      return res.send(d);
    });
  }).catch(function (err) {
    console.warn(err);
    return res.send(error);
  });
});

module.exports = router;
