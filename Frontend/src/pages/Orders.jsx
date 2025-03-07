import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import React, { useState, useEffect } from "react";
import axiosInstance from "../pages/axiosInstance";

const Orders = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchOrders = async () => {
            const userId = parseInt(localStorage.getItem('id'));
            try {
                const response = await axiosInstance.get(`/api/orders/user/${userId}`);
                const ordersData = response.data;
                console.log("Fetched orders:", ordersData); // Log the fetched orders

                // Fetch book titles for each order
                const ordersWithTitles = await Promise.all(
                    ordersData.map(async (order) => {
                        const itemsWithTitles = await Promise.all(
                            order.bookIds.map(async (bookId) => {
                                const bookResponse = await axiosInstance.get(`/api/books/${bookId}`);
                                return bookResponse.data.title;
                            })
                        );
                        return { ...order, items: itemsWithTitles };
                    })
                );

                setOrders(ordersWithTitles);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching orders:', error);
                setOrders([]);
                setLoading(false);
            }
        };

        fetchOrders();
    }, []);

    if (loading) {
        return (
            <>
                <Navbar />
                <div className="container my-3 py-3">
                    <h1 className="text-center">Order History</h1>
                    <div className="text-center">Loading...</div>
                </div>
                <Footer />
            </>
        );
    }

    if (orders.length === 0) {
        return (
            <>
                <Navbar />
                <div className="container my-3 py-3">
                    <h1 className="text-center">Order History</h1>
                    <div className="container">
                        <div className="row">
                            <div className="col-md-12 py-5 bg-light text-center">
                                <h4 className="p-3 display-5">No order history found</h4>
                            </div>
                        </div>
                    </div>
                </div>
                <Footer />
            </>
        );
    }

    return (
        <>
            <Navbar />
            <div className="container my-3 py-3">
                <h1 className="text-center">Order History</h1>
            </div>
            <div className="container my-3 py-3">
                <table className="table table-striped table-bordered">
                    <thead className="thead-dark">
                        <tr>
                            <th scope="col">Order ID</th>
                            <th scope="col" style={{ width: '50%' }}>Items</th>
                            <th scope="col" style={{ width: '20%' }}>Delivery Date</th>
                            <th scope="col">Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map(order => (
                            <tr key={order.orderId}>
                                <td>{order.orderId}</td>
                                <td>
                                    {Array.isArray(order.items) ? (
                                        <ul className="list-unstyled">
                                            {order.items.map((item, index) => (
                                                <li key={index}>{item}</li>
                                            ))}
                                        </ul>
                                    ) : 'No items'}
                                </td>
                                <td>{order.deliveryDate || 'No delivery date'}</td>
                                <td>${order.totalAmount.toFixed(2)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <Footer />
        </>
    );
};

export default Orders;