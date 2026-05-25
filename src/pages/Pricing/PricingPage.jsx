import React, { useState } from 'react';
import api from '../../services/api';
import './PricingPage.css';

const PricingPage = () => {
  const [loading, setLoading] = useState(false);

  const handleSubscribe = async (planType) => {
    setLoading(true);
    try {
      const response = await api.post('/subscriptions/checkout', { planType });
      // Redirect to Stripe checkout
      if (response.data && response.data.url) {
        window.location.href = response.data.url;
      }
    } catch (error) {
      console.error('Checkout failed', error);
      alert('Failed to initiate checkout. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pricing-container">
      <h1 className="pricing-title">Unlock Your Math Adventure</h1>
      <p className="pricing-subtitle">Choose the perfect plan to boost your learning!</p>

      <div className="pricing-cards">
        <div className="pricing-card free-tier">
          <h2>Free Tier</h2>
          <div className="price">RM 0 <span>/ month</span></div>
          <ul className="features">
            <li>✅ Basic Operations (Addition, Subtraction)</li>
            <li>✅ 5 Daily Hearts limit</li>
            <li>✅ Standard Badges</li>
            <li>❌ Premium Assessments</li>
          </ul>
          <button className="pricing-btn secondary" disabled>Current Plan</button>
        </div>

        <div className="pricing-card pro-tier">
          <div className="popular-badge">Most Popular</div>
          <h2>Pro Tier</h2>
          <div className="price">RM 15 <span>/ month</span></div>
          <ul className="features">
            <li>✨ All Math Operations & Reading</li>
            <li>✨ 10 Daily Hearts limit</li>
            <li>✨ Premium Leaderboards</li>
            <li>✨ Full Assessments & Certificates</li>
          </ul>
          <button 
            className="pricing-btn primary" 
            onClick={() => handleSubscribe('pro')}
            disabled={loading}
          >
            {loading ? 'Processing...' : 'Upgrade to Pro'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PricingPage;
