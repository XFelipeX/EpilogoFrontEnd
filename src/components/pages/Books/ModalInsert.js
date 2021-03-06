import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useClickOutside from '../../ClickOutside/ClickOutside';
import { POST_BOOK, PUT_BOOK } from '../../../api';
import styles from './ModalInsert.module.css';
import { updateState } from '../../../redux';
import FormModalInsert from './FormModalInsert';

const ModalInsert = ({
  setShowModalInsert,
  setShowInsertImages,
  setLastBook,
  showInsertImages,
  editBook,
  setEditBook,
}) => {
  const dispatch = useDispatch();
  const [name, setName] = React.useState(editBook.id ? editBook.nameBook : '');
  const [description, setDescription] = React.useState(
    editBook.id ? editBook.description : '',
  );
  const [isbn, setIsbn] = React.useState(editBook.id ? editBook.isbn : '');
  const [stars, setStars] = React.useState(editBook.id ? editBook.stars : '1');
  const [category, setCategory] = React.useState(
    editBook.id ? editBook.category : '',
  );
  const [available, setAvailable] = React.useState(
    editBook.id ? editBook.available : '0',
  );
  const [amount, setAmount] = React.useState(
    editBook.id ? editBook.amount : '',
  );
  const [price, setPrice] = React.useState(editBook.id ? editBook.price : '');
  const [author, setAuthor] = React.useState(
    editBook.id ? editBook.authorId : '1',
  );
  const [publishCompany, setPublishCompany] = React.useState(
    editBook.id ? editBook.publishCompanyId : '1',
  );
  const [publishDate, setPublishDate] = React.useState(
    editBook.id ? editBook.publishDate : '',
  );
  const { permissions } = useSelector((state) => state);

  function clear() {
    setAmount('');
    setAuthor('1');
    setCategory('');
    setName('');
    setPublishDate('');
    setStars('1');
    setPublishCompany('1');
    setPrice('');
    setIsbn('');
    setAvailable('2');
    setCategory('');
    setDescription('');
  }

  function validatePrice(price) {
    const str = String(price).replace(',', '.');
    const regex = /[0-9]{0,3}[.]+[0-9]{0,2}/gm;
    let m;
    let captured = '';

    while ((m = regex.exec(str)) !== null) {
      // This is necessary to avoid infinite loops with zero-width matches
      if (m.index === regex.lastIndex) {
        regex.lastIndex++;
      }

      // The result can be accessed through the `m`-variable.
      // eslint-disable-next-line
      m.forEach((match, groupIndex) => {
        // console.log(`Found match, group ${groupIndex}: ${match}`);
        captured = match;
      });
    }

    if (captured === str) {
      return true;
    }

    setPrice('00.00');
    return false;
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (!validatePrice(price)) {
      alert(
        'Digite um preço válido,no máximo 3 números inteiros e no mínimo 1 casa decimal ',
      );
      return;
    }

    if (
      name === '' ||
      description === '' ||
      isbn === '' ||
      stars === '' ||
      publishDate === '' ||
      category === '' ||
      price === '' ||
      amount === '' ||
      available === '' ||
      publishCompany === '' ||
      author === ''
    ) {
      console.log(publishCompany, author);
      alert('Preencha todos os campos');
      return;
    }

    if (name.length < 3) {
      alert('O nome do livro precisa ter pelo menos três caracteres');
      return;
    }

    if (editBook.id) {
      try {
        const { url, options } = PUT_BOOK(
          {
            id: editBook.id,
            nameBook: name,
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
          },
          permissions.token,
        );

        const data = await fetch(url, options);

        const json = await data.json();

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

        //pull new information of database
        dispatch(updateState());

        if (permissions.typeAccount !== 0) {
          alert('Atualiação do livro efetuada com sucesso!');
          setShowModalInsert(false);
          return;
        }

        setShowInsertImages(true);
        setLastBook(json.object);

        console.log(json);
      } catch (error) {
        console.log(error);
      } finally {
        clear();
      }
    } else {
      try {
        const { url, options } = POST_BOOK(
          {
            nameBook: name,
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
          },
          permissions.token,
        );

        const data = await fetch(url, options);

        const json = await data.json();

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

        dispatch(updateState());
        setShowInsertImages(true);
        setLastBook(json.object);

        console.log(json);
      } catch (error) {
        console.log(error);
      } finally {
        clear();
      }
    }
  }

  const domNode = useClickOutside(() => {
    if (!showInsertImages) {
      setShowModalInsert(false);
      setEditBook({});
    }
  });

  return (
    <div className={styles.modalArea}>
      <div ref={domNode} className={styles.modal}>
        <section className={styles.formArea}>
          <FormModalInsert
            handleSubmit={handleSubmit}
            styles={styles}
            price={price}
            setPrice={setPrice}
            amount={amount}
            setAmount={setAmount}
            category={category}
            setCategory={setCategory}
            name={name}
            setName={setName}
            description={description}
            setDescription={setDescription}
            available={available}
            setAvailable={setAvailable}
            publishCompany={publishCompany}
            setPublishCompany={setPublishCompany}
            author={author}
            setAuthor={setAuthor}
            publishDate={publishDate}
            setPublishDate={setPublishDate}
            isbn={isbn}
            stars={stars}
            setStars={setStars}
            setIsbn={setIsbn}
            editBook={editBook}
            clear={clear}
            setShowModalInsert={setShowModalInsert}
          />
        </section>
      </div>
    </div>
  );
};

export default ModalInsert;
