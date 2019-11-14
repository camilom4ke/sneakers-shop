const express = require("express");
const router = new express.Router();

//requiring Models
const userModel = require("./../models/User");

//Sign up
router.post("/signup", (req, res) => {
    userModel.create().then().catch()
  });
module.exports = router;
