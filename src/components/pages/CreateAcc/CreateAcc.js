import React from 'react';
import Header from '../../Header/Header';
import styles from './CreateAcc.module.css';
import { BsMap } from 'react-icons/bs';

const CreateAcc = () => {
  return (
    <div className={`${styles.container}`}>
      <Header />
      <div className={styles.contentArea}>
        <form action="" method="POST">
          <section className={styles.leftCard}>
            <h1 className={styles.title}>Informações Pessoais</h1>
            <article className={styles.inputGroup}>
              <label htmlFor="username">
                Nome
                <input type="text" name="username" id="username" required />
              </label>
              <label htmlFor="cpf">
                CPF
                <input type="text" name="cpf" id="cpf" required />
              </label>
              <article className={styles.address}>
                <div className={styles.addressLeft}>
                  <p className={styles.typeAddress}>Cobrança</p>
                  <label htmlFor="cep">
                    CEP
                    <input type="text" name="cep" id="cep" required />
                    <button type="button" className={styles.btnFindAddress}>
                      Buscar <BsMap size={15} />
                    </button>
                  </label>
                  <label htmlFor="public">
                    Rua/Logradouro
                    <input
                      type="text"
                      name="public"
                      id="public"
                      required
                      readOnly
                    />
                  </label>
                  <label htmlFor="uf">
                    UF
                    <input type="text" name="uf" id="uf" required readOnly />
                  </label>
                  <label htmlFor="number">
                    Número
                    <input
                      type="text"
                      name="number"
                      id="number"
                      required
                      readOnly
                    />
                  </label>
                  <label htmlFor="local">
                    Localidade
                    <input
                      type="text"
                      name="local"
                      id="local"
                      required
                      readOnly
                    />
                  </label>
                  <label htmlFor="complement">
                    Complemento
                    <input type="text" name="complement" id="complement" />
                  </label>
                </div>
                <div className={styles.addressRight}>
                  <p className={styles.typeAddress}>Entrega</p>
                  <label htmlFor="cep">
                    CEP
                    <input type="text" name="cep" id="cep" required />
                    <button type="button" className={styles.btnFindAddress}>
                      Buscar <BsMap size={15} />
                    </button>
                  </label>
                  <label htmlFor="public">
                    Rua/Logradouro
                    <input
                      type="text"
                      name="public"
                      id="public"
                      required
                      readOnly
                    />
                  </label>
                  <label htmlFor="uf">
                    UF
                    <input type="text" name="uf" id="uf" required readOnly />
                  </label>
                  <label htmlFor="number">
                    Número
                    <input
                      type="text"
                      name="number"
                      id="number"
                      required
                      readOnly
                    />
                  </label>
                  <label htmlFor="local">
                    Localidade
                    <input
                      type="text"
                      name="local"
                      id="local"
                      required
                      readOnly
                    />
                  </label>
                  <label htmlFor="complement">
                    Complemento
                    <input type="text" name="complement" id="complement" />
                  </label>
                </div>
              </article>
            </article>
          </section>
          <span className={styles.styleBook}></span>
          <section className={styles.rightCard}>
            <h1 className={styles.title}>Informações Cadastrais</h1>
          </section>
        </form>
      </div>
    </div>
  );
};

export default CreateAcc;
