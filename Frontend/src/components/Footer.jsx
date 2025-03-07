import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <>
      <footer className="mt-auto text-center">
        <div className="d-flex align-items-center justify-content-center pb-5">
          <div className="col-md-6">
              <Link className="text-dark fs-4" to="https://github.com/akash2002123" target="_blank" rel="noreferrer">
              <i className="fa-brands fa-github"></i>
            </Link>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
