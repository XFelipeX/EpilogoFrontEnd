import React from 'react';
import styles from './CardBook.module.css';
import { ReactComponent as ImgEmpty } from '../../../assets/emptyImage.svg';
import { IconContext } from 'react-icons';
import { FaCartArrowDown } from 'react-icons/fa';
import { GET_AUTHOR_BOOK, GET_MAIN_IMAGE_BOOK } from '../../../api';
import { useSelector, useDispatch } from 'react-redux';
import { incrementItem } from '../../../redux';

const CardBook = ({ book, setShowDetailsBook }) => {
  const [image, setImage] = React.useState();
  const [author, setAuthor] = React.useState();
  const { stateCart } = useSelector((state) => state);
  const dispatch = useDispatch();

  React.useEffect(() => {
    console.log(stateCart);
  }, [stateCart]);

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

  React.useEffect(() => {
    async function loadAuthor() {
      try {
        const { url, options } = GET_AUTHOR_BOOK(book.authorId);

        const response = await fetch(url, options);

        const json = await response.json();

        console.log(json);

        return json.object;
      } catch (error) {
        return null;
      }
    }

    loadAuthor().then((response) => {
      setAuthor(response);
    });
  }, [book]);

  function addCart(item, image) {
    item.img = image;
    dispatch(incrementItem(item));
  }

  return (
    <article className={` ${styles.card} `}>
      <article className={styles.imageArea}>
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
      </article>

      <article className={` ${styles.descriptionCard} `}>
        <h1
          className={` ${styles.titleBook} `}
          onClick={() => setShowDetailsBook(book)}
        >
          <b>{book.nameBook}</b>
        </h1>
        <h2 className={styles.authorBook}>{author ? author.nameAuthor : ''}</h2>
        <h3 className={` ${styles.priceBook} `}>
          <b>R$ {book.price}</b>
        </h3>
      </article>
      <article className={styles.btnArea}>
        <button
          type="button"
          className={styles.addCartBtn}
          onClick={() => addCart(book, image)}
        >
          <span>Comprar</span>
          <IconContext.Provider
            value={{ color: '#fff', size: '15px', width: '15%' }}
          >
            <FaCartArrowDown />
          </IconContext.Provider>
        </button>
      </article>
    </article>
  );
};

export default CardBook;
