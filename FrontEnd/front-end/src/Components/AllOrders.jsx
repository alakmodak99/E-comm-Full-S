import React, { useEffect, useState } from 'react'
import axios from "axios"
import "./AllOrders.css";
const Url = "https://e-comm-server-1.onrender.com";
const AllOrders = () => {
    const [data, setData]= useState([]);
    const [loader, setLoader]= useState(false)
      const getAllOrders = () => {
        setLoader(true)
        axios
          .get(`${Url}/orders`)
          .then((res) => {
            setData(res?.data);
            setLoader(false)
          })
          .catch((err) => {
            console.error(err);
            setLoader(false);
          });
      };
      useEffect(()=>{
        getAllOrders()
      },[])
      if(loader) return <>Loading...</>
  return (
    <div>
      <b>No. of Orders : </b>
      {data?.length}
      {data?.map((e, i) => {
        return (
          <div>
            <p>{i + 1}</p>
            <div className="text">
              <p>
                <b>No. of Items :</b> {e?.AllItems.length}
              </p>
              <p>
                <b>Total Price :</b> {e?.TotalPrice}
              </p>
              <p>
                <b>Coupon Used :</b> {e?.UsedCoupon}
              </p>
              <p>
                <b>Discount :</b> {e?.DiscountedPrice}
              </p>
              <p>
                <b>Effective Price :</b> {e?.EffectivePrice}
              </p>
              <p></p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default AllOrders