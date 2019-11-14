const mongoose = require("mongoose"); // import mongoose dependencie

const Schema = mongoose.Schema;

const tagSchema = new Schema({
  name: { type: String, unique: true}
});

const tagModel = mongoose.model("Tag", tagSchema);

module.exports = tagModel;
