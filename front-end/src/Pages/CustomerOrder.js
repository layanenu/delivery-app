import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import ProductCheckout from '../components/ProductCheckout';
import { requestData, requestUpdate } from '../services/request';

function CustomerOrder({ match: { params: { id } } }) {
  const orderDetails = 'customer_order_details__';
  const item = 'element-order-table-item-number-';
  const name = 'element-order-table-name-';
  const quantidade = 'element-order-table-quantity-';
  const preco = 'element-order-table-unit-price-';
  const subTotal = 'element-order-table-sub-total-';
  const totalPedido = 'element-order-total-price';
  const orderId = 'element-order-details-label-order-id';
  const sellerName = 'element-order-details-label-seller-name';
  const orderDate = 'element-order-details-label-order-date';
  const deliveryStatus = 'element-order-details-label-delivery-status';
  const deliveryCheck = 'button-delivery-check';

  const [totalCart, setTotalCart] = useState(1);
  const [sale, setSale] = useState({ products: [] });
  const [orderStatus, setOrderStatus] = useState('');

  useEffect(() => {
    console.log(id);
    async function fetchData() {
      const result = await requestData(`/sales/${id}`);
      console.log(result);
      setSale(result);
      setOrderStatus(result.status);
    }

    fetchData();
  }, []);

  useEffect(() => {
    const total = sale.products.reduce((acc, obj) => {
      acc += obj.subTotal;
      return acc;
    }, 0);
    setTotalCart(total.toFixed(2).replace('.', ','));
  }, [sale]);

  const updateStatus = async (newStatus) => {
    const { status } = await requestUpdate(`/sales/status/${id}`, { status: newStatus });
    setOrderStatus(status);
  };

  return (
    <div>
      <Navbar />
      <br />
      <div className="d-flex justify-content-evenly">
        <h4 data-testid={ `${orderDetails}${orderId}` }>
          Pedido:
          {' '}
          {sale.id}
        </h4>
        <h4 data-testid={ `${orderDetails}${sellerName}` }>{sale.sellerName}</h4>
        <h4 data-testid={ `${orderDetails}${orderDate}` }>{sale.saleDate}</h4>
        <h4 data-testid={ `${orderDetails}${deliveryStatus}` }>{orderStatus}</h4>
        <button
          className="btn btn-primary me-1"
          data-testid={ `${orderDetails}${deliveryCheck}` }
          type="button"
          disabled={ orderStatus !== 'Em Trânsito' }
          onClick={ () => updateStatus('Entregue') }
        >
          MARCAR COMO ENTREGUE
        </button>
      </div>
      <br />
      <table className="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Produto</th>
            <th scope="col">Quantidade</th>
            <th scope="col">Valor Unitário</th>
            <th scope="col">Sub-total</th>
          </tr>
        </thead>
        <tbody>
          {sale.products.map((product, index) => (
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
        </tbody>
      </table>
      <br />
      <h3>
        Total: R$
        <span data-testid={ `${orderDetails}${totalPedido}` }>{totalCart}</span>
      </h3>
    </div>
  );
}

CustomerOrder.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    }).isRequired,
  }).isRequired,
};

export default CustomerOrder;
