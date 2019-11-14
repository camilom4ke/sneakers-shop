const express = require("express"); // import express in this module
const router = new express.Router(); // create an app sub-module (router)


//------------------------------------------
// IMPORT MODELS
// -----------------------------------------
const sneakerModel = require("./../models/Sneaker");
const tagModel = require("./../models/Tag");
// -----------------------------------------


//------------------------------------------
// ROUTER ADD PRODUCT
// -----------------------------------------
router.get("/prod-add", (req, res) => {
    res.render("products_add");
});
// -----------------------------------------


//------------------------------------------
// ROUTER MANAGE PRODUCT
// -----------------------------------------
router.get("/prod-manage", (req, res) => {
    res.render("product_edit");
});
// -----------------------------------------

module.exports = router;
