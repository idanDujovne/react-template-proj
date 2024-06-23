const { useState, useEffect } = React

export function BookFilter({ filterBy, onSetFilter }) {
    const [filterByToEdit, setFilterByToEdit] = useState({ ...filterBy })

    useEffect(() => {
        onSetFilter(filterByToEdit)
    }, [filterByToEdit])

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

        setFilterByToEdit(prevFilter => ({ ...prevFilter, [field]: value }))
    }

    function onSubmitFilter(ev) {
        console.log('submit', filterByToEdit);
        ev.preventDefault()
        onSetFilter(filterByToEdit)
    }

    const { txt, amount } = filterByToEdit

    return (
        <section className="book-filter">
            <h2>Filter Our Books</h2>
            <form onSubmit={onSubmitFilter}>
                <label htmlFor="txt">Title</label>
                <input value={txt} onChange={handleChange} name="txt" type="text" id="txt" />

                <label htmlFor="amount">Price</label>
                <input value={amount || ''} onChange={handleChange} name="amount" type="number" id="amount" />

                <button>Submit</button>
            </form>
        </section>
    )
}