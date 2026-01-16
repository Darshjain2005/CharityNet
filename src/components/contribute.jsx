import React from 'react';
import { Home } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import './Contribute.css';

const Contribute = () => {
  const navigate = useNavigate();

  return (
    <div className="contribute-page">
      <header className="contribute-header">
        <div className="logo-section">
          <img src="/logo.png" alt="CharityNet" className="brand-logo" />
        </div>
        <div className="back-nav-container" onClick={() => navigate('/')}>
          <Home className="back-home-icon" size={32} />
          <span className="back-text">Back</span>
        </div>
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
            {/* UPDATED: Points to the Item Selection Page */}
            <Link to="/select-essentials">
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
            {/* UPDATED: Points to the Item Selection Page */}
            <Link to="/select-food">
              <button className="action-button">Support</button>
            </Link>
          </section>
        </div>
      </main>

      <div className="scenery">
        <div className="pole p-left"></div>
        <div className="pole p-right"></div>
        <svg className="sagging-wires" viewBox="0 0 1000 100" preserveAspectRatio="none">
          <path className="wire-path" d="M 0,10 Q 110,40 220,10 M 220,10 Q 500,50 780,10 M 780,10 Q 890,40 1000,10" />
          <path className="wire-path" d="M 0,35 Q 110,65 220,35 M 220,35 Q 500,75 780,35 M 780,35 Q 890,65 1000,35" />
          <path className="wire-path" d="M 0,60 Q 110,90 220,60 M 220,60 Q 500,100 780,60 M 780,60 Q 890,90 1000,60" />
        </svg>
      </div>
    </div>
  );
};

export default Contribute;