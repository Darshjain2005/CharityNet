import React from 'react';
import { UserCircle } from 'lucide-react';
import { Link } from 'react-router-dom'; // Import Link for redirection
import './Contribute.css';

const Contribute = () => {
  return (
    <div className="contribute-page">
      {/* Scenery Section */}
      <div className="scenery-container">
        <div className="scenery-post left-post"></div>
        <div className="scenery-post right-post"></div>
        <div className="horizon-glow"></div>
      </div>

      <header className="contribute-header">
        <div className="logo-section">
          <img src="/logo.png" alt="CharityNet" className="brand-logo" />
          {/* <span className="brand-name">CharityNet</span> */}
        </div>
        <UserCircle className="user-nav-icon" />
      </header>

      <main className="selection-container">
        <div className="cards-wrapper">
          
          {/* Left Side: Community Essentials */}
          <section className="selection-card">
            <h2 className="card-title">Community Essentials</h2>
            <div className="circle-image-container">
              <img src="/1.png" alt="Essentials" className="card-illustration" />
            </div>
            <p className="card-description">
              Donate groceries, clothes, books, and daily essentials. 
              These items have a long shelf life and support families in need.
            </p>
            {/* Redirects to essentials form */}
            <Link to="/donate-essentials">
              <button className="action-button">Contribute</button>
            </Link>
          </section>

          <div className="vertical-line"></div>

          {/* Right Side: Food For All */}
          <section className="selection-card">
            <h2 className="card-title">Food For All</h2>
            <div className="circle-image-container">
              <img src="/2.png" alt="Food" className="card-illustration" />
            </div>
            <p className="card-description">
              Help rescue safe, untouched leftover food. 
              Crucial for immediate hunger relief as these items expire quickly.
            </p>
            {/* Redirects to food form with Geolocation */}
            <Link to="/donate-food">
              <button className="action-button">Support</button>
            </Link>
          </section>

        </div>
      </main>
    </div>
  );
};

export default Contribute;