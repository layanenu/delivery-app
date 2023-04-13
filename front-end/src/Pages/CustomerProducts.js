import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Navbar from '../components/Navbar';
import ProductCard from '../components/ProductCard';
import AppContext from '../context/AppContext';
import { sumCart } from '../services/localStorageUtils';
// import { getCartItems } from '../services/localStorageUtils';
import { requestData } from '../services/request';
import '../App.css';

function CustomerProducts() {
  const [products, setProducts] = useState([]);

  const { totalCart, updateCartValue } = useContext(AppContext);

  const history = useHistory();

  useEffect(() => {
    async function fetchData() {
      const result = await requestData('/products');
      setProducts(result);
    }
    const total = sumCart();
    updateCartValue(total);
    fetchData();
  }, []);

  const customerProducts = 'customer_products__';

  return (
    <div>
      <Navbar />
      <div className="text-center container py-5">
        <div className="d-flex align-items-center containerWrap">
          {products
            .map((product) => <ProductCard key={ product.id } product={ product } />)}
        </div>
      </div>
      <footer>
        <button
          type="button"
          data-testid={ `${customerProducts}button-cart` }
          onClick={ () => history.push('/customer/checkout') }
          disabled={ !totalCart }
        >
          VER CARRINHO: R$
          {' '}
          <span
            data-testid={ `${customerProducts}checkout-bottom-value` }
          >
            {totalCart}
          </span>
        </button>
      </footer>

    </div>
  );
}

export default CustomerProducts;
