import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import ProductCard from '../components/ProductCard';
import { getCartItems } from '../services/localStorageUtils';
import { requestData } from '../services/request';

function CustomerProducts() {
  const [cartItems, setCartItems] = useState([]);

  const [produtos, setProdutos] = useState([]);
  useEffect(async () => {
    const result = await requestData('/products');
    setProdutos(result);

    const cart = getCartItems();
    setCartItems(cart);
  }, []);
  return (
    <div>
      <Navbar />
      {produtos.map((produto) => <ProductCard key={ produto.id } produto={ produto } />)}
    </div>
  );
}

export default CustomerProducts;
