



import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "../styles/Home.css";

import logo from "../assets/logo.jpg";
import image1 from "../assets/image1.jpg";
import image2 from "../assets/image2.jpg";
import image3 from "../assets/image3.jpg";

const Home = () => {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div>
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-sm fixed-top">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            <img
              src={logo}
              alt="Logo"
              style={{
                height: 40,
                width: 40,
                objectFit: "cover",
                borderRadius: "50%",
                marginRight: 10,
                border: "2px solid white",
                boxShadow: "0 0 5px rgba(0,0,0,0.3)",
              }}
            />
            Bargaining Bazaar
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item"><Link className="nav-link" to="/">Home</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/about">About</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/contact">Contact</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/signup">Sign Up</Link></li>
              <li className="nav-item">
                <button className="nav-link btn btn-link p-0" onClick={handleLoginClick}>
                  Login
                </button>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section
        className="hero-section d-flex align-items-center justify-content-between"
        style={{
          height: "calc(100vh - 56px)",
          padding: 40,
          backgroundColor: "#fff",
          flexWrap: "wrap",
        }}
      >
        <div className="image-area" style={{ flex: 0.35, paddingRight: 30, minWidth: 300 }}>
          <div id="carouselImages" className="carousel slide" data-bs-ride="carousel">
            <div className="carousel-inner">
              <div className="carousel-item active">
                <img src={image1} className="d-block w-100" alt="img1" style={{ borderRadius: 15 }} />
              </div>
              <div className="carousel-item">
                <img src={image2} className="d-block w-100" alt="img2" style={{ borderRadius: 15 }} />
              </div>
              <div className="carousel-item">
                <img src={image3} className="d-block w-100" alt="img3" style={{ borderRadius: 15 }} />
              </div>
            </div>
            <button className="carousel-control-prev" type="button" data-bs-target="#carouselImages" data-bs-slide="prev">
              <span className="carousel-control-prev-icon"></span>
            </button>
            <button className="carousel-control-next" type="button" data-bs-target="#carouselImages" data-bs-slide="next">
              <span className="carousel-control-next-icon"></span>
            </button>
          </div>
        </div>

        <div className="quote-area" style={{ flex: 0.65, minWidth: 300 }}>
          <h1 style={{ fontSize: "2rem", color: "#333" }}>
            “Why settle for the price you see? <br />Bargain your way to better deals!”
          </h1>
          <p style={{ fontSize: "1rem", marginTop: 15, color: "#555" }}>
            Find thousands of products at Bargaining Bazaar where negotiation is the norm and savings are a reward.
          </p>
          <Link to="/product" className="btn btn-primary explore-btn mt-3" style={{ fontSize: "0.8rem", padding: "6px 14px" }}>
            Explore Now →
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
