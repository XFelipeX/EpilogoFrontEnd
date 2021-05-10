import React from 'react';
import styles from './AddressModal.module.css';
import { GrCheckboxSelected } from 'react-icons/gr';
import { BiAddToQueue } from 'react-icons/bi';
import { ReactComponent as Illustration } from '../../../assets/backAdd.svg';
import { GET_ALL_ADDRESS_DELIVERY_BY_ACCOUNT, GET_CEP } from '../../../api';
import { useSelector } from 'react-redux';
import useClickOutside from '../../ClickOutside/ClickOutside';
import { BsMap } from 'react-icons/bs';

const AddressModal = ({ setShowAddressModal, setShowPaymentModal }) => {
  const [active, setActive] = React.useState('select');
  const [selected, setSelected] = React.useState({ address: {}, id: -1 });
  const [allAddressDelivery, setAllAddressDelivery] = React.useState([]);
  const { permissions } = useSelector((state) => state);

  // Delivery Address
  const [cepDelivery, setCepDelivery] = React.useState('');
  const [publicDelivery, setPublicDelivery] = React.useState('');
  const [ufDelivery, setUfDelivery] = React.useState('');
  const [localDelivery, setLocalDelivery] = React.useState('');
  const [numberDelivery, setNumberDelivery] = React.useState('');
  const [complementDelivery, setComplementDelivery] = React.useState('');

  async function findCep(value) {
    if (value !== '') {
      try {
        const { url, options } = GET_CEP(value);
        const response = await fetch(url, options);
        const json = await response.json();

        if (json.erro) {
          alert('CEP não encontrado!');
          return;
        }
        console.log(json);
        return json;
      } catch (error) {
        console.log(error);
        alert('Houve um erro ao puxar este cep');
        return null;
      }
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
      if (response.object) {
        setAllAddressDelivery([...response.object]);
      }
    });
  }, [permissions.user.accountId]);

  const domNode = useClickOutside(() => {
    setShowAddressModal(false);
  });
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
                      onClick={() => findCep(cepDelivery, 'delivery')}
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
                      onChange={({ target }) => setPublicDelivery(target.value)}
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
                      onChange={({ target }) => setLocalDelivery(target.value)}
                    />
                  </label>
                </span>
                <span>
                  <label htmlFor="number-delivery-address">
                    Número
                    <input
                      min="0"
                      type="number"
                      name="number-delivery-address"
                      id="number-delivery-address"
                      required
                      value={numberDelivery}
                      onChange={({ target }) => setNumberDelivery(target.value)}
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
                <button type="button" className={styles.btnAdd}>
                  Cadastrar
                </button>
              </article>
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
