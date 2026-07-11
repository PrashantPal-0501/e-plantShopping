import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice.jsx';
import './CartItem.css';

function CartItem({ onContinueShopping, onHomeClick }) {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);

  const totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const totalAmount = cartItems.reduce(
    (sum, item) => sum + item.quantity * item.price,
    0
  );

  const handleIncrease = (item) => {
    dispatch(updateQuantity({ name: item.name, quantity: item.quantity + 1 }));
  };

  const handleDecrease = (item) => {
    if (item.quantity > 1) {
      dispatch(updateQuantity({ name: item.name, quantity: item.quantity - 1 }));
    } else {
      dispatch(removeItem(item.name));
    }
  };

  const handleDelete = (item) => {
    dispatch(removeItem(item.name));
  };

  const handleCheckout = () => {
    alert('Checkout — Coming Soon!');
  };

  return (
    <div className="cart-page">
      <header className="app-header">
        <div className="header-left" onClick={onHomeClick} role="button" tabIndex={0}>
          <span className="logo-circle">🌿</span>
          <div className="brand-text">
            <span className="brand-name">Paradise Nursery</span>
            <span className="brand-tag">Where Green Meets Serenity</span>
          </div>
        </div>

        <nav className="header-nav">
          <button className="nav-link" onClick={onHomeClick}>Home</button>
          <button className="nav-link" onClick={onContinueShopping}>Plants</button>
          <button className="nav-link active">Cart</button>
        </nav>

        <div className="cart-icon-btn">
          <svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="9" cy="21" r="1" />
            <circle cx="20" cy="21" r="1" />
            <path d="M1 1h4l2.68 13.39a2 2 0 002 1.61h9.72a2 2 0 002-1.61L23 6H6" />
          </svg>
          <span className="cart-badge">{totalQuantity}</span>
        </div>
      </header>

      <main className="cart-main">
        <h1 className="cart-title">Shopping Cart</h1>
        <p className="cart-summary">
          Total Items: <strong>{totalQuantity}</strong> &nbsp;|&nbsp; Total Cart
          Amount: <strong>${totalAmount}</strong>
        </p>

        {cartItems.length === 0 ? (
          <p className="empty-cart">Your cart is empty.</p>
        ) : (
          <div className="cart-items">
            {cartItems.map((item) => (
              <div className="cart-row" key={item.name}>
                <img src={item.image} alt={item.name} className="cart-thumb" />

                <div className="cart-details">
                  <h3 className="cart-item-name">{item.name}</h3>
                  <p className="cart-item-price">${item.price}</p>

                  <div className="qty-controls">
                    <button
                      className="qty-btn"
                      onClick={() => handleDecrease(item)}
                      aria-label={`Decrease quantity of ${item.name}`}
                    >
                      −
                    </button>
                    <span className="qty-value">{item.quantity}</span>
                    <button
                      className="qty-btn"
                      onClick={() => handleIncrease(item)}
                      aria-label={`Increase quantity of ${item.name}`}
                    >
                      +
                    </button>
                  </div>

                  <p className="cart-item-total">
                    Total: ${item.price * item.quantity}
                  </p>

                  <button className="delete-btn" onClick={() => handleDelete(item)}>
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="cart-actions">
          <button className="continue-btn" onClick={onContinueShopping}>
            Continue Shopping
          </button>
          <button className="checkout-btn" onClick={handleCheckout}>
            Checkout
          </button>
        </div>
      </main>
    </div>
  );
}

export default CartItem;
