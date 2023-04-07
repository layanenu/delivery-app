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
      <p data-testid={ `${page}${orderId}${id}` }>{id}</p>
      <p
        data-testid={ `${page}${orderDate}${id}` }
      >
        {newDate.toLocaleDateString('pt-BR')}
      </p>
      <p data-testid={ `${page}${deliveryStatus}${id}` }>{status}</p>
      <p
        data-testid={ `${page}${orderPrice}${id}` }
      >
        {`R$ ${totalPrice.replace('.', ',')}`}
      </p>
      {role === 'seller' ? (
        <p data-testid={ `${page}${address}${id}` }>{deliveryAddress}</p>
      ) : null }
    </div>
  );
}

export default OrderCard;
