import { utilService } from './util.service.js'
import { storageService } from './async-storage.service.js'

const BOOK_KEY = 'bookDB'
_createBooks()

export const bookService = {
    query,
    get,
    getEmptyBook,
    getDefaultFilter,
}

function query(filterBy = {}) {
    return storageService.query(BOOK_KEY)
        .then(books => {
            if (filterBy.txt) {
                const regExp = new RegExp(filterBy.txt, 'i')
                books = books.filter(book => regExp.test(book.title))
            }
            if (filterBy.amount) {
                books = books.filter(book => book.listPrice.amount >= filterBy.amount)
            }
            return books
        })
}

function get(bookId) {
    return storageService.get(BOOK_KEY, bookId)
}

function getEmptyBook(title = '', amount = '') {
    return {
        id: '',
        title,
        description: '',
        thumbnail: '',
        listPrice: {
            amount,
            currencyCode: '',
            isOnSale: '',
        }
    }
}

function getDefaultFilter() {
    return { txt: '', amount: '' }
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

function _createBook(title, amount) {
    const book = getEmptyBook(title, amount)
    book.id = utilService.makeId()
    book.description = utilService.makeLorem(45)
    book.listPrice = {
        amount,
        currencyCode: 'ILS',
        isOnSale: false
    }
    return book
}