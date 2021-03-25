import React from 'react';
import { GET_AUTHORS, GET_PUBLISH_COMPANIES } from '../../../api';

const FormModalInsert = ({
  styles,
  handleSubmit,
  name,
  setName,
  description,
  setDescription,
  isbn,
  setIsbn,
  stars,
  setStars,
  available,
  setAvailable,
  price,
  setPrice,
  publishDate,
  setPublishDate,
  publishCompany,
  setPublishCompany,
  author,
  setAuthor,
  category,
  setCategory,
  amount,
  setAmount,
  editBook,
  clear,
  setShowModalInsert,
}) => {
  const [authors, setAuthors] = React.useState([]);
  const [publishCompanies, setPublishCompanies] = React.useState([]);

  React.useEffect(() => {
    async function getAuthors() {
      try {
        const { url, options } = GET_AUTHORS();

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

    getAuthors().then((response) => {
      if (response.object) {
        setAuthors(response.object);
      }
    });
  }, []);

  React.useEffect(() => {
    async function getCompanies() {
      try {
        const { url, options } = GET_PUBLISH_COMPANIES();

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

    getCompanies().then((response) => {
      if (response.object) {
        setPublishCompanies(response.object);
      }
    });
  }, []);

  return (
    <form action="" onSubmit={handleSubmit} method="POST">
      <div className={styles.formCenter}>
        <div className={styles.formLeft}>
          <label htmlFor="name">
            Nome:
            <input
              type="text"
              id="name"
              name="name"
              value={name}
              onChange={({ target }) => setName(target.value)}
            ></input>
          </label>

          <label htmlFor="isbn">
            ISBN:
            <input
              min="0"
              type="number"
              id="isbn"
              name="isbn"
              value={isbn}
              onChange={({ target }) => setIsbn(target.value)}
            ></input>
          </label>

          <label htmlFor="stars">
            Avaliação:
            <select
              id="stars"
              name="stars"
              value={stars}
              onChange={({ target }) => setStars(target.value)}
            >
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
            </select>
          </label>

          <label htmlFor="publishDate">
            Data de publicação:
            <input
              type="date"
              id="publishDate"
              name="publishDate"
              value={publishDate}
              onChange={({ target }) => setPublishDate(target.value)}
            ></input>
          </label>

          <label htmlFor="description">
            Descrição:
            <textarea
              type="text"
              id="description"
              name="description"
              value={description}
              onChange={({ target }) => setDescription(target.value)}
              className={styles.descriptionInput}
            ></textarea>
          </label>
        </div>

        <div className={styles.formRight}>
          <label htmlFor="category">
            Categoria:
            <input
              type="text"
              id="category"
              name="category"
              value={category}
              onChange={({ target }) => setCategory(target.value)}
            ></input>
          </label>
          <label htmlFor="price">
            Preço:
            <input
              type="number"
              id="price"
              name="price"
              value={price}
              onChange={({ target }) => setPrice(target.value)}
            ></input>
          </label>

          <label htmlFor="amount">
            Estoque:
            <input
              min="0"
              max="10000"
              type="number"
              id="amount"
              name="amount"
              value={amount}
              onChange={({ target }) => setAmount(target.value)}
            ></input>
          </label>

          <label htmlFor="available">
            Disponibilidade:
            <select
              id="available"
              name="available"
              value={available}
              onChange={({ target }) => setAvailable(target.value)}
            >
              <option value="0">Não</option>
              <option value="1">Sim</option>
            </select>
          </label>

          <label htmlFor="publishCompany">
            Editora:
            <select
              id="publishCompany"
              name="publishCompany"
              value={publishCompany}
              onChange={({ target }) => setPublishCompany(target.value)}
            >
              {publishCompanies &&
                publishCompanies.map((company) => (
                  <option key={company.id} value={company.id}>
                    {company.descriptionCompany}
                  </option>
                ))}
            </select>
          </label>

          <label htmlFor="author">
            Autor:
            <select
              id="author"
              name="author"
              value={author}
              onChange={({ target }) => setAuthor(target.value)}
            >
              {authors &&
                authors.map((author) => (
                  <option key={author.id} value={author.id}>
                    {author.nameAuthor}
                  </option>
                ))}
            </select>
          </label>
        </div>
      </div>

      <article className={styles.sendForm}>
        <button
          type="submit"
          className={styles.cancelBtn}
          onClick={() => {
            clear();
            setShowModalInsert(false);
          }}
        >
          Cancelar
        </button>
        <button type="submit" className={styles.sendBtn}>
          {editBook.id ? 'Salvar' : 'Cadastrar'} - Ir Imagens
        </button>
      </article>
    </form>
  );
};

export default FormModalInsert;
