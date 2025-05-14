import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import RewardPoints from './pages/RewardPoints';
import History from './pages/History';
import PriceEstimation from './pages/PriceEstimation';
import MyListings from './pages/MyListings';
import ProductDetail from './pages/ProductDetail';
import './styles/index.css';
import './styles/listings.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="profile" element={<Profile />} />
          <Route path="reward-points" element={<RewardPoints />} />
          <Route path="history" element={<History />} />
          <Route path="estimate-price" element={<PriceEstimation />} />
          <Route path="my-listings" element={<MyListings />} />
          <Route path="listing/:id" element={<ProductDetail />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
