import React from 'react';
import { GET_BOOKS, POST_BOOK } from '../../../api';
import Header from '../../Header/Header';

const Main = () => {
  const [books, setBooks] = React.useState(null);
  const [name, setName] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [isbn, setIsbn] = React.useState('');
  const [stars, setStars] = React.useState('');
  const [category, setCategory] = React.useState('');
  const [available, setAvailable] = React.useState('');
  const [amount, setAmount] = React.useState('');
  const [price, setPrice] = React.useState('');
  const [author, setAuthor] = React.useState('');
  const [publishCompany, setPublishCompany] = React.useState('');
  const [publishDate, setPublishDate] = React.useState('');

  React.useEffect(() => {
    getBooks().then((response) => setBooks(response.object));
  }, []);

  async function getBooks() {
    try {
      const { url, options } = GET_BOOKS();

      const data = await fetch(url, options);

      console.log(url, options);

      const json = await data.json();

      if (json.error) {
        console.log('houve um erro');
        return [];
      }

      return json;
    } catch (error) {
      console.log(error);
      return [];
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const { url, options } = POST_BOOK({
        name: name,
        description: description,
        isbn: isbn,
        stars: stars,
        publishDate: publishDate,
        category: category,
        price: price,
        amount: amount,
        available: available,
        publishCompanyId: publishCompany,
        authorId: author,
      });

      const data = await fetch(url, options);

      console.log(url, options);

      const json = await data.json();

      console.log(json);
    } catch (error) {}
  }

  return <div className={`container`}></div>;
};

export default Main;
