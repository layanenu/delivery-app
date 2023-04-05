import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Navbar from '../components/Navbar';
import ProductCheckout from '../components/ProductCheckout';
import AppContext from '../context/AppContext';
import { getCartItems, sumCart } from '../services/localStorageUtils';
import { requestData, requestWithToken } from '../services/request';

function CustomerCheckout() {
  const checkout = 'customer_checkout__';
  const vendedor = 'select-seller';
  const endereco = 'input-address';
  const enderecoNum = 'input-address-number';
  const btnEnviar = 'button-submit-order';
  const totalPedido = 'element-order-total-price';

  const item = 'element-order-table-item-number-';
  const name = 'element-order-table-name-';
  const quantidade = 'element-order-table-quantity-';
  const preco = 'element-order-table-unit-price-';
  const subTotal = 'element-order-table-sub-total-';

  const { cart, updateCart } = useContext(AppContext);
  const { totalCart, updateCartValue } = useContext(AppContext);
  const history = useHistory();
  const [sellers, setSellers] = useState([]);
  const [selectedSeller, setSelectedSeller] = useState(0);
  const [address, setAddres] = useState('');
  const [addressNumber, setAddresnumber] = useState(0);
  // const [userId, setUserId] = useState(0);

  useEffect(() => {
    updateCart(getCartItems());
    updateCartValue(sumCart());

    async function fetchData() {
      const result = await requestData('/sellers');
      setSellers(result);
    }

    fetchData();
  }, []);

  useEffect(() => {
    setSelectedSeller(sellers[0]);
  }, [sellers]);

  const insertSale = async () => {
    const { token } = JSON.parse(localStorage.getItem('user'));
    const { id } = await requestWithToken('/sales', {
      sellerId: Number(selectedSeller.id),
      totalPrice: totalCart,
      deliveryAddress: address,
      deliveryNumber: Number(addressNumber),
      products: cart,
    }, token);

    history.push(`/customer/orders/${id}`);
  };

  const setSeller = (e) => {
    setSelectedSeller(e.target.value);
  };
  return (
    <div>
      <Navbar />
      {cart.map((product, index) => (
        <ProductCheckout
          key={ index }
          product={ product }
          index={ index }
          page={ checkout }
          item={ item }
          name={ name }
          quantidade={ quantidade }
          preco={ preco }
          subTotal={ subTotal }
        />
      ))}
      <button type="button">
        TOTAL: R$
        {' '}
        <span data-testid={ `${checkout}${totalPedido}` }>{totalCart}</span>
      </button>
      <select
        data-testid={ `${checkout}${vendedor}` }
        value={ selectedSeller }
        onClick={ setSeller }
      >
        {sellers.map((seller) => (
          <option value={ seller.id } key={ seller.id }>{seller.name}</option>))}
      </select>
      <input
        type="text"
        data-testid={ `${checkout}${endereco}` }
        value={ address }
        onChange={ (e) => setAddres(e.target.value) }
      />
      <input
        type="number"
        data-testid={ `${checkout}${enderecoNum}` }
        value={ addressNumber }
        onChange={ (e) => setAddresnumber(e.target.value) }
      />
      <button
        type="button"
        data-testid={ `${checkout}${btnEnviar}` }
        onClick={ insertSale }
        disabled={ cart.length < 1 }
      >
        FINALIZAR_PEDIDO
      </button>
    </div>
  );
}

export default CustomerCheckout;
