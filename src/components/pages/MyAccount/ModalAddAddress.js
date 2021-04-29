import React from 'react';
import styles from './ModalAddAddress.module.css';
import useClickOutside from '../../ClickOutside/ClickOutside';
import { useDispatch } from 'react-redux';
import { GET_CEP, POST_ADDRESS, PUT_ADDRESS } from '../../../api';
import { updateState } from '../../../redux';
import { useSelector } from 'react-redux';
import { BsMap } from 'react-icons/bs';
import { validateCep } from '../../../utils/regexValidations';

const ModalAddAddress = ({
  setShowAddAddress,
  upAddress,
  setUpAddress,
  type,
  title,
}) => {
  const { permissions } = useSelector((state) => state);
  const dispatch = useDispatch();

  // Address
  const [cep, setCep] = React.useState(upAddress.id ? upAddress.cep : '');
  const [publicArea, setPublicArea] = React.useState(
    upAddress.id ? upAddress.publicArea : '',
  );
  const [uf, setUf] = React.useState(upAddress.id ? upAddress.uf : '');
  const [local, setLocal] = React.useState(upAddress.id ? upAddress.local : '');
  const [number, setNumber] = React.useState(
    upAddress.id ? upAddress.number : '',
  );
  const [complement, setComplement] = React.useState(
    upAddress.id ? upAddress.complement : '',
  );

  // Confirm new CEP
  const [confirmCep, setConfirmCep] = React.useState(null);

  function handleSubmit(e) {
    e.preventDefault();
    if (!validateCep(cep)) {
      alert('Informe um CEP válido!');
      return;
    }
    if (String(confirmCep) !== String(cep)) {
      alert('Confirme o novo CEP inserido para continuar');
      return;
    }
    if (upAddress.id) {
      updateAddress()
        .then(() => dispatch(updateState()))
        .then(() => setShowAddAddress(false));
    } else {
      saveAddress()
        .then(() => dispatch(updateState()))
        .then(() => setShowAddAddress(false));
    }
  }

  const domNode = useClickOutside(() => {
    setShowAddAddress(false);
    setUpAddress({});
  });

  async function saveAddress() {
    try {
      const { url, options } = POST_ADDRESS({
        publicArea: publicArea,
        cep: cep,
        uf: uf,
        number: +number,
        local: local,
        complement: complement,
        type: type,
        status: 1,
        accountId: permissions.user.accountId,
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

      alert('Endereço adicionado com sucesso');
      return json.object;
    } catch (error) {
      console.log(error);
      return [];
    }
  }

  async function updateAddress() {
    try {
      const { url, options } = PUT_ADDRESS({
        id: upAddress.id,
        publicArea: publicArea,
        cep: cep,
        uf: uf,
        number: +number,
        local: local,
        complement: complement,
        type: type,
        status: +upAddress.status === 1 ? 1 : 0,
        accountId: permissions.user.accountId,
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

      alert('Endereço atualizado com sucesso');
      return json.object;
    } catch (error) {
      console.log(error);
      return [];
    }
  }

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
    if (upAddress.id) {
      setConfirmCep(upAddress.cep);
    }
  }, [upAddress.cep, upAddress.id]);

  return (
    <div className={styles.container}>
      <div ref={domNode} className={styles.modal}>
        <form action="" onSubmit={handleSubmit} method="PUT">
          <article className={styles.inputs}>
            {upAddress.id ? (
              <p className={styles.typeAddress}>
                Editando Endereço de{' '}
                {upAddress.type === 'C' ? 'Cobrança' : 'Entrega'}
              </p>
            ) : (
              <p className={styles.typeAddress}>Novo Endereço de {title}</p>
            )}
            <label htmlFor="cep">
              CEP
              <input
                maxLength="9"
                type="text"
                name="cep"
                id="cep"
                required
                value={cep}
                onChange={({ target }) => setCep(target.value)}
              />
              <button
                type="button"
                className={styles.btnFindAddress}
                onClick={() => {
                  findCep(cep).then((response) => {
                    if (response) {
                      setLocal(response.localidade);
                      setPublicArea(response.logradouro);
                      setUf(response.uf);
                      setConfirmCep(response.cep);
                    }
                  });
                }}
              >
                Buscar <BsMap size={15} />
              </button>
            </label>
            <label htmlFor="public">
              Rua/Logradouro
              <input
                type="text"
                name="public"
                id="public"
                required
                readOnly
                value={publicArea}
                onChange={({ target }) => setPublicArea(target.value)}
              />
            </label>
            <label htmlFor="uf">
              UF
              <input
                type="text"
                name="uf"
                id="uf"
                required
                readOnly
                value={uf}
                onChange={({ target }) => setUf(target.value)}
              />
            </label>
            <label htmlFor="local">
              Localidade
              <input
                type="text"
                name="local"
                id="local"
                required
                readOnly
                value={local}
                onChange={({ target }) => setLocal(target.value)}
              />
            </label>
            <label htmlFor="number">
              N°
              <input
                min="0"
                type="number"
                name="number"
                id="number"
                required
                value={number}
                onChange={({ target }) => setNumber(target.value)}
              />
            </label>
            <label htmlFor="complement">
              Complemento
              <input
                type="text"
                name="complement"
                id="complement"
                value={complement}
                onChange={({ target }) => setComplement(target.value)}
              />
            </label>
          </article>
          <article className={styles.btnArea}>
            <button
              type="button"
              className={styles.btnCancel}
              onClick={() => {
                setShowAddAddress(false);
                setUpAddress({});
              }}
            >
              Cancelar
            </button>
            <button type="submit" className={styles.btnSend}>
              {upAddress.id ? 'Salvar' : 'Cadastrar'}
            </button>
          </article>
        </form>
      </div>
    </div>
  );
};

export default ModalAddAddress;
