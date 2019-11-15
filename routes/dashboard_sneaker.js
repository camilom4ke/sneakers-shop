const express = require("express"); // import express in this module
const router = new express.Router(); // create an app sub-module (router)
const isLoggedIn = require("../middlewares/isLoggedIn");
//requiring Models
const sneakerModel = require("./../models/Sneaker");
const tagModel = require("./../models/Tag");
const uploader = require("./../config/cloudinary");

// ADD SNEAKER
router.get("/prod-add", isLoggedIn, (req, res) => {
  // if (!req.session.currentUser) {
  //   res.redirect("/signin");
  //   return;
  // }
  tagModel
    .find()
    .then(dbRes => res.render("products_add", { tags: dbRes }))
    .catch();
});

router.post("/prod-add", isLoggedIn, uploader.single("image"), (req, res) => {
  const newSneaker = {
    name: req.body.name,
    ref: req.body.ref,
    price: req.body.price,
    size: req.body.size,
    description: req.body.description,
    category: req.body.category,
    id_tags: req.body.tags
  };
  if (req.file) {
    newSneaker.image = req.file.secure_url;
  }
  console.log(req);
  sneakerModel
    .create(newSneaker)
    .then(res.redirect("/prod-manage"))
    .catch(err => console.log(err));
});
//ADD TAG
router.post("/add-tag", isLoggedIn, (req, res) => {
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
router.get("/prod-manage", isLoggedIn, (req, res) => {
  sneakerModel
    .find()
    .then(dbRes => {
      res.render("products_manage", { sneakers: dbRes });
    })
    .catch(dbErr => console.log(dbErr));
});
//EDIT
router.get("/product-edit/:id", isLoggedIn, (req, res) => {
  sneakerModel
    .findById(req.params.id)
    .populate("tags")
    .then(dbRes => {
      tagModel
        .find()
        .then(dbTag => {
          console.log(dbRes);
          res.render("product_edit", { sneaker: dbRes, tags: dbTag });
        })
        .catch(dbErr => console.log(dbErr));
    })
    .catch();
});
router.post("/product-edit/:id", isLoggedIn, (req, res) => {
  console.log(req.body);
  sneakerModel
    .findByIdAndUpdate(req.params.id, req.body)
    // A faire en AJAX pour qu'il s'ajoute sans rafraichir la page
    .then(res.redirect("/prod-manage"))
    .catch(err => console.log(err));
});

//DELETE
router.get("/product-delete/:id", isLoggedIn, (req, res) => {
  sneakerModel
    .findByIdAndRemove(req.params.id)
    .then(dbRes => res.redirect("/prod-manage"))
    .catch(err => console.log(err));
});

//Manage TAGS
//RENDER
router.get("/tags-manage", isLoggedIn, (req, res) => {
  tagModel
    .find()
    .then(dbRes => {
      res.render("tags_manage", { tags: dbRes });
    })
    .catch(dbErr => console.log(dbErr));
});
module.exports = router;
//DELETE
router.get("/tag-delete/:id", isLoggedIn, (req, res) => {
  tagModel
    .findByIdAndRemove(req.params.id)
    .then(dbRes => res.redirect("/tags-manage"))
    .catch(err => console.log(err));
});
//EDIT
// router.get("/product-edit/:id", isLoggedIn, (req, res) => {
//   tagModel
//     .findById(req.params.id)
//     .then(dbRes => {
//       tagModel
//         .find()
//         .then(dbTag => {
//           console.log(dbRes);
//           res.render("product_edit", { sneaker: dbRes, tags: dbTag });
//         })
//         .catch(dbErr => console.log(dbErr));
//     })
//     .catch();
// });
// router.post("/product-edit/:id", isLoggedIn, (req, res) => {
//   console.log(req.body);
//   sneakerModel
//     .findByIdAndUpdate(req.params.id, req.body)
//     // A faire en AJAX pour qu'il s'ajoute sans rafraichir la page
//     .then(res.redirect("/prod-manage"))
//     .catch(err => console.log(err));
// });