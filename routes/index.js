const express = require("express");
const router = express.Router();

//------------------------------------------
// IMPORT MODELS
// -----------------------------------------
const sneakerModel = require("./../models/Sneaker");
const tagModel = require("./../models/Tag");
const userModel = require("./../models/User");
// -----------------------------------------


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
  console.log(req.params.cat)

  const query = {};
  if (req.params.cat === "collection") query.category = "women"
  if (req.params.cat === "men") query.category = "women"
  if (req.params.cat === "women") query.category = "women"
  if (req.params.cat === "kids") query.category = "women"
  const sneaker = sneakerModel.find(query).populate("tags");

  Promise.all([sneaker])
    .then(dbRes => {
      res.render("products", {
        sneaker: dbRes[0]
      });
    })
    .catch(asyncErr => console.log(asyncErr));
});

router.get("/one-product/:id", (req, res) => {
  res.render("one_product");
});
module.exports = router;
