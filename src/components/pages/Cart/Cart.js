import React from 'react';
import Header from '../../Header/Header';
import styles from './Cart.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { decrementItem, incrementItem, removeItem } from '../../../redux';

const Cart = () => {
  const { stateCart } = useSelector((state) => state);
  const [products, setProducts] = React.useState([...stateCart.products]);
  const dispatch = useDispatch();
  console.log(stateCart);

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
          <div className={styles.actions}></div>
        </article>
      </div>
    </div>
  );
};

export default Cart;
