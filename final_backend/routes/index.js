const express = require("express");
const router = express.Router();

const sampleJSON = [
  {
    name: "Fabiha",
    role: "Student",
    dog: "Cougar",
  },
  {
    name: "James",
    role: "Teacher",
    dog: "Artemis",
  },
];

router.get("/", (req, res) => res.send(sampleJSON));

module.exports = router;
