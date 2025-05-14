import React, { useState } from 'react';
import { FaBars, FaUserCircle, FaCog, FaSignOutAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Header = ({ toggleSidebar }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  
  // Mock user data
  const user = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    profileImg: null // For demo purposes, we'll use a fallback icon
  };

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  return (
    <header className="header">
      <div className="mobile-toggle" onClick={toggleSidebar}>
        <FaBars />
      </div>
      
      <div className="user-profile" onClick={toggleDropdown}>
        {user.profileImg ? (
          <img src={user.profileImg} alt={user.name} className="profile-img" />
        ) : (
          <FaUserCircle size={32} style={{ marginRight: '8px', color: '#4a6cfa' }} />
        )}
        <span className="profile-name">{user.name}</span>
        
        <div className={`dropdown-menu ${showDropdown ? 'show' : ''}`}>
          <Link to="/profile" className="dropdown-item">
            <FaUserCircle />
            <span>My Profile</span>
          </Link>
          <Link to="/profile" className="dropdown-item">
            <FaCog />
            <span>Settings</span>
          </Link>
          <Link to="/logout" className="dropdown-item">
            <FaSignOutAlt />
            <span>Logout</span>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header; 