import React from 'react';
import { Footer, Navbar } from "../components";

const AboutPage = () => {
  return (
    <>
      <Navbar />
      <div className="container my-3 py-3">
        <h1 className="text-center display-4">About Us</h1>
        <hr className="my-4" />
        <p className="lead text-left">
          <strong>Welcome to <span className="text-primary">Book Haven</span>!</strong><br /><br />
          At <span className="text-primary">Book Haven</span>, we believe in the magic of books and the power of stories. Our mission is to bring the joy of reading to everyone, everywhere.<br /><br />
          <strong>Who We Are:</strong> We are a team of book enthusiasts dedicated to curating a diverse collection of books across all genres. From timeless classics to the latest bestsellers, we have something for every reader.<br /><br />
          <strong>What We Offer:</strong><br />
          <ul>
            <li><strong>Wide Selection:</strong> Explore fiction, non-fiction, children's books, academic texts, graphic novels, and special editions.</li>
            <li><strong>Easy Search:</strong> Find books by title, author, genre, or ISBN, and purchase with ease.</li>
            <li><strong>Exclusive Deals:</strong> Enjoy special discounts and promotions.</li>
            <li><strong>Community Engagement:</strong> Join our book clubs, author events, and online forums.</li>
          </ul>
          <strong>Our Commitment:</strong> We provide fast shipping, secure payment options, and excellent customer service. Your satisfaction is our top priority.<br /><br />
          Thank you for choosing <span className="text-primary">Book Haven</span>. Happy reading!
        </p>

        <h2 className="text-center py-4">Our Products</h2>
        <div className="row">
          {[
            { title: "Fiction", imgSrc: "https://images.pexels.com/photos/46274/pexels-photo-46274.jpeg?auto=compress&cs=tinysrgb&w=600" },
            { title: "Non-Fiction", imgSrc: "https://images.pexels.com/photos/590493/pexels-photo-590493.jpeg?auto=compress&cs=tinysrgb&w=600&h=600" },
            { title: "Children's Books", imgSrc: "https://images.pexels.com/photos/256541/pexels-photo-256541.jpeg?auto=compress&cs=tinysrgb&w=600" },
            { title: "Graphic Novels", imgSrc: "https://images.pexels.com/photos/1053687/pexels-photo-1053687.jpeg?auto=compress&cs=tinysrgb&w=600" }
          ].map((product, index) => (
            <div key={index} className="col-md-3 col-sm-6 mb-3 d-flex align-items-stretch">
              <div className="card h-100 shadow-sm">
                <img className="card-img-top img-fluid" src={product.imgSrc} alt={product.title} style={{ height: '160px', objectFit: 'cover' }} />
                <div className="card-body">
                  <h5 className="card-title text-center">{product.title}</h5>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
}

export default AboutPage;
