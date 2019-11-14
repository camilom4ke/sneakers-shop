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

// Render category products
router.get("/sneakers/:cat", (req, res) => {
  console.log(req.params.cat)

  const query = {};
  if (req.params.cat === "men") query.category = "men"
  if (req.params.cat === "women") query.category = "women"
  if (req.params.cat === "kids") query.category = "kids"
  const sneaker = sneakerModel.find(query).populate("tags");
  
  const tags = sneakerModel.find(query.tags).populate("tags");

  Promise.all([sneaker, tags])
    .then(dbRes => {
      res.render("products", {
        sneaker: dbRes[0],
        tags: dbRes[1]
      });
    })
    .catch(asyncErr => console.log(asyncErr));
});

router.get("/one-product/:id", (req, res) => {
  res.render("one_product");
});
module.exports = router;
