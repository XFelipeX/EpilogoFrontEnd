import React from 'react';
import styles from './PaymentModal.module.css';
import { AiFillCreditCard } from 'react-icons/ai';
import { BiBarcode } from 'react-icons/bi';
import { ReactComponent as Illustration } from '../../../assets/backPayment.svg';
import { ReactComponent as Illustration2 } from '../../../assets/backPayment2.svg';
import { useSelector } from 'react-redux';
import useClickOutside from '../../ClickOutside/ClickOutside';

const PaymentModal = ({ setShowPaymentModal }) => {
  const [active, setActive] = React.useState('card');
  const { stateCart } = useSelector((state) => state);
  const [portions, setPortions] = React.useState([]);
  const [total, setTotal] = React.useState('');
  const [options, setOptions] = React.useState('');

  React.useEffect(() => {
    const total = stateCart.subtotal;
    setTotal(total);
    for (let i = 1; i <= 12; i++) {
      let liquid = 0;
      if (i < 6) {
        liquid = +(total / i).toFixed(2);
        setPortions((oldArray) => [
          ...oldArray,
          {
            total: liquid,
            qtd: i,
            liquid: +(liquid * i).toFixed(2),
          },
        ]);
      } else {
        const aux = i < 10 ? +('0.0' + String(i)) : +('0.' + String(i));
        const fees = +(total * Number(aux)).toFixed(2);
        liquid = +(total / i + fees).toFixed(2);
        setPortions((oldArray) => [
          ...oldArray,
          {
            total: liquid,
            qtd: i,
            fees: fees,
            liquid: +(liquid * i).toFixed(2),
          },
        ]);
      }
    }
  }, [stateCart.subtotal]);

  const domNode = useClickOutside(() => {
    setShowPaymentModal(false);
  });

  return (
    <div className={styles.container}>
      <div className={styles.modal} ref={domNode}>
        <article className={styles.modalTop}>
          <div
            className={styles.card}
            style={active === 'card' ? { backgroundColor: '#dfdfe5' } : {}}
            onClick={() => setActive('card')}
          >
            <p className={styles.typePayment}>
              <AiFillCreditCard size={20} style={{ marginRight: '0.3rem' }} />{' '}
              Cartão de Crédito
            </p>
          </div>
          <div
            className={styles.ticket}
            style={active === 'ticket' ? { backgroundColor: '#dfdfe5' } : {}}
            onClick={() => setActive('ticket')}
          >
            <p className={styles.typePayment}>
              <BiBarcode size={20} style={{ marginRight: '0.3rem' }} /> Boleto
            </p>
          </div>
        </article>
        <article className={styles.modalMiddle}>
          <section className={styles.middleLeft}>
            {active === 'card' ? (
              <>
                <article className={styles.inputGroup}>
                  <label htmlFor="numberCard">
                    Número do Cartão
                    <input type="text" id="numberCard" name="numberCard" />
                  </label>
                  <label htmlFor="nameCard">
                    Nome impresso no Cartão
                    <input
                      type="text"
                      id="nameCard"
                      name="nameCard"
                      style={{ textTransform: 'uppercase' }}
                    />
                  </label>
                  <span>
                    <label htmlFor="validity">
                      Validade
                      <input type="date" id="validity" name="validity" />
                    </label>
                    <label htmlFor="codeCard">
                      CVV
                      <input
                        type="text"
                        id="codeCard"
                        name="codeCard"
                        maxLength="3"
                      />
                    </label>
                  </span>
                </article>

                <article className={styles.paymentOptions}>
                  <select
                    name="portion"
                    id="portion"
                    value={options}
                    onChange={({ target }) => {
                      const total = portions.filter(
                        (option) => +option.qtd === +target.value,
                      );
                      setOptions(target.value);
                      setTotal(total[0].liquid);
                    }}
                  >
                    {portions &&
                      portions.map((option) => (
                        <option value={option.qtd} key={option.qtd}>
                          {option.qtd} X R$ {option.total} &nbsp; - &nbsp;
                          {option.fees ? ` ${option.fees} Juros` : 'S/Juros'}
                        </option>
                      ))}
                  </select>
                  <p className={styles.total}>Total R$ {total}</p>
                </article>
              </>
            ) : (
              <article className={styles.typeTicket}>
                <button type="button">Imprimir Boleto</button>
              </article>
            )}
          </section>
          <section className={styles.middleRight}>
            {active === 'card' ? (
              <Illustration className={styles.illustration} />
            ) : (
              <Illustration2 className={styles.illustration} />
            )}
          </section>
        </article>
        <article className={styles.modalBottom}>
          <button
            type="button"
            className={styles.btnBack}
            onClick={() => setShowPaymentModal(false)}
          >
            Voltar
          </button>
          <button type="button" className={styles.btnDone}>
            Continuar
          </button>
        </article>
      </div>
    </div>
  );
};

export default PaymentModal;
