const express = require("express"); // import express in this module
const router = new express.Router(); // create an app sub-module (router)


//------------------------------------------
// IMPORT MODELS
// -----------------------------------------
const sneakerModel = require("./../models/Sneaker");
const tagModel = require("./../models/Tag");
// -----------------------------------------

router.get("/", (req, res) => {
    res.render("index");
  });

module.exports = router;
