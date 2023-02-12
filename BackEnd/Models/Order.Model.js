const mongoose = require("mongoose");
const OrderSchema = new mongoose.Schema(
  {
    TotalPrice: { type: Number, required: true },
    DiscountedPrice: { type: Number, required: true },
    EffectivePrice: { type: Number, required: true },
    TotalItems: { type: Number, required: true },
    UsedCoupon: { type: String, default: "No" },
    AllItems: [
      { type: mongoose.Types.ObjectId, ref: "Products", required: true },
    ],
  },
  {
    versionKey: false,
    timestamps: true,
  }
);
module.exports = new mongoose.model("Order", OrderSchema);
