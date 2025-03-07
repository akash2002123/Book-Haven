import { useState, useEffect } from "react";
import axiosInstance from "../pages/axiosInstance";
import { toast } from "react-toastify";

const Books = () => {
  const [books, setBooks] = useState([]);

  const fetchBooks = async () => {
    try {
      const response = await axiosInstance.get('/api/books');
      setBooks(response.data);
      console.log("Books fetched:", response.data);
    } catch (error) {
      console.error('Error fetching books:', error);
    }
  };

  const handleAddToCart = (book) => {
    const userId = parseInt(localStorage.getItem('id'));
    console.log("local id", userId);
    console.log(localStorage.getItem('jwtToken'));
    axiosInstance.post('/api/cart', {
      userId: userId,
      bookId: book.id,
      quantity: book.quantity || 1
    })
    .then(response => {
      console.log('Book added to cart:', response.data);
      toast.success(`Book added to cart`);
      // Reset the quantity to 1 after adding to cart
      setBooks((prevBooks) =>
        prevBooks.map((b) =>
          b.id === book.id ? { ...b, quantity: 1 } : b
        )
      );
    })
    .catch(error => {
      console.error('Error adding book to cart:', error);
    });
    console.log(`Added ${book.title} to cart with quantity ${book.quantity || 1}`);
  };

  const handleQuantityChange = (book, quantity) => {
    setBooks((prevBooks) =>
      prevBooks.map((b) =>
        b.id === book.id ? { ...b, quantity: quantity } : b
      )
    );
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  return (
    <div className="container mt-4">
      <div className="row">
        {books.map((book) => (
          <div className="col-md-4 mb-4" key={book.id}>
            <div className="card" style={{ width: '18rem' }}>
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
                <div className="d-flex align-items-center">
                  <button className="btn btn-secondary btn-sm" onClick={() => handleQuantityChange(book, Math.max(1, (book.quantity || 1) - 1))}>-</button>
                  <input type="number"
                    min="1"
                    value={book.quantity || 1}
                    onChange={(e) => handleQuantityChange(book, parseInt(e.target.value))}
                    className="form-control mx-2"
                    style={{ width: '60px', textAlign: 'center' }}
                  />
                  <button className="btn btn-secondary btn-sm" onClick={() => handleQuantityChange(book, (book.quantity || 1) + 1)}>+</button>
                  <button className="btn btn-primary btn-sm ml-2" onClick={() => handleAddToCart(book)}>Add to Cart</button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Books;