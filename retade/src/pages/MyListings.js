import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaEye, FaStore, FaUserCog, FaCalendarAlt, FaChartLine, FaTag } from 'react-icons/fa';

const MyListings = () => {
  // Sample data - in a real app, this would come from an API
  const [listings, setListings] = useState([
    {
      id: 1,
      title: 'iPhone 13 Pro',
      category: 'Smartphones',
      description: 'Excellent condition, barely used',
      price: '$650',
      postedDate: '2023-10-15',
      technicianVisit: '2023-10-18',
      images: ['https://placehold.co/300x200'],
      interestedShopkeepers: 8,
      pendingTechnicianVisit: false,
      status: 'active'
    },
    {
      id: 2,
      title: 'MacBook Pro M1',
      category: 'Laptops',
      description: 'Minor scratches, working perfectly',
      price: '$1200',
      postedDate: '2023-10-10',
      technicianVisit: '2023-10-20',
      images: ['https://placehold.co/300x200'],
      interestedShopkeepers: 12,
      pendingTechnicianVisit: true,
      status: 'active'
    },
    {
      id: 3,
      title: 'Sony PlayStation 5',
      category: 'Gaming',
      description: 'Like new, with 2 controllers',
      price: '$480',
      postedDate: '2023-10-05',
      technicianVisit: '2023-10-12',
      images: ['https://placehold.co/300x200'],
      interestedShopkeepers: 5,
      pendingTechnicianVisit: false,
      status: 'bidding'
    },
    {
      id: 4,
      title: 'Samsung 4K QLED TV',
      category: 'Electronics',
      description: '55-inch, 1 year old, perfect condition',
      price: '$820',
      postedDate: '2023-10-08',
      technicianVisit: '2023-10-14',
      images: ['https://placehold.co/300x200'],
      interestedShopkeepers: 7,
      pendingTechnicianVisit: false,
      status: 'sold'
    }
  ]);

  const [filter, setFilter] = useState('all');

  const filteredListings = filter === 'all' 
    ? listings 
    : listings.filter(listing => listing.status === filter);

  return (
    <div className="my-listings-page">
      <div className="listings-container">
        <div className="page-header flex-between mb-3">
          <h1>My Listings</h1>
          <button className="btn">+ Add New Listing</button>
        </div>

        <div className="filter-section card mb-3">
          <div className="flex">
            <button 
              className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
              onClick={() => setFilter('all')}
            >
              All
            </button>
            <button 
              className={`filter-btn ${filter === 'active' ? 'active' : ''}`}
              onClick={() => setFilter('active')}
            >
              Active
            </button>
            <button 
              className={`filter-btn ${filter === 'bidding' ? 'active' : ''}`}
              onClick={() => setFilter('bidding')}
            >
              In Bidding
            </button>
            <button 
              className={`filter-btn ${filter === 'sold' ? 'active' : ''}`}
              onClick={() => setFilter('sold')}
            >
              Sold
            </button>
          </div>
        </div>

        <div className="listings-grid">
          {filteredListings.map(listing => (
            <div key={listing.id} className="listing-card card">
              <div className="listing-image">
                <img src={listing.images[0]} alt={listing.title} />
                {listing.status === 'bidding' && (
                  <div className="listing-badge bidding">
                    Live Bidding
                  </div>
                )}
                {listing.status === 'sold' && (
                  <div className="listing-badge sold">
                    Sold
                  </div>
                )}
              </div>
              <div className="listing-content">
                <h3 className="listing-title">{listing.title}</h3>
                <div className="listing-category mb-1">
                  <FaTag className="icon" />
                  <span>{listing.category}</span>
                </div>
                <div className="listing-price mb-2">{listing.price}</div>
                
                <div className="listing-details ">
                  <div className="detail-item">
                    <FaCalendarAlt className="icon" />
                    <span>Posted: {listing.postedDate}</span>
                  </div>
                  <div className="detail-item">
                    <FaUserCog className="icon" />
                    <span>Tech Visit: {listing.technicianVisit}</span>
                  </div>
                </div>
                
                <div className="listing-badges mb-2">
                  <div className="badge">
                    <FaStore className="icon" />
                    <span>{listing.interestedShopkeepers} Interested</span>
                  </div>
                  {listing.pendingTechnicianVisit && (
                    <div className="badge tech-pending">
                      <span>Tech Visit Pending</span>
                    </div>
                  )}
                </div>
                
                <div className="listing-actions">
                  <Link to={`/listing/${listing.id}`} className="btn btn-sm">
                    <FaEye className="icon" /> View Details
                  </Link>
                  {listing.status === 'bidding' && (
                    <Link to={`/listing/${listing.id}/bidding`} className="btn btn-sm btn-highlight">
                      <FaChartLine className="icon" /> Live Bidding
                    </Link>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MyListings; 