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
      "https://www.plutosport.fr/media/catalog/product/cache/image/1800x/040ec09b1e35df139433887a97daa66f/N/i/Nike_Air_Max_Vision_GS__5.jpg"
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
