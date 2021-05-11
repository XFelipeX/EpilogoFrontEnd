import React from 'react';
import styles from './ConfirmDemandModal.module.css';
import stylesItens from './Cart.module.css';
import stylesBtn from './PaymentModal.module.css';
import { useSelector, useDispatch } from 'react-redux';
import useClickOutside from '../../ClickOutside/ClickOutside';
import { POST_DEMAND, POST_ITEM } from '../../../api';
import { clearCart, getLastDemand } from '../../../redux';
import { useHistory } from 'react-router-dom';

const ConfirmDemandModal = ({ setShowConfirmDemand, setShowPaymentModal }) => {
  const { stateCart } = useSelector((state) => state);
  const { permissions } = useSelector((state) => state);
  const [confirm, setConfirm] = React.useState(true);
  const dispatch = useDispatch();
  const history = useHistory();
  console.log(stateCart);
  console.log(permissions);

  const domNode = useClickOutside(() => {
    // setShowConfirmDemand(false);
  });

  async function makeDemand() {
    try {
      const { url, options } = POST_DEMAND(permissions.token, {
        date: getCurrentDate(),
        status: 'Aguardando confirmação de pagamento',
        payment: stateCart.payment.description,
        shipping: stateCart.shipping,
        total: stateCart.total,
        accountId: permissions.user.accountId,
        addressId: stateCart.delivery.address.id,
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

      console.log(json);
      return json;
    } catch (error) {
      console.log(error);
    }
  }

  async function insertItem(item, demandId) {
    try {
      const { url, options } = POST_ITEM(permissions.token, {
        amount: item.quantity,
        bookId: item.id,
        demandId: demandId,
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

      console.log(json);
      return json;
    } catch (error) {
      console.log(error);
    }
  }

  function getCurrentDate() {
    const current = new Date().toISOString().split('T');
    return String(current[0]);
  }

  function done() {
    makeDemand().then((response) => {
      if (response && response.object) {
        stateCart.products.forEach((product) => {
          insertItem(product, response.object.id);
        });

        dispatch(getLastDemand(response.object));
        setConfirm(!confirm);
        alert('Pedido efetuado com sucesso');
      }
    });
  }

  return (
    <div className={styles.container}>
      <div className={styles.modal} ref={domNode}>
        <article className={styles.modalItens}>
          {confirm === true ? (
            <ul className={stylesItens.items}>
              <li>
                <span className={stylesItens.imgArea}></span>
                <span className={stylesItens.infoArea}>
                  <span>Produto</span>
                  <span>Preço</span>
                </span>
                <span className={stylesItens.quantity}>Quantidade</span>
                <span className={stylesItens.btnArea}>
                  <span> Total</span>
                </span>
              </li>
              {stateCart.products.map((product) => (
                <li key={product.id}>
                  <span className={stylesItens.imgArea}>
                    <img src={`data:image/jpg;base64,${product.img}`} alt="" />
                  </span>
                  <span className={stylesItens.infoArea}>
                    <span>{product.nameBook}</span>
                    <span>R$ {product.price}</span>
                  </span>
                  <span className={stylesItens.quantity}>
                    <input
                      type="number"
                      min={1}
                      id={product.id}
                      value={product.quantity}
                      readOnly
                    />
                  </span>
                  <span className={stylesItens.btnArea}>
                    <span> R$ {product.total}</span>
                  </span>
                </li>
              ))}
            </ul>
          ) : (
            <div className={styles.viewDemand}>
              <article className={styles.congratulations}>
                <span>Parabéns!</span>
                <span>Sua compra foi realizada com sucesso!</span>
              </article>
              <p>Pedido número {stateCart.lastDemand.id}</p>
              <article className={styles.step}>
                <div className={styles.stepArea}>
                  <span>Aguardando confirmação</span>
                  <span></span>
                </div>
                <div className={styles.stepAreaOthers}>
                  <span>Sendo separado</span>
                  <span></span>
                </div>
                <div className={styles.stepAreaOthers}>
                  <span>Sendo transportado</span>
                  <span></span>
                </div>
                <div className={styles.stepAreaOthers}>
                  <span>Produto entregue</span>
                  <span></span>
                </div>
              </article>
            </div>
          )}
        </article>
        <article className={styles.modalInfo}>
          <div className={styles.modalInfoArea}>
            <div className={styles.modalInfoLeft}>
              <span className={styles.address}>
                <p>Endereço de Entrega</p>
                <p>
                  {stateCart.delivery.address.publicArea},
                  {stateCart.delivery.address.number},{' '}
                  {stateCart.delivery.address.local},{' '}
                  {stateCart.delivery.address.uf}
                </p>
              </span>
              <span className={styles.payment}>
                <p>Forma de Pagamento</p>
                <p>{stateCart.payment.description}</p>
              </span>
              <span className={styles.shipping}>
                <p>Frete</p> <span>R$ {stateCart.payment.shipping}</span>
              </span>
            </div>
            <div className={styles.modalInfoRight}>
              <span>Quantidade de itens {stateCart.amount}</span>
              <p>
                <span>Subtotal</span> <span>R$ {stateCart.subtotal}</span>
              </p>
              <p>
                <span>Total</span> <span>R$ {stateCart.total}</span>
              </p>
              {stateCart.payment.firstPay !== null && (
                <p style={{ width: '20rem' }}>
                  <span>Primeira Parcela com Frete </span>
                  <span>R$ {stateCart.payment.firstPay}</span>
                </p>
              )}
            </div>
          </div>
        </article>
        <article className={styles.modalInfoAction}>
          {confirm === true ? (
            <>
              <button
                type="button"
                className={stylesBtn.btnBack}
                onClick={() => {
                  setShowConfirmDemand(false);
                  setShowPaymentModal(true);
                }}
              >
                Voltar
              </button>
              <button
                type="button"
                className={stylesBtn.btnDone}
                onClick={() => done()}
              >
                Concluir o pedido
              </button>
            </>
          ) : (
            <>
              <span></span>
              <button
                type="button"
                className={styles.btnMain}
                onClick={() => {
                  dispatch(clearCart());
                  history.push('/principal');
                }}
              >
                Página Principal
              </button>
            </>
          )}
        </article>
      </div>
    </div>
  );
};

export default ConfirmDemandModal;
