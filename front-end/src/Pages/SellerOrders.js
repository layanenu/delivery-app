import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Navbar from '../components/Navbar';
import OrderCard from '../components/OrderCard';
import { requestData } from '../services/request';

function SellerOrders() {
  const [orders, setOrders] = useState([]);
  const history = useHistory();

  const sellerOrders = 'seller_orders__';
  const role = 'seller';

  useEffect(() => {
    const { id } = JSON.parse(localStorage.getItem('user'));

    async function fetchData() {
      const result = await requestData(`/sales/seller/${id}`);
      setOrders(result);
    }

    fetchData();
    console.log(orders);
  }, []);

  return (
    <div>
      <Navbar />
      { orders.length > 0 ? orders.map((order) => (
        <button
          key={ order.id }
          type="button"
          onClick={ () => history.push(`/seller/orders/${order.id}`) }
        >
          <OrderCard
            { ...order }
            page={ sellerOrders }
            role={ role }
          />
        </button>
      )) : <p>Não há pedidos</p> }
    </div>
  );
}

export default SellerOrders;
