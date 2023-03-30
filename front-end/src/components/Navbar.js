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
    (role === 'customer') ? (
      <nav>
        <div>
          <Link
            data-testid={ `${customerProducts}${elementNavbar}${linkProducts}` }
            to="/search"
          >
            PRODUTOS
          </Link>
          <Link
            data-testid={ `${customerProducts}${elementNavbar}${linkOrders}` }
            to="/favorites"
          >
            MEUS PEDIDOS
          </Link>
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
      </nav>) : null
  );
}

export default Navbar;
