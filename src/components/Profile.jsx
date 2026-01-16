import React, { useState, useEffect } from 'react';
import { rtdb, auth } from '../services/firebase';
import { ref, onValue, update } from "firebase/database";
import { Home, LogOut, UserCircle, MapPin } from 'lucide-react';
import './Profile.css';

const Profile = ({ onBack }) => {
  const [userData, setUserData] = useState({});
  const [activeField, setActiveField] = useState(null);
  const [loading, setLoading] = useState(true);

  const fields = [
    "Full Name",
    "Email ID",
    "Phone Number",
    "City Area",
    "User Type",
    "Gender"
  ];

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (!user) {
        setLoading(false);
        onBack();
        return;
      }

      const userRef = ref(rtdb, `users/${user.uid}`);
      onValue(userRef, (snapshot) => {
        const data = snapshot.val() || {};
        setUserData({
          ...data,
          "Email ID": data["Email ID"] || user.email || "",
        });
        setLoading(false);
      });
    });

    return () => unsubscribe();
  }, [onBack]);

  const handleSaveField = async (label, value) => {
    if (!auth.currentUser) return;

    try {
      const userRef = ref(rtdb, `users/${auth.currentUser.uid}`);
      await update(userRef, { [label]: value });
    } catch (err) {
      console.error("Save failed:", err);
    } finally {
      setActiveField(null);
    }
  };

  if (loading) return <div className="loading-screen">Loading Profile...</div>;

  return (
    <div className="profile-page-wrapper">
      <div className="profile-container">

        <div className="nav-header">
          <Home className="icon-button" onClick={onBack} />
          <div className="profile-avatar-wrapper">
            <UserCircle className="avatar-icon" />
          </div>
          <LogOut className="icon-button" onClick={() => auth.signOut()} />
        </div>

        <div className="main-card">
          <div className="grid-layout">
            <div className="column-container">

              {fields.map(label => (
                <div key={label} className="field-container">
                  <p className="field-label">{label}</p>

                  {activeField === label ? (
                    <input
                      autoFocus
                      className="field-input"
                      value={userData[label] || ""}
                      onChange={(e) =>
                        setUserData(prev => ({ ...prev, [label]: e.target.value }))
                      }
                      onBlur={(e) => handleSaveField(label, e.target.value)}
                      onKeyDown={(e) =>
                        e.key === "Enter" && handleSaveField(label, e.target.value)
                      }
                    />
                  ) : (
                    <p
                      className="field-value"
                      onClick={() => setActiveField(label)}
                    >
                      {userData[label] || "Click to edit"}
                    </p>
                  )}
                </div>
              ))}

              <button className="location-btn">
                <MapPin size={16} /> Update Location
              </button>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
