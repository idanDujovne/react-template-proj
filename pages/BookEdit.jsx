const { useNavigate, useParams } = ReactRouterDOM

const { useState, useEffect } = React
import { bookService } from "../services/book.service.js"

export function BookEdit() {
    const [bookToEdit, setBookToEdit] = useState(bookService.getEmptyBook())
    const navigate = useNavigate()
    const { bookId } = useParams()

    useEffect(() => {
        if (bookId) loadBook()
    }, [])

    function loadBook() {
        bookService.get(bookId)
            .then(setBookToEdit)
            .catch(err => console.log('err:', err))
    }

    function onSaveBook(ev) {
        ev.preventDefault()
        bookService.save(bookToEdit)
            .then(() => {
                navigate('/book')
            })
            .catch(err => console.log('err:', err))
    }

    function handleChange({ target }) {
        const field = target.name
        let value = target.value

        switch (target.type) {
            case 'number':
            case 'range':
                value = +value
                break;

            case 'checkbox':
                value = target.checked
                break

            default:
                break;
        }
        if (field === 'amount') setBookToEdit(prevBook => ({
            ...prevBook,
            listPrice: {
                ...prevBook.listPrice,
                [field]: value
            }
        }));

        setBookToEdit(prevBook => ({ ...prevBook, [field]: value }))
    }

    const { title, listPrice: { amount } } = bookToEdit

    return (
        <section className="book-edit">
            <h1>{bookId ? 'Edit' : 'Add'}</h1>
            <form onSubmit={onSaveBook}>
                <label htmlFor="title">Title</label>
                <input onChange={handleChange} value={title} type="text" name="title" id="title" />

                <label htmlFor="amount">Price</label>
                <input onChange={handleChange} value={amount} type="number" name="amount" id="amount" />

                <button>Save</button>
            </form>
        </section>
    )
}