const mongoose = require("mongoose");
const CartSchema = new mongoose.Schema(
  {
    product: [{ type: mongoose.Types.ObjectId, ref: "Products", required: true }],
  },
  {
    versionKey: false,
    timestamps: true,
  }
);
module.exports = new mongoose.model("CartItems", CartSchema);
