import React from 'react';
import { useDispatch } from 'react-redux';
import useClickOutside from '../../ClickOutside/ClickOutside';
import { POST_BOOK } from '../../../api';
import styles from './ModalInsert.module.css';
import { updateState } from '../../../redux';

const ModalInsert = ({
  setShowModalInsert,
  setShowInsertImages,
  setLastBook,
  showInsertImages,
}) => {
  const dispatch = useDispatch();
  const [name, setName] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [isbn, setIsbn] = React.useState('');
  const [stars, setStars] = React.useState('');
  const [category, setCategory] = React.useState('');
  const [available, setAvailable] = React.useState('');
  const [amount, setAmount] = React.useState('');
  const [price, setPrice] = React.useState('');
  const [author, setAuthor] = React.useState('');
  const [publishCompany, setPublishCompany] = React.useState('');
  const [publishDate, setPublishDate] = React.useState('');

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
  }

  async function handleSubmit(e) {
    e.preventDefault();

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

      console.log(url, options);

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

  const domNode = useClickOutside(() => {
    !showInsertImages && setShowModalInsert(false);
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
                    min="0"
                    type="number"
                    id="price"
                    name="price"
                    value={price}
                    onChange={({ target }) => setPrice(target.value)}
                  ></input>
                </label>

                <label htmlFor="amount">
                  Total:
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
                Cadastrar - Ir Imagens
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
