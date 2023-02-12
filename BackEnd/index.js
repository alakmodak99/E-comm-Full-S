console.log("index")
const express = require("express")
const app = express()
const cors=require("cors")
const port = process.env.PORT || 8081
const connect = require("./Config/db")
const CartController = require("./Controller/Cart.Controller")
const CouponController= require("./Controller/Coupon.Controller")
const ProductController = require("./Controller/Products.Controller")
app.use(express.json())
app.use(cors())
app.use("/cartItems", CartController)
app.use("/coupon", CouponController);
app.use("/products", ProductController)

app.listen(port, async()=>{
    await connect()
    console.log("App is listenning to the port",  port)
})