import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { auth, rtdb } from '../services/firebase';
import { ref, get } from 'firebase/database';
import { Home, MapPin, Phone, Info } from 'lucide-react';
import ngos from '../ngos.json'; 
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import './DonationDetails.css';

// Fix for Leaflet default marker icons
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';
let DefaultIcon = L.icon({ iconUrl: markerIcon, shadowUrl: markerShadow, iconSize: [25, 41], iconAnchor: [12, 41] });
L.Marker.prototype.options.icon = DefaultIcon;

const DonationDetails = ({ type }) => {
  const [donorLoc, setDonorLoc] = useState(null);
  const [topNgos, setTopNgos] = useState([]);

  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371; 
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
              Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
  };

  useEffect(() => {
    const getData = async () => {
      if (auth.currentUser) {
        // Fetch User Coordinates from Firebase
        const snapshot = await get(ref(rtdb, `users/${auth.currentUser.uid}/Coordinates`));
        if (snapshot.exists()) {
          const { lat, lon } = snapshot.val();
          setDonorLoc({ lat, lon });

          // Rank NGOs by distance
          const ranked = ngos.map(ngo => ({
            ...ngo,
            dist: calculateDistance(lat, lon, ngo.lat, ngo.lon)
          })).sort((a, b) => a.dist - b.dist).slice(0, 3);
          
          setTopNgos(ranked);
        }
      }
    };
    getData();
  }, []);

  return (
    <div className="details-page-wrapper">
      <header className="details-header">
        <div className="logo-section">
          <img src="/logo.png" alt="CharityNet" className="brand-logo" />
        </div>
        <div className="header-title-box">
          <h2>Nearby {type} Recommendations</h2>
        </div>
        <Home className="back-home-icon" onClick={() => window.location.href='/'} size={32} />
      </header>

      <div className="details-main-content">
        {/* NGO list with internal scrolling */}
        <div className="ngo-cards-list">
          {topNgos.map((ngo, i) => (
            <div key={i} className="ngo-suggestion-card">
              <div className="card-top-flex">
                <span className="rank-tag">#{i + 1} Closest</span>
                <span className="distance-badge">{ngo.dist.toFixed(2)} km</span>
              </div>
              
              <h3>{ngo.name}</h3>
              
              <div className="contact-info-block">
                <p><MapPin size={14} /> {ngo.address || "Contact for address"}</p>
                {/* NGO Description Snippet */}
                <p className="ngo-desc-snippet"><Info size={14} /> {ngo.description.substring(0, 80)}...</p>
              </div>

              <div className="card-actions-grid">
                <button className="call-btn" onClick={() => window.open(`tel:${ngo.phone || '9999999999'}`)}>
                  <Phone size={16} /> Call NGO
                </button>
                <button className="confirm-btn">Confirm</button>
              </div>
            </div>
          ))}
        </div>

        <div className="map-view-box">
          {donorLoc && (
            <MapContainer center={[donorLoc.lat, donorLoc.lon]} zoom={12} className="leaflet-map-instance">
              <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
              <Marker position={[donorLoc.lat, donorLoc.lon]}><Popup>You are here</Popup></Marker>
              {topNgos.map((ngo, i) => (
                <Marker key={i} position={[ngo.lat, ngo.lon]}><Popup>{ngo.name}</Popup></Marker>
              ))}
            </MapContainer>
          )}
        </div>
      </div>

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

export default DonationDetails;