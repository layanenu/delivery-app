import PropTypes from 'prop-types';
import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import AppContext from '../context/AppContext';
import { getCartItems, sumCart } from '../services/localStorageUtils';

function ProductCheckout(props) {
  const { product, index } = props;
  const checkout = 'customer_checkout__';
  const item = 'element-order-table-item-number-';
  const name = 'element-order-table-name-';
  const quantidade = 'element-order-table-quantity-';
  const preco = 'element-order-table-unit-price-';
  const subTotal = 'element-order-table-sub-total-';
  const remove = 'element-order-table-remove-';

  const history = useHistory();
  const { cart, updateCart, updateCartValue } = useContext(AppContext);
  const [isCheckout, setIsCheckout] = useState(false);

  const rmvProduct = () => {
    const newCart = cart.filter((prod) => prod.id !== product.id);
    updateCart(newCart);
    localStorage.setItem('cartList', JSON.stringify(newCart));
    updateCartValue(sumCart());
  };

  const rmvBtn = (
    <button
      type="button"
      data-testid={ `${checkout}${remove}${index}` }
      onClick={ rmvProduct }
    >
      Remover
    </button>
  );

  useEffect(() => {
    if (history.location.pathname === '/customer/checkout') setIsCheckout(true);
    updateCart(getCartItems());
  }, []);

  return (
    <div>
      <span data-testid={ `${checkout}${item}${index}` }>{index + 1}</span>
      <span data-testid={ `${checkout}${name}${index}` }>{product.name}</span>
      <span data-testid={ `${checkout}${quantidade}${index}` }>
        {product.quantity}
      </span>
      <span data-testid={ `${checkout}${preco}${index}` }>
        {product.price.replace('.', ',')}
      </span>
      <span data-testid={ `${checkout}${subTotal}${index}` }>
        {String(product.subTotal.toFixed(2)).replace('.', ',')}
      </span>
      {isCheckout ? rmvBtn : null}

    </div>
  );
}

ProductCheckout.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    price: PropTypes.string,
    url_image: PropTypes.string,
    quantity: PropTypes.number,
    subTotal: PropTypes.number,
  }).isRequired,
  index: PropTypes.number.isRequired,
};

export default ProductCheckout;
