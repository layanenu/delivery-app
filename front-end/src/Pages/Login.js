import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

function Login() {
  const history = useHistory();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

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
          value={ email }
          disabled={ !(emailIsValid && password.length >= minPasswordLenght) }
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
      <p data-testid={ `${commonLogin}${elementInvalidEmail}` }>Mensagem de erro</p>
    </div>
  );
}

export default Login;
