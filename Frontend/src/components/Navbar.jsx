import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

const Navbar = () => {
  const navigate = useNavigate();
  const jwtToken = localStorage.getItem('jwtToken');

  const handleSignOut = () => {
    localStorage.removeItem('jwtToken');
    localStorage.removeItem('id');
    navigate('/login');
    window.location.reload(); // Reload the page
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light py-3 sticky-top">
      <div className="container">
        <NavLink className="navbar-brand fw-bold fs-4 px-2" to="/">
          <i className="fa-solid fa-book mr-2"></i> Book Haven
        </NavLink>
        <button className="navbar-toggler mx-2" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto my-2 text-center">
            <li className="nav-item">
              <NavLink className="nav-link" to="/">Home </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/product">Books</NavLink>
            </li>
            <li className="nav-item">
            <NavLink className="nav-link" to="/orders">Orders</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/about">About</NavLink>
            </li>
          </ul>
          <div className="navbar-nav buttons text-center">
            {jwtToken ? (
              <button className="btn btn-outline-dark m-2" onClick={handleSignOut}><i className="fa fa-sign-out-alt mr-1"></i> Sign Out</button>
            ) : (
              <>
                <NavLink to="/login" className="btn btn-outline-dark m-2"><i className="fa fa-sign-in-alt mr-1"></i> Login</NavLink>
                <NavLink to="/register" className="btn btn-outline-dark m-2"><i className="fa fa-user-plus mr-1"></i> Register</NavLink>
              </>
            )}
            <NavLink to="/cart" className="btn btn-outline-dark m-2"><i className="fa fa-cart-shopping mr-1"></i> Cart </NavLink>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;