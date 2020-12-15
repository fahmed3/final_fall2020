const { query } = require("express");
const express = require("express");
const router = express.Router();

const firebase = require("firebase");
const db = firebase.firestore();
const events = db.collection("events");
const users = db.collection("users");

//Creates event and returns document ID to user
router.get("/", (req, res) => {
  console.log("createEvent");
  const queryParams = req.query;
  queryParams["invitees"] = [];

  events
    .add(queryParams)
    .then((docRef) => {
      return res.send({ docID: docRef.id });
    })
    .catch((error) => {
      console.warn("create event error ", error);
      return res.send(error);
    });
});

//to make sure users collection is also updated
router.get("/addtousers", (req, res) => {
  console.log("add to users");
  const queryParams = req.query;

  users
    .doc(queryParams["userID"])
    .update({
      all_events: firebase.firestore.FieldValue.arrayUnion({
        eventID: `${queryParams["eventID"]}`,
        eventName: `${queryParams["eventName"]}`,
      }),
    })
    .then(() => {
      return res.send("success");
    })
    .catch((error) => {
      console.warn("add to user s error", error);
      return res.send(error);
    });
});

//new user account
router.get("/user", (req, res) => {
  console.log("hellooooooo");
  const queryParams = req.query;
  console.log("USERID", queryParams["userID"]);
  users
    .doc(queryParams["userID"])
    .set({ all_events: [] })
    .then(() => {
      return res.send("success");
    })
    .catch((error) => {
      console.warn("create user error ", error);
      return res.send(error);
    });
});

module.exports = router;
