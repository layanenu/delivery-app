import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Navbar from '../components/Navbar';
import OrderCard from '../components/OrderCard';
import { requestData } from '../services/request';
import '../App.css';

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
      <table className="table table-hover">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Data do pedido</th>
            <th scope="col">Status</th>
            <th scope="col">Valor total</th>
          </tr>
        </thead>
        <tbody className="tableHandPointer">
          { orders.length > 0 ? orders.map((order) => (
            // <button>
            <OrderCard
              key={ order.id }
              goToOrder={ () => history.push(`/customer/orders/${order.id}`) }
              { ...order }
              page={ customerOrders }
              role={ role }
            />
            // </button>
          )) : <p>Não há pedidos</p> }
        </tbody>
      </table>
    </div>
  );
}

export default CustomerOrders;
