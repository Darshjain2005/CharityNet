import React, { useState } from 'react';
import { auth, signInWithGoogle } from '../services/firebase';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import './AuthPage.css';

const AuthPage = ({ onBack, onLoginSuccess }) => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (isSignUp && password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      if (isSignUp) {
        await createUserWithEmailAndPassword(auth, email, password);
        alert("Account created successfully!");
      } else {
        await signInWithEmailAndPassword(auth, email, password);
      }
      onLoginSuccess(); // Tell App.jsx we are logged in
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="auth-page-container">
      <div className="auth-logo-header">
        <img src="/logo.png" alt="CharityNet" className="auth-logo" />
      </div>

      <div className="auth-card">
        <div className="tab-container">
          <button 
            className={`tab-btn ${!isSignUp ? 'active-gradient' : ''}`}
            onClick={() => setIsSignUp(false)}
          >Sign In</button>
          <button 
            className={`tab-btn ${isSignUp ? 'active-gradient' : ''}`}
            onClick={() => setIsSignUp(true)}
          >Sign Up</button>
        </div>

        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="input-group">
            <input 
              type="email" 
              placeholder="Email ..." 
              required 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="input-group">
            <input 
              type="password" 
              placeholder="Password ..." 
              required 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          {isSignUp && (
            <div className="input-group">
              <input 
                type="password" 
                placeholder="Confirm Password ..." 
                required 
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
          )}
          
          <button type="submit" className="main-auth-btn">
            {isSignUp ? 'Sign Up' : 'Sign In'}
          </button>
        </form>

        <div className="auth-footer">
          <button onClick={async () => { await signInWithGoogle(); onLoginSuccess(); }} className="google-btn">
            Sign In with Google
          </button>
          <button onClick={onBack} className="cancel-link">Cancel</button>
        </div>
      </div>

      {/* Scenery */}
      <div className="scenery">
        {/* The Towers */}
        <div className="pole p-left"></div>
        <div className="pole p-right"></div>
        
        {/* Physics-based Sagging Wires using SVG Paths */}
        <svg className="sagging-wires" viewBox="0 0 1000 100" preserveAspectRatio="none">
          {/* M = Start point, Q = Control point (the "dip" coordinate) */}
          
          {/* WIRE SET 1 (Top) */}
          <path className="wire-path" d="
            M 0,10 Q 110,40 220,10 
            M 220,10 Q 500,50 780,10 
            M 780,10 Q 890,40 1000,10" 
          />
          
          {/* WIRE SET 2 (Middle) */}
          <path className="wire-path" d="
            M 0,35 Q 110,65 220,35 
            M 220,35 Q 500,75 780,35 
            M 780,35 Q 890,65 1000,35" 
          />

          {/* WIRE SET 3 (Bottom) */}
          <path className="wire-path" d="
            M 0,60 Q 110,90 220,60 
            M 220,60 Q 500,100 780,60 
            M 780,60 Q 890,90 1000,60" 
          />
        </svg>
      </div>
    </div>
  );
};

export default AuthPage;