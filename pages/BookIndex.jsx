const { Link } = ReactRouterDOM

import { BookList } from "../cmps/BookList.jsx"
import { bookService } from "../services/book.service.js"
import { BookDetails } from "./BookDetails.jsx"
import { BookFilter } from "../cmps/BookFilter.jsx"

const { useEffect, useState } = React

export function BookIndex() {

    const [books, setBooks] = useState(null)
    const [filterBy, setFilterBy] = useState(bookService.getDefaultFilter())

    useEffect(() => {
        loadBooks()
    }, [filterBy])

    function loadBooks() {
        bookService.query(filterBy)
            .then(books => {
                setBooks(books)
            })
            .catch(err => {
                console.log('err:', err);
            })
    }

    function onSetFilter(filterBy) {
        setFilterBy({ ...filterBy })
    }

    function onRemoveBook(bookId) {
        bookService.remove(bookId)
            .then(() => {
                setBooks(books =>
                    books.filter(book => book.id !== bookId)
                )
            })
            .catch(err => {
                console.log('Problem removing book', err)
            })
    }

    if (!books) return <div>Loading...</div>
    return (
        <section className="book-index">
            <button><Link to="/book/edit">Add Book</Link></button>
            <BookFilter filterBy={filterBy} onSetFilter={onSetFilter} />
            <BookList
                books={books}
                onRemoveBook={onRemoveBook}
            />
        </section>
    )
}