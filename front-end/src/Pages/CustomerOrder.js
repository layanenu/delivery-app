import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import ProductCheckout from '../components/ProductCheckout';
import { requestData } from '../services/request';

function CustomerOrder(props) {
  const { id } = props;

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

  useEffect(() => {
    console.log(id);
    async function fetchData() {
      const result = await requestData(`/sales/${id}`);
      console.log(result);
      setSale(result);
    }

    fetchData();
  }, []);

  useEffect(() => {
    const total = sale.products.reduce((acc, obj) => {
      acc += obj.subTotal;
      console.log(obj);
      return acc;
    }, 0);
    setTotalCart(total.toFixed(2).replace('.', ','));
  }, [sale]);

  return (
    <div>
      <Navbar />
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
      <button type="button">
        TOTAL: R$
        {' '}
        <span data-testid={ `${orderDetails}${totalPedido}` }>{totalCart}</span>
      </button>
    </div>
  );
}

// CustomerOrder.propTypes = {
//   id: PropTypes.string.isRequired,
// };

export default CustomerOrder;
