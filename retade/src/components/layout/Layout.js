import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';
import '../../styles/layout.css';

const Layout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="layout">
      <Sidebar isOpen={sidebarOpen} />
      <div className="main-content">
        <Header toggleSidebar={toggleSidebar} />
        <div className="content">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Layout; 