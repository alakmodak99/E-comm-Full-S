import React, { useEffect } from 'react'
import "./ProductsData.css"
import axios from "axios"
const Url = "http://localhost:8081";
const ProductsData = ({ data, cartIds, addedCart, setAddedCart }) => {
  const isAddedToTheCart = cartIds.includes(data?._id);
  const AddToCart = (id) => {
    const payLoad = {
        product:[id]
    };
    axios.post(`${Url}/cartItems`, payLoad).then(res=>{
      setAddedCart(!addedCart);
    }).catch(err=>{
        console.error(err)
    })
  };
    const RemoveFromCart = (id) => {
      axios
        .delete(`${Url}/cartItems/${id}`)
        .then((res) => {
          setAddedCart(!addedCart);
        })
        .catch((err) => {
          console.error(err);
        });
    };
  return (
    <div className="Container">
      <img src={data?.image} alt="" />
      <div className="textContainer">
        <p>
          <b>Product Title</b> : {data?.title}
        </p>
        <div>
          <b>Product Description</b> : <br /> {data?.description}
        </div>
        <p>
          <b>Price</b> : <b className="price">₹{data?.price}</b>
        </p>
      </div>
      {}
      <div>
        {isAddedToTheCart ? (
          <div className="AddedToCart">
            <div>Added To The Cart</div> <br />
            <button
              onClick={() => {
                RemoveFromCart(data?._id)
              }}
              className="RemoveCart"
            >
              Remove
            </button>
          </div>
        ) : (
          <>
            <button
              onClick={() => {
                AddToCart(data?._id)
              }}
              className="Cart"
            >
              Add To Cart
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default ProductsData