import React, { useState } from 'react';
import { Footer, Navbar } from "../components";
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Register = () => {
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState(''); // New state for confirm password
    const [roles] = useState('user'); // Default role set to 'user'
    const [errorMessage, setErrorMessage] = useState('');
    const [passwordMatchError, setPasswordMatchError] = useState(''); // New state for password match error

    const userData = {
        name: name,
        email: email,
        password: password,
        roles: roles,
    }

    const validatePassword = (password) => {
        const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,12}$/;
        return passwordRegex.test(password);
    }

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
        if (confirmPassword && e.target.value !== confirmPassword) {
            setPasswordMatchError('Passwords do not match');
        } else {
            setPasswordMatchError('');
        }
    }

    const handleConfirmPasswordChange = (e) => {
        setConfirmPassword(e.target.value);
        if (password && e.target.value !== password) {
            setPasswordMatchError('Passwords do not match');
        } else {
            setPasswordMatchError('');
        }
    }
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!name || !email || !password || !confirmPassword) { // Added confirmPassword check
            setErrorMessage('All fields are required!');
            return;
        }
        if (!validatePassword(password)) {
            setErrorMessage('Password must be 8-12 characters long, contain at least one uppercase letter, one special character, and one number.');
            return;
        }
        if (password !== confirmPassword) {
            setErrorMessage('Passwords do not match!');
            return;
        }
        try {
            const response = await axios.post('http://localhost:8085/auth/new', userData);
            console.log("Response:", response.data);
            if(response.data === 'This UserName is Already Registered.') {
                toast.error(`${response.data}`);
            } else {
                toast.success('Registration successful!');
                navigate('/login');
            }
        } catch (error) {
            console.error('Error response:', error.response);
            console.error('Error message:', error.message);
            toast.error('There was an error signing up!');
        }
    };

    return (
        <>
            <Navbar />
            <div className="container my-3 py-3">
                <h1 className="text-center">Register</h1>
                <hr />
                <div className="row my-4 h-100">
                    <div className="col-md-4 col-lg-4 col-sm-8 mx-auto">
                        <form onSubmit={handleSubmit}>
                            <div className="form my-3">
                                <label htmlFor="Name">Full Name</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="Name"
                                    placeholder="Enter Your Name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="form my-3">
                                <label htmlFor="Email">Email address</label>
                                <input
                                    type="email"
                                    className="form-control"
                                    id="Email"
                                    placeholder="name@example.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="form my-3">
                                <label htmlFor="Password">Password</label>
                                <input
                                    type="password"
                                    className="form-control"
                                    id="Password"
                                    placeholder="Password"
                                    value={password}
                                    onChange={handlePasswordChange}
                                    required
                                />
                            </div>
                            <div className="form my-3">
                                <label htmlFor="ConfirmPassword">Confirm Password</label>
                                <input
                                    type="password"
                                    className="form-control"
                                    id="ConfirmPassword"
                                    placeholder="Confirm Password"
                                    value={confirmPassword}
                                    onChange={handleConfirmPasswordChange}
                                    required
                                />
                                {passwordMatchError && <div className="text-danger mt-2">{passwordMatchError}</div>}
                            </div>
                            {errorMessage && <div className="text-danger mt-2">{errorMessage}</div>}
                            <div className="my-3">
                                <p>Already have an account? <Link to="/login" className="text-decoration-underline text-info">Login</Link></p>
                            </div>
                            <div className="text-center">
                                <button className="my-2 mx-auto btn btn-dark" type="submit">
                                    Register
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}

export default Register;