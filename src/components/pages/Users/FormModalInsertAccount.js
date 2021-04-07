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
        </div>
      </section>

      <section className={styles.sendForm}>
        <button type="button" className={styles.btnCancel}>
          Cancelar
        </button>
        <button type="submit" className={styles.btnDone}>
          Cadastrar - Ir Usuário
        </button>
      </section>
    </form>
  );
};

export default FormModalInsertAccount;
