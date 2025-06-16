import React, { useState, useEffect } from 'react';
import { FaCalendarAlt, FaTag, FaCheckCircle, FaClock, FaEye, FaSearch, FaFilter, FaTimes, FaRupeeSign, FaMapMarkerAlt, FaStar, FaUser, FaPhone, FaHeart } from 'react-icons/fa';
import '../styles/dashboard.css';
import '../styles/history.css';

const History = () => {
  // Filter and search states
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  
  // Product detail modal
  const [showModal, setShowModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  
  // Enhanced product data - Showing 3 products
  const allProducts = [
    {
      id: 1,
      name: 'iPhone 12 Pro Max',
      category: 'Mobile Phones',
      price: 65000,
      originalPrice: 129900,
      postedDate: '2023-05-10',
      soldDate: null,
      status: 'active',
      image: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400&h=400&fit=crop',
      description: 'Used iPhone 12 Pro Max 256GB in excellent condition with minimal signs of wear. Includes original box and charger.',
      condition: 'Like New',
      warranty: '6 months seller warranty',
      location: 'Mumbai, Maharashtra',
      views: 145,
      likes: 23,
      specifications: {
        'Storage': '256GB',
        'Color': 'Pacific Blue',
        'Battery Health': '85%',
        'RAM': '6GB',
        'Camera': '12MP Triple Camera'
      },
      seller: {
        name: 'Rahul Sharma',
        phone: '+91 98765 43210',
        rating: 4.5
      },
      technician: {
        visitDate: '2023-05-15',
        rating: 4.5,
        report: 'Device is in excellent condition with minor scratches on the back. Battery health at 85%. All functions working perfectly.'
      }
    },
    {
      id: 2,
      name: 'MacBook Pro 2019',
      category: 'Laptops',
      price: 110000,
      originalPrice: 199900,
      postedDate: '2023-04-25',
      soldDate: '2023-05-02',
      status: 'sold',
      image: 'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=400&h=400&fit=crop',
      description: 'MacBook Pro 2019 13-inch with 16GB RAM and 512GB SSD. Perfect for professionals and students.',
      condition: 'Excellent',
      warranty: '3 months seller warranty',
      location: 'Delhi, India',
      views: 287,
      likes: 45,
      specifications: {
        'RAM': '16GB',
        'Storage': '512GB SSD',
        'Processor': 'Intel Core i5',
        'Screen Size': '13.3 inch',
        'Graphics': 'Intel Iris Plus'
      },
      seller: {
        name: 'Priya Singh',
        phone: '+91 87654 32109',
        rating: 5.0
      },
      technician: {
        visitDate: '2023-04-28',
        rating: 5.0,
        report: 'Laptop is in excellent condition. Battery cycle count is 230. All ports and keyboard working perfectly.'
      }
    },
    {
      id: 3,
      name: 'Samsung Galaxy S21',
      category: 'Mobile Phones',
      price: 45000,
      originalPrice: 79999,
      postedDate: '2023-05-05',
      soldDate: null,
      status: 'active',
      image: 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=400&h=400&fit=crop',
      description: 'Samsung Galaxy S21 128GB in great condition with original box and all accessories included.',
      condition: 'Good',
      warranty: '4 months seller warranty',
      location: 'Bangalore, Karnataka',
      views: 92,
      likes: 12,
      specifications: {
        'Storage': '128GB',
        'Color': 'Phantom Gray',
        'Battery Health': '92%',
        'RAM': '8GB',
        'Camera': '64MP Triple Camera'
      },
      seller: {
        name: 'Amit Patel',
        phone: '+91 76543 21098',
        rating: 4.8
      },
      technician: {
        visitDate: '2023-05-08',
        rating: 4.8,
        report: 'Phone is in very good condition. Screen has a tempered glass protector. Battery health at 92%.'
      }
    }
  ];
  
  // Filter products based on current filters
  const getFilteredProducts = () => {
    let filtered = [...allProducts];
    
    // Filter by search term
    if (searchTerm.trim() !== '') {
      filtered = filtered.filter(product => 
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.location.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Filter by category
    if (categoryFilter !== 'all') {
      filtered = filtered.filter(product => 
        product.category.toLowerCase() === categoryFilter.toLowerCase()
      );
    }
    
    // Filter by status
    if (statusFilter !== 'all') {
      filtered = filtered.filter(product => product.status === statusFilter);
    }
    
    return filtered;
  };
  
  // Handle product click to show details
  const handleProductClick = (product) => {
    setSelectedProduct(product);
    setShowModal(true);
    document.body.style.overflow = 'hidden';
  };
  
  // Close modal
  const closeModal = () => {
    setShowModal(false);
    setSelectedProduct(null);
    document.body.style.overflow = 'unset';
  };
  
  // Clear all filters
  const clearFilters = () => {
    setSearchTerm('');
    setCategoryFilter('all');
    setStatusFilter('all');
  };
  
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };
  
  const calculateDiscount = (original, current) => {
    return Math.round((1 - current / original) * 100);
  };

  const filteredProducts = getFilteredProducts();
  const totalProducts = allProducts.length;
  const activeProducts = allProducts.filter(p => p.status === 'active').length;
  const soldProducts = allProducts.filter(p => p.status === 'sold').length;

  return (
    <div className="history-page">
      {/* Header Section */}
      <div className="history-header">
        <div className="header-content">
          <h1 className="page-title">Product History</h1>
          <p className="page-subtitle">Manage your posted and sold products</p>
        </div>
        <div className="stats-overview">
          <div className="stat-card">
            <span className="stat-number">{totalProducts}</span>
            <span className="stat-label">Total Products</span>
          </div>
          <div className="stat-card">
            <span className="stat-number">{activeProducts}</span>
            <span className="stat-label">Active</span>
          </div>
          <div className="stat-card">
            <span className="stat-number">{soldProducts}</span>
            <span className="stat-label">Sold</span>
          </div>
        </div>
      </div>
      
      {/* Filter Section */}
      <div className="filter-section">
        <div className="search-container">
          <FaSearch className="search-icon" />
          <input 
            type="text" 
            className="search-input" 
            placeholder="Search products..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {searchTerm && (
            <button className="clear-search" onClick={() => setSearchTerm('')}>
              <FaTimes />
            </button>
          )}
        </div>
        
        <div className="filter-controls">
          <select 
            className="filter-select" 
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
          >
            <option value="all">All Categories</option>
            <option value="mobile phones">Mobile Phones</option>
            <option value="laptops">Laptops</option>
            <option value="cameras">Cameras</option>
            <option value="tablets">Tablets</option>
            <option value="audio">Audio</option>
          </select>
          
          <select 
            className="filter-select" 
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="sold">Sold</option>
          </select>
          
          <button className="clear-filters-btn" onClick={clearFilters}>
            Clear Filters
          </button>
        </div>
      </div>
      
      {/* Products Grid */}
      <div className="products-container">
        {filteredProducts.length > 0 ? (
          <div className="products-grid">
            {filteredProducts.map(product => (
              <div 
                key={product.id} 
                className="product-card" 
                onClick={() => handleProductClick(product)}
              >
                <div className="product-image-container">
                  <img src={product.image} alt={product.name} className="product-image" />
                  <div className="product-overlay">
                    <span className="view-details">View Details</span>
                  </div>
                </div>
                
                <div className="product-info">
                  <h3 className="product-name">{product.name}</h3>
                  
                  <div className="product-meta">
                    <div className="meta-row">
                      <FaCalendarAlt className="meta-icon" />
                      <span>{formatDate(product.postedDate)}</span>
                    </div>
                  </div>
                  
                  <div className="price-section">
                    <div className="current-price">
                      <FaRupeeSign />
                      <span>{product.price.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <div className="empty-icon">📦</div>
            <h3>No products found</h3>
            <p>Try adjusting your search criteria or clear the filters</p>
            <button className="clear-filters-btn" onClick={clearFilters}>
              Clear All Filters
            </button>
          </div>
        )}
      </div>
      
      {/* Product Details Modal */}
      {showModal && selectedProduct && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={closeModal}>
              <FaTimes />
            </button>
            
            <div className="modal-header">
              <div className="product-image-section">
                <img 
                  src={selectedProduct.image} 
                  alt={selectedProduct.name} 
                  className="modal-product-image" 
                />
                <div className="image-badges">
                  <span className={`status-badge ${selectedProduct.status}`}>
                    {selectedProduct.status === 'sold' ? 'Sold' : 'Active'}
                  </span>
                  <span className="condition-badge">{selectedProduct.condition}</span>
                </div>
              </div>
              
              <div className="product-details-section">
                <h2 className="modal-product-name">{selectedProduct.name}</h2>
                
                <div className="modal-price-section">
                  <div className="modal-current-price">
                    <FaRupeeSign />
                    <span>{selectedProduct.price.toLocaleString()}</span>
                  </div>
                  <div className="modal-price-details">
                    <span className="modal-original-price">
                      MRP: ₹{selectedProduct.originalPrice.toLocaleString()}
                    </span>
                    <span className="modal-discount">
                      {calculateDiscount(selectedProduct.originalPrice, selectedProduct.price)}% off
                    </span>
                  </div>
                </div>
                
                <div className="product-description">
                  <h4>Description</h4>
                  <p>{selectedProduct.description}</p>
                </div>
                
                <div className="product-info-grid">
                  <div className="info-item">
                    <span className="info-label">Category:</span>
                    <span className="info-value">{selectedProduct.category}</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">Location:</span>
                    <span className="info-value">{selectedProduct.location}</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">Posted:</span>
                    <span className="info-value">{formatDate(selectedProduct.postedDate)}</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">Warranty:</span>
                    <span className="info-value">{selectedProduct.warranty}</span>
                  </div>
                  {selectedProduct.soldDate && (
                    <div className="info-item">
                      <span className="info-label">Sold Date:</span>
                      <span className="info-value">{formatDate(selectedProduct.soldDate)}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
            
            <div className="modal-body">
              <div className="modal-section">
                <h4>Specifications</h4>
                <div className="specifications-grid">
                  {Object.entries(selectedProduct.specifications).map(([key, value]) => (
                    <div key={key} className="spec-item">
                      <span className="spec-label">{key}:</span>
                      <span className="spec-value">{value}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="modal-section">
                <h4>Seller Information</h4>
                <div className="seller-info">
                  <div className="seller-details">
                    <div className="seller-item">
                      <FaUser className="seller-icon" />
                      <span>{selectedProduct.seller.name}</span>
                    </div>
                    <div className="seller-item">
                      <FaPhone className="seller-icon" />
                      <span>{selectedProduct.seller.phone}</span>
                    </div>
                    <div className="seller-item">
                      <FaStar className="seller-icon" />
                      <span>{selectedProduct.seller.rating}/5 Rating</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="modal-section">
                <h4>Technician Report</h4>
                <div className="technician-report">
                  <div className="report-header">
                    <span>Visit Date: {selectedProduct.technician.visitDate}</span>
                    <div className="technician-rating">
                      <FaStar />
                      <span>{selectedProduct.technician.rating}/5</span>
                    </div>
                  </div>
                  <p className="report-text">{selectedProduct.technician.report}</p>
                </div>
              </div>
              
              <div className="modal-section">
                <h4>Product Performance</h4>
                <div className="performance-stats">
                  <div className="performance-item">
                    <FaEye className="performance-icon" />
                    <span>{selectedProduct.views} Views</span>
                  </div>
                  <div className="performance-item">
                    <FaHeart className="performance-icon" />
                    <span>{selectedProduct.likes} Likes</span>
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