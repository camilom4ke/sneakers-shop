const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.render("index");
});

//Render signin & signup
router.get("/signup", (req, res) => {
  res.render("signup");
});

router.get("/signin", (req, res) => {
  res.render("signin");
});

// Render products
router.get("/sneakers/:cat", (req, res) => {
  res.send("bar");
});

router.get("/one-product/:id", (req, res) => {
  res.send("baz");
});
module.exports = router;
