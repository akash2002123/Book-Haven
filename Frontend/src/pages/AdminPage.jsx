import React, { useState, useEffect } from "react";
import { Footer, Navbar } from "../components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import axiosInstance from "../pages/axiosInstance";

const AdminPage = () => {
  const [books, setBooks] = useState([]);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [genre, setGenre] = useState("");
  const [price, setPrice] = useState("");

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axiosInstance.get("/api/books");
        setBooks(response.data);
      } catch (error) {
        console.error("Error fetching books:", error);
      }
    };

    fetchBooks();
  }, []);

  const addBook = async () => {
    if (!title || !author || !genre || !price) {
      alert("All fields should be filled");
      return;
    }

    const newBook = { title, author, genre, price };

    try {
      const response = await axiosInstance.post("/api/books", newBook);
      setBooks([...books, response.data]);
      setTitle("");
      setAuthor("");
      setGenre("");
      setPrice("");
    } catch (error) {
      console.error("Error adding book:", error);
    }
  };

  const deleteBook = async (id) => {
    try {
      await axiosInstance.delete(`/api/books/${id}`);
      setBooks(books.filter((book) => book.id !== id));
    } catch (error) {
      console.error("Error deleting book:", error);
    }
  };
  return (
    <>
      <Navbar />
      <div className="admin-page container mt-5">
        <h1 className="text-center mb-4">Admin Page</h1>
        <div
          className="form-container mb-4 p-4 border rounded"
          style={{ backgroundColor: "#f8f9fa" }}
        >
          <h4 className="mb-3">Add a New Book</h4>
          <div className="form-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Book Title"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="form-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Author"
              required
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
            />
          </div>
          <div className="form-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Genre"
              required
              value={genre}
              onChange={(e) => setGenre(e.target.value)}
            />
          </div>
          <div className="form-group mb-3">
            <input
              type="number"
              className="form-control"
              placeholder="Price"
              required
              onInvalid={(e) =>
                e.target.setCustomValidity("This field should be filled")
              }
              onInput={(e) => e.target.setCustomValidity("")}
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>
          <button className="btn btn-primary" onClick={addBook}>
            Add Book
          </button>
        </div>
        <div className="container mt-4">
          <div className="row">
            {books.map((book) => (
              <div className="col-md-4 mb-4" key={book.id}>
                <div className="card" style={{ width: "18rem" }}>
                  <div className="card-body">
                    <h5 className="card-title">{book.title}</h5>
                    <p className="card-text">{book.description}</p>
                  </div>
                  <ul className="list-group list-group-flush">
                    <li className="list-group-item">Author: {book.author}</li>
                    <li className="list-group-item">Genre: {book.genre}</li>
                    <li className="list-group-item">Price: ${book.price}</li>
                  </ul>
                  <div className="card-body">
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => deleteBook(book.id)}
                    >
                      <FontAwesomeIcon icon={faTrash} /> Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default AdminPage;
