import React, {useEffect, useState} from 'react'
import axios from "axios"
import "./AllCoupons.css"
const Url = "https://e-comm-server-1.onrender.com";
const AllCoupons = () => {
    const [data, setData]= useState([])
    const [loader, setLoader]= useState(false)
      const getAllCoupons = () => {
        setLoader(true)
        axios
          .get(`${Url}/coupon`)
          .then((res) => {
            setData(res?.data);
            setLoader(false);
          })
          .catch((err) => {
            console.error(err);
            setLoader(false);
          });
      };
      useEffect(()=>{
        getAllCoupons()
      },[])
      if(loader) return <>Loading...</>
      if(!data?.length) return <>No Coupons Available</>
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