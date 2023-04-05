import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Navbar from '../components/Navbar';
import OrderCard from '../components/OrderCard';
import { requestData } from '../services/request';

function CustomerOrders() {
  const [orders, setOrders] = useState([]);
  const history = useHistory();

  const customerOrders = 'customer_orders__';
  const role = 'customer';

  useEffect(() => {
    const { id } = JSON.parse(localStorage.getItem('user'));
    async function fetchData() {
      const result = await requestData(`/sales/user/${id}`);
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
          onClick={ () => history.push(`/customer/orders/${order.id}`) }
        >
          <OrderCard
            { ...order }
            page={ customerOrders }
            role={ role }
          />
        </button>
      )) : <p>Não há pedidos</p> }
    </div>
  );
}

export default CustomerOrders;
