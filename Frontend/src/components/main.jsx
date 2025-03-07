import React from "react";

const Home = () => {
  return (
    <>
      <div className="hero border-1 pb-3">
        <div className="card bg-dark text-white border-0 mx-3">
          <img
            className="card-img img-fluid"
            src="./assets/main.png.jpg"
            alt="Card"
            height={500}
          />
          <div className="card-img-overlay d-flex align-items-center justify-content-center text-center">
            <div className="container">
              <h3 className="card-title fs-1 text fw-bold" style={{ fontFamily: 'Georgia, serif', letterSpacing: '2px' }}>MEET YOUR BOOK</h3>
              <p className="card-text fs-5 d-none d-sm-block" style={{ fontStyle: 'italic', fontFamily: 'Times New Roman, serif', marginTop: '20px', fontWeight: 'bold' }}>
                “To learn to read is to light a fire; every syllable that is spelled out is a spark.” — Victor Hugo
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
