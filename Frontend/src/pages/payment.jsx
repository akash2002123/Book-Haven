import React, { useState, useEffect } from "react";
import { Footer, Navbar } from "../components";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../pages/axiosInstance";
import { toast } from "react-toastify";

const Payment = () => {
  const [cartItems, setCartItems] = useState([]);
  const [paymentMethod, setPaymentMethod] = useState("COD");
  const navigate = useNavigate();

  useEffect(() => {
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

    fetchCartItems();
  }, []);

  const handlePaymentMethodChange = (e) => {
    setPaymentMethod(e.target.value);
  };

  const handlePayment = async () => {
    const orderId = localStorage.getItem('orderId');
    try {
      const response = await axiosInstance.post(`/api/orders/pay/${orderId}`);
      const message = response.data || 'Payment successful!';
      toast.success(message) // Show response message in an alert
      navigate('/'); // Navigate to the receipt page
    } catch (error) {
      console.error('Error making payment:', error);
      alert('Payment failed. Please try again.');
    }
  };

  let subtotal = 0;
  let shipping = 30.0;
  let totalItems = 0;
  cartItems.forEach((item) => {
    subtotal += item.price * item.quantity;
    totalItems += item.quantity;
  });

  return (
    <>
      <Navbar />
      <div className="container my-3 py-3">
        <h1 className="text-center">Payment</h1>
        <hr />
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
                    Shipping<span>${shipping}</span>
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
              </div>
            </div>
          </div>
        </div>
        <div className="row d-flex justify-content-center my-4">
          <div className="col-md-8">
            <div className="card mb-4">
              <div className="card-header py-3">
                <h5 className="mb-0">Payment Method</h5>
              </div>
              <div className="card-body">
                <div className="form-group">
                  <label htmlFor="paymentMethod">Select Payment Method</label>
                  <select
                    id="paymentMethod"
                    className="form-control"
                    value={paymentMethod}
                    onChange={handlePaymentMethodChange}
                  >
                    <option value="COD">Cash on Delivery</option>
                    <option value="Card">Credit/Debit Card</option>
                  </select>
                </div>
                <button
                  onClick={handlePayment}
                  className="btn btn-dark btn-lg btn-block mt-3"
                >
                  Make Payment
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Payment;