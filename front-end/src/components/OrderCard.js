import React from 'react';

function OrderCard(order) {
  const { id, status, saleDate, totalPrice, page, role, deliveryAddress } = order;
  const newDate = new Date(saleDate);
  console.log(newDate);
  // const customerOrders = 'customer_orders__';
  const orderId = 'element-order-id-';
  const deliveryStatus = 'element-delivery-status-';
  const orderDate = 'element-order-date-';
  const orderPrice = 'element-card-price-';
  const address = 'element-card-address-';

  return (
    <div>
      <span data-testid={ `${page}${orderId}${id}` }>{id}</span>
      <span data-testid={ `${page}${deliveryStatus}${id}` }>{status}</span>
      <span
        data-testid={ `${page}${orderDate}${id}` }
      >
        {newDate.toLocaleDateString('pt-BR')}
      </span>
      <span
        data-testid={ `${page}${orderPrice}${id}` }
      >
        {`R$ ${totalPrice.replace('.', ',')}`}
      </span>
      {role === 'seller' ? (
        <span data-testid={ `${page}${address}${id}` }>{deliveryAddress}</span>
      ) : null }
    </div>
  );
}

export default OrderCard;
