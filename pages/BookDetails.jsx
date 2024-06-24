const { useParams, Link } = ReactRouterDOM

import { bookService } from "../services/book.service.js"

const { useState, useEffect } = React

export function BookDetails() {

    const [book, setBook] = useState(null)
    const { bookId } = useParams()

    useEffect(() => {
        bookService.get(bookId)
            .then(book => setBook(book))
    }, [bookId])

    if (!book) return <div>Loading...</div>
    return (
        <section className="book-details">
            <h1>Title: {book.title}</h1>
            <img src={`${book.thumbnail}`} alt="Book cover" />
            <p>{book.description}</p>
            <p><span>{book.listPrice.amount}</span> {book.listPrice.currencyCode}</p>
            <button><Link to="/book">Back</Link></button>
        </section>
    )
}