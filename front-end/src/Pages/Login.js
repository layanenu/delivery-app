import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { requestLogin, setToken } from '../services/request';

function Login() {
  const history = useHistory();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [failedTryLogin, setFailedTryLogin] = useState(false);
  const [isLogged, setIsLogged] = useState(false);

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
      setIsLogged(true);
      history.push('/customer/products');
    }
  }, []);

  const loginButton = async (e) => {
    e.preventDefault();

    try {
      const user = await requestLogin('/login', { email, password });
      console.log(typeof user);
      setToken(user.token);

      localStorage.setItem('user', JSON.stringify(user));
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
