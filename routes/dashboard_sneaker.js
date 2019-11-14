const express = require("express"); // import express in this module
const router = new express.Router(); // create an app sub-module (router)

//requiring Models
const sneakerModel = require("./../models/Sneaker");
const tagModel = require("./../models/Tag");

// ADD SNEAKER
router.get("/prod-add", (req, res) => {
  res.render("products_add");
});

router.post("/prod-add", (req, res) => {
  console.log(req.body);
  sneakerModel
    .create(req.body)
    .then(res.redirect("/prod-manage"))
    .catch(err => console.log(err));
});
//ADD TAG
router.post("/add-tag", (req, res) => {
  console.log(req.body);
  tagModel
    .create(req.body)
    // A faire en AJAX pour qu'il s'ajoute sans rafraichir la page
    .then(res.redirect("/prod-add"))
    .catch(err => console.log(err));
});

//MANAGE SNEAKER VIEW
router.get("/prod-manage", (req, res) => {
  sneakerModel
    .find()
    .then(dbRes => {
      res.render("products_manage", { sneakers: dbRes });
    })
    .catch(dbErr => console.log(dbErr));
});

router.get("/product-edit/:id", (req, res) => {
  sneakerModel
    .findById(req.params.id)
    .then(dbRes => res.render("product_edit", { sneaker: dbRes }));
});

module.exports = router;
