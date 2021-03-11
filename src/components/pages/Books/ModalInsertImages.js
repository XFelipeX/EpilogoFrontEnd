import React from 'react';
import styles from './ModalInsertImages.module.css';
import useClickOutside from '../../ClickOutside/ClickOutside';
import { MdAttachment } from 'react-icons/md';
import { convertBase64 } from '../../../utils/base64';
import { POST_BOOK_IMAGE } from '../../../api';

const ModalInsertImages = ({
  setShowInsertImages,
  setShowModalInsert,
  lastBook,
}) => {
  const [files, setFiles] = React.useState([]);
  const [images, setImages] = React.useState([]);
  const [removeItem, setRemoveItem] = React.useState(-1);
  const [mainImage, setMainImage] = React.useState(0);

  const domNode = useClickOutside(() => {
    setShowInsertImages(false);
    setShowModalInsert(true);
  });

  React.useEffect(() => {
    if (files.length > 0) {
      setImages([]);
      const copyArray = [...files];

      copyArray.map((file) => {
        convertBase64(file)
          .then(
            (response) =>
              (file = { base: response, main: mainImage, bookId: lastBook.id }),
          )
          .then(() => setImages((oldarray) => [...oldarray, file]));
      });
    }
  }, [files]);

  async function handleSubmit() {
    if (images.length < 4) {
      alert('insira pelo menos 4 imagens');
      return;
    }

    const filter = images.filter((image) => image.main === 1);

    if (filter === undefined || filter.length === 0) {
      alert('Pelo menos uma imagem precisa ser principal');
      return;
    }

    images.map((image) => {
      sendImageBook(image);
    });

    alert('As imagens foram inseridas');

    setShowInsertImages(false);
  }

  async function sendImageBook(image) {
    try {
      let onlyBase = image.base.split(',');

      const { url, options } = POST_BOOK_IMAGE({
        base: onlyBase[1],
        main: image.main,
        bookId: image.bookId,
        img: '',
      });

      const data = await fetch(url, options);

      const json = await data.json();

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

      console.log(json);
    } catch (error) {
      console.log(error);
    }
  }

  function removeIndex(index) {
    let copyArray = [...images];

    copyArray.splice(index, 1);

    setImages([...copyArray]);

    copyArray = [...files];

    copyArray.splice(index, 1);

    setFiles([...copyArray]);

    setRemoveItem(-1);
  }

  return (
    <div className={styles.modalArea}>
      <div ref={domNode} className={styles.modal}>
        <div className={styles.modalTop}>
          <label htmlFor="attachment">
            Anexar imagem
            <MdAttachment size={25} />
            <input
              type="file"
              id="attachment"
              name="attachment"
              accept="image/jpg,image/png,image/jpeg"
              onChange={({ target }) =>
                setFiles((oldarray) => [...oldarray, ...target.files])
              }
            />
          </label>

          <label htmlFor="mainImg">
            Imagem Principal
            <input
              type="checkbox"
              id="mainImg"
              name="mainImg"
              checked={mainImage === 1}
              onChange={() => {
                if (mainImage === 1) {
                  setMainImage(0);
                } else {
                  setMainImage(1);
                }
              }}
            />
          </label>

          <button type="button" className={styles.btnUpload}>
            Upload
          </button>
        </div>
        <div className={styles.modalBottom}>
          <div className={styles.modalImages}>
            <div className={styles.modalImagesArea}>
              {images &&
                images.map((image, index) => (
                  <div className={styles.modalCard} key={index}>
                    <input
                      type="checkbox"
                      checked={index === removeItem}
                      onChange={() => {
                        if (index === removeItem) {
                          setRemoveItem(-1);
                        } else {
                          setRemoveItem(index);
                        }
                      }}
                    />
                    <img src={image.base} alt="" className={styles.modalImg} />
                  </div>
                ))}
            </div>
            <div className={styles.modalChangeArea}>
              <button
                type="button"
                className={styles.btnRemove}
                style={removeItem !== -1 ? { display: 'block' } : {}}
                onClick={() => removeIndex(removeItem)}
              >
                Remover Selecionado
              </button>
            </div>
          </div>

          <div className={styles.doneArea}>
            <button
              type="button"
              className={styles.btnDone}
              onClick={handleSubmit}
            >
              Concluir Cadastro
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalInsertImages;
