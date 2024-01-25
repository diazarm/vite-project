// landing.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';

import './landing.css';

const Landing = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost:4000/products');
      setProducts(response.data.info);
    } catch (error) {
      console.error('Error fetching products:', error.message);
    }
  };

  const handleSearch = async () => {
    try {
      const response = await axios.get(`http://localhost:4000/products?name=${searchTerm}`);
      setProducts(response.data.info);
    } catch (error) {
      console.error('Error searching products:', error.message);
    }
  };

  return (
    <div className="landing-container">
      <h1>La Botilleria de Marcelo</h1>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Buscar por nombre"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button onClick={handleSearch}>Buscar</button>
      </div>
      <div className="product-list">
        {products.map((product) => (
          <div key={product._id} className="product-card">
            <img src={product.image} alt={product.name} />
            <h3>{product.name}</h3>
            <p>Precio: ${product.price}</p>
            <p>Stock: {product.stock}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Landing;
