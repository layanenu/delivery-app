import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

function Login() {
  const history = useHistory();
  const commonLogin = 'common_login__';
  const inputEmail = 'input-email';
  const inputPassword = 'input-password';
  const buttonLogin = 'button-login';
  const buttonRegister = 'button-register';
  const elementInvalidEmail = 'element-invalid-email';

  useEffect(() => {
    history.push('/login');
  }, []);
  return (
    <div>
      <form>
        <input type="text" data-testid={ `${commonLogin}${inputEmail}` } />
        <input type="text" data-testid={ `${commonLogin}${inputPassword}` } />
        <button
          type="button"
          data-testid={ `${commonLogin}${buttonLogin}` }
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
