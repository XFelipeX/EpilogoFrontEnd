import React from 'react';
import Header from '../../Header/Header';
import styles from './Cart.module.css';
import { HiEmojiSad } from 'react-icons/hi';
import { useSelector, useDispatch } from 'react-redux';
import { decrementItem, incrementItem, removeItem } from '../../../redux';
import { useHistory } from 'react-router-dom';
import { validateCep } from '../../../utils/regexValidations';
import { getTotal, insertShipping } from '../../../redux/';
import { GET_ADDRESS_DELIVERY_BY_ACCOUNT } from '../../../api';
import PaymentModal from './PaymentModal';
import AddressModal from './AddressModal';
import ConfirmDemandModal from './ConfirmDemandModal';

const Cart = () => {
  const { stateCart } = useSelector((state) => state);
  const { permissions } = useSelector((state) => state);
  const [products, setProducts] = React.useState([...stateCart.products]);
  const history = useHistory();
  const dispatch = useDispatch();
  const [cep, setCep] = React.useState('');

  // Shipping types
  const [shipping1, setShipping1] = React.useState('');
  const [shipping2, setShipping2] = React.useState('');
  const [shipping3, setShipping3] = React.useState('');
  const [prices, setPrices] = React.useState([]);

  // Modals
  const [showPaymentModal, setShowPaymentModal] = React.useState(false);
  const [showAddressModal, setShowAddressModal] = React.useState(false);
  const [showConfirmDemand, setShowConfirmDemand] = React.useState(false);

  React.useEffect(() => {
    async function getAddressDelivery() {
      try {
        const { url, options } = GET_ADDRESS_DELIVERY_BY_ACCOUNT(
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
    if (permissions.id !== -1) {
      getAddressDelivery().then((response) => {
        if (response && response.object && stateCart.products.length) {
          simulateCalcShipping(response.object.cep);
          setCep(response.object.cep);
          alert('Cálculo de frete baseado em seu endereço de entrega atual');
        }
      });
    }
  }, [permissions.id, permissions.user.accountId]); // eslint-disable-line react-hooks/exhaustive-deps

  React.useEffect(() => {
    const copyArray = stateCart.products;
    copyArray.sort((a, b) => {
      if (a.id < b.id) {
        return 1;
      } else {
        return -1;
      }
    });
    setProducts([...copyArray]);
  }, [stateCart.products]);

  function more(item) {
    dispatch(incrementItem(item));
  }
  function less(item) {
    dispatch(decrementItem(item));
  }
  function remove(item) {
    dispatch(removeItem(item));
    if (!stateCart.products.length) {
      alterShippings('', '', '');
      setCep('');
      dispatch(insertShipping(0));
    }
  }

  function simulateCalcShipping(from) {
    // Clear
    alterShippings('', '', '');
    dispatch(insertShipping(0));
    if (!validateCep(from)) {
      alert('Digite um CEP válido');
      return;
    }

    const existPrice = prices.filter((item) => item.cep === from);

    if (existPrice.length) {
      setShipping1(existPrice[0].type1);
      setShipping2(existPrice[0].type2);
      setShipping3(existPrice[0].type3);
      return;
    }

    const type1 = (Math.random() * 10 + 10).toFixed(2);
    const type2 = (Math.random() * 30 + 10).toFixed(2);
    const type3 = (Math.random() * 40 + 10).toFixed(2);

    const object = {
      cep: from,
      type1,
      type2,
      type3,
    };

    setPrices((oldarray) => [...oldarray, object]);
    alterShippings(type1, type2, type3);
  }

  function alterShippings(type1, type2, type3) {
    const check = document.getElementById('shippingType1');
    if (check) {
      document.getElementById('shippingType1').checked = false;
      document.getElementById('shippingType2').checked = false;
      document.getElementById('shippingType3').checked = false;
    }
    setShipping1(type1);
    setShipping2(type2);
    setShipping3(type3);
  }

  React.useEffect(() => {
    dispatch(getTotal());
  }, [dispatch, stateCart.subtotal]);

  return (
    <div className={styles.container}>
      <Header />
      {showPaymentModal && (
        <PaymentModal
          setShowPaymentModal={setShowPaymentModal}
          setShowAddressModal={setShowAddressModal}
          setShowConfirmDemand={setShowConfirmDemand}
          simulateCalcShipping={simulateCalcShipping}
          shipping1={shipping1}
          shipping2={shipping2}
          shipping3={shipping3}
        />
      )}
      {showAddressModal && (
        <AddressModal
          setShowAddressModal={setShowAddressModal}
          setShowPaymentModal={setShowPaymentModal}
        />
      )}
      {showConfirmDemand && (
        <ConfirmDemandModal
          setShowConfirmDemand={setShowConfirmDemand}
          setShowPaymentModal={setShowPaymentModal}
        />
      )}
      <div className={styles.content}>
        <h1 className={styles.title}>Meu Carrinho</h1>
        <article className={styles.itemsArea}>
          <ul className={styles.items}>
            {!stateCart.products.length && (
              <h1 className={styles.emptyCart}>
                Você não possui itens no carrinho{' '}
                <HiEmojiSad size={30} style={{ marginLeft: '1rem' }} />
              </h1>
            )}
            {products.map((product) => (
              <li key={product.id}>
                <span className={styles.imgArea}>
                  <img src={`data:image/jpg;base64,${product.img}`} alt="" />
                </span>
                <span className={styles.infoArea}>
                  <span>{product.nameBook}</span>
                  <span>R$ {product.price}</span>
                </span>
                <span className={styles.quantity}>
                  <span className={styles.less} onClick={() => less(product)}>
                    -
                  </span>
                  <input
                    type="number"
                    min={1}
                    id={product.id}
                    value={product.quantity}
                    readOnly
                  />
                  <span className={styles.more} onClick={() => more(product)}>
                    +
                  </span>
                </span>
                <span className={styles.btnArea}>
                  <span> Total: R$ {product.total}</span>
                  <button type="button" onClick={() => remove(product)}>
                    Remover
                  </button>
                </span>
              </li>
            ))}
          </ul>
        </article>
        <article className={styles.actionsArea}>
          <div className={styles.actions}>
            <article className={styles.actionsTop}>
              <div className={styles.shipping}>
                <label htmlFor="shipping">
                  <input
                    type="text"
                    name="shipping"
                    id="shipping"
                    placeholder="CEP"
                    value={cep}
                    onChange={({ target }) => setCep(target.value)}
                  />
                  <button
                    type="button"
                    className={styles.btnCalcShipping}
                    onClick={() => {
                      if (stateCart.products.length) simulateCalcShipping(cep);
                    }}
                  >
                    Calcular Frete
                  </button>
                </label>
                {shipping1 !== '' && shipping2 !== '' && shipping3 !== '' && (
                  <span className={styles.shippingOptions}>
                    <label htmlFor="shippingType1">
                      <span>
                        <input
                          type="radio"
                          name="shippingType"
                          id="shippingType1"
                          onClick={() => dispatch(insertShipping(+shipping1))}
                        />
                        Econômico
                      </span>
                      <span>R$ {shipping1}</span>
                    </label>
                    <label htmlFor="shippingType2">
                      <span>
                        <input
                          type="radio"
                          name="shippingType"
                          id="shippingType2"
                          onClick={() => dispatch(insertShipping(+shipping2))}
                        />
                        Sedex
                      </span>
                      <span>R$ {shipping2}</span>
                    </label>
                    <label htmlFor="shippingType3">
                      <span>
                        <input
                          type="radio"
                          name="shippingType"
                          id="shippingType3"
                          onClick={() => dispatch(insertShipping(+shipping3))}
                        />
                        PAC
                      </span>
                      <span>R$ {shipping3}</span>
                    </label>
                  </span>
                )}
              </div>

              <div className={styles.actionsInfo}>
                <ul>
                  <li>Quantidade de itens {stateCart.amount}</li>
                  <li>
                    Frete <span>R$ {stateCart.shipping}</span>
                  </li>
                  <li>
                    Subtotal <span>R$ {stateCart.total}</span>
                  </li>
                </ul>
              </div>
            </article>
            <article className={styles.actionsBottom}>
              <button
                type="button"
                className={styles.btnBack}
                onClick={() => history.push('/principal')}
              >
                Continuar Comprando
              </button>
              <button
                type="button"
                className={styles.btnDone}
                onClick={() => {
                  if (!stateCart.products.length) return;
                  if (permissions.id === -1) {
                    alert('Entre com sua conta para efetuar o pedido');
                    history.push('/');
                  }
                  // setShowPaymentModal(true);
                  setShowAddressModal(true);
                }}
              >
                Finalizar o Pedido
              </button>
            </article>
          </div>
        </article>
      </div>
    </div>
  );
};

export default Cart;
