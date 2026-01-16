import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Home, Plus, Minus, ShoppingBag, Utensils } from 'lucide-react';
import './DonationItems.css';

const DonationItems = ({ type }) => {
  const navigate = useNavigate();
  
  const itemSets = {
    "Community Essentials": ["Stationery", "Footwears", "Cloths", "Books", "Toys", "Dry Groceries", "Animal Treats"],
    "Food For All": ["Cooked Meals", "Bread/Bakery", "Fruits/Veg", "Dairy Products", "Canned Food", "Beverages"]
  };

  const currentItems = itemSets[type] || itemSets["Community Essentials"];
  
  const [quantities, setQuantities] = useState(
    currentItems.reduce((acc, item) => ({ ...acc, [item]: 0 }), {})
  );
  const [otherItems, setOtherItems] = useState("");

  const updateQty = (item, delta) => {
    setQuantities(prev => ({ ...prev, [item]: Math.max(0, prev[item] + delta) }));
  };

  const total = Object.values(quantities).reduce((a, b) => a + b, 0);

  const handleProceed = () => {
    const donationData = {
      category: type,
      items: quantities,
      additionalNotes: otherItems,
      timestamp: new Date().toISOString()
    };
    // Navigates to the map/NGO details page
    navigate(type.includes('Food') ? '/donate-food' : '/donate-essentials', { state: { donationData } });
  };

  return (
    <div className="items-page-wrapper scroll-mode">
      <header className="items-header">
        <div className="logo-section">
          <img src="/logo.png" alt="Logo" className="items-brand-logo" />
        </div>
        <div className="items-nav-right">
          <Home className="nav-icon-home" onClick={() => navigate('/')} size={32} />
        </div>
      </header>

      <main className="items-centered-container">
        <div className="enhanced-selection-card">
          <div className="card-header">
            {type.includes("Food") ? <Utensils size={32} className="header-icon" /> : <ShoppingBag size={32} className="header-icon" />}
            <h1>{type}</h1>
          </div>

          <div className="items-list-area">
            {currentItems.map(item => (
              <div key={item} className="enhanced-item-row">
                <span className="item-name">{item}</span>
                <div className="modern-controls">
                  <button className="ctrl-btn" onClick={() => updateQty(item, -1)}><Minus size={16}/></button>
                  <span className="qty-display">{quantities[item]}</span>
                  <button className="ctrl-btn" onClick={() => updateQty(item, 1)}><Plus size={16}/></button>
                </div>
              </div>
            ))}
          </div>

          <div className="other-items-section">
            <label>Other Items / Special Instructions:</label>
            <textarea 
              placeholder="List any other items here..."
              value={otherItems}
              onChange={(e) => setOtherItems(e.target.value)}
            />
          </div>

          <div className="selection-footer">
            <div className="total-count-text">Total Count: {total}</div>
            <button 
              className="proceed-btn" 
              disabled={total === 0 && !otherItems.trim()}
              onClick={handleProceed}
            >
              CONTINUE TO DONATION
            </button>
          </div>
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

export default DonationItems;