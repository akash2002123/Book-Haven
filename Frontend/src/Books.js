import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SearchBar from './SearchBar';

const BookCard = ({ book }) => {
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = () => {
    console.log(`Added ${quantity} of ${book.title} to cart`);
    toast.success(`Added ${quantity} of ${book.title} to cart`);
  };

  return (
    <div className="col-md-4">
      <div className="card shadow-sm">
        <img src="book-thumbnail.jpg" className="card-img-top" alt="Book Thumbnail" />
        <div className="card-body">
          <p className="card-text">{book.title}</p>
          <p className="card-text">{book.author}</p>
          <p className="card-text">${book.price}</p>
          <div className="d-flex justify-content-between align-items-center">
            <div className="btn-group">
              <button type="button" className="btn btn-sm btn-outline-secondary" onClick={handleAddToCart}>Add to Cart</button>
            </div>
            <div className="quantity-controls">
              <button type="button" className="btn btn-sm btn-outline-secondary" onClick={() => setQuantity(quantity - 1)} disabled={quantity <= 1}>-</button>
              <span className="quantity">{quantity}</span>
              <button type="button" className="btn btn-sm btn-outline-secondary" onClick={() => setQuantity(quantity + 1)}>+</button>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

const Books = ({ books }) => {
  const [filteredBooks, setFilteredBooks] = useState(books);

  const handleSearch = (query) => {
    const filtered = books.filter(book =>
      book.title.toLowerCase().includes(query.toLowerCase()) ||
      book.author.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredBooks(filtered);
  };

  return (
    <div className="container">
      <SearchBar onSearch={handleSearch} />
      <div className="row">
        {filteredBooks.map((book) => (
          <BookCard key={book.id} book={book} />
        ))}
      </div>
    </div>
  );
};

export default Books;