import React from 'react';
import styles from './FormModalInsertAccount.module.css';

const FormModalInsertAccount = ({
  handleSubmit,
  name,
  lastName,
  cpf,
  street,
  number,
  cep,
  setName,
  setLastName,
  setCpf,
  setStreet,
  setNumber,
  setCep,
  email,
  setEmail,
  userName,
  setUserName,
  password,
  setPassword,
  typeAccount,
  setTypeAccount,
  status,
  setStatus,
  lastUser,
  setShowInsertModal,
  clear,
}) => {
  return (
    <form
      action=""
      onSubmit={handleSubmit}
      method="POST"
      className={styles.form}
    >
      <section className={styles.formContent}>
        <div className={styles.formLeft}>
          <label htmlFor="name">
            Nome
            <input
              type="text"
              min="5"
              id="name"
              name="name"
              required
              value={name}
              onChange={({ target }) => setName(target.value)}
            />
          </label>
          <label htmlFor="lastName">
            Sobrenome
            <input
              type="text"
              min="5"
              id="lastName"
              name="lastName"
              value={lastName}
              onChange={({ target }) => setLastName(target.value)}
              required
            />
          </label>
          <label htmlFor="cpf">
            CPF
            <input
              type="text"
              id="cpf"
              name="cpf"
              required
              value={cpf}
              onChange={({ target }) => setCpf(target.value)}
            />
          </label>
          <label htmlFor="username">
            Usuário
            <input
              type="text"
              id="username"
              name="username"
              required
              min="5"
              value={userName}
              onChange={({ target }) => setUserName(target.value)}
            />
          </label>
          <label htmlFor="password">
            Senha
            <input
              type="password"
              id="password"
              name="password"
              min="3"
              max="15"
              required
              value={password}
              onChange={({ target }) => setPassword(target.value)}
            />
          </label>
          <label htmlFor="email">
            E-mail
            <input
              type="email"
              id="email"
              name="email"
              required
              value={email}
              onChange={({ target }) => setEmail(target.value)}
              disabled={lastUser.accountId}
            />
          </label>
        </div>
        <div className={styles.formRight}>
          <label htmlFor="street">
            Rua
            <input
              type="text"
              id="street"
              name="street"
              required
              value={street}
              onChange={({ target }) => setStreet(target.value)}
            />
          </label>
          <label htmlFor="number">
            Nº
            <input
              type="text"
              id="number"
              name="number"
              required
              value={number}
              onChange={({ target }) => setNumber(target.value)}
            />
          </label>
          <label htmlFor="cep">
            CEP
            <input
              type="text"
              id="cep"
              name="cep"
              required
              value={cep}
              onChange={({ target }) => setCep(target.value)}
            />
          </label>
          <label>
            Tipo
            <select
              value={typeAccount}
              onChange={({ target }) => setTypeAccount(target.value)}
            >
              <option value="0">Administrador</option>
              <option value="1">Estoquista</option>
            </select>
          </label>
          {lastUser.id === -1 && (
            <label>
              Status
              <select
                value={status}
                onChange={({ target }) => setStatus(target.value)}
              >
                <option value="0">Inativo</option>
                <option value="1">Ativo</option>
              </select>
            </label>
          )}
        </div>
      </section>

      <section className={styles.sendForm}>
        <button
          type="button"
          className={styles.btnCancel}
          onClick={() => {
            setShowInsertModal(false);
            clear();
          }}
        >
          Cancelar
        </button>
        <button type="submit" className={styles.btnDone}>
          {lastUser.accountId ? 'Salvar' : 'Cadastrar'}
        </button>
      </section>
    </form>
  );
};

export default FormModalInsertAccount;
