import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import { requestData, requestWithToken } from '../services/request';

function AdminManage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('customer');
  const [users, setUsers] = useState([]);
  const [failedTryRegister, setFailedTryRegister] = useState(false);

  const adminManage = 'admin_manage__';
  const inputName = 'input-name';
  const inputEmail = 'input-email';
  const inputPassword = 'input-password';
  const btnRegister = 'button-register';
  const selectRole = 'select-role';
  const userItem = 'element-user-table-item-number-';
  const userName = 'element-user-table-name-';
  const userEmail = 'element-user-table-email-';
  const userRole = 'element-user-table-role-';
  const userRemove = 'element-user-table-remove-';
  const invalidRegister = 'element-invalid-register';
  const minPasswordLenght = 6;
  const minNameLenght = 12;
  const emailIsValid = email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
  async function fetchData() {
    const result = await requestData('/users');
    setUsers(result);
  }

  useEffect(() => {
    fetchData();
    console.log(role);
  }, [role]);

  const resetState = () => {
    setName('');
    setEmail('');
    setPassword('');
    setRole('customer');
  };

  const handleBtn = async () => {
    try {
      const { token } = JSON.parse(localStorage.getItem('user'));
      const user = await requestWithToken(
        '/register/admin',
        { name, email, password, role },
        token,
      );
      console.log(user);
      fetchData();
      resetState();
    } catch (error) {
      console.log(error);
      setFailedTryRegister(true);
    }
  };

  const rmvProduct = () => null;

  return (
    <div>
      <Navbar />
      <form>
        <input
          type="text"
          data-testid={ `${adminManage}${inputName}` }
          value={ name }
          onChange={ (e) => setName(e.target.value) }
        />
        <input
          type="email"
          data-testid={ `${adminManage}${inputEmail}` }
          value={ email }
          onChange={ (e) => setEmail(e.target.value) }
        />
        <input
          type="password"
          data-testid={ `${adminManage}${inputPassword}` }
          value={ password }
          onChange={ (e) => setPassword(e.target.value) }
        />
        <select
          data-testid={ `${adminManage}${selectRole}` }
          onChange={ (e) => setRole(e.target.value) }
        >
          <option value="customer">Cliente</option>
          <option value="seller">Vendedor</option>
          {/* <option value="administrator">Administrador</option> */}
        </select>
        <button
          type="button"
          data-testid={ `${adminManage}${btnRegister}` }
          onClick={ handleBtn }
          disabled={
            !(emailIsValid
              && password.length >= minPasswordLenght
              && name.length >= minNameLenght)
          }
        >
          CADASTRAR
        </button>
        <p
          data-testid={ `${adminManage}${invalidRegister}` }
          style={ { visibility: failedTryRegister ? 'visible' : 'hidden' } }
        >
          Mensagem de erro
        </p>
      </form>
      <div>
        {users.map((user, index) => (
          <div key={ index }>
            <p
              data-testid={ `${adminManage}${userItem}${index}` }
            >
              {index + 1}
            </p>
            <p
              data-testid={ `${adminManage}${userName}${index}` }
            >
              {user.name}
            </p>
            <p
              data-testid={ `${adminManage}${userEmail}${index}` }
            >
              {user.email}
            </p>
            <p
              data-testid={ `${adminManage}${userRole}${index}` }
            >
              {user.role}
            </p>
            <button
              type="button"
              data-testid={ `${adminManage}${userRemove}${index}` }
              onClick={ rmvProduct }
            >
              Remover
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AdminManage;
