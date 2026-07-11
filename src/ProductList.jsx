import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addItem } from './CartSlice.jsx';
import './ProductList.css';

const plantCategories = [
  {
    category: 'Air Purifying Plants',
    plants: [
      {
        name: 'Snake Plant',
        price: 15,
        image: 'https://source.unsplash.com/400x400/?snakeplant',
        description: 'Produces oxygen at night, improving air quality.',
      },
      {
        name: 'Spider Plant',
        price: 12,
        image: 'https://source.unsplash.com/400x400/?spiderplant',
        description: 'Filters formaldehyde and xylene from the air.',
      },
      {
        name: 'Peace Lily',
        price: 18,
        image: 'https://source.unsplash.com/400x400/?peacelily',
        description: 'Removes mold spores and purifies the air.',
      },
    ],
  },
  {
    category: 'Aromatic Fragrant Plants',
    plants: [
      {
        name: 'Lavender',
        price: 20,
        image: 'https://source.unsplash.com/400x400/?lavender',
        description: 'Calming fragrance known to help with sleep.',
      },
      {
        name: 'Jasmine',
        price: 18,
        image: 'https://source.unsplash.com/400x400/?jasmine,flower',
        description: 'Sweet-scented blooms, popular in aromatherapy.',
      },
      {
        name: 'Rosemary',
        price: 15,
        image: 'https://source.unsplash.com/400x400/?rosemary,herb',
        description: 'Fragrant herb that doubles as a kitchen staple.',
      },
    ],
  },
  {
    category: 'Succulents',
    plants: [
      {
        name: 'Aloe Vera',
        price: 14,
        image: 'https://source.unsplash.com/400x400/?aloevera',
        description: 'Low-maintenance succulent with healing gel.',
      },
      {
        name: 'Echeveria',
        price: 16,
        image: 'https://source.unsplash.com/400x400/?echeveria,succulent',
        description: 'Rosette-shaped succulent, thrives on neglect.',
      },
      {
        name: 'Haworthia',
        price: 17,
        image: 'https://source.unsplash.com/400x400/?haworthia,succulent',
        description: 'Compact, striped succulent perfect for small spaces.',
      },
    ],
  },
];

function ProductList({ onCartClick, onHomeClick }) {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);

  const totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const isInCart = (name) => cartItems.some((item) => item.name === name);

  const handleAddToCart = (plant) => {
    dispatch(addItem(plant));
  };

  return (
    <div className="product-list-page">
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
          <button className="nav-link active">Plants</button>
          <button className="nav-link" onClick={onCartClick}>Cart</button>
        </nav>

        <button className="cart-icon-btn" onClick={onCartClick} aria-label="View cart">
          <svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="9" cy="21" r="1" />
            <circle cx="20" cy="21" r="1" />
            <path d="M1 1h4l2.68 13.39a2 2 0 002 1.61h9.72a2 2 0 002-1.61L23 6H6" />
          </svg>
          <span className="cart-badge">{totalQuantity}</span>
        </button>
      </header>

      <main className="product-list-main">
        {plantCategories.map((cat) => (
          <section key={cat.category} className="category-block">
            <h2 className="category-heading">{cat.category}</h2>
            <div className="plant-grid">
              {cat.plants.map((plant) => {
                const added = isInCart(plant.name);
                return (
                  <article className="plant-card" key={plant.name}>
                    <span className="sale-badge">SALE</span>
                    <img src={plant.image} alt={plant.name} className="plant-thumb" />
                    <h3 className="plant-name">{plant.name}</h3>
                    <p className="plant-price">${plant.price}</p>
                    <p className="plant-desc">{plant.description}</p>
                    <button
                      className={`add-to-cart-btn ${added ? 'added' : ''}`}
                      onClick={() => handleAddToCart(plant)}
                      disabled={added}
                    >
                      {added ? 'Added to Cart' : 'Add to Cart'}
                    </button>
                  </article>
                );
              })}
            </div>
          </section>
        ))}
      </main>
    </div>
  );
}

export default ProductList;
