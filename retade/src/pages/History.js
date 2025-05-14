import React, { useState } from 'react';
import { FaCalendarAlt, FaTag, FaCheckCircle, FaClock, FaEye, FaSearch, FaFilter } from 'react-icons/fa';
import '../styles/dashboard.css';

const History = () => {
  // Tabs state
  const [activeTab, setActiveTab] = useState('posted');
  
  // Search and filter states
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all');
  
  // Product detail modal
  const [showModal, setShowModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  
  // Mock product data
  const postedProducts = [
    {
      id: 1,
      name: 'iPhone 12 Pro Max',
      category: 'Mobile Phones',
      price: 65000,
      estimatedPrice: 62000,
      postedDate: '2023-05-10',
      status: 'pending',
      image: 'https://via.placeholder.com/150',
      description: 'Used iPhone 12 Pro Max 256GB in good condition.',
      technician: {
        visitDate: '2023-05-15',
        time: '1:00 PM - 2:00 PM',
        report: 'Device is in good condition with minor scratches on the back. Battery health at 85%.'
      }
    },
    {
      id: 2,
      name: 'MacBook Pro 2019',
      category: 'Laptops',
      price: 110000,
      estimatedPrice: 105000,
      postedDate: '2023-04-25',
      status: 'sold',
      image: 'https://via.placeholder.com/150',
      description: 'MacBook Pro 2019 13-inch with 16GB RAM and 512GB SSD.',
      technician: {
        visitDate: '2023-04-28',
        time: '3:00 PM - 4:00 PM',
        report: 'Laptop is in excellent condition. Battery cycle count is 230.'
      }
    },
    {
      id: 3,
      name: 'Samsung Galaxy S21',
      category: 'Mobile Phones',
      price: 45000,
      estimatedPrice: 42000,
      postedDate: '2023-05-05',
      status: 'pending',
      image: 'https://via.placeholder.com/150',
      description: 'Samsung Galaxy S21 128GB in great condition.',
      technician: {
        visitDate: '2023-05-08',
        time: '11:00 AM - 12:00 PM',
        report: 'Phone is in very good condition. Screen has a tempered glass protector. Battery health at 92%.'
      }
    },
    {
      id: 4,
      name: 'Canon EOS 80D',
      category: 'Cameras',
      price: 70000,
      estimatedPrice: 68000,
      postedDate: '2023-04-15',
      status: 'sold',
      image: 'https://via.placeholder.com/150',
      description: 'Canon EOS 80D DSLR Camera with 18-135mm lens.',
      technician: {
        visitDate: '2023-04-18',
        time: '2:00 PM - 3:00 PM',
        report: 'Camera is in excellent condition. Shutter count is approximately 12,500.'
      }
    }
  ];
  
  const soldProducts = postedProducts.filter(product => product.status === 'sold');
  
  // Filter displayed products based on search term and filter
  const getFilteredProducts = () => {
    let filtered = activeTab === 'posted' ? postedProducts : soldProducts;
    
    if (searchTerm.trim() !== '') {
      filtered = filtered.filter(product => 
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    if (filter !== 'all') {
      filtered = filtered.filter(product => product.category.toLowerCase() === filter.toLowerCase());
    }
    
    return filtered;
  };
  
  // Handle product click to show details
  const handleProductClick = (product) => {
    setSelectedProduct(product);
    setShowModal(true);
  };
  
  // Close modal
  const closeModal = () => {
    setShowModal(false);
  };
  
  return (
    <div className="history-container">
      <h1 className="mb-3">Product History</h1>
      
      {/* Tabs */}
      <div className="tabs">
        <div className="tabs-list">
          <div 
            className={`tab-item ${activeTab === 'posted' ? 'active' : ''}`}
            onClick={() => setActiveTab('posted')}
          >
            Posted Products
          </div>
          <div 
            className={`tab-item ${activeTab === 'sold' ? 'active' : ''}`}
            onClick={() => setActiveTab('sold')}
          >
            Sold Products
          </div>
        </div>
      </div>
      
      {/* Filter Bar */}
      <div className="filter-bar">
        <div className="search-group">
          <div className="input-group" style={{ position: 'relative' }}>
            <input 
              type="text" 
              className="search-input" 
              placeholder="Search products..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <FaSearch style={{ position: 'absolute', right: '10px', top: '10px', color: '#6c757d' }} />
          </div>
        </div>
        
        <div className="filter-group">
          <div className="filter-label">
            <FaFilter style={{ marginRight: '0.5rem' }} />
            <span>Category:</span>
          </div>
          <select 
            className="filter-select" 
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="all">All Categories</option>
            <option value="mobile phones">Mobile Phones</option>
            <option value="laptops">Laptops</option>
            <option value="cameras">Cameras</option>
            <option value="tablets">Tablets</option>
            <option value="audio">Audio Devices</option>
          </select>
        </div>
      </div>
      
      {/* Product Grid */}
      <div className="product-grid">
        {getFilteredProducts().length > 0 ? (
          getFilteredProducts().map(product => (
            <div 
              key={product.id} 
              className="product-card" 
              onClick={() => handleProductClick(product)}
            >
              <img src={product.image} alt={product.name} className="product-img" />
              <div className="product-info">
                <h3 className="product-title">{product.name}</h3>
                <div className="product-meta">
                  <div>
                    <FaCalendarAlt />
                    <span>Posted: {product.postedDate}</span>
                  </div>
                </div>
                <div className="product-meta">
                  <div>
                    <FaTag />
                    <span>{product.category}</span>
                  </div>
                </div>
                <div className="product-price">₹{product.price.toLocaleString()}</div>
                <div className="product-badges">
                  {product.status === 'pending' ? (
                    <span className="badge badge-warning">
                      <FaClock />
                      <span>Pending</span>
                    </span>
                  ) : (
                    <span className="badge badge-success">
                      <FaCheckCircle />
                      <span>Sold</span>
                    </span>
                  )}
                  <span className="badge badge-primary">
                    <FaEye />
                    <span>View Details</span>
                  </span>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="no-products">
            <p>No products found.</p>
          </div>
        )}
      </div>
      
      {/* Product Detail Modal */}
      {showModal && selectedProduct && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>{selectedProduct.name}</h2>
              <button className="modal-close" onClick={closeModal}>×</button>
            </div>
            <div className="modal-body">
              <div className="product-detail-grid">
                <div className="product-image-container">
                  <img src={selectedProduct.image} alt={selectedProduct.name} className="product-detail-img" />
                </div>
                <div className="product-detail-info">
                  <div className="detail-group">
                    <h3>Product Details</h3>
                    <p><strong>Category:</strong> {selectedProduct.category}</p>
                    <p><strong>Posted Date:</strong> {selectedProduct.postedDate}</p>
                    <p><strong>Status:</strong> {selectedProduct.status === 'pending' ? 'Pending' : 'Sold'}</p>
                    <p><strong>Price:</strong> ₹{selectedProduct.price.toLocaleString()}</p>
                    <p><strong>Estimated Price:</strong> ₹{selectedProduct.estimatedPrice.toLocaleString()}</p>
                    <p><strong>Description:</strong> {selectedProduct.description}</p>
                  </div>
                  
                  <div className="detail-group">
                    <h3>Technician Visit</h3>
                    <p><strong>Date:</strong> {selectedProduct.technician.visitDate}</p>
                    <p><strong>Time:</strong> {selectedProduct.technician.time}</p>
                    <p><strong>Report:</strong> {selectedProduct.technician.report}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default History; 