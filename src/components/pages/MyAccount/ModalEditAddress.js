import React from 'react';
import useClickOutside from '../../ClickOutside/ClickOutside';
import styles from './ModalEditAddress.module.css';
import { useSelector } from 'react-redux';
import { GET_ADDRESS_BY_ACCOUNT, PUT_ADDRESS } from '../../../api';
import { useDispatch } from 'react-redux';
import { updateState } from '../../../redux';
import ConfirmModal from './ConfirmModal';

const ModalEditAddress = ({
  setShowAddAddress,
  setShowModalEditAddress,
  setUpAddress,
  type,
  title,
}) => {
  const [address, setAddress] = React.useState([]);
  const { permissions } = useSelector((state) => state);
  const { stateUpdate } = useSelector((state) => state);
  const [showConfirmModal, setShowConfirmModal] = React.useState(false);
  const [addressSelected, setAddresSelected] = React.useState(null);
  const dispatch = useDispatch();

  const domNode = useClickOutside(() => {
    if (!showConfirmModal) setShowModalEditAddress(false);
  });

  React.useEffect(() => {
    async function getAddress() {
      try {
        const { url, options } = GET_ADDRESS_BY_ACCOUNT(
          permissions.user.accountId,
          type,
        );
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

        return json.object;
      } catch (error) {
        console.log(error);
        return [];
      }
    }

    getAddress().then((response) => {
      if (response.length) {
        setAddress(response);
      }
    });
  }, [permissions.user.accountId, type, stateUpdate]);

  function updateAddressActive(address) {
    updateStatus(address).then((response) => {
      if (response) {
        console.log(response);
        dispatch(updateState());
      }
    });
  }

  async function updateStatus(address) {
    try {
      const { url, options } = PUT_ADDRESS({
        id: address.id,
        publicArea: address.publicArea,
        cep: address.cep,
        uf: address.uf,
        number: +address.number,
        local: address.local,
        complement: address.complement,
        type: address.type,
        status: 1,
        accountId: address.accountId,
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

      alert('Status atualizado com sucesso');
      return json.object;
    } catch (error) {
      console.log(error);
      return [];
    }
  }

  return (
    <div className={styles.container}>
      {showConfirmModal && (
        <ConfirmModal
          close={() => setShowConfirmModal(false)}
          confirm={() => updateAddressActive(addressSelected)}
          question={'Tem certeza que deseja tornar este endereço ativo?'}
        />
      )}
      <div ref={domNode} className={styles.modal}>
        <h3 className={styles.title}>Endereços de {title}</h3>
        <table>
          <thead>
            <tr>
              <th>Rua/Logradouro</th>
              <th>UF</th>
              <th>N°</th>
              <th>Localidade</th>
              <th>Complemento</th>
              <th>CEP</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {address &&
              address.map((add) => (
                <tr key={add.id}>
                  <td>{add.publicArea}</td>
                  <td>{add.uf}</td>
                  <td>{add.number}</td>
                  <td>{add.local}</td>
                  <td>{add.complement}</td>
                  <td>{add.cep}</td>
                  <td>
                    {add.status === 0 && (
                      <button
                        type="button"
                        className={styles.btnActive}
                        onClick={() => {
                          setAddresSelected(add);
                          setShowConfirmModal(true);
                        }}
                      >
                        Ativar
                      </button>
                    )}
                  </td>
                  <td>
                    <button
                      type="button"
                      className={styles.btnEdit}
                      onClick={() => {
                        setShowAddAddress(true);
                        setUpAddress(add);
                        setShowModalEditAddress(false);
                      }}
                    >
                      Editar
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ModalEditAddress;
