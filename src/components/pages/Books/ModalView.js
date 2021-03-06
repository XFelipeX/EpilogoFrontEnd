import React from 'react';
import { AiFillStar } from 'react-icons/ai';
import { GET_IMAGES_BOOK } from '../../../api';
import useClickOutside from '../../ClickOutside/ClickOutside';
import Carousel from './Carousel';
import styles from './ModalView.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { incrementItem } from '../../../redux';

const ModalView = ({ setBookView, bookView }) => {
  const [images, setImages] = React.useState([]);
  const [stars, setStars] = React.useState([]);
  const { permissions } = useSelector((state) => state);
  const dispatch = useDispatch();
  const history = useHistory();
  const domNode = useClickOutside(() => {
    setBookView(null);
  });

  React.useEffect(() => {
    for (let i = 0; i < bookView.stars; i++) {
      setStars((oldArray) => [...oldArray, i]);
    }
  }, [bookView]);

  React.useEffect(() => {
    async function getImagesBook() {
      try {
        const { options, url } = GET_IMAGES_BOOK(bookView.id);

        const response = await fetch(url, options);

        const json = await response.json();

        if (json.error) {
          alert('houve um erro verifique o console');
          console.log(json);
          return [];
        }

        return json.object;
      } catch (error) {
        console.log(error);
        return [];
      }
    }

    getImagesBook().then((response) => setImages(response));
  }, [bookView, permissions.token]);

  function addCart(item, image) {
    item.img = image;
    dispatch(incrementItem(item));
  }

  return (
    <div className={styles.modalArea}>
      <div ref={domNode} className={styles.modal}>
        <section className={styles.modalLeft}>
          <div className={styles.carouselArea}>
            {images && <Carousel images={images} />}
          </div>
          <div className={styles.infoArea}>
            <h1>{bookView.nameBook}</h1>
            <p>
              {stars.map((star, index) => (
                <AiFillStar key={index} size={18} color="yellow" />
              ))}
            </p>
            <textarea readOnly defaultValue={bookView.description}></textarea>
          </div>
        </section>

        <section className={styles.modalRight}>
          <h2 style={{ color: 'blue' }}>$ {bookView.price}</h2>
          <button
            type="button"
            className={styles.btnPurchase}
            onClick={() => {
              if (permissions.typeAccount !== 2) return;
              history.push('/carrinho');
              addCart(bookView, images[0].img);
            }}
          >
            Comprar
          </button>
        </section>
      </div>
    </div>
  );
};

export default ModalView;
