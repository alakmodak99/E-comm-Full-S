import React from 'react'
import { useNavigate } from 'react-router'
import "./NavBar.css"
const NavBar = () => {
    const navigate = useNavigate()
  return (
    <div className="NavbarContainer">
      <div
        onClick={() => {
          navigate("/");
        }}
      >
        All Products
      </div>
      <div
        onClick={() => {
          navigate("/coupons");
        }}
      >
        All Coupons
      </div>
      <div
        onClick={() => {
          navigate("/checkout");
        }}
      >
        CheckOut Page
      </div>
      <div
        onClick={() => {
          navigate("/allorders");
        }}
      >
        All Orders
      </div>
    </div>
  );
}

export default NavBar