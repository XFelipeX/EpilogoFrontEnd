import React from 'react';
import Header from '../../Header/Header';
import styles from './MyAccount.module.css';
import { AiTwotoneEdit } from 'react-icons/ai';
import { RiLockPasswordFill } from 'react-icons/ri';
import { BiAddToQueue } from 'react-icons/bi';
import { useSelector } from 'react-redux';
import { GET_ACCOUNT_BY_ID, GET_ACTIVE_ADDRESS } from '../../../api';
import ModalEditPersonal from './ModalEditPersonal';
import ModalEditUser from './ModalEditUser';
import ModalAddAddress from './ModalAddAddress';
import ModalEditAddress from './ModalEditAddress';

const MyAccount = () => {
  const { permissions } = useSelector((state) => state);
  const { stateUpdate } = useSelector((state) => state);
  const [account, setAccount] = React.useState({});
  const [addressBilling, setAddressBilling] = React.useState({});
  const [addressDelivery, setAddressDelivery] = React.useState({});

  // Update address
  const [upAddress, setUpAddress] = React.useState({});

  // About modals views
  const [showEditPersonal, setShowEditPersonal] = React.useState(false);
  const [showEditUser, setShowEditUser] = React.useState(false);
  const [showAddAddress, setShowAddAddress] = React.useState(false);
  const [showModalEditAddress, setShowModalEditAddress] = React.useState(false);
  const [typeAddress, setTypeAddress] = React.useState('C');

  React.useEffect(() => {
    async function getAccount() {
      try {
        const { url, options } = GET_ACCOUNT_BY_ID(permissions.user.accountId);
        const response = await fetch(url, options);
        const json = await response.json();

        if (json.error) {
          console.log(json);
          alert('houve um erro verifique o console');
          return {};
        }

        if (json[0] && json[0].error) {
          console.log(json);
          alert('houve um erro verifique o console');
          return {};
        }

        return json.object;
      } catch (error) {
        console.log(error);
        return {};
      }
    }

    getAccount().then((response) => {
      if (response) setAccount(response);
    });
  }, [permissions.user.accountId, stateUpdate]);

  React.useEffect(() => {
    async function getAddressActive() {
      try {
        const { url, options } = GET_ACTIVE_ADDRESS(permissions.user.accountId);
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

        console.log(json);

        return json.object;
      } catch (error) {
        console.log(error);
        return [];
      }
    }

    getAddressActive().then((response) => {
      if (response.length) {
        console.log(response);
        const billing = response.filter((address) => address.type === 'C');
        const delivery = response.filter((address) => address.type === 'F');
        setAddressBilling({ ...billing[0] });
        setAddressDelivery({ ...delivery[0] });
      }
    });
  }, [permissions.user.accountId, stateUpdate]);

  return (
    <div className={`${styles.container}`}>
      <Header />
      {showEditPersonal && (
        <ModalEditPersonal
          setShowEditPersonal={setShowEditPersonal}
          account={account}
        />
      )}
      {showEditUser && (
        <ModalEditUser
          setShowEditUser={setShowEditUser}
          user={permissions.user}
        />
      )}
      {showAddAddress && (
        <ModalAddAddress
          setShowAddAddress={setShowAddAddress}
          type={typeAddress}
          title={typeAddress === 'C' ? 'Cobrança' : 'Entrega'}
          upAddress={upAddress}
          setUpAddress={setUpAddress}
        />
      )}
      {showModalEditAddress && (
        <ModalEditAddress
          type={typeAddress}
          setShowModalEditAddress={setShowModalEditAddress}
          title={typeAddress === 'C' ? 'Cobrança' : 'Entrega'}
          setShowAddAddress={setShowAddAddress}
          setUpAddress={setUpAddress}
        />
      )}
      <div className={styles.content}>
        <div className={styles.card}>
          <article className={styles.account}>
            <span className={styles.btnArea}>
              <button
                type="button"
                className={styles.btnEdit}
                onClick={() => setShowEditPersonal(true)}
              >
                <AiTwotoneEdit size={20} />
              </button>
            </span>
            <h2 className={styles.typeInfo}>Informações Pessoais</h2>
            <span className={styles.name}>
              Nome:
              <p>{account.userName}</p>
            </span>
            <span className={styles.cpf}>
              CPF:
              <p>{account.cpf}</p>
            </span>
          </article>
          <article className={styles.user}>
            <span className={styles.btnArea}>
              <button
                type="button"
                className={styles.btnEdit}
                onClick={() => setShowEditUser(true)}
              >
                <AiTwotoneEdit size={20} />
              </button>
            </span>
            <h2 className={styles.typeInfo}>Informações de Usuário</h2>
            <span className={styles.email}>
              E-mail:
              <p>{permissions.user.email}</p>
            </span>
            <span className={styles.username}>
              Usuário:
              <p>{permissions.user.userName}</p>
            </span>
            <span className={styles.username}>
              Senha:
              <RiLockPasswordFill size={20} style={{ marginLeft: '10px' }} />
            </span>
          </article>
          <article className={styles.address}>
            <div className={styles.addressBilling}>
              <article className={styles.left}>
                <h3 className={styles.typeAddress}>Endereço de Cobrança</h3>
                <span>
                  Rua/Logradouro
                  <p>{addressBilling.publicArea}</p>
                </span>
                <span>
                  CEP
                  <p>{addressBilling.cep}</p>
                </span>
                <span>
                  UF
                  <p>{addressBilling.uf}</p>
                </span>
              </article>

              <article className={styles.right}>
                <span className={styles.btnArea}>
                  <button
                    type="button"
                    className={styles.btnAdd}
                    style={{ marginRight: '2.2rem' }}
                    onClick={() => {
                      setShowAddAddress(true);
                      setTypeAddress('C');
                    }}
                  >
                    <BiAddToQueue size={20} />
                  </button>
                  <button
                    type="button"
                    className={styles.btnEdit}
                    style={{ marginRight: '2.2rem' }}
                    onClick={() => {
                      setShowModalEditAddress(true);
                      setTypeAddress('C');
                    }}
                  >
                    <AiTwotoneEdit size={20} />
                  </button>
                </span>
                <span>
                  N°
                  <p>{addressBilling.number}</p>
                </span>
                <span>
                  Localidade
                  <p>{addressBilling.local}</p>
                </span>
                <span>
                  Complemento
                  <p>{addressBilling.complement}</p>
                </span>
              </article>
            </div>
            <div className={styles.addressDelivery}>
              <article className={styles.left}>
                <h3 className={styles.typeAddress}>Endereço de Entrega</h3>
                <span>
                  Rua/Logradouro
                  <p>{addressDelivery.publicArea}</p>
                </span>
                <span>
                  CEP
                  <p>{addressDelivery.cep}</p>
                </span>
                <span>
                  UF
                  <p>{addressDelivery.uf}</p>
                </span>
              </article>

              <article className={styles.right}>
                <span className={styles.btnArea}>
                  <button
                    type="button"
                    className={styles.btnAdd}
                    style={{ marginRight: '2.2rem' }}
                    onClick={() => {
                      setShowAddAddress(true);
                      setTypeAddress('F');
                    }}
                  >
                    <BiAddToQueue size={20} />
                  </button>
                  <button
                    type="button"
                    className={styles.btnEdit}
                    onClick={() => {
                      setShowModalEditAddress(true);
                      setTypeAddress('F');
                    }}
                  >
                    <AiTwotoneEdit size={20} />
                  </button>
                </span>
                <span>
                  N°
                  <p>{addressDelivery.number}</p>
                </span>
                <span>
                  Localidade
                  <p>{addressDelivery.local}</p>
                </span>
                <span>
                  Complemento
                  <p>{addressDelivery.complement}</p>
                </span>
              </article>
            </div>
          </article>
        </div>
      </div>
    </div>
  );
};

export default MyAccount;
