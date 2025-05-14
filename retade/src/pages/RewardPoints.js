import React, { useState } from 'react';
import { FaGift, FaTicketAlt, FaCreditCard, FaCoins, FaStar, FaTrophy } from 'react-icons/fa';
import '../styles/dashboard.css';

const RewardPoints = () => {
  // User's reward points
  const [rewardPoints, setRewardPoints] = useState(750);
  
  // Scratch cards state (revealed or not)
  const [scratchCards, setScratchCards] = useState([
    { id: 1, value: '₹50 Off', revealed: false },
    { id: 2, value: '₹100 Off', revealed: false },
    { id: 3, value: '10% Discount', revealed: false }
  ]);
  
  // Available coupons
  const coupons = [
    { 
      id: 1,
      title: '₹100 off your next sale',
      description: 'Get ₹100 off when you sell your next device',
      points: 200,
      expiryDays: 30,
      image: 'https://via.placeholder.com/80'
    },
    { 
      id: 2,
      title: 'Free Technician Visit',
      description: 'Redeem for a free technician visit for your next product',
      points: 350,
      expiryDays: 45,
      image: 'https://via.placeholder.com/80'
    },
    { 
      id: 3,
      title: '20% Extra on Final Deal',
      description: 'Get 20% extra on the final deal amount',
      points: 500,
      expiryDays: 60,
      image: 'https://via.placeholder.com/80'
    },
    { 
      id: 4,
      title: 'Premium Listing',
      description: 'Get your product featured on the homepage for 7 days',
      points: 400,
      expiryDays: 30,
      image: 'https://via.placeholder.com/80'
    }
  ];
  
  // User's redeemed coupons
  const [redeemedCoupons, setRedeemedCoupons] = useState([
    { 
      id: 5,
      title: '₹50 off your next sale',
      description: 'Get ₹50 off when you sell your next device',
      code: 'REWARD50',
      expiryDate: '2023-06-15',
      image: 'https://via.placeholder.com/80'
    }
  ]);
  
  // Redeem coupon
  const redeemCoupon = (coupon) => {
    if (rewardPoints >= coupon.points) {
      // Generate a random coupon code
      const code = 'REWARD' + Math.floor(1000 + Math.random() * 9000);
      
      // Calculate expiry date
      const expiryDate = new Date();
      expiryDate.setDate(expiryDate.getDate() + coupon.expiryDays);
      
      // Create new redeemed coupon
      const newRedeemedCoupon = {
        id: Date.now(),
        title: coupon.title,
        description: coupon.description,
        code: code,
        expiryDate: expiryDate.toISOString().split('T')[0],
        image: coupon.image
      };
      
      // Update state
      setRedeemedCoupons([...redeemedCoupons, newRedeemedCoupon]);
      setRewardPoints(rewardPoints - coupon.points);
    }
  };
  
  // Reveal scratch card
  const revealScratchCard = (id) => {
    setScratchCards(prevCards => 
      prevCards.map(card => 
        card.id === id ? { ...card, revealed: true } : card
      )
    );
  };
  
  return (
    <div className="reward-container">
      <h1 className="mb-3">Reward Points</h1>
      
      {/* Points Summary */}
      <div className="card mb-4">
        <div className="flex-between">
          <div>
            <h2 className="mb-1">Your Reward Points</h2>
            <p className="text-secondary">Earn points by selling products and completing activities</p>
          </div>
          <div className="points-badge">
            <FaTrophy style={{ marginRight: '0.5rem', color: '#ffc107' }} />
            <span>{rewardPoints} Points</span>
          </div>
        </div>
        
        <div className="reward-stats">
          <div className="stat-item">
            <div className="stat-icon blue">
              <FaCoins />
            </div>
            <div className="stat-info">
              <div className="stat-value">1250</div>
              <div className="stat-label">Lifetime Points</div>
            </div>
          </div>
          
          <div className="stat-item">
            <div className="stat-icon green">
              <FaTicketAlt />
            </div>
            <div className="stat-info">
              <div className="stat-value">{redeemedCoupons.length}</div>
              <div className="stat-label">Redeemed Coupons</div>
            </div>
          </div>
          
          <div className="stat-item">
            <div className="stat-icon yellow">
              <FaStar />
            </div>
            <div className="stat-info">
              <div className="stat-value">Gold</div>
              <div className="stat-label">Membership Level</div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Available Coupons */}
      <h2 className="section-title">Available Coupons</h2>
      <p className="section-description mb-3">Redeem your points for these exciting offers</p>
      
      <div className="coupons-grid">
        {coupons.map(coupon => (
          <div key={coupon.id} className="coupon-card">
            <div className="coupon-header">
              <img src={coupon.image} alt={coupon.title} className="coupon-img" />
              <div className="coupon-points">
                <FaCoins style={{ marginRight: '0.5rem', color: '#ffc107' }} />
                <span>{coupon.points} Points</span>
              </div>
            </div>
            <div className="coupon-body">
              <h3 className="coupon-title">{coupon.title}</h3>
              <p className="coupon-description">{coupon.description}</p>
              <p className="coupon-expiry">Valid for {coupon.expiryDays} days after redemption</p>
            </div>
            <div className="coupon-footer">
              <button 
                className={`btn btn-block ${rewardPoints < coupon.points ? 'disabled' : ''}`}
                disabled={rewardPoints < coupon.points}
                onClick={() => redeemCoupon(coupon)}
              >
                {rewardPoints < coupon.points ? 'Not Enough Points' : 'Redeem Coupon'}
              </button>
            </div>
          </div>
        ))}
      </div>
      
      {/* Redeemed Coupons */}
      {redeemedCoupons.length > 0 && (
        <>
          <h2 className="section-title mt-5">Your Coupons</h2>
          <p className="section-description mb-3">Your redeemed coupons and offers</p>
          
          <div className="redeemed-coupons">
            {redeemedCoupons.map(coupon => (
              <div key={coupon.id} className="redeemed-coupon-card">
                <div className="redeemed-coupon-header">
                  <img src={coupon.image} alt={coupon.title} className="coupon-img" />
                </div>
                <div className="redeemed-coupon-body">
                  <h3 className="coupon-title">{coupon.title}</h3>
                  <p className="coupon-description">{coupon.description}</p>
                  <div className="coupon-code">
                    <span>Code: </span>
                    <strong>{coupon.code}</strong>
                  </div>
                  <p className="coupon-expiry">Expires on: {coupon.expiryDate}</p>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
      
      {/* Scratch Cards */}
      <h2 className="section-title mt-5">Scratch Cards</h2>
      <p className="section-description mb-3">Scratch to reveal your rewards</p>
      
      <div className="scratch-cards-grid">
        {scratchCards.map(card => (
          <div key={card.id} className={`scratch-card ${card.revealed ? 'revealed' : ''}`}>
            {!card.revealed ? (
              <div className="scratch-card-front" onClick={() => revealScratchCard(card.id)}>
                <div className="scratch-icon">
                  <FaGift size={32} />
                </div>
                <div className="scratch-text">
                  <span>Scratch to Reveal</span>
                </div>
              </div>
            ) : (
              <div className="scratch-card-back">
                <div className="reward-icon">
                  <FaCreditCard size={32} />
                </div>
                <div className="reward-value">
                  {card.value}
                </div>
                <div className="reward-text">
                  <span>Congratulations!</span>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default RewardPoints; 