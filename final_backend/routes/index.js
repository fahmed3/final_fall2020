const express = require("express");
const router = express.Router();

//Require Firebase
const firebase = require("firebase");

//Initialize Firestore Database
const db = firebase.firestore();

//Reference a specific collection
const events = db.collection("events");

router.get("/events/:id", (req, res) => {
  const eventsArray = [];

  //blogposts and recipes are interchangeable, dont let it confuse u
  //get ID
  const queryId = req.params.id;
  // figure out how to refine our search to the recipeAuthorId..

  //also figure out how to get all invited to events
  events
    .where("eventCreatorId", "==", queryId)
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

router.get("/", (req, res) => res.send("Home page, won't even be used"));
router.get("/all-events", (req, res) => {
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
