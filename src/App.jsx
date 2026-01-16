import React, { useState, useEffect } from 'react';
import { auth, rtdb } from './services/firebase'; 
import { onAuthStateChanged } from 'firebase/auth';
import { ref, onValue } from 'firebase/database';
import './App.css';
import AuthPage from './components/AuthPage';
import Profile from './components/Profile';
import Contribute from './components/contribute';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';

function MainApp() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Standard Firebase Auth Observer
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false); 
    });
    return () => unsubscribe();
  }, []);

  const handleDonateClick = () => {
    if (!user) {
      navigate('/auth');
      return;
    }

    const userRef = ref(rtdb, `users/${user.uid}`);
    onValue(userRef, (snapshot) => {
      const data = snapshot.val() || {};
      const hasName = data["Full Name"]?.trim();
      const hasPhone = data["Phone Number"]?.trim();
      const hasCity = data["City Area"]?.trim();
      const hasLocation = data["Coordinates"]?.lat;

      if (!hasName || !hasPhone || !hasCity || !hasLocation) {
        alert("Essential Details Missing! Please update your Profile first.");
        navigate('/profile'); 
      } else {
        navigate('/contribute');
      }
    }, { onlyOnce: true });
  };

  return (
    <div className="landing-page">
      <nav className="header-nav">
        <div className="logo-wrap">
          <img src="/logo.png" alt="CharityNet" className="pixel-blend-logo" />
        </div>
        <div className="auth-links">
          <span className="nav-item">Contact Us</span>
          
          {/* Use the loading state to prevent flickering */}
          {!loading && (
            user ? (
              <div className="profile-icon-nav" onClick={() => navigate('/profile')}>
                 <div className="avatar-circle"></div>
              </div>
            ) : (
              <span className="login-text login-btn-animate" onClick={() => navigate('/auth')}>
                Login
              </span>
            )
          )}
        </div>
      </nav>

      <main className="main-content">
        <h1 className="main-title">Share What You Have<br />Share When It's Needed</h1>
        <button className="pill-button" onClick={handleDonateClick}>DONATE</button>
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
}

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainApp />} />
        <Route 
          path="/auth" 
          element={<AuthPage onBack={() => window.history.back()} onLoginSuccess={() => window.location.href = '/'} />} 
        />
        <Route 
          path="/profile" 
          element={<Profile onBack={() => window.location.href = '/'} />} 
        />
        <Route path="/contribute" element={<Contribute />} />
      </Routes>
    </Router>
  );
}