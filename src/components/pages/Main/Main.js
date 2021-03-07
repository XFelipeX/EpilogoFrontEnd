import React from 'react'
import { GET_BOOKS, POST_BOOK } from '../../../api';

const Main = () => {
    const [books, setBooks] = React.useState(null);
    const [name, setName] = React.useState("");
    const [description, setDescription] = React.useState("");
    const [isbn, setIsbn] = React.useState("");
    const [stars, setStars] = React.useState("");
    const [category, setCategory] = React.useState("");
    const [available, setAvailable] = React.useState("");
    const [amount, setAmount] = React.useState("");
    const [price, setPrice] = React.useState("");
    const [author, setAuthor] = React.useState("");
    const [publishCompany, setPublishCompany] = React.useState("");
    const [publishDate, setPublishDate] = React.useState("");


    React.useEffect(() => {
        getBooks().then(response => setBooks(response.object));
    }, [])

    async function getBooks() {
        try {
            const { url, options } = GET_BOOKS();

            const data = await fetch(url, options);

            console.log(url, options)

            const json = await data.json();

            if (json.error) {
                console.log("houve um erro");
                return null;
            }

            return json;
        } catch (error) {
            console.log(error);
        }
    }

    async function handleSubmit(e) {
        e.preventDefault();

        try {
            const { url, options } = POST_BOOK({
                name: name,
                description: description, isbn: isbn, stars:
                    stars, publishDate: publishDate, category: category,
                price: price, amount: amount, available: available,
                publishCompanyId: publishCompany, authorId: author
            });

            const data = await fetch(url, options);

            console.log(url, options)

            const json = await data.json();

            console.log(json)
        } catch (error) {

        }
    }

    return (
        <div>
            {books && books.map(book => (
                <React.Fragment key={book.id}>
                    <ul>
                        <li>Nome: {book.nameBook}</li>
                        <li>Descrição: {book.description}</li>
                        <li>ISBN: {book.isbn}</li>
                        <li>Avaliação: {book.stars}</li>
                        <li>Data de publicação: {book.publishDate}</li>
                        <li>Categoria: {book.category}</li>
                        <li>Preço: {book.price}</li>
                        <li>Total: {book.amount}</li>
                        <li>Disponibilidade: {book.available}</li>
                        <li>Editora: {book.publishCompanyId}</li>
                        <li>Author: {book.authorId}</li>
                    </ul>
                    <br />
                </React.Fragment>
            ))}

            <br />

            <form action="" onSubmit={handleSubmit} method="POST">
                <label htmlFor="name">Nome:</label>
                <input type="text" id="name" name="name" value={name} onChange={({ target }) => setName(target.value)}></input><br />
                <label htmlFor="description">Descrição:</label>
                <input type="text" id="description" name="description" value={description} onChange={({ target }) => setDescription(target.value)}></input><br />
                <label htmlFor="isbn">ISBN:</label>
                <input type="number" id="isbn" name="isbn" value={isbn} onChange={({ target }) => setIsbn(target.value)}></input ><br />
                <label htmlFor="stars">Avaliação:</label>
                <input type="number" id="stars" name="stars" value={stars} onChange={({ target }) => setStars(target.value)}></input><br />
                <label htmlFor="publishDate">Data de publicação:</label>
                <input type="date" id="publishDate" name="publishDate" value={publishDate} onChange={({ target }) => setPublishDate(target.value)}></input><br />
                <label htmlFor="category">Categoria:</label>
                <input type="text" id="category" name="category" value={category} onChange={({ target }) => setCategory(target.value)}></input><br />
                <label htmlFor="price">Preço:</label>
                <input type="number" id="price" name="price" value={price} onChange={({ target }) => setPrice(target.value)}></input><br />
                <label htmlFor="amount">Total:</label>
                <input type="number" id="amount" name="amount" value={amount} onChange={({ target }) => setAmount(target.value)}></input><br />
                <label htmlFor="available">Disponibilidade:</label>
                <input type="number" id="available" name="available" value={available} onChange={({ target }) => setAvailable(target.value)}></input><br />
                <label htmlFor="publishCompany">Editora:</label>
                <input type="number" id="publishCompany" name="publishCompany" value={publishCompany} onChange={({ target }) => setPublishCompany(target.value)}></input><br />
                <label htmlFor="author">Author:</label>
                <input type="number" id="author" name="author" value={author} onChange={({ target }) => setAuthor(target.value)}></input>
                <button type="submit">Enviar</button>
            </form>
        </div>
    )
}

export default Main
