import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import ProductCard from '../components/ProductCard';
import { requestData } from '../services/request';

function CustomerProducts() {
  const [produtos, setProdutos] = useState([]);
  useEffect(async () => {
    const result = await requestData('/products');
    console.log(result);
    setProdutos(result);
  }, []);
  return (
    <div>
      <Navbar />
      {produtos.map((produto) => <ProductCard key={ produto.id } produto={ produto } />)}
    </div>
  );
}

export default CustomerProducts;
