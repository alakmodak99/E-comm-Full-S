import React, {useEffect, useState} from 'react'
import axios from "axios"
import "./AllCoupons.css"
const Url = "http://localhost:8081";
const AllCoupons = () => {
    const [data, setData]= useState([])
      const getAllCoupons = () => {
        axios
          .get(`${Url}/coupon`)
          .then((res) => {
            setData(res?.data);
          })
          .catch((err) => {
            console.error(err);
          });
      };
      useEffect(()=>{
        getAllCoupons()
      },[])
  return (
    <div className='contCoupons'>
        {
            data?.map((e,i)=>{
                return (
                  <div
                    className={
                      e?.used ? "couponsContainer red" : "couponsContainer green"
                    }
                  >
                    {e?.coupon}
                  </div>
                );
            })
        }
    </div>
  )
}

export default AllCoupons