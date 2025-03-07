import React, { useState, useEffect } from "react";
import { Footer, Navbar } from "../components";
import { Link } from "react-router-dom";
import axiosInstance from "../pages/axiosInstance";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);

  const fetchCartItems = async () => {
    const userId = parseInt(localStorage.getItem('id'));
    try {
      const response = await axiosInstance.get(`/api/cart/${userId}`);
      setCartItems(response.data);
      console.log("Cart items fetched:", response.data);
    } catch (error) {
      console.error('Error fetching cart items:', error);
    }
  };

  useEffect(() => {
    fetchCartItems();
  }, []);

  const handleDeleteItem = async (itemId) => {
    try {
      await axiosInstance.delete(`/api/cart/${itemId}`);
      setCartItems(prevItems => prevItems.filter(item => item.id !== itemId));
      console.log(`Item with id ${itemId} deleted`);
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  };

  const EmptyCart = () => {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-12 py-5 bg-light text-center">
            <h4 className="p-3 display-5">Your Cart is Empty</h4>
            <Link to="/" className="btn btn-outline-dark mx-4">
              <i className="fa fa-arrow-left"></i> Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  };

  const ShowCart = () => {
    let subtotal = 0;
    let shipping = 30.0;
    let totalItems = 0;
    cartItems.forEach((item) => {
      subtotal += item.price * item.quantity;
      totalItems += item.quantity;
    });

    return (
      <>
        <section className="h-100 gradient-custom">
          <div className="container py-5">
            <div className="row d-flex justify-content-center my-4">
              <div className="col-md-8">
                <div className="card mb-4">
                  <div className="card-header py-3">
                    <h5 className="mb-0">Item List</h5>
                  </div>
                  <div className="card-body">
                    {cartItems.map((item) => (
                      <div key={item.id} className="d-flex justify-content-between align-items-center mb-3">
                        <div>
                          <h6 className="mb-0">{item.bookName}</h6>
                          <small className="text-muted">{item.author}</small>
                        </div>
                        <div>
                          <span>${item.price}</span>
                          <span> x {item.quantity}</span>
                        </div>
                        <button className="btn btn-danger btn-sm" onClick={() => handleDeleteItem(item.id)}>
                          <i className="fa fa-trash"></i> Delete
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="card mb-4">
                  <div className="card-header py-3 bg-light">
                    <h5 className="mb-0">Order Summary</h5>
                  </div>
                  <div className="card-body">
                    <ul className="list-group list-group-flush">
                      <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 pb-0">
                        Products ({totalItems})<span>${Math.round(subtotal)}</span>
                      </li>
                      <li className="list-group-item d-flex justify-content-between align-items-center px-0">
                        Shipping
                        <span>${shipping}</span>
                      </li>
                      <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 mb-3">
                        <div>
                          <strong>Total amount</strong>
                        </div>
                        <span>
                          <strong>${Math.round(subtotal + shipping)}</strong>
                        </span>
                      </li>
                    </ul>

                    <Link
                      to="/Checkout"
                      className="btn btn-dark btn-lg btn-block"
                    >
                      Go to checkout
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </>
    );
  };

  return (
    <>
      <Navbar />
      <div className="container my-3 py-3">
        <h1 className="text-center">Cart</h1>
        <hr />
        {cartItems.length > 0 ? <ShowCart /> : <EmptyCart />}
      </div>
      <Footer />
    </>
  );
};

export default Cart;  