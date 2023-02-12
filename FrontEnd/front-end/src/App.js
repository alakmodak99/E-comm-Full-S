import logo from './logo.svg';
import './App.css';
import { Route, Routes } from "react-router-dom";
import AllProducts from './Components/AllProducts';
import NavBar from './Components/NavBar';
import CheckOutPage from './Components/CheckOutPage';
import AllCoupons from './Components/AllCoupons';
import AllOrders from './Components/AllOrders';
function App() {
  return (
    <div className="App">
      <NavBar />
      <Routes>
        <Route path="/" element={<AllProducts />} />
        <Route path="/checkout" element={<CheckOutPage />} />
        <Route path="/coupons" element={<AllCoupons />} />
        <Route path="/allorders" element={<AllOrders/>}/>
      </Routes>
    </div>
  );
}

export default App;
