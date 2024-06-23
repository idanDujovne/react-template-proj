import { bookService } from "../services/book.service.js";

const { useState, useEffect } = React

export function BookDetails({ bookId, onBack }) {
    const [book, setBook] = useState(null)

    useEffect(() => {
        bookService.get(bookId)
            .then(book => setBook(book))
    }, [])

    if (!book) return <div>Loading...</div>
    return (
        <section className="book-details">
            <h1 className="book-title">Title: {book.title}</h1>
            <img className="book-cover" src={`${book.thumbnail}`} alt="Book cover" />
            <p className="book-description">{book.description}</p>
            <p className="book-price"><span>{book.listPrice.amount}</span> {book.listPrice.currencyCode}</p>
            <button onClick={onBack}>Back</button>
        </section>
    )
}