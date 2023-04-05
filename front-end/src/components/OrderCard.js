import React from 'react';

function OrderCard(order) {
  const { id, status, saleDate, totalPrice } = order;
  const newDate = new Date(saleDate);
  console.log(newDate);
  const customerOrders = 'customer_orders__';
  const orderId = 'element-order-id-';
  const deliveryStatus = 'element-delivery-status-';
  const orderDate = 'element-order-date-';
  const orderPrice = 'element-card-price-';

  return (
    <div>
      <span data-testid={ `${customerOrders}${orderId}${id}` }>{id}</span>
      <span data-testid={ `${customerOrders}${deliveryStatus}${id}` }>{status}</span>
      <span
        data-testid={ `${customerOrders}${orderDate}${id}` }
      >
        {newDate.toLocaleDateString('pt-BR')}
      </span>
      <span
        data-testid={ `${customerOrders}${orderPrice}${id}` }
      >
        {`R$ ${totalPrice.replace('.', ',')}`}

      </span>
    </div>
  );
}

export default OrderCard;
