import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { requestLogin, setToken } from '../services/request';

import '../App.css';

function Login() {
  const history = useHistory();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [failedTryLogin, setFailedTryLogin] = useState(false);

  const commonLogin = 'common_login__';
  const inputEmail = 'input-email';
  const inputPassword = 'input-password';
  const buttonLogin = 'button-login';
  const buttonRegister = 'button-register';
  const elementInvalidEmail = 'element-invalid-email';

  const minPasswordLenght = 6;
  let emailIsValid = email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);

  useEffect(() => {
    history.push('/login');
  }, []);

  useEffect(() => {
    emailIsValid = email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
  }, [email]);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      switch (user.role) {
      case 'seller':
        history.push('/seller/orders');
        break;
      case 'customer':
        history.push('/customer/products');
        break;
      case 'administrator':
        history.push('/admin/manage');
        break;
      default:
        break;
      }
    }
  }, []);

  const loginButton = async (e) => {
    e.preventDefault();

    try {
      const user = await requestLogin('/login', { email, password });
      console.log(typeof user);
      setToken(user.token);
      localStorage.setItem('user', JSON.stringify(user));
      switch (user.role) {
      case 'seller':
        history.push('/seller/orders');
        break;
      case 'customer':
        history.push('/customer/products');
        break;
      case 'administrator':
        history.push('/admin/manage');
        break;
      default:
        break;
      }
    } catch (error) {
      setFailedTryLogin(true);
    }
  };
  return (
    <div className="centerDiv">
      <form>
        <div className="form-outline mb-4">
          <label
            className="form-label"
            htmlFor="emailForm"
          >
            {/* Email */}
            <input
              placeholder="email"
              className="form-control"
              type="email"
              data-testid={ `${commonLogin}${inputEmail}` }
              value={ email }
              onChange={ (e) => setEmail(e.target.value) }
              id="emailForm"
            />
          </label>
        </div>

        <div>
          <label
            className="form-label"
            htmlFor="passwordForm"
          >
            {/* Password */}
            <input
              placeholder="password"
              id="passwordForm"
              className="form-control"
              type="password"
              data-testid={ `${commonLogin}${inputPassword}` }
              value={ password }
              onChange={ (e) => setPassword(e.target.value) }
            />
          </label>
        </div>
        <br />
        <button
          className="btn btn-primary btn-block"
          type="button"
          data-testid={ `${commonLogin}${buttonLogin}` }
          disabled={ !(emailIsValid && password.length >= minPasswordLenght) }
          onClick={ (e) => loginButton(e) }
        >
          Login
        </button>
        <br />
        <br />
        <button
          className="btn btn-primary btn-block"
          type="button"
          data-testid={ `${commonLogin}${buttonRegister}` }
          onClick={ () => history.push('/register') }
        >
          Ainda não tenho conta
        </button>
      </form>
      <p
        data-testid={ `${commonLogin}${elementInvalidEmail}` }
        style={ { visibility: failedTryLogin ? 'visible' : 'hidden' } }
      >
        Mensagem de erro
      </p>
    </div>
  );
}

export default Login;
