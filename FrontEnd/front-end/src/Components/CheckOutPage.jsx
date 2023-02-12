import React, { useState, useEffect } from "react";
import "./CheckOut.css";
import axios from "axios";
import { CartItemsIds } from "./utills";
import ProductsData from "./SmallBlocks/ProductsData";
import { totalAmountToPay } from "./utills";
import { useNavigate } from "react-router";
const Url = "https://e-comm-server-1.onrender.com";
const CheckOutPage = () => {
  const [cartData, setCartData] = useState([]);
  const [cartItemIds, setCartItemIds] = useState([]);
  const [validate, setValidate] = useState(false);
  const [orderCount, setOrderCount] = useState(0);
  const [loader, setLoader] = useState(false);
  const [couponValue, setCouponValue] = useState("");
  const [err, setErr] = useState(false);
  const [removed, setRemoved] = useState(false);
  const [usedCoupon, setUsedCoupon] = useState("");
  const [total, setTotal] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
  const [discountAmount, setDiscountAmount] = useState(0);
  const navigate = useNavigate();
  const getCartData = () => {
    setLoader(true);
    axios
      .get(`${Url}/cartItems`)
      .then((res) => {
        setCartItemIds(CartItemsIds(res?.data?.data?.[0]?.product));
        setCartData(res?.data?.data?.[0]?.product);
        setTotal(res?.data?.TotalItems);
        setTotalAmount(totalAmountToPay(res?.data?.data?.[0]?.product));
        setLoader(false);
      })
      .catch((err) => {
        console.error(err);
        setLoader(false);
      });
    
  };
  const getAllOrders = () => {
    setLoader(true);
    axios
      .get(`${Url}/orders`)
      .then((res) => {
        setOrderCount(res?.data?.length);
        setLoader(false);
      })
      .catch((err) => {
        console.error(err);
        setLoader(false);
      });
    
  };
  const valiDateCoupon = () => {
    const payLoad = {
      coupon: couponValue,
    };
    axios
      .post(`${Url}/coupon/validateCoupon`, payLoad)
      .then((res) => {
        if (res?.data?.length && !res?.data?.[0]?.used) {
          setValidate(true);
          setCouponValue("");
          setUsedCoupon(res?.data?.[0]);
          setErr(false);
          setDiscountAmount((totalAmount * 0.1).toFixed(2));
        } else {
          setValidate(false);
          setErr(true);
        }
        setLoader(false);
      })
      .catch((err) => {
        console.error(err);
        setLoader(false);
      });
  };
  const CompleteOrder = () => {
    setLoader(true);
    const data = {
      TotalPrice: totalAmount,
      DiscountedPrice: discountAmount || 0,
      EffectivePrice: totalAmount - discountAmount,
      TotalItems: total,
      UsedCoupon: usedCoupon?.coupon || "No",
      AllItems: cartData,
    };
    axios
      .post(`${Url}/orders`, data)
      .then((res) => {
        if (validate) {
          UpdateCoupon();
        }
        if (orderCount % 2 == 0) {
          getNewCoupon();
        }
        navigate("/");
        setLoader(false);
      })
      .catch((err) => {
        console.error(err);
        setLoader(false);
      });
  };
  const getNewCoupon = () => {
    setLoader(true);
    axios
      .post(`${Url}/coupon`)
      .then((res) => {
        setLoader(false);
        alert("Congratulations!! You have Got a new Coupon");
      })
      .catch((err) => {
        setLoader(false);
        console.error(err);
      });
  };
  const UpdateCoupon = () => {
    setLoader(true);
    axios
      .patch(`${Url}/coupon/${usedCoupon?._id}`, { used: true })
      .then((err) => {
        setLoader(false);
      })
      .catch((err) => {
        console.error(err);
        setLoader(false);
      });
  };
  useEffect(() => {
    getAllOrders();
  }, []);
  useEffect(() => {
    getCartData();
  }, [removed]);
  if (loader) {
    return <div>Loading...</div>;
  }
  if (!cartData?.length) return <>Plesae Add Some Items to the Cart</>;
  return (
    <div>
      <div className="FirstContainer">
        {" "}
        {cartData?.map((e, i) => {
          return (
            <div>
              <ProductsData
                data={e}
                cartIds={cartItemIds}
                addedCart={removed}
                setAddedCart={setRemoved}
              />
            </div>
          );
        })}
      </div>
      <div className="checkOutForm">
        <div>Total No. of Items : {total}</div>
        <p>
          Total Amount To Be Paid :{" "}
          {validate ? (
            <span>
              <s>₹{totalAmount}</s> ₹{totalAmount - totalAmount * 0.1}
            </span>
          ) : (
            <>₹{totalAmount}</>
          )}
        </p>
        <div className="couponCode">
          <label htmlFor="un">Enter Coupon Code</label>
          <input
            value={couponValue}
            disabled={validate}
            onChange={(e) => {
              setCouponValue(e.target.value);
            }}
            type="text"
            placeholder="Enter your Coupon Code"
          />
          <button
            onClick={() => {
              if (!couponValue || validate) return;
              valiDateCoupon();
            }}
            style={{ margin: "auto" }}
            className={`BuyNow ${!couponValue || validate ? "disable" : ""}`}
          >
            {validate ? "Validation Successfull" : "Validate Your Code"}
          </button>
          {err && <div className="errCoupon">*Coupon Code isn't Valid</div>}
        </div>
        <button
          onClick={() => {
            if (couponValue && !validate) return;
            CompleteOrder();
          }}
          style={{ margin: "auto" }}
          className={`BuyNow ${couponValue && !validate ? "disable" : ""}`}
        >
          Complete CheckOut
        </button>
      </div>
    </div>
  );
};

export default CheckOutPage;
