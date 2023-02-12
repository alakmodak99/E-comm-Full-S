const mongoose = require("mongoose");
const CouponSchema = new mongoose.Schema(
  {
    coupon: { type: String, required: true },
    used: { type: Boolean, default: false },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);
module.exports = new mongoose.model("Coupon", CouponSchema);
