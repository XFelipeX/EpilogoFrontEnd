import React from 'react';
// import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Header from '../../Header/Header';
import styles from './CreateAcc.module.css';
import { BsMap } from 'react-icons/bs';
import { ReactComponent as BackIllustration } from '../../../assets/backAcc.svg';
import { GET_CEP, POST_ACCOUNT, POST_ADDRESS, POST_USER } from '../../../api';

const CreateAcc = () => {
  // const { permissions } = useSelector((state) => state);
  const history = useHistory();
  // Account and user info
  const [username, setUsername] = React.useState('');
  const [cpf, setCpf] = React.useState('');
  const [user, setUser] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  // Billing Address
  const [cepBilling, setCepBilling] = React.useState('');
  const [publicBilling, setPublicBilling] = React.useState('');
  const [ufBilling, setUfBilling] = React.useState('');
  const [localBilling, setLocalBilling] = React.useState('');
  const [numberBilling, setNumberBilling] = React.useState('');
  const [complementBilling, setComplementBilling] = React.useState('');

  // Delivery Address
  const [cepDelivery, setCepDelivery] = React.useState('');
  const [publicDelivery, setPublicDelivery] = React.useState('');
  const [ufDelivery, setUfDelivery] = React.useState('');
  const [localDelivery, setLocalDelivery] = React.useState('');
  const [numberDelivery, setNumberDelivery] = React.useState('');
  const [complementDelivery, setComplementDelivery] = React.useState('');

  function clear() {
    setUsername('');
    setCpf('');
    setCepBilling('');
    setUfBilling('');
    setLocalBilling('');
    setNumberBilling('');
    setComplementBilling('');
    setCepDelivery('');
    setPublicDelivery('');
    setUfDelivery('');
    setLocalDelivery('');
    setNumberDelivery('');
    setComplementDelivery('');
  }

  async function findCep(value, type) {
    if (value !== '') {
      try {
        const { url, options } = GET_CEP(value);
        const response = await fetch(url, options);
        const json = await response.json();
        // console.log(value);
        // console.log(type);
        switch (type) {
          case 'billing':
            setLocalBilling(json.localidade);
            setPublicBilling(json.logradouro);
            setUfBilling(json.uf);
            break;
          case 'delivery':
            setLocalDelivery(json.localidade);
            setPublicDelivery(json.logradouro);
            setUfDelivery(json.uf);
            break;
          default:
        }
      } catch (error) {
        alert('Houve um erro ao puxar este cep');
      }
    }
  }

  function handleSubmit(event) {
    event.preventDefault();
    saveAccount().then((response) => {
      if (response && response.object) {
        saveUser(response.object.id);
        saveAddress(response.object.id, 'billing');
        saveAddress(response.object.id, 'delivery');
      }
    });
  }

  async function saveAccount() {
    try {
      const { url, options } = POST_ACCOUNT({ userName: username, cpf: cpf });
      const response = await fetch(url, options);
      console.log(response);
      const json = await response.json();

      if (json.error) {
        console.log(json);
        if (json.message.includes('(email,cpf) is broken')) {
          alert('(CPF/E-mail) não disponível, por favor tente outro');
          return;
        }
        alert('houve um erro verifique o console');
        return;
      }

      if (json[0] && json[0].error) {
        console.log(json);
        alert('houve um erro verifique o console');
        return;
      }

      alert('Sua conta foi criada com sucesso');
      console.log(json);
      return json;
    } catch (error) {
      console.log(error);
    }
  }

  async function saveUser(id) {
    try {
      const { url, options } = POST_USER({
        email: email,
        userName: user,
        userPassword: password,
        typeAccount: 2,
        status: 1,
        accountId: id,
      });
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

      alert('Seu usuário foi criada com sucesso');
      console.log(json);
      return json;
    } catch (error) {
      console.log(error);
    }
  }

  async function saveAddress(id, type) {
    try {
      const { url, options } = verifyTypeAddress(type, id);
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

      alert('Seu endereço ' + type + ' foi criado com sucesso');
      console.log(json);
    } catch (error) {
      console.log(error);
    } finally {
      if (type === 'delivery') {
        clear();
        history.push('/');
      }
    }
  }

  function verifyTypeAddress(type, id) {
    switch (type) {
      case 'billing':
        return POST_ADDRESS(
          {
            publicArea: publicBilling,
            cep: cepBilling,
            uf: ufBilling,
            number: +numberBilling,
            local: localBilling,
            complement: complementBilling,
            type: 'C',
            status: 1,
            accountId: id,
          },
          2, //typeAccount
        );
      case 'delivery':
        return POST_ADDRESS(
          {
            publicArea: publicDelivery,
            cep: cepDelivery,
            uf: ufDelivery,
            number: +numberDelivery,
            local: localDelivery,
            complement: complementDelivery,
            type: 'F',
            status: 1,
            accountId: id,
          },
          2, //typeAccount
        );
      default:
    }
  }

  return (
    <div className={`${styles.container}`}>
      <Header />
      <div className={styles.contentArea}>
        <form action="" method="POST" onSubmit={handleSubmit}>
          <section className={styles.leftCard}>
            <h1 className={styles.title}>Informações Pessoais</h1>
            <article className={styles.inputGroup}>
              <label htmlFor="username">
                Nome
                <input
                  type="text"
                  name="username"
                  id="username"
                  required
                  value={username}
                  onChange={({ target }) => setUsername(target.value)}
                />
              </label>
              <label htmlFor="cpf">
                CPF
                <input
                  type="text"
                  name="cpf"
                  id="cpf"
                  required
                  value={cpf}
                  onChange={({ target }) => setCpf(target.value)}
                />
              </label>
              <article className={styles.address}>
                <div className={styles.addressLeft}>
                  <p className={styles.typeAddress}>Cobrança</p>
                  <label htmlFor="cep-billing-address">
                    CEP
                    <input
                      type="text"
                      name="cep-billing-address"
                      id="cep-billing-address"
                      required
                      value={cepBilling}
                      onChange={({ target }) => setCepBilling(target.value)}
                    />
                    <button
                      type="button"
                      className={styles.btnFindAddress}
                      onClick={() => findCep(cepBilling, 'billing')}
                    >
                      Buscar <BsMap size={15} />
                    </button>
                  </label>
                  <label htmlFor="public-billing-address">
                    Rua/Logradouro
                    <input
                      type="text"
                      name="public-billing-address"
                      id="public-billing-address"
                      required
                      readOnly
                      value={publicBilling}
                      onChange={({ target }) => setPublicBilling(target.value)}
                    />
                  </label>
                  <label htmlFor="uf-billing-address">
                    UF
                    <input
                      type="text"
                      name="uf-billing-address"
                      id="uf-billing-address"
                      required
                      readOnly
                      value={ufBilling}
                      onChange={({ target }) => setUfBilling(target.value)}
                    />
                  </label>
                  <label htmlFor="local-billing-address">
                    Localidade
                    <input
                      type="text"
                      name="local-billing-address"
                      id="local-billing-address"
                      required
                      readOnly
                      value={localBilling}
                      onChange={({ target }) => setLocalBilling(target.value)}
                    />
                  </label>
                  <label htmlFor="number-billing-address">
                    Número
                    <input
                      min="0"
                      type="number"
                      name="number-billing-address"
                      id="number-billing-address"
                      required
                      value={numberBilling}
                      onChange={({ target }) => setNumberBilling(target.value)}
                    />
                  </label>
                  <label htmlFor="complement-billing-address">
                    Complemento
                    <input
                      type="text"
                      name="complement-billing-address"
                      id="complement-billing-address"
                      value={complementBilling}
                      onChange={({ target }) =>
                        setComplementBilling(target.value)
                      }
                    />
                  </label>
                </div>
                <div className={styles.addressRight}>
                  <p className={styles.typeAddress}>Entrega</p>
                  <label htmlFor="cep-delivery-address">
                    CEP
                    <input
                      type="text"
                      name="cep-delivery-address"
                      id="cep-delivery-address"
                      required
                      value={cepDelivery}
                      onChange={({ target }) => setCepDelivery(target.value)}
                    />
                    <button
                      type="button"
                      className={styles.btnFindAddress}
                      onClick={() => findCep(cepDelivery, 'delivery')}
                    >
                      Buscar <BsMap size={15} />
                    </button>
                  </label>
                  <label htmlFor="public-delivery-address">
                    Rua/Logradouro
                    <input
                      type="text"
                      name="public-delivery-address"
                      id="public-delivery-address"
                      required
                      readOnly
                      value={publicDelivery}
                      onChange={({ target }) => setPublicDelivery(target.value)}
                    />
                  </label>
                  <label htmlFor="uf-delivery-address">
                    UF
                    <input
                      type="text"
                      name="uf-delivery-address"
                      id="uf-delivery-address"
                      required
                      readOnly
                      value={ufDelivery}
                      onChange={({ target }) => setUfDelivery(target.value)}
                    />
                  </label>
                  <label htmlFor="local-delivery-address">
                    Localidade
                    <input
                      type="text"
                      name="local-delivery-address"
                      id="local-delivery-address"
                      required
                      readOnly
                      value={localDelivery}
                      onChange={({ target }) => setLocalDelivery(target.value)}
                    />
                  </label>
                  <label htmlFor="number-delivery-address">
                    Número
                    <input
                      min="0"
                      type="number"
                      name="number-delivery-address"
                      id="number-delivery-address"
                      required
                      value={numberDelivery}
                      onChange={({ target }) => setNumberDelivery(target.value)}
                    />
                  </label>
                  <label htmlFor="complement-delivery-address">
                    Complemento
                    <input
                      type="text"
                      name="complement-delivery-address"
                      id="complement-delivery-address"
                      value={complementDelivery}
                      onChange={({ target }) =>
                        setComplementDelivery(target.value)
                      }
                    />
                  </label>
                </div>
              </article>
            </article>
          </section>
          <span className={styles.styleBook}></span>
          <section className={styles.rightCard}>
            <h1 className={styles.title}>Informações da Conta</h1>

            <article className={styles.inputGroup}>
              <label htmlFor="email">
                E-mail
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={email}
                  required
                  onChange={({ target }) => setEmail(target.value)}
                />
              </label>
              <label htmlFor="password">
                Senha
                <input
                  type="password"
                  name="password"
                  id="password"
                  value={password}
                  required
                  onChange={({ target }) => setPassword(target.value)}
                />
              </label>
              <label htmlFor="user">
                Usuário
                <input
                  minLength="5"
                  type="text"
                  name="user"
                  id="user"
                  value={user}
                  required
                  onChange={({ target }) => setUser(target.value)}
                />
              </label>
            </article>

            <button type="submit" className={styles.btn}>
              Cadastrar
            </button>

            <BackIllustration className={styles.backImage} alt="" title="" />
          </section>
        </form>
      </div>
    </div>
  );
};

export default CreateAcc;
