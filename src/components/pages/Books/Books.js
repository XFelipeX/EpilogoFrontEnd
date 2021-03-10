import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getBooks } from '../../../redux/index';
import styles from './Books.module.css';
import { GET_BOOKS } from '../../../api';
import ModalInsert from './ModalInsert';

const Books = () => {
  const dispatch = useDispatch();
  const { books } = useSelector((state) => state);
  const [showInsertModal, setShowModalInsert] = React.useState(false);

  React.useEffect(() => {
    async function takeBooks() {
      try {
        const { options, url } = GET_BOOKS();

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

    takeBooks().then((response) => dispatch(getBooks(response)));
  }, []);

  return (
    <div className={`container ${styles.booksArea}`}>
      {showInsertModal && (
        <ModalInsert setShowModalInsert={setShowModalInsert} />
      )}

      <div className={`${styles.booksCard}`}>
        <section className={`${styles.booksCardTop}`}>
          <article>
            <label htmlFor="search">Pesquisar</label>
            <input type="text" id="search" name="search" />
          </article>

          <article>
            <button
              type="button"
              className={styles.btnInsert}
              onClick={() => setShowModalInsert(true)}
            >
              Adicionar
            </button>
          </article>
        </section>

        <section className={`${styles.booksCardMiddle}`}>
          <table className={`${styles.booksCardTable}`}>
            <thead>
              <tr>
                <th>ID</th>
                <th>Nome</th>
                <th>Estoque</th>
                <th>Status</th>
                <th></th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {books &&
                books.map(({ id, nameBook, amount, available }) => (
                  <tr key={id}>
                    <td>{id}</td>
                    <td>{nameBook}</td>
                    <td>{amount}</td>
                    <td>{+available === 1 ? 'Ativo' : 'Inativo'}</td>
                    <td>
                      <button type="button" className={styles.btnEdit}>
                        Editar
                      </button>
                    </td>
                    <td>
                      <button type="button" className={styles.btnActive}>
                        Ativar/Inativar
                      </button>
                    </td>
                    <td>
                      <button type="button" className={styles.btnView}>
                        Visualizar
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </section>

        <section className={`${styles.booksCardBottom}`}></section>
      </div>
    </div>
  );
};

export default Books;
