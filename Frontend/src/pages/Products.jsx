import React from 'react';
import { Footer, Navbar } from "../components";
import Books from '../pages/Books';

const Products = () => {
  const pageStyle = {
    backgroundColor: '#808080', // Change this to your desired color
    minHeight: '100vh', // Ensures the background covers the full height of the page
    margin: 0,
    padding: 0,
  };

  return (
    <div style={pageStyle}>
      <Navbar />
      <Books />
      <Footer />
    </div>
  );
}

export default Products;