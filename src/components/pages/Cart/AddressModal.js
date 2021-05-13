import React from 'react';
import styles from './AddressModal.module.css';
import { GrCheckboxSelected } from 'react-icons/gr';
import { BiAddToQueue } from 'react-icons/bi';
import { ReactComponent as Illustration } from '../../../assets/backAdd.svg';
import {
  GET_ALL_ADDRESS_DELIVERY_BY_ACCOUNT,
  GET_CEP,
  POST_ADDRESS,
} from '../../../api';
import { useSelector } from 'react-redux';
import useClickOutside from '../../ClickOutside/ClickOutside';
import { BsMap } from 'react-icons/bs';
import { validateCep } from '../../../utils/regexValidations';
import { getDelivery } from '../../../redux';
import { useDispatch } from 'react-redux';

const AddressModal = ({ setShowAddressModal, setShowPaymentModal }) => {
  const [active, setActive] = React.useState('select');
  const [selected, setSelected] = React.useState({ address: {}, id: -1 });
  const [allAddressDelivery, setAllAddressDelivery] = React.useState([]);
  const { permissions } = useSelector((state) => state);
  const dispatch = useDispatch();

  // Delivery Address
  const [cepDelivery, setCepDelivery] = React.useState('');
  const [publicDelivery, setPublicDelivery] = React.useState('');
  const [ufDelivery, setUfDelivery] = React.useState('');
  const [localDelivery, setLocalDelivery] = React.useState('');
  const [numberDelivery, setNumberDelivery] = React.useState('');
  const [complementDelivery, setComplementDelivery] = React.useState('');

  async function findCep(value) {
    if (!validateCep(value)) return alert('Digite um CEP válido');
    if (value !== '') {
      try {
        const { url, options } = GET_CEP(value);
        const response = await fetch(url, options);
        const json = await response.json();

        if (json.erro) {
          alert('CEP não encontrado!');
          return;
        }

        setLocalDelivery(json.localidade);
        setPublicDelivery(json.logradouro);
        setUfDelivery(json.uf);
        console.log(json);
        return json;
      } catch (error) {
        console.log(error);
        alert('Houve um erro ao puxar este cep');
        return null;
      }
    }
  }

  async function saveAddress() {
    try {
      const { url, options } = POST_ADDRESS(
        {
          publicArea: publicDelivery,
          cep: cepDelivery,
          uf: ufDelivery,
          number: +numberDelivery,
          local: localDelivery,
          complement: complementDelivery,
          type: 'C',
          status: 0,
          accountId: permissions.user.accountId,
        },
        2, //typeAccount
      );
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

      alert('Seu endereço de entrega foi criado com sucesso');
      console.log(json);
      return json;
    } catch (error) {
      console.log(error);
    }
  }

  React.useEffect(() => {
    async function getAllAddressDelivery() {
      try {
        const { url, options } = GET_ALL_ADDRESS_DELIVERY_BY_ACCOUNT(
          permissions.user.accountId,
        );
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

        return json;
      } catch (error) {
        console.log(error);
      }
    }

    getAllAddressDelivery().then((response) => {
      if (response && response.object) {
        setAllAddressDelivery([...response.object]);
        if (active === 'select') {
          // Address Active
          response.object.forEach((address) => {
            console.log(address);
            if (address.status === 1) {
              setSelected({ address: address, id: address.id });
            }
          });
        }
      }
    });
  }, [permissions.user.accountId, active]);

  const domNode = useClickOutside(() => {
    setShowAddressModal(false);
  });

  function handleSubmit(e) {
    e.preventDefault();
    if (validateFields()) {
      saveAddress().then((response) => {
        if (response.object) {
          clear();
          return;
        }
      });
    }
  }

  function validateFields() {
    if (publicDelivery === '' || ufDelivery === '' || localDelivery === '')
      return alert('Busque seu CEP para cadastar o endereço');
    return true;
  }

  function clear() {
    setPublicDelivery('');
    setUfDelivery('');
    setCepDelivery('');
    setLocalDelivery('');
    setNumberDelivery('');
    setComplementDelivery('');
  }

  React.useEffect(() => {
    if (active === 'create') setSelected({ address: {}, id: -1 });
  }, [active]);

  return (
    <div className={styles.container}>
      <div className={styles.modal} ref={domNode}>
        <article className={styles.modalTop}>
          <div
            className={styles.selectAddress}
            style={active === 'select' ? { backgroundColor: '#dfdfe5' } : {}}
            onClick={() => setActive('select')}
          >
            <p className={styles.typeActive}>
              <GrCheckboxSelected size={25} style={{ marginRight: '0.5rem' }} />
              Selecionar Endereço
            </p>
          </div>
          <div
            className={styles.createAddress}
            style={active === 'create' ? { backgroundColor: '#dfdfe5' } : {}}
            onClick={() => {
              setActive('create');
              setSelected({ address: {}, id: -1 });
            }}
          >
            <p className={styles.typeActive}>
              <BiAddToQueue size={30} style={{ marginRight: '0.5rem' }} />
              Adicionar Endereço
            </p>
          </div>
        </article>
        <article className={styles.modalMiddle}>
          {active === 'select' ? (
            <>
              <div className={styles.selectAddress}>
                <h1 className={styles.title}>
                  Selecione um endereço para continuar
                </h1>
                {allAddressDelivery.length &&
                  allAddressDelivery.map((address) => (
                    <ul
                      className={styles.listAddress}
                      key={address.id}
                      onClick={() => setSelected({ address, id: address.id })}
                      style={
                        selected.id === address.id
                          ? { backgroundColor: 'rgba(0,0,0,0.7)' }
                          : {}
                      }
                    >
                      <li>{address.publicArea}</li>
                      <li>N° {address.number}</li>
                      <li>{address.cep}</li>
                      <li>{address.local}</li>
                      <li>{address.uf}</li>
                      <li>{address.complement}</li>
                    </ul>
                  ))}
              </div>
            </>
          ) : (
            <div className={styles.createAddressArea}>
              <form action="" method="POST" onSubmit={handleSubmit}>
                <article className={styles.inputGroup}>
                  <span>
                    <label htmlFor="cep-delivery-address">
                      CEP
                      <input
                        type="text"
                        name="cep-delivery-address"
                        id="cep-delivery-address"
                        required
                        value={cepDelivery}
                        onChange={({ target }) => setCepDelivery(target.value)}
                      />
                      <button
                        type="button"
                        className={styles.btnFindAddress}
                        onClick={() => findCep(cepDelivery)}
                      >
                        Buscar <BsMap size={15} />
                      </button>
                    </label>
                    <label htmlFor="public-delivery-address">
                      Rua/Logradouro
                      <input
                        type="text"
                        name="public-delivery-address"
                        id="public-delivery-address"
                        required
                        readOnly
                        value={publicDelivery}
                        onChange={({ target }) =>
                          setPublicDelivery(target.value)
                        }
                      />
                    </label>
                  </span>
                  <span>
                    <label htmlFor="uf-delivery-address">
                      UF
                      <input
                        type="text"
                        name="uf-delivery-address"
                        id="uf-delivery-address"
                        required
                        readOnly
                        value={ufDelivery}
                        onChange={({ target }) => setUfDelivery(target.value)}
                      />
                    </label>
                    <label htmlFor="local-delivery-address">
                      Localidade
                      <input
                        type="text"
                        name="local-delivery-address"
                        id="local-delivery-address"
                        required
                        readOnly
                        value={localDelivery}
                        onChange={({ target }) =>
                          setLocalDelivery(target.value)
                        }
                      />
                    </label>
                  </span>
                  <span>
                    <label htmlFor="number-delivery-address">
                      N°
                      <input
                        min="0"
                        max="100000"
                        type="number"
                        name="number-delivery-address"
                        id="number-delivery-address"
                        required
                        value={numberDelivery}
                        onChange={({ target }) =>
                          setNumberDelivery(target.value)
                        }
                      />
                    </label>
                    <label htmlFor="complement-delivery-address">
                      Complemento
                      <input
                        type="text"
                        name="complement-delivery-address"
                        id="complement-delivery-address"
                        value={complementDelivery}
                        onChange={({ target }) =>
                          setComplementDelivery(target.value)
                        }
                      />
                    </label>
                  </span>
                  <button type="submit" className={styles.btnAdd}>
                    Cadastrar
                  </button>
                </article>
              </form>
            </div>
          )}

          <div className={styles.illustrationArea}>
            <Illustration className={styles.illustration} />
          </div>
        </article>
        <article className={styles.modalBottom}>
          <button
            type="button"
            className={styles.btnBack}
            onClick={() => setShowAddressModal(false)}
          >
            Voltar
          </button>
          <button
            type="button"
            className={styles.btnDone}
            onClick={() => {
              if (selected.id === -1)
                return alert('Selecione um endereço para continuar');
              setShowAddressModal(false);
              setShowPaymentModal(true);
              dispatch(getDelivery(selected));
            }}
          >
            Continuar
          </button>
        </article>
      </div>
    </div>
  );
};

export default AddressModal;
