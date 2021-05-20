import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getBooks } from '../../../redux/index';
import styles from './Books.module.css';
import { GET_BOOKS, PUT_BOOK } from '../../../api';
import ModalInsert from './ModalInsert';
import ModalInsertImages from './ModalInsertImages';
import ModalView from './ModalView';
import BookControl from './BookControl';
import ReactPaginate from 'react-paginate';
import Header from '../../Header/Header';

const Books = () => {
  const dispatch = useDispatch();
  const { books } = useSelector((state) => state);
  const { permissions } = useSelector((state) => state);
  const { stateUpdate } = useSelector((state) => state);
  const [showInsertModal, setShowModalInsert] = React.useState(false);
  const [showInsertImages, setShowInsertImages] = React.useState(false);
  const [showBookControl, setShowBookControl] = React.useState(false);
  const [bookView, setBookView] = React.useState(false);
  const [lastBook, setLastBook] = React.useState({});
  const [editBook, setEditBook] = React.useState({});
  const [page, setPage] = React.useState(0);

  React.useEffect(() => {
    async function takeBooks() {
      try {
        const { options, url } = GET_BOOKS(page, 7);

        const response = await fetch(url, options);

        const json = await response.json();

        if (json.error) {
          alert('houve um erro verifique o console');
          console.log(json);
          return [];
        }

        console.log(json);

        return json;
      } catch (error) {
        console.log(error);
        return [];
      }
    }

    takeBooks().then((response) => dispatch(getBooks(response)));
  }, [stateUpdate, dispatch, page]);

  async function updateBook(book) {
    const available = book.available === 1 ? 0 : 1;

    try {
      const { url, options } = PUT_BOOK(
        {
          id: book.id,
          nameBook: book.nameBook,
          description: book.description,
          isbn: book.isbn,
          stars: book.stars,
          publishDate: book.publishDate,
          category: book.category,
          price: book.price,
          amount: book.amount,
          available: available,
          publishCompanyId: book.publishCompanyId,
          authorId: book.authorId,
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

  function handlePageClick(e) {
    setPage(e.selected);
  }

  return (
    <div className={`container ${styles.booksArea}`}>
      <Header />
      {showInsertModal && (
        <ModalInsert
          setLastBook={setLastBook}
          setShowModalInsert={setShowModalInsert}
          setShowInsertImages={setShowInsertImages}
          showInsertImages={showInsertImages}
          editBook={editBook}
          setEditBook={setEditBook}
        />
      )}

      {showInsertImages && (
        <ModalInsertImages
          lastBook={lastBook}
          setShowModalInsert={setShowModalInsert}
          setShowInsertImages={setShowInsertImages}
          editBook={editBook}
        />
      )}

      {bookView && <ModalView bookView={bookView} setBookView={setBookView} />}

      {showBookControl && (
        <BookControl
          setShowBookControl={setShowBookControl}
          editBook={editBook}
          updateBook={updateBook}
          setEditBook={setEditBook}
        />
      )}

      <div className={`${styles.booksCard}`}>
        <section className={`${styles.booksCardTop}`}>
          <article className={`${styles.booksCardSearch}`}>
            <label htmlFor="search">Pesquisar</label>
            <input type="text" id="search" name="search" />
          </article>

          <article>
            {permissions.typeAccount === 0 && (
              <button
                type="button"
                className={styles.btnInsert}
                onClick={() => setShowModalInsert(true)}
              >
                Adicionar
              </button>
            )}
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
              {books.content &&
                books.content.map((book) => (
                  <tr key={book.id}>
                    <td>{book.id}</td>
                    <td>{book.nameBook}</td>
                    <td>{book.amount}</td>
                    <td>{+book.available === 1 ? 'Ativo' : 'Inativo'}</td>
                    <td>
                      <button
                        type="button"
                        className={styles.btnEdit}
                        onClick={() => {
                          setEditBook(book);
                          setShowModalInsert(true);
                        }}
                      >
                        Editar
                      </button>
                    </td>
                    <td>
                      {permissions.typeAccount === 0 && (
                        <button
                          type="button"
                          className={styles.btnActive}
                          onClick={() => {
                            setShowBookControl(true);
                            setEditBook(book);
                          }}
                        >
                          Ativar/Inativar
                        </button>
                      )}
                    </td>
                    <td>
                      <button
                        type="button"
                        className={styles.btnView}
                        onClick={() => {
                          setBookView(book);
                        }}
                      >
                        Visualizar
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </section>

        <section className={`${styles.booksCardBottom}`}>
          <ReactPaginate
            previousLabel={'Anterior'}
            nextLabel={'Próximo'}
            breakLabel={'...'}
            breakClassName={'break-me'}
            pageCount={books.totalPages}
            marginPagesDisplayed={2}
            pageRangeDisplayed={5}
            onPageChange={handlePageClick}
            containerClassName={styles.pagination}
            subContainerClassName={'pages pagination'}
            activeClassName={styles.active}
          />
        </section>
      </div>
    </div>
  );
};

export default Books;
