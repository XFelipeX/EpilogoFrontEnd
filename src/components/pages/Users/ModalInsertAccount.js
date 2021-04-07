import React from 'react';
import styles from './ModalInsertAccount.module.css';
import stylesModalInsert from '../Books/ModalInsert.module.css';
import FormModalInsertAccount from './FormModalInsertAccount';
import useClickOutside from '../../ClickOutside/ClickOutside';
import { POST_ACCOUNT } from '../../../api';
import { useSelector } from 'react-redux';

const ModalInsertAccount = ({ setShowInsertModal }) => {
  const { permissions } = useSelector((state) => state);

  const [name, setName] = React.useState('');
  const [lastName, setLastName] = React.useState('');
  const [cpf, setCpf] = React.useState('');
  const [street, setStreet] = React.useState('');
  const [number, setNumber] = React.useState('');
  const [cep, setCep] = React.useState('');

  const domNode = useClickOutside(() => {
    setShowInsertModal(false);
  });

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const { url, options } = POST_ACCOUNT(permissions.token, {
        userName: name,
        lastName: lastName,
        street: street,
        numberIdent: number,
        cpf: cpf,
        cep: cep,
      });

      const response = await fetch(url, options);

      const json = await response.json();
      if (json.error) {
        console.log(json);
        alert('houve um erro verifique o console');
        return;
      }

      if (json[0] && json[0].error) {
        console.log(json);
        alert('houve um erro verifique o console');
        return;
      }

      alert('Conta inserida com sucesso!');
    } catch (error) {
      console.log(error);
    } finally {
      clear();
    }
  }

  function clear() {
    setCep('');
    setName('');
    setLastName('');
    setCpf('');
    setStreet('');
    setNumber('');
  }

  return (
    <div className={stylesModalInsert.modalArea}>
      <div className={stylesModalInsert.modal} ref={domNode}>
        <section className={styles.formArea}>
          <FormModalInsertAccount
            handleSubmit={handleSubmit}
            name={name}
            setName={setName}
            lastName={lastName}
            setLastName={setLastName}
            cpf={cpf}
            setCpf={setCpf}
            street={street}
            setStreet={setStreet}
            number={number}
            setNumber={setNumber}
            cep={cep}
            setCep={setCep}
          />
        </section>
      </div>
    </div>
  );
};

export default ModalInsertAccount;
