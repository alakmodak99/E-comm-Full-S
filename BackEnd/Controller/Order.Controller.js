const express = require("express");
const route = express.Router();
const Orders = require("../Models/Order.Model");
const CartItems = require("../Models/cart.model");
route.get("/", async (req, res) => {
  try {
    return res.status(200).send(await Orders.find().populate("AllItems"));
  } catch (err) {
    return res.status(400).send({ erorr: true, message: err.message });
  }
});
route.post("/", async (req, res) => {
    let data = await CartItems.find();
    await CartItems.findOneAndDelete({ _id: data?.[0]?._id });
  return res.status(200).send(await Orders.create(req.body));
});
module.exports = route;
