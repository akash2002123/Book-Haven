import React, { useState, useEffect } from "react";
import { Footer, Navbar } from "../components";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../pages/axiosInstance";

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

const ShowCart = ({
  cartItems,
  handleAddressChange,
  address,
  addressError,
  handleCheckout,
}) => {
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
                    <div
                      key={item.id}
                      className="d-flex justify-content-between align-items-center mb-3"
                    >
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
                      Products ({totalItems})
                      <span>${Math.round(subtotal)}</span>
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
                  <button
                    onClick={handleCheckout}
                    className="btn btn-dark btn-lg btn-block"
                  >
                    Proceed
                  </button>
                  {addressError && (
                    <div className="text-danger mt-2">{addressError}</div>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="row d-flex justify-content-center my-4">
            <div className="col-md-8">
              <div className="card mb-4">
                <div className="card-header py-3">
                  <h5 className="mb-0">Shipping Address</h5>
                </div>
                <div className="card-body">
                  <div className="form-group">
                    <label htmlFor="street">Street</label>
                    <input
                      type="text"
                      className="form-control"
                      id="street"
                      name="street"
                      value={address.street}
                      onChange={handleAddressChange}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="city">City</label>
                    <input
                      type="text"
                      className="form-control"
                      id="city"
                      name="city"
                      value={address.city}
                      onChange={handleAddressChange}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="state">State</label>
                    <input
                      type="text"
                      className="form-control"
                      id="state"
                      name="state"
                      value={address.state}
                      onChange={handleAddressChange}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="zip">Zip Code</label>
                    <input
                      type="text"
                      className="form-control"
                      id="zip"
                      name="zip"
                      value={address.zip}
                      onChange={handleAddressChange}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

const Checkout = () => {
  const [cartItems, setCartItems] = useState([]);
  const [address, setAddress] = useState({
    street: "",
    city: "",
    state: "",
    zip: "",
  });
  const [addressError, setAddressError] = useState("");
  const navigate = useNavigate();

  const fetchCartItems = async () => {
    const userId = parseInt(localStorage.getItem("id"));
    try {
      const response = await axiosInstance.get(`/api/cart/${userId}`);
      setCartItems(response.data);
      console.log("Cart items fetched:", response.data);
    } catch (error) {
      console.error("Error fetching cart items:", error);
    }
  };

  useEffect(() => {
    fetchCartItems();
  }, []);

  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setAddress((prevAddress) => ({
      ...prevAddress,
      [name]: value,
    }));
  };

  const handleCheckout = async () => {
    const userId = parseInt(localStorage.getItem("id"));
    const fullAddress = `${address.street}, ${address.city}, ${address.state}, ${address.zip}`;

    // Validate address fields
    if (!address.street || !address.city || !address.state || !address.zip) {
      setAddressError("All address fields must be filled out.");
      return;
    }

    try {
      const response = await axiosInstance.post("/api/orders/checkout", {
        userId: userId,
        address: fullAddress,
      });
      const orderId = response.data.orderId;
      console.log("Order placed:", response.data);
      localStorage.setItem("orderId", orderId);
      localStorage.setItem("address", fullAddress); // Store order ID in local storage
      navigate("/payment"); // Navigate to the payment page
    } catch (error) {
      console.error("Error placing order:", error);
    }
  };

  return (
    <>
      <Navbar />
      <div className="container my-3 py-3">
        <h1 className="text-center">Checkout</h1>
        <hr />
        {cartItems.length > 0 ? (
          <ShowCart
            cartItems={cartItems}
            handleAddressChange={handleAddressChange}
            address={address}
            addressError={addressError}
            handleCheckout={handleCheckout}
          />
        ) : (
          <EmptyCart />
        )}
      </div>
      <Footer />
    </>
  );
};

export default Checkout;
