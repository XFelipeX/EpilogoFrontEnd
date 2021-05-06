import React from 'react';
import Header from '../../Header/Header';
import styles from './Cart.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { decrementItem, incrementItem, removeItem } from '../../../redux';
import { useHistory } from 'react-router-dom';
// import { calcularPrecoPrazo } from 'correios-brasil';

const Cart = () => {
  const { stateCart } = useSelector((state) => state);
  const [products, setProducts] = React.useState([...stateCart.products]);
  const history = useHistory();
  const dispatch = useDispatch();
  console.log(stateCart);

  const [cep, setCep] = React.useState('');

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
  }

  function calcShipping(from) {
    let args = {
      sCepOrigem: '81200100',
      sCepDestino: '21770200',
      nVlPeso: '1',
      nCdFormato: '1',
      nVlComprimento: '20',
      nVlAltura: '20',
      nVlLargura: '20',
      nCdServico: ['04014', '04510'],
      nVlDiametro: '0',
    };
    // calcularPrecoPrazo(args).then((response) => {
    //   console.log(response);
    // });
  }

  return (
    <div className={styles.container}>
      <Header />
      <div className={styles.content}>
        <h1 className={styles.title}>Carrinho</h1>
        <article className={styles.itemsArea}>
          <ul className={styles.items}>
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
                  <span className={styles.more} onClick={() => more(product)}>
                    +
                  </span>
                  <input
                    type="number"
                    min={1}
                    id={product.id}
                    value={product.quantity}
                    readOnly
                  />
                  <span className={styles.less} onClick={() => less(product)}>
                    -
                  </span>
                </span>
                <span className={styles.btnArea}>
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
                    onClick={() => calcShipping(cep)}
                  >
                    Calcular Frete
                  </button>
                </label>
                <span className={styles.shippingOptions}>
                  <label htmlFor="shippingType1">
                    <input
                      type="radio"
                      name="shippingType"
                      id="shippingType1"
                    />
                    Econômico
                  </label>
                  <label htmlFor="shippingType2">
                    <input
                      type="radio"
                      name="shippingType"
                      id="shippingType2"
                    />
                    Sedex
                  </label>
                  <label htmlFor="shippingType3">
                    <input
                      type="radio"
                      name="shippingType"
                      id="shippingType3"
                    />
                    PAC
                  </label>
                </span>
              </div>
              <div className={styles.actionsInfo}>
                <ul>
                  <li>Quantidade de itens {stateCart.amount}</li>
                  <li>
                    Subtotal <span>R$ {stateCart.subtotal}</span>
                  </li>
                  <li>
                    Total <span>R$ {stateCart.total}</span>
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
              <button type="button" className={styles.btnDone}>
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
