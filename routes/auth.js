const express = require("express");
const router = new express.Router();
const bcrypt = require("bcrypt");

//requiring Models
const userModel = require("./../models/User");

//Signup
router.post("/signup", (req, res) => {
  const user = req.body;
  userModel
    .findOne({ email: user.email })
    .then(dbRes => {
      if (dbRes)
        return res.render("signup", {
          msg: { text: "This account already exists!", status: "wrong" }
        }); //

      const salt = bcrypt.genSaltSync(10); // cryptography librairie
      const hashed = bcrypt.hashSync(user.password, salt); // generates a secured random hashed password
      user.password = hashed; // new user is ready for db
      userModel
        .create(user)
        .then(() => res.redirect("/signin"))
        .catch(dbErr => console.log(dbErr));
    })
    .catch(dbErr => next(dbErr));
});

//Signin
router.post("/signin", (req, res, next) => {
  const user = req.body;
  userModel
    .findOne({ email: user.email })
    .then(dbRes => {
      console.log(dbRes);
      if (!dbRes) {
        // no user found with this email
        return res.render("signin", {
          msg: {
            text: "This user account has not been found..",
            status: "wrong"
          }
        });
      }
      // user has been found in DB !
      if (bcrypt.compareSync(user.password, dbRes.password)) {
        req.session.currentUser = dbRes; // user is now in session... until session.destroy
        return res.render("products");
      } else {
        return res.render("signin", {
          msg: { text: "Password is wrong..", status: "wrong" }
        });
      }
    })
    .catch(dbErr => {
      console.log(dbErr);
      res.redirect("/signin");
    });
});
module.exports = router;
