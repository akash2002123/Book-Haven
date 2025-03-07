import React from "react";
import ReactDOM from "react-dom/client";
import "../node_modules/font-awesome/css/font-awesome.min.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import {
  Home,
  Products,
  AboutPage,
  Books,
  Cart,
  Login,
  Register,
  Checkout,
  PageNotFound,
  Orders,
  AdminPage,
  Payment
} from "./pages";
import ScrollToTop from "./components/ScrollToTop";
import { ToastContainer } from "react-toastify";

const root = ReactDOM.createRoot(document.getElementById("root"));
function App() {
  

  return (
    <BrowserRouter>
      <ScrollToTop>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/product" element={<Products />} />
            <Route path="/books" element={<Books />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/login" element={<Login  />} />
            <Route path="/register" element={<Register />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="*" element={<PageNotFound />} />
            <Route path="/product/*" element={<PageNotFound />} />
            <Route path="/admin" element={<AdminPage />} />
            <Route path="/payment" element={<Payment />} />
          </Routes>
      </ScrollToTop>
      <ToastContainer />
    </BrowserRouter>
  );
}


root.render(<App />);
