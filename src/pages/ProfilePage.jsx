import React from "react";
import { useAuth } from "../context/AuthContext";
import "../styles/utilities.css";

function ProfilePage() {
  const { user } = useAuth();

  return (
    <div className="profile-container">
      <div className="profile-card glass-effect">
        <h2>👤 Your Profile</h2>

        <p>
          <strong>Email:</strong> {user?.email}
        </p>

        <p>
          <strong>Member Since:</strong> 2025
        </p>
      </div>
    </div>
  );
}

export default ProfilePage;
