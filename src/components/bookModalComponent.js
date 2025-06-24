import { Button, Modal, Card, Input, Divider } from 'antd'
import { useEffect, useState } from 'react';

import { rentBook, editBook, removeBook, getBookById } from '@/Services/bookService';

const BookModal = ({ selectedBook, onClose }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [book, setBook] = useState(null)
    const [editable, setEditable] = useState(false);

    const [removeModal, setRemoveModal] = useState(false);




    useEffect(() => {
        if (selectedBook) {
            try {
                const bookData = getBookById(selectedBook);
                setBook(bookData);
                setIsOpen(true);


            } catch (error) {
                alert("Erro ao carregar o livro");
            }
        } else {
            setIsOpen(false);
        }
    }, [selectedBook]);

    const handleClose = () => {
        setIsOpen(false);
        setEditable(false);
        onClose();
    }

    const handleRent = () => {
        if (book && book.rented === null) {
            try {
                rentBook(book.id, 1);
            }
            catch (error) {
                alert("Erro ao alugar o livro");
            }
        } else {
            alert("Livro já alugado");
        }

        handleClose();
    }

    const saveEdit = () => {
        setEditable(false);
        if (book) {
            try {
                editBook(book.id, book);
            } catch (error) {
                alert("Erro ao editar o livro");
            }
        }
        handleClose();
    }

    const handleCancel = () => {
        setEditable(false);
        setBook(getBookById(selectedBook));
    }

    const handleRemove = () => {
        if (book && book.rented === null) {
            try {
                removeBook(book.id);
                setRemoveModal(false)
                handleClose();
            } catch (error) {
                alert("Erro ao remover o livro");
            }
        } else {
            alert("Não é possível remover um livro alugado");
        }
    }


    return (
        <div>
            <Modal open={isOpen} onCancel={handleClose} footer={null}>
                <div className='div-modal'>
                    <h2>Titulo: </h2>
                    {editable ? (
                        <Input
                            value={book ? book.title : ""}
                            onChange={(e) => setBook({ ...book, title: e.target.value })}
                        />
                    ) : <h1>{book ? book.title : null}</h1>}

                </div>

                <div className='div-modal'>
                    <h2>Autor: </h2>
                    {editable ? (
                        <Input
                            value={book ? book.author : ""}
                            onChange={(e) => setBook({ ...book, author: e.target.value })}
                        />
                    ) : <h1>{book ? book.author : null}</h1>}
                </div>

                <div className='div-modal'>
                    <h2>Ano da Edição: </h2>
                    {editable ? (
                        <Input
                            value={book ? book.year : ""}
                            onChange={(e) => setBook({ ...book, year: e.target.value })}
                        />
                    ) : <h1>{book ? book.year : null}</h1>}
                </div>

                <div className='div-modal'>
                    <h2>Descrição: </h2>
                    {editable ? (
                        <Input.TextArea
                            className='input-modal'
                            autoSize={{ minRows: 6, maxRows: 12 }}
                            value={book ? book.description : ""}
                            onChange={(e) => setBook({ ...book, description: e.target.value })
                            }
                        />
                    ) : <Card className='card-modal'><h1>{book ? book.description : null}</h1></Card>}
                </div>

                <h2 className='div-modal' style={{ color: book && book.rented === null ? 'green' : 'red' }}>{book ? book.rented === null ? "Disponível" : "Indisponível" : null}</h2>

                {book && book.rented === null && <Divider />}

                <div className='buttons-edit-modal'>
                    {book && book.rented === null && editable && (
                        <div>
                            <Button className='button-modal' danger onClick={handleCancel}>Cancelar</Button>
                            <Button className='button-modal' type="primary" ghost onClick={saveEdit}>Salvar</Button>
                        </div>
                    )}

                    {book && book.rented === null && !editable && (
                        <div>
                            <Button className='button-modal' type="primary" ghost onClick={() => setEditable(true)}>Editar</Button>
                            <Button className='button-modal' type="primary" danger onClick={() => setRemoveModal(true)}>Remover</Button>
                        </div>
                    )}

                </div>

                <Divider />

                <div className='buttons-rent-modal'>
                    <Button onClick={handleClose}>Fechar</Button>

                    {book && book.rented === null && !editable && (
                        <Button className='button-modal' type="primary" onClick={handleRent}>Alugar</Button>
                    )}
                </div>
            </Modal>

            <Modal title={"Deseja Remover Livro?"} open={removeModal} onCancel={() => setRemoveModal(false)} onOk={handleRemove}> </Modal>
        </div>
    );
}

export default BookModal