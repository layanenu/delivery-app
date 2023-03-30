import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { requestLogin, setToken } from '../services/request';

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

  const loginButton = async (e) => {
    e.preventDefault();

    try {
      const { token } = await requestLogin('/login', { email, password });

      setToken(token);

      localStorage.setItem('token', token);
      history.push('/customer/products');
    } catch (error) {
      setFailedTryLogin(true);
    }
  };
  return (
    <div>
      <form>
        <input
          type="email"
          data-testid={ `${commonLogin}${inputEmail}` }
          value={ email }
          onChange={ (e) => setEmail(e.target.value) }
        />
        <input
          type="password"
          data-testid={ `${commonLogin}${inputPassword}` }
          value={ password }
          onChange={ (e) => setPassword(e.target.value) }
        />
        <button
          type="button"
          data-testid={ `${commonLogin}${buttonLogin}` }
          disabled={ !(emailIsValid && password.length >= minPasswordLenght) }
          onClick={ (e) => loginButton(e) }
        >
          LOGIN
        </button>
        <button
          type="button"
          data-testid={ `${commonLogin}${buttonRegister}` }
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
