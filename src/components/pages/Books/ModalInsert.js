import React from 'react';
import { useDispatch } from 'react-redux';
import useClickOutside from '../../ClickOutside/ClickOutside';
import { POST_BOOK, PUT_BOOK } from '../../../api';
import styles from './ModalInsert.module.css';
import { updateState } from '../../../redux';

const ModalInsert = ({
  setShowModalInsert,
  setShowInsertImages,
  setLastBook,
  showInsertImages,
  editBook,
  setEditBook,
}) => {
  const dispatch = useDispatch();
  const [name, setName] = React.useState(editBook.id ? editBook.nameBook : '');
  const [description, setDescription] = React.useState(
    editBook.id ? editBook.description : '',
  );
  const [isbn, setIsbn] = React.useState(editBook.id ? editBook.isbn : '');
  const [stars, setStars] = React.useState(editBook.id ? editBook.stars : '');
  const [category, setCategory] = React.useState(
    editBook.id ? editBook.category : '',
  );
  const [available, setAvailable] = React.useState(
    editBook.id ? editBook.available : '',
  );
  const [amount, setAmount] = React.useState(
    editBook.id ? editBook.amount : '',
  );
  const [price, setPrice] = React.useState(editBook.id ? editBook.price : '');
  const [author, setAuthor] = React.useState(
    editBook.id ? editBook.authorId : '',
  );
  const [publishCompany, setPublishCompany] = React.useState(
    editBook.id ? editBook.publishCompanyId : '',
  );
  const [publishDate, setPublishDate] = React.useState(
    editBook.id ? editBook.publishDate : '',
  );

  function clear() {
    setAmount('');
    setAuthor('');
    setCategory('');
    setName('');
    setPublishDate('');
    setStars('');
    setPublishCompany('');
    setPrice('');
    setIsbn('');
    setAvailable('');
    setCategory('');
    setDescription('');
    //setEditBook({});
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (
      name === '' ||
      description === '' ||
      isbn === '' ||
      stars === '' ||
      publishDate === '' ||
      category === '' ||
      price === '' ||
      amount === '' ||
      available === '' ||
      publishCompany === '' ||
      author === ''
    ) {
      alert('Preencha todos os campos');
      return;
    }
    if (editBook.id) {
      try {
        const { url, options } = PUT_BOOK({
          id: editBook.id,
          nameBook: name,
          description: description,
          isbn: isbn,
          stars: stars,
          publishDate: publishDate,
          category: category,
          price: price,
          amount: amount,
          available: available,
          publishCompanyId: publishCompany,
          authorId: author,
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

        dispatch(updateState());
        setShowInsertImages(true);
        setLastBook(json.object);

        console.log(json);
      } catch (error) {
        console.log(error);
      } finally {
        clear();
      }
    } else {
      try {
        const { url, options } = POST_BOOK({
          nameBook: name,
          description: description,
          isbn: isbn,
          stars: stars,
          publishDate: publishDate,
          category: category,
          price: price,
          amount: amount,
          available: available,
          publishCompanyId: publishCompany,
          authorId: author,
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

        dispatch(updateState());
        setShowInsertImages(true);
        setLastBook(json.object);

        console.log(json);
      } catch (error) {
        console.log(error);
      } finally {
        clear();
      }
    }
  }

  const domNode = useClickOutside(() => {
    if (!showInsertImages) {
      setShowModalInsert(false);
      setEditBook({});
    }
  });
  return (
    <div className={styles.modalArea}>
      <div ref={domNode} className={styles.modal}>
        <section className={styles.formArea}>
          <form action="" onSubmit={handleSubmit} method="POST">
            <div className={styles.formCenter}>
              <div className={styles.formLeft}>
                <label htmlFor="name">
                  Nome:
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={name}
                    onChange={({ target }) => setName(target.value)}
                  ></input>
                </label>
                <label htmlFor="description">
                  Descrição:
                  <input
                    type="text"
                    id="description"
                    name="description"
                    value={description}
                    onChange={({ target }) => setDescription(target.value)}
                  ></input>
                </label>

                <label htmlFor="isbn">
                  ISBN:
                  <input
                    min="0"
                    type="number"
                    id="isbn"
                    name="isbn"
                    value={isbn}
                    onChange={({ target }) => setIsbn(target.value)}
                  ></input>
                </label>

                <label htmlFor="stars">
                  Avaliação:
                  <input
                    defaultValue="1"
                    min="1"
                    max="6"
                    type="number"
                    id="stars"
                    name="stars"
                    value={stars}
                    onChange={({ target }) => setStars(target.value)}
                  ></input>
                </label>

                <label htmlFor="publishDate">
                  Data de publicação:
                  <input
                    type="date"
                    id="publishDate"
                    name="publishDate"
                    value={publishDate}
                    onChange={({ target }) => setPublishDate(target.value)}
                  ></input>
                </label>
              </div>

              <div className={styles.formRight}>
                <label htmlFor="category">
                  Categoria:
                  <input
                    type="text"
                    id="category"
                    name="category"
                    value={category}
                    onChange={({ target }) => setCategory(target.value)}
                  ></input>
                </label>
                <label htmlFor="price">
                  Preço:
                  <input
                    type="number"
                    id="price"
                    name="price"
                    value={price}
                    onChange={({ target }) => setPrice(target.value)}
                  ></input>
                </label>

                <label htmlFor="amount">
                  Estoque:
                  <input
                    min="0"
                    type="number"
                    id="amount"
                    name="amount"
                    value={amount}
                    onChange={({ target }) => setAmount(target.value)}
                  ></input>
                </label>

                <label htmlFor="available">
                  Disponibilidade:
                  <input
                    min="0"
                    max="1"
                    type="number"
                    id="available"
                    name="available"
                    value={available}
                    onChange={({ target }) => setAvailable(target.value)}
                  ></input>
                </label>

                <label htmlFor="publishCompany">
                  Editora:
                  <input
                    type="number"
                    id="publishCompany"
                    name="publishCompany"
                    value={publishCompany}
                    onChange={({ target }) => setPublishCompany(target.value)}
                  ></input>
                </label>

                <label htmlFor="author">
                  Author:
                  <input
                    type="number"
                    id="author"
                    name="author"
                    value={author}
                    onChange={({ target }) => setAuthor(target.value)}
                  ></input>
                </label>
              </div>
            </div>

            <article className={styles.sendForm}>
              <button
                type="submit"
                className={styles.cancelBtn}
                onClick={() => {
                  clear();
                  setShowModalInsert(false);
                }}
              >
                Cancelar
              </button>
              <button type="submit" className={styles.sendBtn}>
                {editBook.id ? 'Salvar' : 'Cadastrar'} - Ir Imagens
              </button>
            </article>
          </form>
        </section>
        {/**<section className={styles.imageArea}></section> */}
      </div>
    </div>
  );
};

export default ModalInsert;
