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
    console.log(selectedSeller);
    const { token } = JSON.parse(localStorage.getItem('user'));
    const { id } = await requestWithToken('/sales', {
      sellerId: Number(selectedSeller),
      totalPrice: totalCart,
      deliveryAddress: address,
      deliveryNumber: Number(addressNumber),
      products: cart,
    }, token);

    history.push(`/customer/orders/${id}`);
  };

  const setSeller = (e) => {
    console.log(e.target.value);
    setSelectedSeller(e.target.value);
  };
  return (
    <div>
      <Navbar />
      <table className="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Produto</th>
            <th scope="col">Quantidade</th>
            <th scope="col">Valor Unitário</th>
            <th scope="col">Sub-total</th>
            <th scope="col">Remover Item</th>
          </tr>
        </thead>
        <tbody>
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
        </tbody>
      </table>
      <h3>
        Total: R$
        <span data-testid={ `${checkout}${totalPedido}` }>{totalCart}</span>
      </h3>
      <form>
        <div className="addressForm">
          <h3>Detalhes e endereço de entrega</h3>
          <select
            className="form-select"
            data-testid={ `${checkout}${vendedor}` }
            value={ selectedSeller }
            onClick={ setSeller }
          >
            {sellers.map((seller) => (
              <option value={ seller.id } key={ seller.id }>{seller.name}</option>))}
          </select>
          <label
            className="form-label"
            htmlFor="addressForm"
          >
            <input
              placeholder="endereço"
              id="addressForm"
              className="form-control"
              type="text"
              data-testid={ `${checkout}${endereco}` }
              value={ address }
              onChange={ (e) => setAddres(e.target.value) }
            />
          </label>
          <label
            className="form-label"
            htmlFor="numberForm"
          >
            <input
              id="numberForm"
              className="form-control"
              type="number"
              data-testid={ `${checkout}${enderecoNum}` }
              value={ addressNumber }
              onChange={ (e) => setAddresnumber(e.target.value) }
            />
          </label>
          <button
            className="btn btn-primary flex-fill me-1"
            type="button"
            data-testid={ `${checkout}${btnEnviar}` }
            onClick={ insertSale }
            disabled={ cart.length < 1 }
          >
            FINALIZAR_PEDIDO
          </button>
        </div>
      </form>
    </div>
  );
}

export default CustomerCheckout;
