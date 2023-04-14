import React from 'react';
import '../App.css';

function OrderCard(order) {
  const {
    id,
    status,
    saleDate,
    totalPrice,
    page,
    role,
    deliveryAddress,
    goToOrder } = order;

  const newDate = new Date(saleDate);
  console.log(newDate);
  // const customerOrders = 'customer_orders__';
  const orderId = 'element-order-id-';
  const deliveryStatus = 'element-delivery-status-';
  const orderDate = 'element-order-date-';
  const orderPrice = 'element-card-price-';
  const address = 'element-card-address-';

  return (
    <tr onClick={ goToOrder }>
      <th data-testid={ `${page}${orderId}${id}` }>{id}</th>
      <td
        data-testid={ `${page}${orderDate}${id}` }
      >
        {newDate.toLocaleDateString('pt-BR')}
      </td>
      <td data-testid={ `${page}${deliveryStatus}${id}` }>{status}</td>
      <td
        data-testid={ `${page}${orderPrice}${id}` }
      >
        {`R$ ${totalPrice.replace('.', ',')}`}
      </td>
      {role === 'seller' ? (
        <td data-testid={ `${page}${address}${id}` }>{deliveryAddress}</td>
      ) : null }
    </tr>
  );
}

export default OrderCard;
