import React from 'react';
import { useDispatch } from 'react-redux';
import { updateState } from '../../../redux';
import useClickOutside from '../../ClickOutside/ClickOutside';
import styles from './BookControl.module.css';

const BookControl = ({
  setShowBookControl,
  editBook,
  updateBook,
  setEditBook,
}) => {
  const dispatch = useDispatch();
  const domNode = useClickOutside(() => {
    setShowBookControl(null);
    setEditBook({});
  });
  return (
    <div className={styles.modalArea}>
      <div ref={domNode} className={styles.modal}>
        <section className={styles.formArea}>
          <label htmlFor="nameBook">
            Nome
            <input
              id="nameBook"
              name="nameBook"
              type="text"
              readOnly
              defaultValue={editBook.nameBook}
            />
          </label>
          <label htmlFor="description">
            Descrição
            <input
              id="description"
              name="description"
              type="text"
              readOnly
              defaultValue={editBook.description}
            />
          </label>
          <label htmlFor="stars">
            Estrelas
            <input
              id="stars"
              name="stars"
              type="number"
              readOnly
              defaultValue={editBook.stars}
            />
          </label>
          <label htmlFor="available">
            Status
            <input
              id="available"
              name="available"
              type="text"
              readOnly
              defaultValue={editBook.available === 1 ? 'Ativo' : 'Inativo'}
            />
          </label>
          <label htmlFor="amount">
            Estoque
            <input
              id="amount"
              name="amount"
              type="number"
              readOnly
              defaultValue={editBook.amount}
            />
          </label>
          <label htmlFor="price">
            Preço
            <input
              id="price"
              name="price"
              type="number"
              readOnly
              defaultValue={editBook.price}
            />
          </label>
        </section>

        <section className={styles.btnArea}>
          <button
            type="button"
            className={styles.btnCancel}
            onClick={() => setShowBookControl(false)}
          >
            Cancelar
          </button>
          <button
            type="button"
            className={styles.btnAction}
            onClick={() => {
              updateBook(editBook);
              setShowBookControl(false);
              dispatch(updateState());
              alert('O status do produto foi alterado');
            }}
          >
            {editBook.available === 1 ? 'Inativar' : 'Ativar'}
          </button>
        </section>
      </div>
    </div>
  );
};

export default BookControl;
