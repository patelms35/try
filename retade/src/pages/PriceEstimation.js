import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaCalculator, FaArrowRight, FaQuestion } from 'react-icons/fa';
import '../styles/dashboard.css';

const PriceEstimation = () => {
  // Form state
  const [formData, setFormData] = useState({
    category: '',
    brand: '',
    model: '',
    purchaseYear: '',
    condition: '',
    accessories: [],
    additionalInfo: ''
  });
  
  // Estimated price state
  const [estimatedPrice, setEstimatedPrice] = useState(null);
  
  // Condition descriptions
  const conditionDescriptions = {
    excellent: "Device looks brand new with no visible scratches or dents. All features work perfectly.",
    good: "Device has minor scratches or signs of use, but all features work properly.",
    fair: "Device has visible scratches or dents, but all major features work properly.",
    poor: "Device has significant cosmetic damage and/or some features don't work properly."
  };
  
  // Available accessory options based on category
  const getAccessoryOptions = () => {
    switch(formData.category) {
      case 'mobile':
        return ['Charger', 'Earphones', 'Original Box', 'Screen Protector', 'Case/Cover', 'Warranty Card'];
      case 'laptop':
        return ['Charger', 'Original Box', 'Mouse', 'Bag', 'Warranty Card', 'External Accessories'];
      case 'camera':
        return ['Charger', 'Memory Card', 'Original Box', 'Lens Kit', 'Camera Bag', 'Tripod', 'Warranty Card'];
      case 'tablet':
        return ['Charger', 'Original Box', 'Stylus', 'Case/Cover', 'Screen Protector', 'Warranty Card'];
      case 'audio':
        return ['Charging Case', 'Original Box', 'Extra Ear Tips', 'Charging Cable', 'Warranty Card'];
      default:
        return [];
    }
  };
  
  // Handle form change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
  
  // Handle accessory checkbox change
  const handleAccessoryChange = (accessory) => {
    const updatedAccessories = [...formData.accessories];
    
    if (updatedAccessories.includes(accessory)) {
      const index = updatedAccessories.indexOf(accessory);
      updatedAccessories.splice(index, 1);
    } else {
      updatedAccessories.push(accessory);
    }
    
    setFormData({
      ...formData,
      accessories: updatedAccessories
    });
  };
  
  // Calculate estimated price (mock calculation)
  const calculateEstimatedPrice = () => {
    // Base prices by category (in INR)
    const basePrices = {
      mobile: 5000,
      laptop: 15000,
      camera: 10000,
      tablet: 8000,
      audio: 2000
    };
    
    // Condition factors
    const conditionFactors = {
      excellent: 1.0,
      good: 0.8,
      fair: 0.6,
      poor: 0.4
    };
    
    // Age depreciation (by years)
    const currentYear = new Date().getFullYear();
    const ageInYears = currentYear - parseInt(formData.purchaseYear);
    const ageFactor = Math.max(0.5, 1 - (ageInYears * 0.1)); // 10% depreciation per year, minimum 50%
    
    // Accessory bonus (5% per accessory, maximum 20%)
    const accessoryFactor = Math.min(1.2, 1 + (formData.accessories.length * 0.05));
    
    // Calculate final price
    const basePrice = basePrices[formData.category] || 0;
    const conditionFactor = conditionFactors[formData.condition] || 0;
    
    const estimatedPrice = basePrice * conditionFactor * ageFactor * accessoryFactor;
    
    // Add some randomness to make it look realistic
    const randomFactor = 0.9 + (Math.random() * 0.2); // 0.9 to 1.1
    const finalEstimatedPrice = Math.round(estimatedPrice * randomFactor);
    
    return finalEstimatedPrice;
  };
  
  // Handle form submit
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Check if all required fields are filled
    const requiredFields = ['category', 'brand', 'model', 'purchaseYear', 'condition'];
    const isValid = requiredFields.every(field => formData[field]);
    
    if (isValid) {
      const calculatedPrice = calculateEstimatedPrice();
      setEstimatedPrice(calculatedPrice);
    } else {
      alert('Please fill all required fields');
    }
  };
  
  return (
    <div className="price-estimation-container">
      <h1 className="mb-3">Price Estimation</h1>
      
      <div className="estimation-steps mb-4">
        <div className="step active">
          <div className="step-number">1</div>
          <div className="step-text">Price Estimation</div>
        </div>
        <div className="step-connector"></div>
        <div className="step">
          <div className="step-number">2</div>
          <div className="step-text">Product Posting</div>
        </div>
        <div className="step-connector"></div>
        <div className="step">
          <div className="step-number">3</div>
          <div className="step-text">Book Technician</div>
        </div>
        <div className="step-connector"></div>
        <div className="step">
          <div className="step-number">4</div>
          <div className="step-text">Preview & Submit</div>
        </div>
      </div>
      
      <div className="form-card">
        <div className="form-header">
          <h2>Enter Product Details</h2>
          <p>Provide details about your product to get an estimated price</p>
        </div>
        
        <form onSubmit={handleSubmit}>
          {/* Category */}
          <div className="form-group">
            <label className="form-label">Category <span className="required">*</span></label>
            <select 
              className="form-input" 
              name="category"
              value={formData.category}
              onChange={handleInputChange}
              required
            >
              <option value="">Select Category</option>
              <option value="mobile">Mobile Phone</option>
              <option value="laptop">Laptop</option>
              <option value="camera">Camera</option>
              <option value="tablet">Tablet</option>
              <option value="audio">Audio Device</option>
            </select>
          </div>
          
          {/* Brand */}
          <div className="form-group">
            <label className="form-label">Brand <span className="required">*</span></label>
            <input 
              type="text" 
              className="form-input" 
              name="brand"
              value={formData.brand}
              onChange={handleInputChange}
              placeholder="e.g. Apple, Samsung, Sony"
              required
            />
          </div>
          
          {/* Model */}
          <div className="form-group">
            <label className="form-label">Model <span className="required">*</span></label>
            <input 
              type="text" 
              className="form-input" 
              name="model"
              value={formData.model}
              onChange={handleInputChange}
              placeholder="e.g. iPhone 12 Pro, Galaxy S21"
              required
            />
          </div>
          
          {/* Purchase Year */}
          <div className="form-group">
            <label className="form-label">Year of Purchase <span className="required">*</span></label>
            <select 
              className="form-input" 
              name="purchaseYear"
              value={formData.purchaseYear}
              onChange={handleInputChange}
              required
            >
              <option value="">Select Year</option>
              {Array.from({ length: 10 }, (_, i) => {
                const year = new Date().getFullYear() - i;
                return <option key={year} value={year}>{year}</option>;
              })}
            </select>
          </div>
          
          {/* Condition */}
          <div className="form-group">
            <label className="form-label">Condition <span className="required">*</span></label>
            <select 
              className="form-input" 
              name="condition"
              value={formData.condition}
              onChange={handleInputChange}
              required
            >
              <option value="">Select Condition</option>
              <option value="excellent">Excellent</option>
              <option value="good">Good</option>
              <option value="fair">Fair</option>
              <option value="poor">Poor</option>
            </select>
            
            {formData.condition && (
              <div className="condition-description">
                <FaQuestion style={{ marginRight: '0.5rem', color: 'var(--primary-color)' }} />
                <span>{conditionDescriptions[formData.condition]}</span>
              </div>
            )}
          </div>
          
          {/* Accessories */}
          {formData.category && (
            <div className="form-group">
              <label className="form-label">Accessories</label>
              <div className="accessories-checkboxes">
                {getAccessoryOptions().map(accessory => (
                  <div key={accessory} className="checkbox-group">
                    <input 
                      type="checkbox"
                      id={accessory}
                      checked={formData.accessories.includes(accessory)}
                      onChange={() => handleAccessoryChange(accessory)}
                    />
                    <label htmlFor={accessory}>{accessory}</label>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {/* Additional Information */}
          <div className="form-group">
            <label className="form-label">Additional Information</label>
            <textarea 
              className="form-input" 
              name="additionalInfo"
              value={formData.additionalInfo}
              onChange={handleInputChange}
              rows="3"
              placeholder="Provide any additional details that might affect the price estimation"
            ></textarea>
          </div>
          
          <div className="text-center mt-3">
            <button type="submit" className="btn btn-lg">
              <FaCalculator style={{ marginRight: '0.5rem' }} />
              <span>Calculate Estimated Price</span>
            </button>
          </div>
        </form>
      </div>
      
      {/* Estimated Price Result */}
      {estimatedPrice !== null && (
        <div className="estimation-result card mt-4">
          <div className="estimation-header">
            <h2>Estimated Price</h2>
            <p>Based on the details you provided</p>
          </div>
          
          <div className="estimation-price">
            <span className="currency">₹</span>
            <span className="price-value">{estimatedPrice.toLocaleString()}</span>
          </div>
          
          <div className="estimation-note">
            <p>Note: This is an estimated price. The final offer may vary based on the technician's inspection.</p>
          </div>
          
          <div className="estimation-actions">
            <Link 
              to={{ 
                pathname: "/post-product", 
                state: { formData, estimatedPrice } 
              }} 
              className="btn"
            >
              <span>Proceed to Product Posting</span>
              <FaArrowRight style={{ marginLeft: '0.5rem' }} />
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default PriceEstimation; 