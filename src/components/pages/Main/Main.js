import React from 'react';
import styles from './Main.module.css';
import img from '../../../assets/hp_book_05.jpg';

const Main = () => {
  return (<div className={` container ${styles.homeArea}`}>

      <div className={` ${styles.generalCards} `}>
      <div className={` ${styles.card01} `}>
        <img src={img}/>
        <div className={` ${styles.descriptionCard01} `}>
          <h3><b>Harry Potter and the Order of the Phoenix</b></h3>
          <h4>J. K. Rowling</h4>
          <h3 className={` ${styles.priceBook} `}><b>$ 195,60</b></h3>
        </div>
      </div>
      </div>

  </div>)
};

export default Main;
