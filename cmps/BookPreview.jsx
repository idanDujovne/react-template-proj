export function BookPreview({ book }) {

    function calcPages({ pageCount }) {
        if (pageCount > 500) return 'Serious Reading'
        else if (pageCount > 200) return 'Descent Reading'
        else return 'Light Reading'
    }

    function calcBookAge({ publishedDate }) {
        const time = new Date().getFullYear()
        if (time - publishedDate >= 10) return 'Vintage'
        else if (time - publishedDate < 1) return 'New!'
    }

    function showPriceColor({ listPrice: { amount } }) {
        if (amount > 220) return 'red'
        if (amount < 140) return 'green'
        return ''
    }

    function isOnSale({ listPrice: { isOnSale } }) {
        return isOnSale
    }

    function showPriceBeforeSale({ listPrice: { amount } }) {
        return Math.ceil(amount * 1.5)
        
    }

    return (
        <article className="book-preview">
            <h2>{book.title}</h2>
            <h4 className={showPriceColor(book)}>{book.listPrice.amount} {book.listPrice.currencyCode} <s>{isOnSale(book) && showPriceBeforeSale(book)}</s></h4>
            <h4>{calcPages(book)}</h4>
            <h4>{calcBookAge(book)}</h4>
        </article>
    )
}