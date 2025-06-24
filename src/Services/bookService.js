
import { bookMock } from './mocks.js';

let bookList = [...bookMock];

export function getAllBooks() {
    return bookList;
}

export function addBook(book) {
    bookList.push(book);
    return book;
}

export function getBookById(id) {
    const book = bookList.find(book => book.id === id);
    if (book) {
        return book;
    }
    else {
        throw new Error("Livro não encontrado");
    }
}

export function getBooksNames() {
    return bookList.map(book => { book.id, book.title, book.author });
}

export function removeBook(id) {
    const book = getBookById(id);

    if (book.rented === null) {
        bookList = bookList.filter(book => book.id !== id);
        return book;
    }
    else {
        throw new Error("Não é possível remover um livro alugado");
    }
}

export function editBook(id, updatedBook) {
    const book = getBookById(id);
    const index = bookList.indexOf(book);
    return bookList[index] = updatedBook

}

export function rentBook(id, userId) {
    const book = getBookById(id);

    if (book.rented !== null) {
        return null;
    }

    book.rented = userId;
    return book;
}

export function resetBooks(){
    bookList = [...bookMock];
}
