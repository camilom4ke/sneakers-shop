const mongoose = require("mongoose"); // import mongoose dependencie

const Schema = mongoose.Schema;

const sneakerSchema = new Schema({
  name: String,
  ref: String,
  sizes: Number,
  description: Number,
  price: Number,
  category: [men, women, kids],
  tags: {
    type: Schema.Types.ObjectId,
    ref: "Tag"
  }
});

const sneakerModel = mongoose.model("Sneaker", sneakerSchema);

module.exports = sneakerModel;
