const express= require("express")
const route=express.Router()
const Coupon= require("../Models/coupon.model")
const products= require("../Models/Products.model")
var voucher_codes = require("voucher-code-generator");
route.get("/", async(req,res)=>{
    try{
        return res.status(200).send(await Coupon.find());
    }catch(err){
        return res.status(400).send({erorr:true,message:err.message})
    }
} )
route.post("/validateCoupon", async (req, res) => {
  try {
    return res.status(200).send(await Coupon.find({coupon: req.body.coupon}));
  } catch (err) {
    return res.status(400).send({ erorr: true, message: err.message });
  }
});
route.post("/", async(req,res)=>{
    let data = {
      coupon: voucher_codes.generate({
        length: 5,
        count: 1,
      })?.[0],
    };
    return res.status(200).send(await Coupon.create(data))
})
route.patch("/:id", async (req, res) => {
  try {
    return res.status(200).send(
      await Coupon.findOneAndUpdate({ _id: req.params.id }, req.body, {
        new: true,
      })
    );
  } catch (err) {
    return res.status(400).send({ erorr: true, message: err.message });
  }
});
module.exports=route