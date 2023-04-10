import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import AdminManage from './Pages/AdminManage';
import CustomerCheckout from './Pages/CustomerCheckout';
import CustomerOrder from './Pages/CustomerOrder';
import CustomerOrders from './Pages/CustomerOrders';
import CustomerProducts from './Pages/CustomerProducts';
import Login from './Pages/Login';
import Register from './Pages/Register';
import SellerOrder from './Pages/SellerOrder';
import SellerOrders from './Pages/SellerOrders';

function App() {
  return (
    <Switch>
      <Route exact path="/" component={ Login } />
      <Route exact path="/login" component={ Login } />
      <Route exact path="/register" component={ Register } />
      <Route exact path="/customer/products" component={ CustomerProducts } />
      <Route exact path="/customer/checkout" component={ CustomerCheckout } />
      <Route path="/customer/orders/:id" component={ CustomerOrder } />
      <Route path="/customer/orders" component={ CustomerOrders } />
      <Route exact path="/seller/orders" component={ SellerOrders } />
      <Route path="/seller/orders/:id" component={ SellerOrder } />
      <Route path="/admin/manage" component={ AdminManage } />
    </Switch>
  );
}

export default App;
