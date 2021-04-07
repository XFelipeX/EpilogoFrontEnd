import React from 'react';
import Header from '../../Header/Header';
import styles from './Users.module.css';
import ReactPaginate from 'react-paginate';
import stylesBooks from '../Books/Books.module.css';
import { GET_ACCOUNTS } from '../../../api';
import { useSelector } from 'react-redux';
import ModalInsertAccount from './ModalInsertAccount';

const Users = () => {
  const [accounts, setAccounts] = React.useState({ totalPages: 0 });
  const { permissions } = useSelector((state) => state);
  const [page, setPage] = React.useState(0);
  const [showInsertModal, setShowInsertModal] = React.useState(false);
  const [lastUser, setLastUser] = React.useState({});

  React.useEffect(() => {
    async function takeAccounts() {
      try {
        const { url, options } = GET_ACCOUNTS(permissions.token, page, 10);

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

    takeAccounts().then((response) => setAccounts(response));
  }, [page, permissions.token]);

  // console.log(accounts);

  function handlePageClick(e) {
    setPage(e.selected);
  }

  return (
    <section className={`container ${styles.usersArea}`}>
      <Header />
      {showInsertModal && (
        <ModalInsertAccount
          setShowInsertModal={setShowInsertModal}
          setLastUser={setLastUser}
        />
      )}
      <div className={styles.cardUsers}>
        <section className={`${styles.usersCardTop}`}>
          <article className={`${styles.usersCardSearch}`}>
            <label htmlFor="search">Pesquisar</label>
            <input type="text" id="search" name="search" />
          </article>

          <article>
            <button
              type="button"
              className={stylesBooks.btnInsert}
              onClick={() => setShowInsertModal(true)}
            >
              Adicionar
            </button>
          </article>
        </section>

        <section className={`${styles.usersCardMiddle}`}>
          <table className={`${styles.usersCardTable}`}>
            <thead>
              <tr>
                <th>ID</th>
                <th>Nome</th>
                <th>Rua</th>
                <th>N°</th>
                <th>CPF</th>
                <th>Cep</th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {accounts &&
                accounts.content &&
                accounts.content.map((account) => (
                  <tr key={account.id}>
                    <td>{account.id}</td>
                    <td>
                      {account.userName} {account.lastName}
                    </td>
                    <td>{account.street}</td>
                    <td>{account.numberIdent}</td>
                    <td>{account.cpf}</td>
                    <td>{account.cep}</td>
                    <td>
                      <button type="button" className={stylesBooks.btnEdit}>
                        Editar
                      </button>
                    </td>
                    <td>
                      <button
                        type="button"
                        className={stylesBooks.btnActive}
                        style={{ padding: '0.4rem 0.5rem' }}
                      >
                        Ativar/Inativar
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </section>

        <section className={`${styles.usersCardBottom}`}>
          <ReactPaginate
            previousLabel={'Anterior'}
            nextLabel={'Próximo'}
            breakLabel={'...'}
            breakClassName={'break-me'}
            pageCount={accounts.totalPages}
            marginPagesDisplayed={2}
            pageRangeDisplayed={5}
            onPageChange={handlePageClick}
            containerClassName={stylesBooks.pagination}
            subContainerClassName={'pages pagination'}
            activeClassName={stylesBooks.active}
          />
        </section>
      </div>
    </section>
  );
};

export default Users;
