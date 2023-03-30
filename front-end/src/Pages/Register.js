import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { requestLogin, setToken } from '../services/request';

function Register() {
  const history = useHistory();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [failedTryRegister, setFailedTryRegister] = useState(false);

  const commonRegister = 'common_register__';
  const inputName = 'input-name';
  const inputEmail = 'input-email';
  const inputPassword = 'input-password';
  const buttonRegister = 'button-register';
  const elementInvalidRegister = 'element-invalid_register';

  const minPasswordLenght = 6;
  const minNameLenght = 12;
  let emailIsValid = email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);

  useEffect(() => {
    emailIsValid = email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
  }, [email]);

  const registerButton = async (e) => {
    e.preventDefault();

    try {
      const { token } = await requestLogin('/register', { name, email, password });

      setToken(token);

      localStorage.setItem('token', token);
      history.push('/customer/products');
    } catch (error) {
      console.log(error);
      setFailedTryRegister(true);
    }
  };
  return (
    <div>
      <form>
        <input
          type="text"
          data-testid={ `${commonRegister}${inputName}` }
          value={ name }
          onChange={ (e) => setName(e.target.value) }
        />
        <input
          type="email"
          data-testid={ `${commonRegister}${inputEmail}` }
          value={ email }
          onChange={ (e) => setEmail(e.target.value) }
        />
        <input
          type="password"
          data-testid={ `${commonRegister}${inputPassword}` }
          value={ password }
          onChange={ (e) => setPassword(e.target.value) }
        />
        <button
          type="button"
          data-testid={ `${commonRegister}${buttonRegister}` }
          disabled={
            !(emailIsValid
              && password.length >= minPasswordLenght
              && name.length >= minNameLenght)
          }
          onClick={ (e) => registerButton(e) }
        >
          Cadastrar
        </button>
      </form>
      <p
        data-testid={ `${commonRegister}${elementInvalidRegister}` }
        style={ { visibility: failedTryRegister ? 'visible' : 'hidden' } }
      >
        Mensagem de erro
      </p>
    </div>
  );
}

export default Register;
