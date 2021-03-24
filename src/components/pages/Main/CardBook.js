import React from 'react';
import styles from './CardBook.module.css';
import { ReactComponent as ImgEmpty } from '../../../assets/emptyImage.svg';
import { IconContext } from 'react-icons';
import { FaAlignCenter, FaCartArrowDown } from 'react-icons/fa';
import { GET_MAIN_IMAGE_BOOK } from '../../../api';

const CardBook = ({ book, setShowDetailsBook }) => {
  const [image, setImage] = React.useState();

  React.useEffect(() => {
    async function loadMainImage() {
      try {
        const { url, options } = GET_MAIN_IMAGE_BOOK(book.id);

        const response = await fetch(url, options);

        const json = await response.json();

        console.log(json);

        return json.object;
      } catch (error) {
        return {};
      }
    }

    loadMainImage().then((response) => {
      if (response && response.img) {
        setImage(response.img);
      } else {
        setImage('');
      }
    });
  }, [book]);

  return (
    <article className={` ${styles.card} `}
      onClick={() => setShowDetailsBook(book)}
    >

      {image === '' ? (
        <ImgEmpty
          onClick={() => setShowDetailsBook(book)}
          className={` ${styles.image} `}
        />
      ) : (
        <img
          className={` ${styles.image} `}
          src={`data:image/jpg;base64,${image}`}
          alt=""
          onClick={() => setShowDetailsBook(book)}
        />
      )}

      <article className={` ${styles.descriptionCard} `}>
        <h1
          className={` ${styles.titleBook} `}
          onClick={() => setShowDetailsBook(book)}
        >
          <b>{book.nameBook}</b>
        </h1>
        <h3 className={` ${styles.priceBook} `}>
          <b>R$ {book.price}</b>
        </h3>
      </article>
      <button type="button" className={styles.addCartBtn}>
        <span>Comprar</span>
        <IconContext.Provider
          value={{ color: '#fff', size: '15px', width: '15%'}}
        >
          <FaCartArrowDown />
        </IconContext.Provider>
      </button>
    </article>
  );
};

export default CardBook;
