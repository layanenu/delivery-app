import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import CustomerProducts from './Pages/CustomerProducts';
import Login from './Pages/Login';
import Register from './Pages/Register';
import CustomerCheckout from './Pages/CustomerCheckout';
import CustomerOrder from './Pages/CustomerOrder';

function App() {
  return (
    <Switch>
      <Route exact path="/" component={ Login } />
      <Route exact path="/login" component={ Login } />
      <Route exact path="/register" component={ Register } />
      <Route exact path="/customer/products" component={ CustomerProducts } />
      <Route exact path="/customer/checkout" component={ CustomerCheckout } />
      <Route path="/customer/orders/:id" component={ CustomerOrder } />
    </Switch>
  );
}

export default App;
