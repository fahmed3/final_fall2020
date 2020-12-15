const { query } = require("express");
const express = require("express");
const router = express.Router();

const firebase = require("firebase");
const db = firebase.firestore();
const events = db.collection("events");

// Update images collection
router.get("/", (req, res) => {
  const queryParams = req.query;
  const eventID = queryParams["eventID"];
  const filepath = queryParams["filepath"];
  const fileID = queryParams["filename"];
  const fileExtension = queryParams["fileExtension"];

  const images = db.collection(`events/${eventID}/images`);

  images
    .doc(fileID)
    .set({
      filepath: `${filepath}/${fileID}.${fileExtension}`,
    })
    .then(() => {
      return res.send("success");
    })
    .catch((error) => {
      console.warn("upload path error", error);
      return res.send(error);
    });
});

// Create document for /images collection and get the reference
router.get("/image", (req, res) => {
  const queryParams = req.query;
  const eventID = queryParams["eventID"];

  const images = db.collection(`events/${eventID}/images`);

  images
    .add({ filepath: "" })
    .then((docRef) => {
      return res.send({ docID: docRef.id });
    })
    .catch((error) => {
      console.warn("add image collection error ", error);
      return res.send(error);
    });
});

// Receive all filepaths
router.get("/images", (req, res) => {
  const queryParams = req.query;
  const eventID = queryParams["eventID"];
  const filepathArray = [];

  const images = db.collection(`events/${eventID}/images`);

  images
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        filepathArray.push(doc.data());
      });
      return res.send(filepathArray);
    })
    .catch((error) => {
      console.warn("get images error", error);
      return res.send(error);
    });
});

module.exports = router;
