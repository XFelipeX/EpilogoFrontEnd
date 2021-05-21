import React from 'react';
import styles from './MyDemand.module.css';
import styleBooks from '../Books/Books.module.css';
import { useSelector, useDispatch } from 'react-redux';
import Header from '../../Header/Header';
import {
  GET_ALL_DEMAND_BY_ACCOUNT_ID,
  GET_ALL_DEMAND,
  PUT_DEMAND,
} from '../../../api';
import { formatDate } from '../../../utils/date';
import ModalDetals from './ModalDetails';
import ReactPaginate from 'react-paginate';
import { updateState } from '../../../redux';

const MyDemand = () => {
  const { permissions } = useSelector((state) => state);
  const { stateUpdate } = useSelector((state) => state);
  const dispatch = useDispatch();
  const [demands, setDemands] = React.useState([]);
  const [allDemands, setAlldemands] = React.useState([]);
  const [showDetails, setShowDetails] = React.useState({
    show: false,
    demand: {},
  });
  const [page, setPage] = React.useState(0);

  React.useEffect(() => {
    async function getDemands() {
      try {
        const { url, options } = GET_ALL_DEMAND_BY_ACCOUNT_ID(
          permissions.token,
          permissions.user.accountId,
        );
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

        return json;
      } catch (error) {
        console.log(error);
      }
    }
    if (permissions.typeAccount === 2) {
      getDemands().then((response) => {
        if (response && response.object && response.object.length) {
          setDemands([...response.object]);
        }
      });
    }
  }, [permissions.token, permissions.user.accountId, permissions.typeAccount]);

  React.useEffect(() => {
    async function getAllDemands() {
      try {
        const { url, options } = GET_ALL_DEMAND(permissions.token, page);
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

        return json;
      } catch (error) {
        console.log(error);
      }
    }

    if (permissions.typeAccount !== 2) {
      getAllDemands().then((response) => setAlldemands(response));
    }
  }, [
    permissions.token,
    permissions.user.accountId,
    page,
    permissions.typeAccount,
    stateUpdate,
  ]);

  function handlePageClick(e) {
    setPage(e.selected);
  }

  function getOption(current) {
    switch (current) {
      case 'Aguardando confirmação de pagamento':
        return <option value="Sendo separado">Sendo separado</option>;
      case 'Sendo separado':
        return <option value="Sendo transportado">Sendo transportado</option>;
      case 'Sendo transportado':
        return <option value="Produto entregue">Produto entregue</option>;
      default:
        return;
    }
  }

  function changeStatus(value, demand) {
    console.log(value);
    demand.status = value;
    console.log(demand);
    updateDemand(demand).then((response) => console.log(response));
    dispatch(updateState());
  }

  async function updateDemand(demand) {
    try {
      const { url, options } = PUT_DEMAND(permissions.token, demand);
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

      return json;
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className={styles.container}>
      <Header />
      {showDetails.show && (
        <ModalDetals demand={showDetails} setShowDetails={setShowDetails} />
      )}
      <div className={styles.content}>
        <h1 className={styles.title}>Meus Pedidos</h1>
        <article className={styles.tableArea}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>N°</th>
                <th>Data</th>
                <th>Situação</th>
                <th>Total</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {demands.length ? (
                demands.map((demand) => (
                  <tr key={demand.id}>
                    <td>{demand.id}</td>
                    <td>{formatDate(demand.date)}</td>
                    <td>{demand.status}</td>
                    <td>R$ {demand.total}</td>
                    <td>
                      <button
                        className={styles.btnDetails}
                        type="button"
                        onClick={() =>
                          setShowDetails({ show: true, demand: demand })
                        }
                      >
                        Detalhe
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr></tr>
              )}
              {allDemands.content &&
                allDemands.content.length &&
                allDemands.content.map((demand) => (
                  <tr key={demand.id}>
                    <td>{demand.id}</td>
                    <td>{formatDate(demand.date)}</td>
                    <td>{demand.status}</td>
                    <td>R$ {demand.total}</td>
                    <td>
                      <select
                        name="status"
                        id={demand.id}
                        value={demand.status}
                        onChange={({ target }) =>
                          changeStatus(target.value, demand)
                        }
                      >
                        <option value={demand.status}>{demand.status}</option>
                        {getOption(demand.status)}
                      </select>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </article>
        <article className={`${styles.bottom}`}>
          {permissions.typeAccount !== 2 && (
            <ReactPaginate
              previousLabel={'Anterior'}
              nextLabel={'Próximo'}
              breakLabel={'...'}
              breakClassName={'break-me'}
              pageCount={allDemands.totalPages}
              marginPagesDisplayed={2}
              pageRangeDisplayed={5}
              onPageChange={handlePageClick}
              containerClassName={styleBooks.pagination}
              subContainerClassName={'pages pagination'}
              activeClassName={styleBooks.active}
            />
          )}
        </article>
      </div>
    </div>
  );
};

export default MyDemand;
