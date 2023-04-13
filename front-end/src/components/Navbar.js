import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import '../App.css';

function Navbar() {
  const [role, setRole] = useState('');
  const [name, setName] = useState('');
  const history = useHistory();

  const customerProducts = 'customer_products__';
  const elementNavbar = 'element-navbar-';
  const linkProducts = 'link-products';
  const linkOrders = 'link-orders';
  const userFullName = 'user-full-name';
  const linkLogout = 'link-logout';

  const handleLogout = (e) => {
    e.preventDefault();
    localStorage.clear();
    history.push('/login');
  };

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    setRole(user.role);
    setName(user.name);
  }, []);
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light navSize">
      <div className="container-fluid">
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb liStyle">
            {
              (role === 'customer') ? (
                <li className="breadcrumb-item">
                  <Link
                    data-testid={ `${customerProducts}${elementNavbar}${linkProducts}` }
                    to="/customer/products"
                  >
                    Produtos
                  </Link>
                </li>
              ) : null
            }
            {
              (role === 'customer') ? (
                <li className="breadcrumb-item">
                  <Link
                    data-testid={ `${customerProducts}${elementNavbar}${linkOrders}` }
                    to="/customer/orders"
                  >
                    Meus Pedidos
                  </Link>
                </li>
              ) : null
            }
            {
              (role === 'seller') ? (
                <li className="breadcrumb-item">
                  <Link
                    data-testid={ `${customerProducts}${elementNavbar}${linkOrders}` }
                    to="/seller/orders"
                  >
                    Pedidos
                  </Link>
                </li>
              ) : null
            }
            {
              (role === 'administrator') ? (
                <li className="breadcrumb-item">
                  <Link
                    to="/admin/manage"
                  >
                    Gerenciar Usuários
                  </Link>
                </li>
              ) : null
            }
          </ol>
        </nav>

        <h3
          data-testid={ `${customerProducts}${elementNavbar}${userFullName}` }
        >
          {name}
        </h3>
        <button
          className="btn btn-primary btn-block"
          type="button"
          data-testid={ `${customerProducts}${elementNavbar}${linkLogout}` }
          onClick={ (e) => handleLogout(e) }
        >
          Sair
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
