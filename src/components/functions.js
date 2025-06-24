
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const initialBooks = getAllBooks();
    setBooks(initialBooks);
    window.rentBook = rentBook;
    window.getAllBooks = getAllBooks;
    window.doLogin = doLogin;
    window.getUser = getUser;
    window.removeBook = removeBook;

  }, []);

  const addBooks = () => {
    const newBook = {
      id: books.length + 1,
      title: "New Book",
      author: "New Author",
      year: 2025,
      description: "This is a new book",
      rented: null,
    };

    addBook(newBook);
    setBooks([...getAllBooks()]);
  }

  const removeBooks = () => {
    const id = 2;

    removeBook(id);
    setBooks([...getAllBooks()]);
  }

  const editBooks = () => {
    const id = 2;
    const book = { id: 2, title: "Livro X", author: "Autor B", year: 2021, description: "Esse é Ruim", rented: null };

    editBook(id, book);
    setBooks([...getAllBooks()]);
  }

  const rentBooks = () => {
    const id = 2;
    const userId = 1;

    try {
      const book = rentBook(id, userId);
      if (book === null) {
        throw new Error;
      }
    }
    catch (error) {
      alert("Livro já Alugado");
    }

    setBooks([...getAllBooks()]);
  }

  const doLogin = (email, password) => {
    try {
      const user = login(email, password);
      alert(`Bem-vinda, ${user.name}!`);
      console.log(user)
    }
    catch (error) {
      alert(error.message);
      console.log(error.message)
    }
  }