import React from 'react';
import styles from './ModalInsertAccount.module.css';
import stylesModalInsert from '../Books/ModalInsert.module.css';
import FormModalInsertAccount from './FormModalInsertAccount';
import useClickOutside from '../../ClickOutside/ClickOutside';
import {
  GET_USER_BY_EMAIL,
  POST_ACCOUNT,
  POST_USER,
  PUT_ACCOUNT,
  PUT_USER,
} from '../../../api';
import { useSelector, useDispatch } from 'react-redux';
import { updateStateUsers } from '../../../redux';
import {
  validateCep,
  validateCpf,
  validateEmail,
} from '../../../utils/regexValidations';

const ModalInsertAccount = ({ setShowInsertModal, setLastUser, lastUser }) => {
  const { permissions } = useSelector((state) => state);
  const dispatch = useDispatch();

  // Account
  const [name, setName] = React.useState(
    lastUser.accountName ? lastUser.accountName : '',
  );
  const [lastName, setLastName] = React.useState(
    lastUser.lastName ? lastUser.lastName : '',
  );
  const [cpf, setCpf] = React.useState(lastUser.cpf ? lastUser.cpf : '');
  const [street, setStreet] = React.useState(
    lastUser.street ? lastUser.street : '',
  );
  const [number, setNumber] = React.useState(
    lastUser.numberIdent ? lastUser.numberIdent : '',
  );
  const [cep, setCep] = React.useState(lastUser.cep ? lastUser.cep : '');

  // User
  const [userName, setUserName] = React.useState(
    lastUser.userName ? lastUser.userName : '',
  );
  const [email, setEmail] = React.useState(
    lastUser.email ? lastUser.email : '',
  );
  const [password, setPassword] = React.useState('');
  const [typeAccount, setTypeAccount] = React.useState(
    lastUser.typeAccount === 0 ? lastUser.typeAccount : '1',
  );
  const [status, setStatus] = React.useState(
    lastUser.status === 0 ? lastUser.status : '1',
  );

  const domNode = useClickOutside(() => {
    setShowInsertModal(false);
    clear();
  });

  function handleSubmit(e) {
    e.preventDefault();

    if (verifyFields() === true) {
      if (lastUser.accountId) {
        updateAccount().then((response) => {
          if (response && response.id) {
            updateUser(response).then(() => dispatch(updateStateUsers()));
          } else {
            alert('Erro ao atualizar conta!');
            return;
          }
        });
      } else {
        saveAccount().then((response) => {
          if (response && response.id) {
            saveUser(response).then(() => dispatch(updateStateUsers()));
          } else {
            alert('Erro ao inserir conta!');
            return;
          }
        });
      }
    }
  }

  function verifyFields() {
    if (String(name).length < 5) {
      alert('O nome precisa ter pelo menos 5 caracteres!');
      return false;
    }

    if (String(password).length < 3) {
      alert('A senha precisa ter pelo menos 3 caracteres!');
      return false;
    }

    if (!validateCpf(cpf)) {
      alert('Informe um cpf válido!');
      return false;
    }
    if (!validateEmail(email)) {
      alert('Insira um email válido!');
      return false;
    }

    if (!validateCep(cep)) {
      alert('Insira um cep válido!');
      return false;
    }

    return true;
  }

  async function verifyIfEmailExist() {
    try {
      const { url, options } = GET_USER_BY_EMAIL(permissions.token, email);

      const response = await fetch(url, options);

      const json = await response.json();
      if (json.error) {
        console.log(json);

        if (json.message.includes('Email not found')) {
          return false;
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

      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  async function updateUser() {
    try {
      const { url, options } = PUT_USER(permissions.token, {
        id: lastUser.userId,
        email: lastUser.email,
        userName: userName,
        userPassword: password,
        typeAccount: +typeAccount,
        status: +status,
        accountId: lastUser.accountId,
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

      alert('Usuário atualizado com sucesso!');

      return json();
    } catch (error) {
      console.log(error);
    } finally {
      clear();
    }
  }

  async function saveUser(userAccount) {
    try {
      const { url, options } = POST_USER(permissions.token, {
        email: email,
        userName: userName,
        userPassword: password,
        typeAccount: +typeAccount,
        status: +status,
        accountId: userAccount.id,
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

      alert('Usuário inserido com sucesso!');

      return json();
    } catch (error) {
      console.log(error);
    } finally {
      clear();
    }
  }

  async function saveAccount() {
    const existEmail = await verifyIfEmailExist();
    if (existEmail) {
      alert('Este email já possui cadastro!');
      return null;
    }

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
        if (json.localMessage.includes("'cpf'")) {
          alert('Este CPF já possui cadastro!');
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

      alert('Conta inserida com sucesso!');

      clear();
      return json.object;
    } catch (error) {
      console.log(error);
    }
  }

  async function updateAccount() {
    try {
      const { url, options } = PUT_ACCOUNT(permissions.token, {
        id: lastUser.accountId,
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

      alert('Conta atualizada com sucesso!');

      return json.object;
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
    setEmail('');
    setUserName('');
    setPassword('');
    setTypeAccount('1');
    setStatus('1');
    setLastUser({ id: -1 });
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
            userName={userName}
            setUserName={setUserName}
            email={email}
            setEmail={setEmail}
            password={password}
            setPassword={setPassword}
            typeAccount={typeAccount}
            setTypeAccount={setTypeAccount}
            status={status}
            setStatus={setStatus}
            lastUser={lastUser}
            setShowInsertModal={setShowInsertModal}
            clear={clear}
          />
        </section>
      </div>
    </div>
  );
};

export default ModalInsertAccount;
