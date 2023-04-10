import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

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
    <nav>
      <div>
        {
          (role === 'customer') ? (
            <Link
              data-testid={ `${customerProducts}${elementNavbar}${linkProducts}` }
              to="/customer/products"
            >
              PRODUTOS
            </Link>) : null
        }
        {
          (role === 'customer') ? (
            <Link
              data-testid={ `${customerProducts}${elementNavbar}${linkOrders}` }
              to="/customer/orders"
            >
              MEUS PEDIDOS
            </Link>
          ) : null
        }
        {
          (role === 'seller') ? (
            <Link
              data-testid={ `${customerProducts}${elementNavbar}${linkOrders}` }
              to="/seller/orders"
            >
              PEDIDOS
            </Link>
          ) : null
        }
        {
          (role === 'administrator') ? (
            <Link
              to="/admin/manage"
            >
              GERENCIAR USUÁRIOS
            </Link>
          ) : null
        }

        <p
          data-testid={ `${customerProducts}${elementNavbar}${userFullName}` }
        >
          {name}
        </p>
        <button
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
