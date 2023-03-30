import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import Login from './Pages/Login';
import Register from './Pages/Register';

function App() {
  return (
    <Switch>
      <Route exact path="/" component={ Login } />
      <Route exact path="/login" component={ Login } />
      <Route exact path="/register" component={ Register } />
    </Switch>
  );
}

export default App;
