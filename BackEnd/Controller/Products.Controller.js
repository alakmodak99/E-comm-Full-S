const express = require("express");
const route = express.Router();
const products = require("../Models/Products.model");
route.get("/", async (req, res) => {
  try {
    return res.status(200).send(await products.find());
  } catch (err) {
    return res.status(400).send({ erorr: true, message: err.message });
  }
});
route.get("/:id", async (req, res) => {
  try {
    return res.status(200).send(await products.find({_id:req.params.id}));
  } catch (err) {
    return res.status(400).send({ erorr: true, message: err.message });
  }
});
route.post("/", async (req, res) => {
  return res.status(200).send(await products.create(req.body));
});
module.exports = route;
