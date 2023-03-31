import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import ProductCard from '../components/ProductCard';
import { getCartItems } from '../services/localStorageUtils';
import { requestData } from '../services/request';

function CustomerProducts() {
  const [cartItems, setCartItems] = useState([]);
  const [products, setProducts] = useState([]);

  const cartTotalValue = 100;

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
      <div>
        {products
          .map((product) => <ProductCard key={ product.id } product={ product } />)}
      </div>
      <footer>
        <button
          type="button"
        >
          {`VER CARRINHO: R$ ${cartTotalValue}`}
        </button>
      </footer>

    </div>
  );
}

export default CustomerProducts;
