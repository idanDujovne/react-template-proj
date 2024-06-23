import { utilService } from './util.service.js'
import { storageService } from './async-storage.service.js'

const BOOK_KEY = 'bookDB'
_createBooks()

export const bookService = {
    query,
    getEmptyBook,
    getDefaultFilter,
}

function query(filterBy = {}) {
    return storageService.query(BOOK_KEY)
        .then(books => {
            if (filterBy.txt) {
                const regExp = new regExp(filterBy.txt, 'i')
                books = books.filter(book => regExp.test(book.title))
            }
            if (filterBy.price) {
                books = books.filter(book => book.price >= filterBy.price)
            }
            return books
        })
}

function getEmptyBook(title = '', price = '') {
    return { id: '', title, price}
}

function getDefaultFilter() {
    return { txt: '', price: '' }
}

function _createBooks() {
    let books = utilService.loadFromStorage(BOOK_KEY)
    if (!books || !books.length) {
        books = []
        books.push(_createBook('book 1', 50))
        books.push(_createBook('book 2', 60))
        books.push(_createBook('book 3', 70))
        utilService.saveToStorage(BOOK_KEY, books)
    }
}

function _createBook(title, price) {
    const book = getEmptyBook(title, price)
    book.id = utilService.makeId()
    return book
}