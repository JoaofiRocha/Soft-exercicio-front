'use client';
import { useState, useEffect } from 'react';
import { getAllBooks } from "@/Services/bookService";
import { Table, Card, Button, Input, Divider } from "antd";
import BookModal from './bookModalComponent';
import CreateBookModal from './createBookModalComponent';



const BookList = () => {
    const [books, setBooks] = useState([]);
    const [allBooks, setAllBooks] = useState([]);
    const [search, setSearch] = useState("");

    const [selectedBook, setSelectedBook] = useState(null);
    const [createBookModalOpen, setCreateBookModalOpen] = useState(false);

    useEffect(() => {
        const data = getAllBooks();
        setAllBooks(data);
    }, []);

    useEffect(() => {
        const filtered = allBooks.filter((b) =>
            b.title.toLowerCase().includes(search.toLowerCase())
        );
        setBooks(filtered);
    }, [search, allBooks]);

    const filterBooks = () => {
        const filtered = allBooks.filter((b) =>
            b.title.toLowerCase().includes(search.toLowerCase())
        );

        setBooks(filtered);
    }

    const loadBooks = () => {
        const data = getAllBooks();
        setAllBooks(data);
        filterBooks();
    }

    const columns = [
        {
            title: "Titulo",
            dataIndex: "title",
            key: "title",
            className: "columns",
            render: text => <a><h4>{text}</h4></a>,
        },
        {
            title: "Autor",
            dataIndex: "author",
            key: "author",
            className: "columns",
        },
        {
            title: "Disponivel",
            dataIndex: "rented",
            key: "rented",
            className: "columns",
            render: (rented) => (
                <b style={{ color: rented === null ? 'green' : 'red' }}>{rented === null ? "sim" : "não"}</b>
            )
        },
        {
            title: "Exibir Detalhes",
            key: "edit",
            className: "button-columns",
            render: (_, e) => (
                <Button shape="circle" onClick={() => setSelectedBook(e.id)}>
                    <b> ... </b>
                </Button>
            )
        }
    ];

    const handleModalClose = () => {
        console.log("Modal closed");
        setSelectedBook(null);
        setCreateBookModalOpen(false);
        loadBooks();
    }

    return (
        <Card>
            <div className='div-table'>
                <h2 >Livros</h2>
                <div>
                    <Input className='search-bar' value={search} placeholder="Pesquisar..." onChange={(e) => setSearch(e.target.value)} />
                    <Button type='primary' ghost onClick={() => setCreateBookModalOpen(true)}>Novo Livro</Button>
                </div>
            </div>
            <Divider />
            <Table columns={columns} dataSource={books} rowKey="id" size="middle" pagination={{ pageSize: 8 }} />


            <BookModal selectedBook={selectedBook} onClose={handleModalClose}></BookModal>

            <CreateBookModal onClose={handleModalClose} open={createBookModalOpen}></CreateBookModal>
        </Card>
    );
}

export default BookList;