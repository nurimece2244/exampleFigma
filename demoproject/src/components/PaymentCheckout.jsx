import React, { useState } from 'react';
import './PaymentCheckout.css';

const PaymentCheckout = () => {
  const [formData, setFormData] = useState({
    email: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardholderName: '',
    billingAddress: '',
    city: '',
    state: '',
    zipCode: '',
    country: ''
  });

  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const formatCardNumber = (value) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = matches && matches[0] || '';
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    if (parts.length) {
      return parts.join(' ');
    } else {
      return v;
    }
  };

  const formatExpiryDate = (value) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    if (v.length >= 2) {
      return v.substring(0, 2) + '/' + v.substring(2, 4);
    }
    return v;
  };

  const handleCardNumberChange = (e) => {
    const formatted = formatCardNumber(e.target.value);
    setFormData(prev => ({
      ...prev,
      cardNumber: formatted
    }));
  };

  const handleExpiryChange = (e) => {
    const formatted = formatExpiryDate(e.target.value);
    setFormData(prev => ({
      ...prev,
      expiryDate: formatted
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.email) newErrors.email = 'Email is required';
    if (!formData.cardNumber) newErrors.cardNumber = 'Card number is required';
    if (!formData.expiryDate) newErrors.expiryDate = 'Expiry date is required';
    if (!formData.cvv) newErrors.cvv = 'CVV is required';
    if (!formData.cardholderName) newErrors.cardholderName = 'Cardholder name is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log('Payment submitted:', formData);
      // Handle payment processing here
    }
  };

  return (
    <div className="payment-checkout">
      <div className="payment-container">
        <div className="payment-form-section">
          <div className="payment-header">
            <h1>Checkout</h1>
            <p>Complete your purchase</p>
          </div>

          <form onSubmit={handleSubmit} className="payment-form">
            {/* Contact Information */}
            <section className="form-section">
              <h2>Contact Information</h2>
              <div className="form-group">
                <label htmlFor="email">Email Address</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={errors.email ? 'error' : ''}
                  placeholder="your@email.com"
                />
                {errors.email && <span className="error-message">{errors.email}</span>}
              </div>
            </section>

            {/* Payment Method */}
            <section className="form-section">
              <h2>Payment Method</h2>
              <div className="payment-methods">
                <div className="payment-method active">
                  <input type="radio" id="card" name="paymentMethod" defaultChecked />
                  <label htmlFor="card">
                    <span className="method-icon">💳</span>
                    Credit Card
                  </label>
                </div>
              </div>

              <div className="card-details">
                <div className="form-group">
                  <label htmlFor="cardNumber">Card Number</label>
                  <input
                    type="text"
                    id="cardNumber"
                    name="cardNumber"
                    value={formData.cardNumber}
                    onChange={handleCardNumberChange}
                    className={errors.cardNumber ? 'error' : ''}
                    placeholder="1234 1234 1234 1234"
                    maxLength="19"
                  />
                  {errors.cardNumber && <span className="error-message">{errors.cardNumber}</span>}
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="expiryDate">Expiry Date</label>
                    <input
                      type="text"
                      id="expiryDate"
                      name="expiryDate"
                      value={formData.expiryDate}
                      onChange={handleExpiryChange}
                      className={errors.expiryDate ? 'error' : ''}
                      placeholder="MM/YY"
                      maxLength="5"
                    />
                    {errors.expiryDate && <span className="error-message">{errors.expiryDate}</span>}
                  </div>

                  <div className="form-group">
                    <label htmlFor="cvv">CVV</label>
                    <input
                      type="text"
                      id="cvv"
                      name="cvv"
                      value={formData.cvv}
                      onChange={handleInputChange}
                      className={errors.cvv ? 'error' : ''}
                      placeholder="123"
                      maxLength="4"
                    />
                    {errors.cvv && <span className="error-message">{errors.cvv}</span>}
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="cardholderName">Cardholder Name</label>
                  <input
                    type="text"
                    id="cardholderName"
                    name="cardholderName"
                    value={formData.cardholderName}
                    onChange={handleInputChange}
                    className={errors.cardholderName ? 'error' : ''}
                    placeholder="John Doe"
                  />
                  {errors.cardholderName && <span className="error-message">{errors.cardholderName}</span>}
                </div>
              </div>
            </section>

            {/* Billing Address */}
            <section className="form-section">
              <h2>Billing Address</h2>
              <div className="form-group">
                <label htmlFor="billingAddress">Address</label>
                <input
                  type="text"
                  id="billingAddress"
                  name="billingAddress"
                  value={formData.billingAddress}
                  onChange={handleInputChange}
                  placeholder="123 Main Street"
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="city">City</label>
                  <input
                    type="text"
                    id="city"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    placeholder="New York"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="state">State</label>
                  <input
                    type="text"
                    id="state"
                    name="state"
                    value={formData.state}
                    onChange={handleInputChange}
                    placeholder="NY"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="zipCode">ZIP Code</label>
                  <input
                    type="text"
                    id="zipCode"
                    name="zipCode"
                    value={formData.zipCode}
                    onChange={handleInputChange}
                    placeholder="10001"
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="country">Country</label>
                <select
                  id="country"
                  name="country"
                  value={formData.country}
                  onChange={handleInputChange}
                >
                  <option value="">Select Country</option>
                  <option value="US">United States</option>
                  <option value="CA">Canada</option>
                  <option value="UK">United Kingdom</option>
                  <option value="DE">Germany</option>
                  <option value="FR">France</option>
                </select>
              </div>
            </section>

            <button type="submit" className="pay-button">
              Complete Payment
            </button>
          </form>
        </div>

        <div className="order-summary-section">
          <div className="order-summary">
            <h2>Order Summary</h2>
            
            <div className="order-items">
              <div className="order-item">
                <div className="item-info">
                  <h3>Premium Plan</h3>
                  <p>Monthly subscription</p>
                </div>
                <div className="item-price">$29.99</div>
              </div>
              
              <div className="order-item">
                <div className="item-info">
                  <h3>Setup Fee</h3>
                  <p>One-time charge</p>
                </div>
                <div className="item-price">$9.99</div>
              </div>
            </div>

            <div className="order-totals">
              <div className="total-row">
                <span>Subtotal</span>
                <span>$39.98</span>
              </div>
              <div className="total-row">
                <span>Tax</span>
                <span>$3.20</span>
              </div>
              <div className="total-row total">
                <span>Total</span>
                <span>$43.18</span>
              </div>
            </div>

            <div className="security-info">
              <div className="security-badge">
                <span>🔒</span>
                <div>
                  <p><strong>Secure Payment</strong></p>
                  <p>Your payment information is encrypted</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentCheckout;