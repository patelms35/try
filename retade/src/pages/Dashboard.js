import React from 'react';
import { Link } from 'react-router-dom';
import { FaBox, FaMoneyBillWave, FaTrophy, FaArrowRight, FaPencilAlt, 
         FaArrowUp, FaArrowDown, FaUserCircle } from 'react-icons/fa';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import '../styles/dashboard.css';

const Dashboard = () => {
  // Mock data
  const userData = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+91 9876543210',
    profileImg: null,
    tokens: 250,
    rewardPoints: 750,
    productsPosted: 12,
    productsSold: 8
  };

  const leaderboardData = [
    { id: 1, name: 'Sarah Johnson', points: 1250, img: null },
    { id: 2, name: 'Michael Brown', points: 980, img: null },
    { id: 3, name: 'Emily Davis', points: 870, img: null },
    { id: 4, name: 'John Doe', points: 750, img: null },
    { id: 5, name: 'Robert Wilson', points: 620, img: null }
  ];

  // Pie chart data
  const pieChartData = [
    { name: 'Completed Sales', value: 47, color: '#10b981' },
    { name: 'Pending Orders', value: 32, color: '#f59e0b' },
    { name: 'Active Listings', value: 21, color: '#4a6cfa' }
  ];

  return (
    <div className="dashboard-container">
      <h1 className="mb-3">Dashboard</h1>
      
      <div className="dashboard-cards">
        <div className="stat-card">
          <div className="stat-icon blue">
            <FaBox />
          </div>
          <div className="stat-value">{userData.productsPosted}</div>
          <div className="stat-label">Products Posted</div>
          <div className="stat-percentage up">
            <FaArrowUp />
            <span>15% from last month</span>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="stat-icon green">
            <FaMoneyBillWave />
          </div>
          <div className="stat-value">{userData.productsSold}</div>
          <div className="stat-label">Products Sold</div>
          <div className="stat-percentage up">
            <FaArrowUp />
            <span>8% from last month</span>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="stat-icon yellow">
            <FaTrophy />
          </div>
          <div className="stat-value">{userData.tokens}</div>
          <div className="stat-label">Token Count</div>
          <div className="stat-percentage down">
            <FaArrowDown />
            <span>3% from last month</span>
          </div>
        </div>
      </div>
      
      {/* Pie Chart Section */}
      <div className="pie-chart-section" style={{ width: '598px', height: '430px', margin: '2rem auto' }}>
        <div className="chart-card" style={{ width: '100%', height: '100%' }}>
          <div className="chart-header">
            <h3>Sales Status Overview</h3>
          </div>
          <div style={{ width: '100%', height: '350px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieChartData}
                  cx="50%"
                  cy="50%"
                  outerRadius={120}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {pieChartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => [`${value}%`, 'Percentage']} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
      
      <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
        {/* User Info Card */}
        <div className="user-info-card">
          <div className="user-card-header">
            {userData.profileImg ? (
              <img src={userData.profileImg} alt={userData.name} className="user-card-img" />
            ) : (
              <div className="user-card-img flex-center" style={{ backgroundColor: '#eef1ff' }}>
                <FaUserCircle size={40} style={{ color: '#4a6cfa' }} />
              </div>
            )}
            <div className="user-card-info">
              <h3>{userData.name}</h3>
              <p>{userData.email}</p>
              <p>{userData.phone}</p>
              <div className="user-card-actions">
                <Link to="/profile" className="user-edit-link">
                  <FaPencilAlt />
                  <span>Edit Profile</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
        
        {/* Reward Points Section */}
        <div className="reward-points-section">
          <div className="reward-points-header">
            <h3>Reward Points</h3>
            <Link to="/reward-points" className="btn btn-sm">View All</Link>
          </div>
          <div className="reward-points-value">
            <h3>{userData.rewardPoints}</h3>
            <p>Available Points</p>
          </div>
          <p className="mb-2">You can redeem these points for coupons and scratch cards!</p>
          <Link to="/reward-points" className="btn">
            <span>Redeem Points</span>
            <FaArrowRight style={{ marginLeft: '0.5rem' }} />
          </Link>
        </div>
        
        {/* Leaderboard Section */}
        <div className="leaderboard">
          <div className="leaderboard-header">
            <h3>Leaderboard</h3>
            <Link to="/leaderboard" className="btn btn-sm btn-outline">View All</Link>
          </div>
          
          {leaderboardData.map((user, index) => (
            <div key={user.id} className="leaderboard-item">
              <div className="leaderboard-rank">{index + 1}</div>
              <div className="leaderboard-user">
                {user.img ? (
                  <img src={user.img} alt={user.name} className="leaderboard-img" />
                ) : (
                  <div className="leaderboard-img flex-center" style={{ backgroundColor: '#eef1ff' }}>
                    <FaUserCircle size={20} style={{ color: '#4a6cfa' }} />
                  </div>
                )}
                <div className="leaderboard-name">{user.name}</div>
              </div>
              <div className="leaderboard-points">{user.points} pts</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard; 