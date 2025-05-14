import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { FaHome, FaUser, FaGift, FaHistory, FaPlus, FaLayerGroup, FaCalculator } from 'react-icons/fa';

const Sidebar = ({ isOpen }) => {
  return (
    <div className={`sidebar ${isOpen ? 'show' : ''}`}>
      <div className="sidebar-header">
        <Link to="/" className="logo">Retade</Link>
      </div>
      <div className="sidebar-content">
        <ul className="sidebar-menu">
          <li>
            <NavLink to="/" className="sidebar-link" end>
              <FaHome />
              <span>Dashboard</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/profile" className="sidebar-link">
              <FaUser />
              <span>Profile & Settings</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/reward-points" className="sidebar-link">
              <FaGift />
              <span>Reward Points</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/history" className="sidebar-link">
              <FaHistory />
              <span>Product History</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/estimate-price" className="sidebar-link">
              <FaCalculator />
              <span>Price Estimation</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/my-listings" className="sidebar-link">
              <FaLayerGroup />
              <span>My Listings</span>
            </NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar; 