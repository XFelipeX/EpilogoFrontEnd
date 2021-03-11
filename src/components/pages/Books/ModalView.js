import React from 'react';
import { GET_IMAGES_BOOK } from '../../../api';
import { getBooks } from '../../../redux';
import useClickOutside from '../../ClickOutside/ClickOutside';
import Carousel from './Carousel';
import styles from './ModalView.module.css';

const ModalView = ({ setBookView, bookView }) => {
  const [images, setImages] = React.useState([]);

  const domNode = useClickOutside(() => {
    setBookView(null);
  });

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
  }, []);

  //console.log(images);
  return (
    <div className={styles.modalArea}>
      <div ref={domNode} className={styles.modal}>
        <section className={styles.modalLeft}>
          <div className={styles.carouselArea}>
            {images && <Carousel images={images} />}
          </div>
          <div className={styles.infoArea}>
            <h1>{bookView.nameBook}</h1>
            <textarea readOnly>{bookView.description}</textarea>
          </div>
        </section>

        <section className={styles.modalRight}>
          <h2>${bookView.price}</h2>
          <button type="button" className={styles.btnPurchase}>
            Comprar
          </button>
        </section>
      </div>
    </div>
  );
};

export default ModalView;
