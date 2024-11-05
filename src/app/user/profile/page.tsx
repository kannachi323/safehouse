"use client";
import React, { useState } from 'react';
import './profilepage.css';

interface UserProfile {
  profilePicture: string;
  fullName: string;
  email: string;
  phoneNumber: string;
  address?: string;
}

const initialProfile: UserProfile = {
  profilePicture: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png',
  fullName: '',
  email: '',
  phoneNumber: '',
  address: '',
};

const ProfilePage: React.FC = () => {
  const [profile, setProfile] = useState<UserProfile>(initialProfile);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfile((prevProfile) => ({
      ...prevProfile,
      [name]: value,
    }));
  };

  return (
    <div className="profile-page">
      <button className="back-button" onClick={() => window.history.back()}>Back to Dashboard</button>
      <h2>Profile</h2>
      <div className="profile-picture">
        <img src={profile.profilePicture} width="150" height="150" alt="Profile" />
        <input
          type="file"
          accept="image/*"
          onChange={(e) => {
            if (e.target.files && e.target.files[0]) {
              const fileReader = new FileReader();
              fileReader.onload = (event) => {
                setProfile((prevProfile) => ({
                  ...prevProfile,
                  profilePicture: event.target?.result as string,
                }));
              };
              fileReader.readAsDataURL(e.target.files[0]);
            }
          }}
        />
      </div>

      <div className="personal-details">
        <h3>Personal Details</h3>
        <div className="detail-item">
          <label>Full Name:</label>
          <input
            type="text"
            name="fullName"
            value={profile.fullName}
            onChange={handleInputChange}
          />
        </div>
        <div className="detail-item">
        <label>Email:</label>
          <input
            type="email"
            name="email"
            value={profile.email}
            onChange={handleInputChange}
          />
        </div>
      </div>

      <div className="contact-information">
        <h3>Contact Information</h3>
        <div className="detail-item">
          <label>Phone Number:</label>
          <input
            type="text"
            name="phoneNumber"
            value={profile.phoneNumber}
            onChange={handleInputChange}
          />
        </div>
        <div className="detail-item">
          <label>Address:</label>
          <input
            type="text"
            name="address"
            value={profile.address}
            onChange={handleInputChange}
          />
        </div>
      </div>
      <div className="save">
        <button className="save-button">Save Changes</button>
      </div>
    </div>
  );
};

export default ProfilePage;