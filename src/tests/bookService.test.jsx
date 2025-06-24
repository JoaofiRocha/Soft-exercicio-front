import { getAllBooks, removeBook, addBook, editBook, rentBook, getBookById, resetBooks } from "../Services/bookService";

beforeEach(() => {
  resetBooks();
});

test('getAllBooks', () => {
  const books = getAllBooks();

  expect(Array.isArray(books)).toBe(true);
  expect(books.length).toBeGreaterThan(0);

  books.forEach(book => {
    expect(book).toHaveProperty('id');
    expect(book).toHaveProperty('title');
    expect(book).toHaveProperty('author');
    expect(book).toHaveProperty('rented');
  });
});

test('addBook', () => {
  const newBook = {
    id: 6,
    title: "New Book",
    author: "New Author",
    year: 2025,
    description: "This is a new book",
    rented: null,
  };

  const addedBook = addBook(newBook);
  expect(addedBook).toEqual(newBook);

  const books = getAllBooks();
  expect(books).toContainEqual(newBook);

  expect(books.length).toBeGreaterThan(4);
});

test('getBookById', () => {
  
  expect(getBookById(1)).toHaveProperty('id', 1);
  expect(getBookById(1)).toHaveProperty('title', 'Dom Casmurro');
});

test('getBookById - no id', () => {
  
  expect(() => getBookById(0)).toThrow("Livro não encontrado");
  
});

test('removeBook', () => {
  const id = 1;
  const number = getAllBooks().length;
  const book = removeBook(id);

  expect(book).toHaveProperty('id', id);

  expect(getAllBooks()).not.toContainEqual(book);
  expect(getAllBooks().length).toBeLessThan(number);

});

test('removeBook - no id', () => {
  
  expect(() => removeBook(0)).toThrow("Livro não encontrado");
  
});

test('removeBook - rented book', () => {
  
  expect(() => removeBook(3)).toThrow("Não é possível remover um livro alugado");
  
});

test('editBook', () => {
  const id = 2;
  const existingBook = getBookById(id);
  const updatedBook = {id: 2, title: "Livro X", author: "Autor B", year: 2021, description: "Esse é Ruim", rented: null};

  const book = editBook(id, updatedBook);

  expect(updatedBook).not.toEqual(existingBook);
  expect(book).toEqual(updatedBook);
  expect(getAllBooks()).toContainEqual(updatedBook);
});

test('editBook - no id', () => {
  
  expect(() => editBook(0,{id:""})).toThrow("Livro não encontrado");
  
});


test('rentBook', () => {
  const id = 2;
  const userId = 1;

  const book = rentBook(id, userId);

  expect(book).toHaveProperty('rented', userId);
});

test('rentBook - no id', () => {
  
  expect(() => rentBook(0)).toThrow("Livro não encontrado");
  
});
