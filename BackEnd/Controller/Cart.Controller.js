const express = require("express");
const route = express.Router();
const CartItems = require("../Models/cart.model");
const products = require("../Models/Products.model");
route.get("/", async (req, res) => {
  try {
    let data = await CartItems.find().populate("product");
    return res.status(200).send({ data: data, TotalItems: data[0]?.product?.length || 0});
  } catch (err) {
    return res.status(400).send({ erorr: true, message: err.message });
  }
});
route.post("/", async (req, res) => {
  let data = await CartItems.find();
  let Arr=[]
  if(data.length){
    for(key of data){
        Arr.push(...key.product);
    }
    Arr= [...Arr,req.body.product];
    return res.status(200).send(
      await CartItems.findOneAndUpdate(
        { _id: data[0]._id },
        { product: Arr },
        {
          new: true,
        }
      )
    );
  }
  return res.status(200).send(await CartItems.create(req.body));
});
route.delete("/:id", async (req, res) => {
  try {
    let data = await CartItems.find();
    let Arr = data[0].product;
    Arr = Arr.filter((e) => e != req.params.id);
    return res.status(200).send(
      await CartItems.findOneAndUpdate(
        { _id: data[0]._id },
        { product: Arr },
        {
          new: true,
        }
      )
    );
  } catch (err) {
    return res.status(400).send({ erorr: true, message: err.message });
  }
});
module.exports = route;
