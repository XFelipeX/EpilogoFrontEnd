import React from 'react';
import Header from '../../Header/Header';
import styles from './Cart.module.css';
import testimg from '../../../assets/testimg.jpeg';

function more() {
  const input = document.getElementById('quantityProduct');
  let current = input.value;
  let newValue = +current + 1;
  input.value = newValue;
}

function less() {
  const input = document.getElementById('quantityProduct');
  if (+input.value === 1) return;
  let current = input.value;
  let newValue = +current - 1;
  input.value = newValue;
}

const Cart = () => {
  return (
    <div className={styles.container}>
      <Header />
      <div className={styles.content}>
        <h1 className={styles.title}>Carrinho</h1>
        <article className={styles.itemsArea}>
          <ul className={styles.items}>
            <li>
              <span className={styles.imgArea}>
                <img src={testimg} alt="" />
              </span>
              <span className={styles.infoArea}>
                <span>Descrição do produto</span>
                <span>R$ 29,90</span>
              </span>
              <span className={styles.quantity}>
                <span className={styles.more} onClick={more}>
                  +
                </span>
                <input type="number" min={1} id="quantityProduct" />
                <span className={styles.less} onClick={() => less()}>
                  -
                </span>
              </span>
              <span className={styles.btnArea}>
                <button type="button">Remover</button>
              </span>
            </li>
          </ul>
        </article>
        <article className={styles.actionsArea}>
          <div className={styles.actions}></div>
        </article>
      </div>
    </div>
  );
};

export default Cart;
