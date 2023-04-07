import PropTypes from 'prop-types';
import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import AppContext from '../context/AppContext';
import { getCartItems, sumCart } from '../services/localStorageUtils';

function ProductCheckout(props) {
  const { product, index, page, item, name, quantidade, preco, subTotal } = props;

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
      data-testid={ `${page}${remove}${index}` }
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
      <span data-testid={ `${page}${item}${index}` }>{`${index + 1} - `}</span>
      <span data-testid={ `${page}${name}${index}` }>{`${product.name} - `}</span>
      <span data-testid={ `${page}${quantidade}${index}` }>
        {`${product.quantity} - `}
      </span>
      <span data-testid={ `${page}${preco}${index}` }>
        {`${product.price.replace('.', ',')} - `}
      </span>
      <span data-testid={ `${page}${subTotal}${index}` }>
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
  page: PropTypes.string.isRequired,
  item: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  quantidade: PropTypes.string.isRequired,
  preco: PropTypes.string.isRequired,
  subTotal: PropTypes.string.isRequired,
};

export default ProductCheckout;
