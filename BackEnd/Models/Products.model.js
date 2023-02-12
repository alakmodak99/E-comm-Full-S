const mongoose = require("mongoose");
const ProductsSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    image: {
      type: String,
      default:
        "https://cdn.pixabay.com/photo/2017/06/20/01/35/men-2421454_1280.png",
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);
module.exports = new mongoose.model("Products", ProductsSchema);
