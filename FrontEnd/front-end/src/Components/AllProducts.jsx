import React, { useEffect, useState } from "react";
import axios from "axios";
import "./AllProducts.css"
import ProductsData from "./SmallBlocks/ProductsData";
import { CartItemsIds } from "./utills";
const Url = "http://localhost:8081";
const AllProducts = () => {
  const [data, setData] = useState([]);
  const [cartItems, setCartItems]= useState([]);
  const [addedtoCart, setAddedToCart] = useState(false)
      const getCartData = () => {
        axios
          .get(`${Url}/cartItems`)
          .then((res) => {
            setCartItems(CartItemsIds(res?.data?.data?.[0].product));
            // console.log(, "cart");
          })
          .catch((err) => {
            console.error(err);
          });
      };
      useEffect(()=>{
        getCartData();
      },[addedtoCart])
  const getData = () => {
    axios
      .get(`${Url}/products`)
      .then((res) => {
        setData(res?.data);
      })
      .catch((err) => {
        console.error(err);
      });
  };
  useEffect(() => {
    getData();
  }, []);
  return (
    <div className="FirstContainer">
      {data?.map((e, i) => {
        return (
          <div>
            <ProductsData
              data={e}
              cartIds={cartItems}
              addedCart={addedtoCart}
              setAddedCart={setAddedToCart}
            />
          </div>
        );
      })}
    </div>
  );
};

export default AllProducts;
