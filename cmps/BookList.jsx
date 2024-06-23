import { BookPreview } from "./BookPreview.jsx";

export function BookList({ books, onRemvoeBook, onSelectBookId }) {

    return (
        <ul className="book-list">
            {books.map(book =>
                <li key={book.id}>
                    <BookPreview book={book} />
                    <section>
                        <button onClick={() => onRemvoeBook(book.id)}>Remove</button>
                        <button onClick={() => onSelectBookId(book.id)}>Details</button>
                    </section>
                </li>
            )}
        </ul>
    )
}