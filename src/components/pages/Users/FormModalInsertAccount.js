import React from 'react';
import styles from './FormModalInsertAccount.module.css';

const FormModalInsertAccount = ({ handleSubmit }) => {
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
            <input type="text" min="5" id="name" name="name" required />
          </label>
          <label htmlFor="lastName">
            Sobrenome
            <input type="text" min="5" id="lastName" name="lastName" required />
          </label>
          <label htmlFor="cpf">
            CPF
            <input type="text" id="cpf" name="cpf" required />
          </label>
        </div>
        <div className={styles.formRight}>
          <label htmlFor="street">
            Rua
            <input type="text" id="street" name="street" required />
          </label>
          <label htmlFor="number">
            Nº
            <input type="text" id="number" name="number" required />
          </label>
          <label htmlFor="cep">
            CEP
            <input type="text" id="cep" name="cep" required />
          </label>
        </div>
      </section>

      <section className={styles.sendForm}>
        <button type="button" className={styles.btnCancel}>
          Cancelar
        </button>
        <button type="button" className={styles.btnDone}>
          Cadastrar - Ir Usuário
        </button>
      </section>
    </form>
  );
};

export default FormModalInsertAccount;
