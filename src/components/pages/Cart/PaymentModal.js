import React from 'react';
import styles from './PaymentModal.module.css';
import { AiFillCreditCard } from 'react-icons/ai';
import { BiBarcode } from 'react-icons/bi';
import { ReactComponent as Illustration } from '../../../assets/backPayment.svg';
import { ReactComponent as Illustration2 } from '../../../assets/backPayment2.svg';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import useClickOutside from '../../ClickOutside/ClickOutside';
import { getPayment, insertShipping, insertTotal } from '../../../redux';

const PaymentModal = ({
  setShowPaymentModal,
  setShowAddressModal,
  shipping1,
  shipping2,
  shipping3,
  simulateCalcShipping,
}) => {
  const [active, setActive] = React.useState('card');
  const { stateCart } = useSelector((state) => state);
  const [portions, setPortions] = React.useState([]);
  const [options, setOptions] = React.useState('1');
  const dispatch = useDispatch();
  const [subTotal, setSubTotal] = React.useState('');
  const [total, setTotal] = React.useState(stateCart.subtotal);

  // Form
  const [numberCard, setNumberCard] = React.useState('');
  const [name, setName] = React.useState('');
  const [validity, setValidity] = React.useState('');
  const [code, setCode] = React.useState('');

  React.useEffect(() => {
    const total = stateCart.subtotal;
    setPortions([]);
    setSubTotal(total);
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
        // fess crescent
        // const aux = i < 10 ? +('0.0' + String(i - 3)) : +('0.' + String(i));

        //fees pattern
        const aux = 0.04;

        const fees = +(total * Number(aux)).toFixed(2);
        liquid = +(+(total / i).toFixed(2) + fees).toFixed(2);
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

  React.useEffect(() => {
    const optionSelected = portions.filter(
      (portion) => portion.qtd === +options,
    );
    if (optionSelected.length) {
      const totalWithFrete = +(
        optionSelected[0].liquid + stateCart.shipping
      ).toFixed(2);
      dispatch(insertTotal(totalWithFrete));
      setTotal(optionSelected[0].liquid);
    }
  }, [dispatch, options, portions, stateCart.shipping]);

  React.useEffect(() => {
    let str = numberCard.replace(/\D/g, ''); // Only Digits
    str = str.replace(/(\d{4})/g, '$1.'); // Dot after 4 digits
    str = str.replace(/\.$/, ''); // Remove dot
    str = str.substring(0, 19); // Limit

    setNumberCard(str);
  }, [numberCard]);

  React.useEffect(() => {
    simulateCalcShipping(stateCart.delivery.address.cep);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const domNode = useClickOutside(() => {
    setShowPaymentModal(false);
  });

  React.useEffect(() => {
    dispatch(insertShipping(0));
  }, [active, dispatch]);

  function handleSubmit() {
    let payment;
    if (active === 'card' && verifyFields()) {
      const optionSelected = portions.filter(
        (portion) => portion.qtd === +options,
      );
      payment = {
        descripion: `Crédito ${optionSelected[0].qtd}X de R$ ${optionSelected[0].total}`,
        shipping: stateCart.shipping,
      };
      dispatch(insertTotal(subTotal));
      dispatch(getPayment(payment));
      return;
    }

    if (stateCart.shipping === 0) return alert('Selecione uma forma de frete');

    const optionSelected = portions.filter(
      (portion) => portion.qtd === +options,
    );
    payment = {
      descripion: `À vista no boleto por R$ ${optionSelected[0].total}`,
      shipping: stateCart.shipping,
    };

    dispatch(insertTotal(subTotal));
    dispatch(getPayment(payment));
    return;
  }

  function verifyFields() {
    if (numberCard === '' || numberCard.length !== 19)
      return alert('Preencha o número do cartão');
    if (name === '') return alert('Preencha o nome do titular do cartão');
    if (validity === '') return alert('Preencha a validade do cartão');
    if (code === '') return alert('Preencha o código verificador do cartão');
    if (stateCart.shipping === 0) return alert('Escolha um tipo de frete');
    return true;
  }

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
              <AiFillCreditCard size={20} style={{ marginRight: '0.3rem' }} />
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
                    <input
                      maxLength="19"
                      type="text"
                      id="numberCard"
                      name="numberCard"
                      value={numberCard}
                      onChange={({ target }) => setNumberCard(target.value)}
                    />
                  </label>
                  <label htmlFor="nameCard">
                    Nome impresso no Cartão
                    <input
                      type="text"
                      id="nameCard"
                      name="nameCard"
                      style={{ textTransform: 'uppercase' }}
                      value={name}
                      onChange={({ target }) => setName(target.value)}
                    />
                  </label>
                  <span>
                    <label htmlFor="validity">
                      Validade
                      <input
                        type="date"
                        id="validity"
                        name="validity"
                        value={validity}
                        onChange={({ target }) => setValidity(target.value)}
                      />
                    </label>
                    <label htmlFor="codeCard">
                      CVV
                      <input
                        type="text"
                        id="codeCard"
                        name="codeCard"
                        maxLength="3"
                        value={code}
                        onChange={({ target }) => setCode(target.value)}
                      />
                    </label>
                  </span>
                </article>
                <article className={styles.shippingOptions}>
                  <p>Selecione o frete</p>
                  <span>
                    <label htmlFor="shippingType1">
                      <span>
                        <input
                          type="radio"
                          name="shippingType"
                          id="shippingType1"
                          onClick={() => dispatch(insertShipping(+shipping1))}
                        />
                        Econômico
                      </span>
                      <span>R$ {shipping1}</span>
                    </label>
                    <label htmlFor="shippingType2">
                      <span>
                        <input
                          type="radio"
                          name="shippingType"
                          id="shippingType2"
                          onClick={() => dispatch(insertShipping(+shipping2))}
                        />
                        Sedex
                      </span>
                      <span>R$ {shipping2}</span>
                    </label>
                    <label htmlFor="shippingType3">
                      <span>
                        <input
                          type="radio"
                          name="shippingType"
                          id="shippingType3"
                          onClick={() => dispatch(insertShipping(+shipping3))}
                        />
                        PAC
                      </span>
                      <span>R$ {shipping3}</span>
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
                      setSubTotal(total[0].liquid);
                    }}
                  >
                    {portions &&
                      portions.map((option) => (
                        <option value={option.qtd} key={option.qtd}>
                          {option.qtd} X R$ {option.total} &nbsp; - &nbsp;
                          {option.fees ? ` 4% Juros` : 'S/Juros'}
                        </option>
                      ))}
                  </select>
                  <p className={styles.total}>
                    Total R$ {total}{' '}
                    {stateCart.shipping > 0 &&
                      '+ (R$ ' +
                        stateCart.shipping +
                        ' Frete)' +
                        ' = R$ ' +
                        stateCart.total}
                  </p>
                </article>
              </>
            ) : (
              <article className={styles.typeTicket}>
                <button type="button">Imprimir Boleto</button>
                <article className={styles.shippingOptions}>
                  <p>Selecione o frete</p>
                  <span>
                    <label htmlFor="shippingType1">
                      <span>
                        <input
                          type="radio"
                          name="shippingType"
                          id="shippingType1"
                          onClick={() => dispatch(insertShipping(+shipping1))}
                        />
                        Econômico
                      </span>
                      <span>R$ {shipping1}</span>
                    </label>
                    <label htmlFor="shippingType2">
                      <span>
                        <input
                          type="radio"
                          name="shippingType"
                          id="shippingType2"
                          onClick={() => dispatch(insertShipping(+shipping2))}
                        />
                        Sedex
                      </span>
                      <span>R$ {shipping2}</span>
                    </label>
                    <label htmlFor="shippingType3">
                      <span>
                        <input
                          type="radio"
                          name="shippingType"
                          id="shippingType3"
                          onClick={() => dispatch(insertShipping(+shipping3))}
                        />
                        PAC
                      </span>
                      <span>R$ {shipping3}</span>
                    </label>
                  </span>
                </article>
                <p>
                  Total R$ {total}{' '}
                  {stateCart.shipping > 0 &&
                    '+ (R$ ' +
                      stateCart.shipping +
                      ' Frete)' +
                      ' = R$ ' +
                      stateCart.total}
                </p>
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
            onClick={() => {
              setShowPaymentModal(false);
              setShowAddressModal(true);
            }}
          >
            Voltar
          </button>
          <button
            type="button"
            className={styles.btnDone}
            onClick={() => handleSubmit()}
          >
            Continuar
          </button>
        </article>
      </div>
    </div>
  );
};

export default PaymentModal;
