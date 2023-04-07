import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Navbar from '../components/Navbar';
import { requestData, requestUpdate } from '../services/request';
import ProductCheckout from '../components/ProductCheckout';
import { sum } from '../services/localStorageUtils';

function SellerOrder({ match: { params: { id } } }) {
  const orderDetails = 'seller_order_details__';
  const item = 'element-order-table-item-number-';
  const name = 'element-order-table-name-';
  const quantidade = 'element-order-table-quantity-';
  const preco = 'element-order-table-unit-price-';
  const subTotal = 'element-order-table-sub-total-';
  const totalPedido = 'element-order-total-price';
  const orderId = 'element-order-details-label-order-id';
  // const sellerName = 'element-order-details-label-seller-name';
  const orderDate = 'element-order-details-label-order-date';
  const deliveryStatus = 'element-order-details-label-delivery-status';
  const preparingCheck = 'button-preparing-check';
  const dispatchCheck = 'button-dispatch-check';

  const [order, setOrder] = useState({ products: [] });
  const [totalValue, setTotalValue] = useState(0);
  const [orderStatus, setOrderStatus] = useState('');

  useEffect(() => {
    async function fetchOrder() {
      const response = await requestData(`/sales/${id}`);
      setOrder(response);
      setOrderStatus(response.status);
      console.log(response);
    }
    fetchOrder();
    console.log(order);
  }, []);

  useEffect(() => {
    const total = sum(order.products);
    setTotalValue(total);
  }, [order]);

  const updateStatus = async (newStatus) => {
    const { status } = await requestUpdate(`/sales/status/${id}`, { status: newStatus });
    setOrderStatus(status);
  };

  return (
    <div>
      <Navbar />
      <div>
        <span data-testid={ `${orderDetails}${orderId}` }>
          Pedido:
          {' '}
          {order.id}
        </span>
        {/* <span data-testid={ `${orderDetails}${sellerName}` }>{order.sellerName}</span> */}
        <span data-testid={ `${orderDetails}${orderDate}` }>{order.saleDate}</span>
        <span data-testid={ `${orderDetails}${deliveryStatus}` }>{orderStatus}</span>
        <button
          data-testid={ `${orderDetails}${preparingCheck}` }
          type="button"
          onClick={ () => updateStatus('Preparando') }
          disabled={ orderStatus !== 'Pendente' }
        >
          PREPARAR PEDIDO
        </button>
        <button
          data-testid={ `${orderDetails}${dispatchCheck}` }
          type="button"
          onClick={ () => updateStatus('Em Trânsito') }
          disabled={ orderStatus !== 'Preparando' }
        >
          SAIU PARA ENTREGA
        </button>
      </div>
      {order.products.map((product, index) => (
        <ProductCheckout
          key={ index }
          product={ product }
          index={ index }
          page={ orderDetails }
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
        <p data-testid={ `${orderDetails}${totalPedido}` }>{totalValue}</p>
      </button>
    </div>

  );
}

export default SellerOrder;

SellerOrder.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    }).isRequired,
  }).isRequired,
};
