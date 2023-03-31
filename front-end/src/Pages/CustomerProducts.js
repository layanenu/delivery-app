import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import ProductCard from '../components/ProductCard';
import { getCartItems } from '../services/localStorageUtils';
import { requestData } from '../services/request';

function CustomerProducts() {
  const [cartItems, setCartItems] = useState([]);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const result = await requestData('/products');
      setProducts(result);
    }

    fetchData();

    const cart = getCartItems();
    setCartItems(cart);
    console.log(cartItems);
  }, []);
  return (
    <div>
      <Navbar />
      {products.map((product) => <ProductCard key={ product.id } product={ product } />)}
    </div>
  );
}

export default CustomerProducts;
