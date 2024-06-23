import { BookList } from "../cmps/BookList.jsx"
import { bookService } from "../services/book.service.js"
import { BookDetails } from "./BookDetails.jsx"

const { useEffect, useState } = React

export function BookIndex() {
    const [books, setBooks] = useState(null)
    const [selectedBookId, setSelectedBookId] = useState(null)

    useEffect(() => {
        loadBooks()
    }, [])

    function loadBooks() {
        bookService.query()
            .then(books => setBooks(books))
            .catch(err => {
                console.log('err:', err);
            })
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
            <h1>check out our books!</h1>
            {!selectedBookId &&
                <React.Fragment>
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