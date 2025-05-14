import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FaDownload, FaUser, FaStore, FaChartLine, FaCalendarAlt, FaTag, FaArrowLeft } from 'react-icons/fa';

const ProductDetail = () => {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState('details');
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch product data - in a real app, this would be an API call
  useEffect(() => {
    // Simulating API call with setTimeout
    setTimeout(() => {
      setProduct({
        id: parseInt(id),
        title: 'iPhone 13 Pro',
        category: 'Smartphones',
        description: 'Excellent condition, barely used. No scratches or dents. Original box and accessories included. 128GB storage, Pacific Blue color.',
        price: '$650',
        postedDate: '2023-10-15',
        technicianVisit: '2023-10-18',
        technicianName: 'Alex Johnson',
        technicianReport: {
          id: 'TR-2023-001',
          date: '2023-10-18',
          overall: 'Excellent',
          batteryHealth: '92%',
          screenCondition: 'Perfect',
          functionality: 'All functions working properly',
          estimatedValue: '$600-700',
          notes: 'Device is in excellent condition. Original parts. Battery has been well maintained. Recommended for resale.'
        },
        images: [
          'https://placehold.co/600x400',
          'https://placehold.co/600x400',
          'https://placehold.co/600x400'
        ],
        interestedShopkeepers: [
          { id: 'SK001', name: 'Tech Resellers', estimatedPrice: '$630', rating: 4.8 },
          { id: 'SK002', name: 'Mobile Experts', estimatedPrice: '$650', rating: 4.5 },
          { id: 'SK003', name: 'Gadget Shop', estimatedPrice: '$620', rating: 4.7 }
        ],
        bidding: {
          status: 'active', // can be 'pending', 'active', 'completed'
          startTime: '2023-10-20 14:00',
          endTime: '2023-10-20 16:00',
          currentHighestBid: '$680',
          biddingShopkeeper: 'Mobile Experts',
          totalBids: 8
        },
        status: 'active' // can be 'active', 'bidding', 'sold'
      });
      setLoading(false);
    }, 1000);
  }, [id]);

  if (loading) {
    return (
      <div className="loading-container flex-center">
        <div className="loading-spinner"></div>
        <p>Loading product details...</p>
      </div>
    );
  }

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <div className="product-detail-page">
      <div className="page-header mb-3">
        <Link to="/my-listings" className="back-link">
          <FaArrowLeft /> Back to My Listings
        </Link>
        <h1>{product.title}</h1>
        <div className="product-meta">
          <span className="product-status">
            {product.status === 'active' && 'Active Listing'}
            {product.status === 'bidding' && 'In Bidding Process'}
            {product.status === 'sold' && 'Sold'}
          </span>
          <span className="product-id">ID: {product.id}</span>
        </div>
      </div>

      <div className="product-tabs mb-3">
        <button 
          className={`tab-btn ${activeTab === 'details' ? 'active' : ''}`}
          onClick={() => setActiveTab('details')}
        >
          Product Details
        </button>
        <button 
          className={`tab-btn ${activeTab === 'technician' ? 'active' : ''}`}
          onClick={() => setActiveTab('technician')}
        >
          Technician Report
        </button>
        <button 
          className={`tab-btn ${activeTab === 'shopkeepers' ? 'active' : ''}`}
          onClick={() => setActiveTab('shopkeepers')}
        >
          Interested Shopkeepers ({product.interestedShopkeepers.length})
        </button>
        <button 
          className={`tab-btn ${activeTab === 'bidding' ? 'active' : ''}`}
          onClick={() => setActiveTab('bidding')}
          disabled={product.bidding.status === 'pending'}
        >
          Live Bidding
          {product.bidding.status === 'active' && <span className="live-indicator"></span>}
        </button>
      </div>

      <div className="tab-content card">
        {activeTab === 'details' && (
          <div className="product-details">
            <div className="product-images">
              <div className="main-image">
                <img src={product.images[0]} alt={product.title} />
              </div>
              <div className="image-thumbnails">
                {product.images.map((img, index) => (
                  <div key={index} className="thumbnail">
                    <img src={img} alt={`${product.title} - ${index + 1}`} />
                  </div>
                ))}
              </div>
            </div>
            
            <div className="product-info">
              <div className="info-group">
                <h3>Description</h3>
                <p>{product.description}</p>
              </div>
              
              <div className="info-group">
                <h3>Details</h3>
                <div className="detail-grid">
                  <div className="detail-item">
                    <FaTag className="icon" />
                    <span>Category:</span>
                    <strong>{product.category}</strong>
                  </div>
                  <div className="detail-item">
                    <FaCalendarAlt className="icon" />
                    <span>Posted On:</span>
                    <strong>{product.postedDate}</strong>
                  </div>
                  <div className="detail-item">
                    <FaCalendarAlt className="icon" />
                    <span>Technician Visit:</span>
                    <strong>{product.technicianVisit}</strong>
                  </div>
                  <div className="detail-item">
                    <FaUser className="icon" />
                    <span>Technician:</span>
                    <strong>{product.technicianName}</strong>
                  </div>
                </div>
              </div>
              
              <div className="info-group">
                <h3>Pricing</h3>
                <div className="pricing-info">
                  <div className="asking-price">
                    <span>My Asking Price:</span>
                    <strong>{product.price}</strong>
                  </div>
                  <div className="estimated-value">
                    <span>Technician's Estimated Value:</span>
                    <strong>{product.technicianReport.estimatedValue}</strong>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {activeTab === 'technician' && (
          <div className="technician-report">
            <div className="report-header flex-between mb-3">
              <div>
                <h2>Technician Report</h2>
                <p>ID: {product.technicianReport.id} | Date: {product.technicianReport.date}</p>
              </div>
              <button className="btn btn-sm">
                <FaDownload className="icon" /> Download Full Report
              </button>
            </div>
            
            <div className="report-summary mb-3">
              <div className="summary-item overall">
                <h3>Overall Condition</h3>
                <div className="condition-badge">{product.technicianReport.overall}</div>
              </div>
            </div>
            
            <div className="report-details">
              <div className="report-grid">
                <div className="report-item card">
                  <h3>Battery Health</h3>
                  <div className="value">{product.technicianReport.batteryHealth}</div>
                </div>
                <div className="report-item card">
                  <h3>Screen Condition</h3>
                  <div className="value">{product.technicianReport.screenCondition}</div>
                </div>
                <div className="report-item card">
                  <h3>Functionality</h3>
                  <div className="value">{product.technicianReport.functionality}</div>
                </div>
                <div className="report-item card">
                  <h3>Estimated Value</h3>
                  <div className="value">{product.technicianReport.estimatedValue}</div>
                </div>
              </div>
              
              <div className="report-notes card mt-3">
                <h3>Technician Notes</h3>
                <p>{product.technicianReport.notes}</p>
              </div>
            </div>
          </div>
        )}
        
        {activeTab === 'shopkeepers' && (
          <div className="shopkeepers-section">
            <h2 className="mb-3">Interested Shopkeepers</h2>
            
            <div className="shopkeepers-list">
              {product.interestedShopkeepers.map(shopkeeper => (
                <div key={shopkeeper.id} className="shopkeeper-card card">
                  <div className="shopkeeper-info">
                    <div className="shopkeeper-icon">
                      <FaStore className="icon" />
                    </div>
                    <div className="shopkeeper-details">
                      <h3>{shopkeeper.name}</h3>
                      <div className="shopkeeper-id">ID: {shopkeeper.id}</div>
                      <div className="shopkeeper-rating">
                        Rating: {shopkeeper.rating} / 5
                      </div>
                    </div>
                  </div>
                  <div className="shopkeeper-price">
                    <span>Estimated Price</span>
                    <strong>{shopkeeper.estimatedPrice}</strong>
                  </div>
                  <button className="btn btn-sm">View Profile</button>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {activeTab === 'bidding' && (
          <div className="bidding-section">
            {product.bidding.status === 'pending' && (
              <div className="bidding-pending">
                <h2>Bidding Not Started Yet</h2>
                <p>The bidding for this product has not started yet. It will begin on {product.bidding.startTime}.</p>
              </div>
            )}
            
            {product.bidding.status === 'active' && (
              <div className="bidding-active">
                <div className="bidding-header flex-between mb-3">
                  <div>
                    <h2>Live Bidding In Progress</h2>
                    <p>Started: {product.bidding.startTime} | Ends: {product.bidding.endTime}</p>
                  </div>
                  <div className="live-badge">
                    <span className="pulse"></span> LIVE
                  </div>
                </div>
                
                <div className="bidding-stats">
                  <div className="bid-card current-bid">
                    <h3>Current Highest Bid</h3>
                    <div className="bid-amount">{product.bidding.currentHighestBid}</div>
                    <div className="bidder">by {product.bidding.biddingShopkeeper}</div>
                  </div>
                  
                  <div className="bid-card">
                    <h3>Total Bids</h3>
                    <div className="bid-count">{product.bidding.totalBids}</div>
                  </div>
                  
                  <div className="bid-card">
                    <h3>Time Remaining</h3>
                    <div className="bid-timer">01:24:53</div>
                  </div>
                </div>
                
                <div className="bidding-action mt-3">
                  <button className="btn btn-lg">
                    <FaChartLine className="icon" /> View Live Bidding Room
                  </button>
                </div>
              </div>
            )}
            
            {product.bidding.status === 'completed' && (
              <div className="bidding-completed">
                <h2>Bidding Completed</h2>
                <div className="winning-bid">
                  <h3>Winning Bid</h3>
                  <div className="bid-amount">{product.bidding.currentHighestBid}</div>
                  <div className="bidder">by {product.bidding.biddingShopkeeper}</div>
                </div>
                
                <div className="bidding-summary mt-3">
                  <h3>Bidding Summary</h3>
                  <div className="summary-item">
                    <span>Starting Time:</span>
                    <strong>{product.bidding.startTime}</strong>
                  </div>
                  <div className="summary-item">
                    <span>Ending Time:</span>
                    <strong>{product.bidding.endTime}</strong>
                  </div>
                  <div className="summary-item">
                    <span>Total Bids:</span>
                    <strong>{product.bidding.totalBids}</strong>
                  </div>
                </div>
                
                <div className="next-steps mt-3">
                  <h3>Next Steps</h3>
                  <p>The winning shopkeeper will contact you soon to arrange the transaction. Please prepare your item for handover.</p>
                  <button className="btn mt-2">Contact Shopkeeper</button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetail; 