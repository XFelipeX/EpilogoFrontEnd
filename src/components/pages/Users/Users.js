import React from 'react';
import Header from '../../Header/Header';
import styles from './Users.module.css';
import ReactPaginate from 'react-paginate';
import stylesBooks from '../Books/Books.module.css';
import {
  GET_ACCOUNTS,
  GET_USERS,
  GET_USER_BY_ACCOUNT,
  PUT_STATUS_USER,
} from '../../../api';
import { useSelector } from 'react-redux';
import ModalInsertAccount from './ModalInsertAccount';
import ConfirmModal from './ConfirmModal';
import SimpleTable from './SimpleTable';

const Users = () => {
  const [accounts, setAccounts] = React.useState({ totalPages: 0 });
  const { permissions } = useSelector((state) => state);
  const { stateUpdateUsers } = useSelector((state) => state);
  const [page, setPage] = React.useState(0);
  const [showInsertModal, setShowInsertModal] = React.useState(false);
  const [showConfirmModal, setShowConfirmModal] = React.useState(false);
  const [lastUser, setLastUser] = React.useState({ id: -1 });
  const [question, setQuestion] = React.useState('');
  const [users, setUsers] = React.useState([]);

  React.useEffect(() => {
    if (permissions.typeAccount === 0) {
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

          // console.log(json);

          return json;
        } catch (error) {
          console.log(error);
          return [];
        }
      }

      takeAccounts().then((response) => setAccounts(response));
    } else {
      async function takeUsers() {
        try {
          const { url, options } = GET_USERS(permissions.token, page, 10);

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

      takeUsers().then((response) => setAccounts(response));
    }
  }, [page, permissions.token, permissions.typeAccount, stateUpdateUsers]);

  React.useEffect(() => {
    console.log(accounts);
    if (accounts.content) {
      const copyArray = [...accounts.content];
      copyArray.map((account) => {
        getInfoUser(account.id).then((response) => {
          if (response.id) {
            setUsers((oldArray) => [...oldArray, response]);
          }
        });
      });
    }
  }, [accounts]);

  function handlePageClick(e) {
    setPage(e.selected);
  }

  function loadInfoUser(account) {
    getInfoUser(account.id).then((response) => {
      response.userId = response.id;
      delete response.id;
      delete response.accountId;
      const last = { ...account };
      last.accountId = last.id;
      last.accountName = last.userName;
      delete last.id;
      delete last.userName;
      const object = Object.assign({}, last, response);
      setLastUser(object);
      setShowInsertModal(true);
    });
  }

  async function getInfoUser(id) {
    try {
      const { url, options } = GET_USER_BY_ACCOUNT(permissions.token, id);

      const response = await fetch(url, options);

      const json = await response.json();

      if (json.error) {
        // alert('houve um erro verifique o console');
        console.log(json);
        return {};
      }

      console.log(json);

      return json.object;
    } catch (error) {
      console.log(error);
      return {};
    }
  }

  function verifyUserStatus(account) {
    getInfoUser(account.id).then((response) => {
      if (response.status === 1) {
        setQuestion('Deseja realmente inativar este usuário?');
      } else {
        setQuestion('Deseja realmente ativar este usuário?');
      }
    });
  }

  async function updateUserStatus(id) {
    try {
      const { url, options } = PUT_STATUS_USER(permissions.token, id);

      const response = await fetch(url, options);

      const json = await response.json();

      if (json.error) {
        alert('houve um erro verifique o console');
        console.log(json);
        return [];
      }

      console.log(json);

      alert('O status foi atualizado com sucesso!');
      setShowConfirmModal(false);
      setLastUser({});
      return json.object;
    } catch (error) {
      console.log(error);
      return [];
    }
  }

  console.log(users);

  return (
    <section className={`container ${styles.usersArea}`}>
      <Header />
      {showConfirmModal && (
        <ConfirmModal
          clear={() => setLastUser({ id: -1 })}
          setShowConfirmModal={setShowConfirmModal}
          question={question}
          confirm={() => {
            updateUserStatus(lastUser.id);
          }}
        />
      )}

      {showInsertModal && (
        <ModalInsertAccount
          setShowInsertModal={setShowInsertModal}
          setLastUser={setLastUser}
          lastUser={lastUser}
        />
      )}
      <div className={styles.cardUsers}>
        <section className={`${styles.usersCardTop}`}>
          <article className={`${styles.usersCardSearch}`}>
            <label htmlFor="search">Pesquisar</label>
            <input type="text" id="search" name="search" />
          </article>

          <article>
            {permissions.typeAccount === 0 && (
              <button
                type="button"
                className={stylesBooks.btnInsert}
                onClick={() => setShowInsertModal(true)}
              >
                Adicionar
              </button>
            )}
          </article>
        </section>

        <section className={`${styles.usersCardMiddle}`}>
          {permissions.typeAccount === 0 ? (
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
                {users &&
                  users.map(
                    (user) =>
                      accounts &&
                      accounts.content &&
                      accounts.content.map(
                        (account) =>
                          user.typeAccount !== 2 &&
                          user.accountId === account.id && (
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
                                <button
                                  type="button"
                                  className={stylesBooks.btnEdit}
                                  onClick={() => {
                                    loadInfoUser(account);
                                  }}
                                >
                                  Editar
                                </button>
                              </td>
                              <td>
                                {permissions.id !== account.id && (
                                  <button
                                    type="button"
                                    className={stylesBooks.btnActive}
                                    onClick={() => {
                                      setShowConfirmModal(true);
                                      verifyUserStatus(account);
                                      setLastUser(account);
                                    }}
                                    style={{ padding: '0.4rem 0.5rem' }}
                                  >
                                    Ativar/Inativar
                                  </button>
                                )}
                              </td>
                            </tr>
                          ),
                      ),
                  )}
              </tbody>
            </table>
          ) : (
            <SimpleTable accounts={accounts} />
          )}
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
