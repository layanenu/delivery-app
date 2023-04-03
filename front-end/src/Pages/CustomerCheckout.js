import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Navbar from '../components/Navbar';
import ProductCheckout from '../components/ProductCheckout';
import AppContext from '../context/AppContext';
import { getCartItems, sumCart } from '../services/localStorageUtils';

function CustomerCheckout() {
  const checkout = 'customer_checkout__';
  const vendedor = 'select-seller';
  const endereco = 'input-address';
  const enderecoNum = 'input-address-number';
  const btnEnviar = 'button-submit-order';
  const totalPedido = 'element-order-total-price';
  const { cart, updateCart } = useContext(AppContext);
  const { totalCart, updateCartValue } = useContext(AppContext);
  const history = useHistory();

  useEffect(() => {
    updateCart(getCartItems());
    updateCartValue(sumCart());
  }, []);
  console.log(cart);
  return (
    <div>
      <Navbar />
      {cart.map((product, index) => (
        <ProductCheckout key={ index } product={ product } index={ index } />
      ))}
      <button type="button">
        TOTAL: R$
        {' '}
        <span data-testid={ `${checkout}${totalPedido}` }>{totalCart}</span>
      </button>
      <select data-testid={ `${checkout}${vendedor}` }>
        <option>Vendedor 1</option>
      </select>
      <input type="text" data-testid={ `${checkout}${endereco}` } />
      <input type="number" data-testid={ `${checkout}${enderecoNum}` } />
      <button
        type="button"
        data-testid={ `${checkout}${btnEnviar}` }
        onClick={ () => history.push('/customer/orders') }
      >
        FINALIZAR_PEDIDO
      </button>
    </div>
  );
}

export default CustomerCheckout;
