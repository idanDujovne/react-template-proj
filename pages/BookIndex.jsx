import { BookList } from "../cmps/BookList.jsx"
import { bookService } from "../services/book.service.js"

const { useEffect, useState } = React

export function BookIndex() {
    const [books, setBooks] = useState(null)

    useEffect(() => {
        loadBooks()
    },[])

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
        console.log('Selected', bookId)
    }

    if (!books) return <div>Loading...</div>
    return (
        <section className="book-index">
            <h1>check out our books!</h1>
            {<BookList
                books={books}
                onRemvoeBook={onRemoveBook}
                onSelectBookId={onSelectBookId}
            />}
        </section>
    )
}