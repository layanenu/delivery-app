import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Navbar from '../components/Navbar';
import { requestData } from '../services/request';

function SellerOrder({ match: { params: { id } } }) {
  const [order, setOrder] = useState([]);

  useEffect(() => {
    async function fetchOrder() {
      const response = await requestData(`/sales/${id}`);
      setOrder(response);
      console.log(response);
    }
    fetchOrder();
    console.log(order);
  }, []);

  return (
    <div>
      <Navbar />
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
