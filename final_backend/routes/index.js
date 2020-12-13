const express = require("express");
const router = express.Router();

const firebase = require("firebase");
const db = firebase.firestore();
const events = db.collection("events");

router.get("/events", (req, res) => {
  const queryParams = req.query;
  console.log("hello how are you");
  console.log(queryParams);
  const eventsArray = [];
  res.send(queryParams);
  //get ID
  // const queryId = req.params.id;

  //also figure out how to get all invited to events
  // events
  //   .where("eventCreatorId", "==", queryId)
  //   .get()
  //   .then((querySnapshot) => {
  //     // Loop through each query snapshot and add to array
  //     querySnapshot.forEach((doc) => {
  //       eventsArray.push(doc.data());
  //     });
  //     return res.send(eventsArray);
  //   })
  //   .catch(function (e) {
  //     console.warn("error", e);
  //     return res.send(error);
  //   });
});

router.get("/", (req, res) => {
  console.log("home page for index");
  res.send("Home page, won't even be used");
});

router.get("/all-events", (req, res) => {
  console.log("all-events");
  const eventsArray = [];
  events
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
      return res.send(error);
    });
});

module.exports = router;
