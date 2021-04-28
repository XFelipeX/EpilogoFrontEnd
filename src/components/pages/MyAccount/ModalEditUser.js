import React from 'react';
import styles from './ModalEditUser.module.css';
import useClickOutside from '../../ClickOutside/ClickOutside';
import { useDispatch } from 'react-redux';
import { PUT_USER } from '../../../api';
import { logIn, updateState } from '../../../redux';
import { useSelector } from 'react-redux';

const ModalEditUser = ({ setShowEditUser, user }) => {
  const { permissions } = useSelector((state) => state);
  const dispatch = useDispatch();
  const [email, setEmail] = React.useState(user.email);
  const [userName, setUserName] = React.useState(user.userName);
  const [password, setPassword] = React.useState('');

  function handleSubmit(e) {
    e.preventDefault();
    updateUser()
      .then(() => dispatch(updateState()))
      .then(() => {
        const newInfo = {
          session: permissions.token,
          object: {
            email: user.email,
            userName: userName,
            userPassword: password,
            typeAccount: 2,
            status: 1,
            accountId: user.accountId,
            id: user.id,
          },
        };

        dispatch(logIn(newInfo));
      })
      .then(() => setShowEditUser(false));
  }

  const domNode = useClickOutside(() => {
    setShowEditUser(false);
  });

  async function updateUser() {
    try {
      const { url, options } = PUT_USER({
        email: user.email,
        userName: userName,
        userPassword: password,
        typeAccount: 2,
        status: 1,
        accountId: user.accountId,
        id: user.id,
      });
      const response = await fetch(url, options);
      const json = await response.json();

      if (json.error) {
        console.log(json);
        alert('houve um erro verifique o console');
        return [];
      }

      if (json[0] && json[0].error) {
        console.log(json);
        alert('houve um erro verifique o console');
        return [];
      }

      alert('Seu perfil foi atualizado com sucesso');
      return json.object;
    } catch (error) {
      console.log(error);
      return [];
    }
  }

  return (
    <div className={styles.container}>
      <div ref={domNode} className={styles.modal}>
        <form action="" onSubmit={handleSubmit} method="PUT">
          <article className={styles.inputs}>
            <label htmlFor="email">
              E-mail
              <input
                type="email"
                id="email"
                name="email"
                required
                readOnly
                value={email}
                onChange={({ target }) => setEmail(target.value)}
              />
            </label>
            <label htmlFor="user">
              Usuário
              <input
                type="text"
                id="user"
                name="user"
                required
                value={userName}
                onChange={({ target }) => setUserName(target.value)}
              />
            </label>
            <label htmlFor="password">
              Senha
              <input
                type="password"
                id="password"
                name="password"
                required
                value={password}
                onChange={({ target }) => setPassword(target.value)}
              />
            </label>
          </article>
          <article className={styles.btnArea}>
            <button
              type="button"
              className={styles.btnCancel}
              onClick={() => setShowEditUser(false)}
            >
              Cancelar
            </button>
            <button type="submit" className={styles.btnSend}>
              Enviar
            </button>
          </article>
        </form>
      </div>
    </div>
  );
};

export default ModalEditUser;
