import { useState } from 'react';
import AboutUs from './AboutUs.jsx';
import ProductList from './ProductList.jsx';
import CartItem from './CartItem.jsx';
import './App.css';

function App() {
  // Controls which "page" is visible: landing | products | cart
  const [view, setView] = useState('landing');

  const handleGetStartedClick = () => setView('products');
  const goToCart = () => setView('cart');
  const goToLanding = () => setView('landing');

  return (
    <div className="app">
      {view === 'landing' && (
        <section className="landing-page">
          <div className="landing-overlay">
            <p className="tagline">Where Green Meets Serenity</p>
            <h1 className="company-name">Paradise Nursery</h1>
            <AboutUs />
            <button className="get-started-btn" onClick={handleGetStartedClick}>
              Get Started
            </button>
          </div>
        </section>
      )}

      {view === 'products' && (
        <ProductList onCartClick={goToCart} onHomeClick={goToLanding} />
      )}

      {view === 'cart' && (
        <CartItem onContinueShopping={handleGetStartedClick} onHomeClick={goToLanding} />
      )}
    </div>
  );
}

export default App;
