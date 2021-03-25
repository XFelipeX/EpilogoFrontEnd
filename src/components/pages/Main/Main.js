import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styles from './Main.module.css';
import stylesPagination from '../Books/Books.module.css';
import CardBook from './CardBook';
import { getBooks } from '../../../redux';
import { GET_BOOKS } from '../../../api';
import ModalView from '../Books/ModalView';
import ReactPaginate from 'react-paginate';

const Main = () => {
  const dispatch = useDispatch();
  const { books } = useSelector((state) => state);
  const [showDetailsBook, setShowDetailsBook] = React.useState(null);
  const [page, setPage] = React.useState(0);

  React.useEffect(() => {
    async function takeBooks() {
      try {
        const { options, url } = GET_BOOKS(page, 10);

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
  }, [dispatch, page]);

  function handlePageClick(e) {
    setPage(e.selected);
  }

  return (
    <div className={` container ${styles.homeArea}`}>
      {showDetailsBook && (
        <ModalView
          bookView={showDetailsBook}
          setBookView={setShowDetailsBook}
        />
      )}
      <div className={` ${styles.generalCards} `}>
        {books &&
          books.content &&
          books.content.map((book) => (
            <CardBook
              book={book}
              key={book.id}
              setShowDetailsBook={setShowDetailsBook}
            />
          ))}
      </div>
      <div className={`${styles.pageCards}`}>
        <ReactPaginate
          previousLabel={'Anterior'}
          nextLabel={'Próximo'}
          breakLabel={'...'}
          breakClassName={'break-me'}
          pageCount={books.totalPages}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={handlePageClick}
          containerClassName={stylesPagination.pagination}
          subContainerClassName={'pages pagination'}
          activeClassName={stylesPagination.active}
        />
      </div>
    </div>
  );
};

export default Main;
