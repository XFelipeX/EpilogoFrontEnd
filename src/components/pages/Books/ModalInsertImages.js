import React from 'react';
import styles from './ModalInsertImages.module.css';
import useClickOutside from '../../ClickOutside/ClickOutside';
import { MdAttachment } from 'react-icons/md';
import { convertBase64 } from '../../../utils/base64';
import {
  GET_IMAGES_BOOK,
  POST_BOOK_IMAGE,
  DELETE_IMAGE_BOOK,
} from '../../../api';
import { useSelector } from 'react-redux';

const ModalInsertImages = ({
  setShowInsertImages,
  setShowModalInsert,
  lastBook,
  editBook,
}) => {
  const [files, setFiles] = React.useState([]);
  const [images, setImages] = React.useState([]);
  const [loadImages, setLoadImages] = React.useState([]);
  const [removeItem, setRemoveItem] = React.useState({
    index: -1,
    image: { id: -1 },
  });
  const [mainImage, setMainImage] = React.useState(0);
  const { permissions } = useSelector((state) => state);

  const domNode = useClickOutside(() => {
    setShowInsertImages(false);
    setShowModalInsert(true);
  });

  React.useEffect(() => {
    if (editBook.id) {
      async function getImagesBook() {
        try {
          const { options, url } = GET_IMAGES_BOOK(
            editBook.id,
            permissions.token,
          );

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

      getImagesBook().then((response) => setLoadImages(response));
    }
  }, [editBook.id, permissions.token]);

  function loadImageAttachment() {
    if (files.length > 0) {
      const copyArray = [...files];

      copyArray.map((file) =>
        convertBase64(file)
          .then(
            (response) =>
              (file = {
                base: response,
                main: mainImage,
                bookId: lastBook.id,
              }),
          )
          .then(() => setImages((oldarray) => [...oldarray, file]))
          .then(() => setMainImage(0)),
      );
    }
    setFiles([]);
    document.getElementById('attachment').value = '';
  }

  function handleSubmit() {
    if (images.length + loadImages.length < 2) {
      alert('insira pelo menos 2 imagens');
      return;
    }

    const filter = images.filter((image) => image.main === 1);
    const filterLoad = loadImages.filter((image) => image.main === 1);

    if (filter.length === 0 && filterLoad.length === 0) {
      console.log(images);

      alert('Pelo menos uma imagem precisa ser principal');
      return;
    }

    images.map((image) => sendImageBook(image));

    alert('As imagens foram inseridas');

    setShowInsertImages(false);
  }

  async function sendImageBook(image) {
    try {
      let onlyBase = image.base.split(',');

      const { url, options } = POST_BOOK_IMAGE(
        {
          base: onlyBase[1],
          main: image.main,
          bookId: image.bookId,
          img: '',
        },
        permissions.token,
      );

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

  function removeIndex(item) {
    const filterItem = loadImages.filter(
      (image) => +image.id === +item.image.id,
    );

    if (editBook.id && filterItem.length > 0) {
      alert('deletando do banco');
      deleteImage(item.image.id).then(() => {
        let newArray = [...loadImages];

        newArray = newArray.filter((image) => image.id !== item.image.id);

        setLoadImages([...newArray]);
      });

      setRemoveItem({ index: -1, image: { id: -1 } });

      return;
    }

    let copyArray = [...images];

    copyArray.splice(item.index, 1);

    setImages([...copyArray]);

    copyArray = [...files];

    copyArray.splice(item.index, 1);

    setFiles([...copyArray]);

    setRemoveItem({ index: -1, image: { id: -1 } });
  }

  async function deleteImage(id) {
    try {
      const { url, options } = DELETE_IMAGE_BOOK(id, permissions.token);

      const response = await fetch(url, options);

      const json = await response.json();

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

  function verifyIfExistMainImage() {
    let haveMainImage = false;

    loadImages.forEach((image) => {
      if (image.main === 1) {
        haveMainImage = true;
      }
    });

    images.forEach((image) => {
      if (image.main === 1) {
        haveMainImage = true;
      }
    });

    if (haveMainImage) {
      alert('Já existe imagem principal, remova-a para inserir uma nova');
    }

    return haveMainImage;
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
                if (!verifyIfExistMainImage()) {
                  setMainImage(1);
                }
                if (mainImage === 1) {
                  setMainImage(0);
                }
              }}
            />
          </label>

          <button
            type="button"
            className={styles.btnUpload}
            onClick={() => loadImageAttachment()}
          >
            Upload
          </button>
        </div>
        <div className={styles.modalBottom}>
          <div className={styles.modalImages}>
            <div className={styles.modalImagesArea}>
              {loadImages &&
                loadImages.map((image, index) => (
                  <div className={styles.modalCard} key={image.id}>
                    <input
                      type="checkbox"
                      checked={image.id === removeItem.image.id}
                      onChange={() => {
                        if (image.id === removeItem.image.id) {
                          setRemoveItem({ index: -1, image: { id: -1 } });
                        } else {
                          setRemoveItem({ index: index, image: image });
                        }
                      }}
                    />
                    <img
                      src={`data:image/jpg;base64,${image.img}`}
                      alt=""
                      className={styles.modalImg}
                      style={
                        image.main === 1
                          ? { border: '3px solid var(--blue-first)' }
                          : {}
                      }
                    />
                  </div>
                ))}

              {images &&
                images.map((image, index) => (
                  <div className={styles.modalCard} key={index}>
                    <input
                      type="checkbox"
                      checked={
                        index === removeItem.index &&
                        removeItem.image.base !== ''
                      }
                      onChange={() => {
                        if (
                          index === removeItem.index &&
                          removeItem.image.base !== ''
                        ) {
                          setRemoveItem({ index: -1, image: { id: -1 } });
                        } else {
                          setRemoveItem({ index: index, image: image });
                        }
                      }}
                    />
                    <img
                      src={image.base}
                      alt=""
                      className={styles.modalImg}
                      style={
                        image.main === 1
                          ? { border: '3px solid var(--blue-first)' }
                          : {}
                      }
                    />
                  </div>
                ))}
            </div>
            <div className={styles.modalChangeArea}>
              <button
                type="button"
                className={styles.btnRemove}
                style={removeItem.index !== -1 ? { display: 'block' } : {}}
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
