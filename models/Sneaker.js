const mongoose = require("mongoose"); // import mongoose dependencie
const Schema = mongoose.Schema;

const sneakerSchema = new Schema({
  name: String,
  ref: String,
  sizes: Number,
  description: String,
  price: Number,
  image: {
    type: String,
    default:
      "https://res.cloudinary.com/camilosorio/image/upload/v1573819261/sneakers-pictures/mrcr2lq3yzfso226k5k9.png"
  },
  category: ["men", "women", "kids"],
  tags: [
    {
      type: Schema.Types.ObjectId,
      ref: "Tag"
    }
  ]
});

const sneakerModel = mongoose.model("Sneaker", sneakerSchema);

module.exports = sneakerModel;
