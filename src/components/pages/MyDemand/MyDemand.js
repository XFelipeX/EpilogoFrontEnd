import React from 'react';
import styles from './MyDemand.module.css';
import { useSelector } from 'react-redux';
import Header from '../../Header/Header';
import { GET_ALL_DEMAND_BY_ACCOUNT_ID } from '../../../api';

const MyDemand = () => {
  const { permissions } = useSelector((state) => state);
  const [demands, setDemands] = React.useState([]);

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

    getDemands().then((response) => {
      if (response && response.object && response.object.length) {
        setDemands([...response.object]);
      }
    });
  }, [permissions.token, permissions.user.accountId]);

  console.log(demands);

  return (
    <div className={styles.container}>
      <Header />
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
              {demands.length &&
                demands.map((demand) => (
                  <tr key={demand.id}>
                    <td>{demand.id}</td>
                    <td>{demand.date}</td>
                    <td>{demand.status}</td>
                    <td>R$ {demand.total}</td>
                    <td>
                      <button className={styles.btnDetails} type="button">
                        Detalhe
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </article>
      </div>
    </div>
  );
};

export default MyDemand;
