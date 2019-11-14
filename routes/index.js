const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.render("index");
});

//Sign IN & UP
router.get("/signup", (req, res) => {
  res.render("signup");
});

router.get("/signin", (req, res) => {
  res.render("signin");
});

// Products
router.get("/sneakers/:cat", (req, res) => {
  res.send("bar");
});

router.get("/one-product/:id", (req, res) => {
  res.send("baz");
});
module.exports = router;
