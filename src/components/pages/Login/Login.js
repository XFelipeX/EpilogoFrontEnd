import React from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { LOGIN } from '../../../api';
import Header from '../../Header/Header';
import styles from './Login.module.css';
import { logIn } from '../../../redux/index';

const Login = () => {
  const history = useHistory();
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const dispatch = useDispatch();

  function handleSubmit(e) {
    e.preventDefault();

    login().then((response) => {
      if (response) {
        dispatch(logIn(response));
        localStorage.setItem('token', response.session);
        setEmail('');
        setPassword('');
        alert('Você efetuou login com sucesso!');
        console.log(response);
        if (response.object.accountId != 2) {
          history.push('/produtos');
        } else {
          history.push('/principal');
        }
      }
    });
  }

  async function login() {
    try {
      const { url, options } = LOGIN({ email: email, password: password });

      const response = await fetch(url, options);

      const json = await response.json();

      if (json.error) {
        console.log(json);
        if (json.message.includes('User not found or is inative')) {
          alert('Usuário não existe ou está inativo!');
          return;
        } else if (json.message.includes('Email/Password incorrect')) {
          alert('Email e/ou senha está incorreta!');
          return;
        }
        alert('houve um erro verifique o console');
        return;
      }

      if (json[0] && json[0].error) {
        console.log(json);
        alert('houve um erro verifique o console');
        return;
      }

      console.log(json);
      return json;
    } catch (error) {
      console.log(error);
      return {};
    }
  }

  return (
    <div className={styles.containerLogin}>
      <Header />
      <form
        action=""
        onSubmit={handleSubmit}
        method="post"
        className={styles.card}
      >
        <h2>Faça login para continuar</h2>
        <article>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="E-mail"
            value={email}
            onChange={({ target }) => setEmail(target.value)}
          />
        </article>
        <article>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Senha"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </article>

        <button type="submit">Entrar</button>
      </form>
    </div>
  );
};

export default Login;
