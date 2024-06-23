export function BookPreview({ book }) {
    return (
        <article className="book-preview">
            <h2>Title: {book.title}</h2>
            <h4>Book Price: {book.listPrice.amount}</h4>
        </article>
    )
}