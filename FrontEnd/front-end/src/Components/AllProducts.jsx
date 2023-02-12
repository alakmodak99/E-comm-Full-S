import React, { useEffect, useState } from "react";
import axios from "axios";
import "./AllProducts.css"
import ProductsData from "./SmallBlocks/ProductsData";
import { CartItemsIds } from "./utills";
const Url = "https://e-comm-server-1.onrender.com";
const AllProducts = () => {
  const [data, setData] = useState([]);
  const [loader, setLoader]= useState(false)
  const [cartItems, setCartItems]= useState([]);
  const [addedtoCart, setAddedToCart] = useState(false);
      const getCartData = () => {
        setLoader(true)
        axios
          .get(`${Url}/cartItems`)
          .then((res) => {
            setCartItems(CartItemsIds(res?.data?.data?.[0]?.product));
            setLoader(false);
          })
          .catch((err) => {
            console.error(err);
            setLoader(false);
          });
          
      };
      useEffect(()=>{
        getCartData();
      },[addedtoCart])
  const getData = () => {
    setLoader(true);
    axios
      .get(`${Url}/products`)
      .then((res) => {
        setData(res?.data);
        setLoader(false);
      })
      .catch((err) => {
        console.error(err);
        setLoader(false);
      });
  };
  useEffect(() => {
    getData();
  }, []);
    if (loader) {
      return <div>Loading...</div>;
    }
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
