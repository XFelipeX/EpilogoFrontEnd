import React from 'react';
import styles from './Main.module.css';
import img from '../../../assets/hp_book_05.jpg';
import img2 from '../../../assets/clipart4711592.png';
import { MdShoppingCart } from 'react-icons/md';

const Main = () => {
  return (
    <div className={` container ${styles.homeArea}`}>
      <div className={` ${styles.generalCards} `}>
        <div className={` ${styles.card} `}>
          <a href="localhost:3000/produtos">
            <img className={` ${styles.image1} `} src={img} />
          </a>
          <div className={` ${styles.descriptionCard01} `}>
            <a href="localhost:3000/produtos">
              <h3 className={` ${styles.titleBook} `}>
                <b>Harry Potter and the Order of the Phoenix</b>
              </h3>
            </a>
            <h4>J. K. Rowling</h4>
            <h3 className={` ${styles.priceBook} `}>
              <b>$ 195,60</b>
            </h3>
            <a href="localhost:3000">
              {' '}
              <MdShoppingCart
                className={` ${styles.imgAddCart} `}
                size={50}
                color="#ff0000"
              />
            </a>
          </div>
        </div>

        <div className={` ${styles.card} `}>
          <a href="localhost:3000/produtos">
            <img className={` ${styles.image1} `} src={img} />
          </a>
          <div className={` ${styles.descriptionCard01} `}>
            <a href="localhost:3000/produtos">
              <h3 className={` ${styles.titleBook} `}>
                <b>Harry Potter and the Order of the Phoenix</b>
              </h3>
            </a>
            <h4>J. K. Rowling</h4>
            <h3 className={` ${styles.priceBook} `}>
              <b>$ 195,60</b>
            </h3>
            <a href="localhost:3000">
              {' '}
              <MdShoppingCart
                className={` ${styles.imgAddCart} `}
                size={50}
                color="#ff0000"
              />
            </a>
          </div>
        </div>

        <div className={` ${styles.card} `}>
          <a href="localhost:3000/produtos">
            <img className={` ${styles.image1} `} src={img} />
          </a>
          <div className={` ${styles.descriptionCard01} `}>
            <a href="localhost:3000/produtos">
              <h3 className={` ${styles.titleBook} `}>
                <b>Harry Potter and the Order of the Phoenix</b>
              </h3>
            </a>
            <h4>J. K. Rowling</h4>
            <h3 className={` ${styles.priceBook} `}>
              <b>$ 195,60</b>
            </h3>
            <a href="localhost:3000">
              {' '}
              <MdShoppingCart
                className={` ${styles.imgAddCart} `}
                size={50}
                color="#ff0000"
              />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Main;
