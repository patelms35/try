import React, { useState } from 'react';
import { FaUserCircle, FaUpload, FaSave, FaLock, FaBell } from 'react-icons/fa';
import '../styles/dashboard.css';

const Profile = () => {
  // Tabs state
  const [activeTab, setActiveTab] = useState('personal');

  // Mock user data
  const [userData, setUserData] = useState({
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    phone: '+91 9876543210',
    gender: 'male',
    dob: '1990-01-15',
    city: 'Mumbai',
    state: 'Maharashtra',
    pincode: '400001',
    address: '123 Main Street, Andheri East',
    aadharNo: '1234 5678 9012',
    profileImg: null
  });

  // Notification preferences
  const [notifications, setNotifications] = useState({
    email: true,
    sms: true,
    app: true,
    productUpdates: true,
    bidUpdates: true,
    rewards: true
  });

  // Password change form
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  // Handle input change for user data
  const handleUserDataChange = (e) => {
    const { name, value } = e.target;
    setUserData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle notification toggle
  const handleNotificationToggle = (key) => {
    setNotifications(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  // Handle password input change
  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="profile-container">
      <h1 className="mb-3">Profile & Settings</h1>
      
      {/* Tabs */}
      <div className="tabs">
        <div className="tabs-list">
          <div 
            className={`tab-item ${activeTab === 'personal' ? 'active' : ''}`}
            onClick={() => setActiveTab('personal')}
          >
            Personal Information
          </div>
          <div 
            className={`tab-item ${activeTab === 'password' ? 'active' : ''}`}
            onClick={() => setActiveTab('password')}
          >
            Change Password
          </div>
          <div 
            className={`tab-item ${activeTab === 'notifications' ? 'active' : ''}`}
            onClick={() => setActiveTab('notifications')}
          >
            Notification Preferences
          </div>
        </div>
      </div>
      
      {/* Tab Content */}
      <div className="tab-content">
        {/* Personal Information Tab */}
        {activeTab === 'personal' && (
          <div className="form-card">
            <div className="form-header">
              <h2>Personal Details</h2>
              <p>Update your personal information and address details</p>
            </div>
            
            <form>
              {/* Profile Image */}
              <div className="text-center mb-3">
                {userData.profileImg ? (
                  <img 
                    src={userData.profileImg} 
                    alt="Profile" 
                    style={{ width: '100px', height: '100px', borderRadius: '50%', objectFit: 'cover' }} 
                  />
                ) : (
                  <div 
                    style={{ 
                      width: '100px', 
                      height: '100px', 
                      borderRadius: '50%', 
                      backgroundColor: '#eef1ff', 
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'center',
                      margin: '0 auto' 
                    }}
                  >
                    <FaUserCircle size={60} style={{ color: '#4a6cfa' }} />
                  </div>
                )}
                
                <div className="mt-2">
                  <label className="btn btn-sm btn-outline">
                    <FaUpload style={{ marginRight: '0.5rem' }} />
                    <span>Upload Photo</span>
                    <input type="file" style={{ display: 'none' }} />
                  </label>
                </div>
              </div>
              
              <div className="form-grid">
                {/* First Name */}
                <div className="form-group">
                  <label className="form-label">First Name</label>
                  <input 
                    type="text" 
                    className="form-input" 
                    name="firstName"
                    value={userData.firstName}
                    onChange={handleUserDataChange}
                  />
                </div>
                
                {/* Last Name */}
                <div className="form-group">
                  <label className="form-label">Last Name</label>
                  <input 
                    type="text" 
                    className="form-input" 
                    name="lastName"
                    value={userData.lastName}
                    onChange={handleUserDataChange}
                  />
                </div>
                
                {/* Gender */}
                <div className="form-group">
                  <label className="form-label">Gender</label>
                  <select 
                    className="form-input" 
                    name="gender"
                    value={userData.gender}
                    onChange={handleUserDataChange}
                  >
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                
                {/* Date of Birth */}
                <div className="form-group">
                  <label className="form-label">Date of Birth</label>
                  <input 
                    type="date" 
                    className="form-input" 
                    name="dob"
                    value={userData.dob}
                    onChange={handleUserDataChange}
                  />
                </div>
                
                {/* Email */}
                <div className="form-group">
                  <label className="form-label">Email</label>
                  <div className="input-group">
                    <input 
                      type="email" 
                      className="form-input" 
                      name="email"
                      value={userData.email}
                      onChange={handleUserDataChange}
                    />
                    <div className="input-addon">
                      <button type="button" className="btn btn-sm">Verify</button>
                    </div>
                  </div>
                </div>
                
                {/* Phone */}
                <div className="form-group">
                  <label className="form-label">Phone Number</label>
                  <div className="input-group">
                    <input 
                      type="tel" 
                      className="form-input" 
                      name="phone"
                      value={userData.phone}
                      onChange={handleUserDataChange}
                    />
                    <div className="input-addon">
                      <button type="button" className="btn btn-sm">Verify</button>
                    </div>
                  </div>
                </div>
                
                {/* City */}
                <div className="form-group">
                  <label className="form-label">City</label>
                  <input 
                    type="text" 
                    className="form-input" 
                    name="city"
                    value={userData.city}
                    onChange={handleUserDataChange}
                  />
                </div>
                
                {/* State */}
                <div className="form-group">
                  <label className="form-label">State</label>
                  <input 
                    type="text" 
                    className="form-input" 
                    name="state"
                    value={userData.state}
                    onChange={handleUserDataChange}
                  />
                </div>
                
                {/* Pincode */}
                <div className="form-group">
                  <label className="form-label">Pincode</label>
                  <input 
                    type="text" 
                    className="form-input" 
                    name="pincode"
                    value={userData.pincode}
                    onChange={handleUserDataChange}
                  />
                </div>
                
                {/* Aadhar Number */}
                <div className="form-group">
                  <label className="form-label">Aadhar Number</label>
                  <input 
                    type="text" 
                    className="form-input" 
                    name="aadharNo"
                    value={userData.aadharNo}
                    onChange={handleUserDataChange}
                  />
                </div>
              </div>
              
              {/* Address */}
              <div className="form-group">
                <label className="form-label">Address</label>
                <textarea 
                  className="form-input" 
                  rows="3"
                  name="address"
                  value={userData.address}
                  onChange={handleUserDataChange}
                ></textarea>
              </div>
              
              <div className="text-center mt-3">
                <button type="button" className="btn">
                  <FaSave style={{ marginRight: '0.5rem' }} />
                  <span>Save Changes</span>
                </button>
              </div>
            </form>
          </div>
        )}
        
        {/* Change Password Tab */}
        {activeTab === 'password' && (
          <div className="form-card">
            <div className="form-header">
              <h2>Change Password</h2>
              <p>Update your password to maintain account security</p>
            </div>
            
            <form>
              <div className="form-group">
                <label className="form-label">Current Password</label>
                <input 
                  type="password" 
                  className="form-input" 
                  name="currentPassword"
                  value={passwordData.currentPassword}
                  onChange={handlePasswordChange}
                />
              </div>
              
              <div className="form-group">
                <label className="form-label">New Password</label>
                <input 
                  type="password" 
                  className="form-input" 
                  name="newPassword"
                  value={passwordData.newPassword}
                  onChange={handlePasswordChange}
                />
              </div>
              
              <div className="form-group">
                <label className="form-label">Confirm New Password</label>
                <input 
                  type="password" 
                  className="form-input" 
                  name="confirmPassword"
                  value={passwordData.confirmPassword}
                  onChange={handlePasswordChange}
                />
              </div>
              
              <div className="text-center mt-3">
                <button type="button" className="btn">
                  <FaLock style={{ marginRight: '0.5rem' }} />
                  <span>Update Password</span>
                </button>
              </div>
            </form>
          </div>
        )}
        
        {/* Notification Preferences Tab */}
        {activeTab === 'notifications' && (
          <div className="form-card">
            <div className="form-header">
              <h2>Notification Preferences</h2>
              <p>Manage how you receive notifications</p>
            </div>
            
            <h3 className="mb-2">Notification Channels</h3>
            
            <div className="form-group">
              <div className="flex-between">
                <div>
                  <h4>Email Notifications</h4>
                  <p className="text-secondary">Receive notifications via email</p>
                </div>
                <label className="switch">
                  <input 
                    type="checkbox" 
                    checked={notifications.email}
                    onChange={() => handleNotificationToggle('email')}
                  />
                  <span className="slider round"></span>
                </label>
              </div>
            </div>
            
            <div className="form-group">
              <div className="flex-between">
                <div>
                  <h4>SMS Notifications</h4>
                  <p className="text-secondary">Receive notifications via SMS</p>
                </div>
                <label className="switch">
                  <input 
                    type="checkbox" 
                    checked={notifications.sms}
                    onChange={() => handleNotificationToggle('sms')}
                  />
                  <span className="slider round"></span>
                </label>
              </div>
            </div>
            
            <div className="form-group">
              <div className="flex-between">
                <div>
                  <h4>In-App Notifications</h4>
                  <p className="text-secondary">Receive notifications within the app</p>
                </div>
                <label className="switch">
                  <input 
                    type="checkbox" 
                    checked={notifications.app}
                    onChange={() => handleNotificationToggle('app')}
                  />
                  <span className="slider round"></span>
                </label>
              </div>
            </div>
            
            <h3 className="mb-2 mt-4">Notification Types</h3>
            
            <div className="form-group">
              <div className="flex-between">
                <div>
                  <h4>Product Updates</h4>
                  <p className="text-secondary">Get notified about your product updates</p>
                </div>
                <label className="switch">
                  <input 
                    type="checkbox" 
                    checked={notifications.productUpdates}
                    onChange={() => handleNotificationToggle('productUpdates')}
                  />
                  <span className="slider round"></span>
                </label>
              </div>
            </div>
            
            <div className="form-group">
              <div className="flex-between">
                <div>
                  <h4>Bid Updates</h4>
                  <p className="text-secondary">Get notified about new bids on your products</p>
                </div>
                <label className="switch">
                  <input 
                    type="checkbox" 
                    checked={notifications.bidUpdates}
                    onChange={() => handleNotificationToggle('bidUpdates')}
                  />
                  <span className="slider round"></span>
                </label>
              </div>
            </div>
            
            <div className="form-group">
              <div className="flex-between">
                <div>
                  <h4>Rewards & Promotions</h4>
                  <p className="text-secondary">Get notified about rewards and promotions</p>
                </div>
                <label className="switch">
                  <input 
                    type="checkbox" 
                    checked={notifications.rewards}
                    onChange={() => handleNotificationToggle('rewards')}
                  />
                  <span className="slider round"></span>
                </label>
              </div>
            </div>
            
            <div className="text-center mt-3">
              <button type="button" className="btn">
                <FaBell style={{ marginRight: '0.5rem' }} />
                <span>Save Preferences</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile; 