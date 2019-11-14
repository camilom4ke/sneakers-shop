const express = require("express"); // import express in this module
const router = new express.Router(); // create an app sub-module (router)

//requiring Models
const sneakerModel = require("./../models/Sneaker");
const tagModel = require("./../models/Tag");

// ADD SNEAKER
router.get("/prod-add", (req, res) => {
  tagModel
    .find()
    .then(dbRes => res.render("products_add", { tags: dbRes }))
    .catch();
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
  tagModel
    .create(req.body)
    .then(() => res.redirect("/prod-add"))
    .catch(() =>
      res.send("products_add", {
        msg: {
          text: "This user account has not been found..",
          status: "wrong"
        }
      })
    );
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
//EDIT
router.get("/product-edit/:id", (req, res) => {
  sneakerModel
    .findById(req.params.id)
    .populate("tags")
    .then(dbRes => {
      tagModel
        .find()
        .then(dbTag =>
          res.render("product_edit", { sneaker: dbRes, tags: dbTag })
        )
        .catch(dbErr => console.log(dbErr));
    })
    .catch();
});
router.post("/product-edit/:id", (req, res) => {
  console.log(req.body);
  sneakerModel
    .findByIdAndUpdate(req.params.id, req.body)
    // A faire en AJAX pour qu'il s'ajoute sans rafraichir la page
    .then(res.redirect("/prod-manage"))
    .catch(err => console.log(err));
});

//DELETE
router.get("/product-delete/:id", (req, res) => {
  sneakerModel
    .findByIdAndRemove(req.params.id)
    .then(dbRes => res.redirect("/prod-manage"))
    .catch(err => console.log(err));
});

module.exports = router;
