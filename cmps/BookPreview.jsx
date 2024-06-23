export function BookPreview({ book }) {
    const { title, price } = book

    return (
        <article className="book-preview">
            <h2>Title: {title}</h2>
            <h4>Book Price: {price}</h4>
        </article>
    )
}