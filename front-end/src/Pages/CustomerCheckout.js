import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Navbar from '../components/Navbar';
import ProductCheckout from '../components/ProductCheckout';
import AppContext from '../context/AppContext';
import { getCartItems, sumCart } from '../services/localStorageUtils';
import { requestData, requestLogin } from '../services/request';

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
  const [sellers, setSellers] = useState([]);
  const [selectedSeller, setSelectedSeller] = useState(0);
  const [address, setAddres] = useState('');
  const [addressNumber, setAddresnumber] = useState(0);
  const [userId, setUserId] = useState(0);

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
    const user = JSON.parse(localStorage.getItem('user'));
    setUserId(user.id);
  }, []);

  useEffect(() => {
    setSelectedSeller(sellers[0]);
  }, [sellers]);

  const insertSale = async () => {
    const response = await requestLogin('/sales', {
      sellerId: Number(selectedSeller.id),
      totalPrice: totalCart,
      deliveryAddress: address,
      deliveryNumber: Number(addressNumber),
      userId: Number(userId),
      products: cart,
    });
    console.log(response);
    history.push(`/customer/orders/${response.id}`);
  };

  const setSeller = (e) => {
    setSelectedSeller(e.target.value);
  };
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
      <select
        data-testid={ `${checkout}${vendedor}` }
        value={ selectedSeller }
        onChange={ setSeller }
      >
        {sellers.map((seller) => (
          <option value={ seller } key={ seller.id }>{seller.name}</option>))}
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
        onClick={ () => insertSale() }
      >
        FINALIZAR_PEDIDO
      </button>
    </div>
  );
}

export default CustomerCheckout;
