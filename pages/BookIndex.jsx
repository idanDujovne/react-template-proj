import { BookList } from "../cmps/BookList.jsx"
import { bookService } from "../services/book.service.js"
import { BookDetails } from "./BookDetails.jsx"
import { BookFilter } from "../cmps/BookFilter.jsx"

const { useEffect, useState } = React

export function BookIndex() {
    const [books, setBooks] = useState(null)
    const [selectedBookId, setSelectedBookId] = useState(null)
    const [filterBy, setFilterBy] = useState(bookService.getDefaultFilter())

    useEffect(() => {
        loadBooks()
    }, [filterBy])

    function loadBooks() {
        bookService.query(filterBy)
            .then(books => setBooks(books))
            .catch(err => {
                console.log('err:', err);
            })
    }

    function onSetFilter(filterBy) {
        setFilterBy({ ...filterBy })
    }

    function onRemoveBook(bookId) {
        console.log('Removed', bookId)
    }

    function onSelectBookId(bookId) {
        setSelectedBookId(bookId)
    }

    if (!books) return <div>Loading...</div>
    return (
        <section className="book-index">
            {!selectedBookId &&
                <React.Fragment>
                    <BookFilter filterBy={filterBy} onSetFilter={onSetFilter} />
                    <BookList
                        books={books}
                        onRemvoeBook={onRemoveBook}
                        onSelectBookId={onSelectBookId}
                    />
                </React.Fragment>
            }

            {selectedBookId &&
                <BookDetails
                    onBack={() => setSelectedBookId(null)}
                    bookId={selectedBookId}
                />}
        </section>
    )
}