import React from 'react';
import styles from './ModalEditPersonal.module.css';
import useClickOutside from '../../ClickOutside/ClickOutside';
import { useDispatch } from 'react-redux';
import { PUT_ACCOUNT } from '../../../api';
import { updateState } from '../../../redux';

const ModalEditPersonal = ({ setShowEditPersonal, account }) => {
  const dispatch = useDispatch();
  const [name, setName] = React.useState('');

  function handleSubmit(e) {
    e.preventDefault();
    updateAccount()
      .then(() => dispatch(updateState()))
      .then(() => setShowEditPersonal(false));
  }

  const domNode = useClickOutside(() => {
    setShowEditPersonal(false);
  });

  async function updateAccount() {
    try {
      const { url, options } = PUT_ACCOUNT({
        id: account.id,
        userName: name,
        lastName: null,
        street: null,
        numberIdent: 0,
        cpf: account.cpf,
        cep: null,
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
            <label htmlFor="name">
              Nome
              <input
                type="text"
                id="name"
                name="name"
                required
                value={name}
                onChange={({ target }) => setName(target.value)}
              />
            </label>
            <label htmlFor="cpf">
              CPF
              <input
                type="text"
                id="cpf"
                name="cpf"
                readOnly
                defaultValue={account.cpf}
              />
            </label>
          </article>
          <article className={styles.btnArea}>
            <button
              type="button"
              className={styles.btnCancel}
              onClick={() => setShowEditPersonal(false)}
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

export default ModalEditPersonal;
