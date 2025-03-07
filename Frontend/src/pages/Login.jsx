import { jwtDecode } from "jwt-decode";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Footer, Navbar } from "../components";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  // Clear localStorage when the component mounts
  useEffect(() => {
    localStorage.clear();
  }, []);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const userdata = {
    username: username,
    password: password,
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8085/auth/authenticate",
        userdata
      );
      console.log(response.data);
      localStorage.setItem("jwtToken", response.data.token); // Store the token in local storage
      localStorage.setItem("id", response.data.id); // Store the user id in local storage

      const decodedToken = jwtDecode(response.data.token);
      const userRole = decodedToken.roles;
      
      console.log(userRole); // Assuming the role is stored in the 'roles' field

      if (userRole === "ADMIN") {
        toast.success("Welcome Admin!");
        navigate("/admin");
      } else {
        toast.success("Welcome User!");
        navigate("/");
      }
    } catch (error) {
      console.error("There was an error signing in!", error);
      toast.error("Invalid username or password. Please try again.");
    }
  };

  return (
    <>
      <Navbar />
      <div className="container my-3 py-3">
        <h1 className="text-center">Login</h1>
        <hr />
        <div className="row my-4 h-100">
          <div className="col-md-4 col-lg-4 col-sm-8 mx-auto">
            <form onSubmit={handleSubmit}>
              <div className="my-3">
                <label htmlFor="floatingInput">User Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="floatingInput"
                  placeholder="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div className="my-3">
                <label htmlFor="floatingPassword">Password</label>
                <input
                  type="password"
                  className="form-control"
                  id="floatingPassword"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="my-3">
                <p>
                  New Here?{" "}
                  <Link
                    to="/register"
                    className="text-decoration-underline text-info"
                  >
                    Register
                  </Link>
                </p>
              </div>
              <div className="text-center">
                <button className="my-2 mx-auto btn btn-dark" type="submit">
                  Login
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Login;
