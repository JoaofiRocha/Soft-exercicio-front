import { Button, Modal, Input, Divider } from 'antd'
import { useEffect, useState } from 'react';

import { addBook } from '@/Services/bookService';

const CreateBookModal = ({onClose, open}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [book, setBook] = useState(null)


    const handleClose = () => {
        setIsOpen(false);
        onClose();
    }

    useEffect(() => {
        if (open) {
            setIsOpen(true);
            setBook({
                id:crypto.randomUUID(),
                title: "",  
                author: "",
                year: "",
                description: "",
                rented: null
            });
        }
        else {
            setIsOpen(false);
        }
    }, [open]);
                

    const handlecreate = () => {

        try {
            addBook(book);
            alert("Livro criado com sucesso!");
        } catch (error) {
            alert("Erro ao criar o livro");
        }

        handleClose();
    }


    return (
        <div>
            <Modal open={isOpen} onCancel={handleClose} footer={null}>
                <div className='div-modal'>
                    <h2>Titulo: </h2>
                    <Input
                        value={book ? book.title : ""}
                        onChange={(e) => setBook({ ...book, title: e.target.value })}
                        placeholder='Titulo do Livro'
                    />

                </div>

                <div className='div-modal'>
                    <h2>Autor: </h2>
                    <Input
                        value={book ? book.author : ""}
                        onChange={(e) => setBook({ ...book, author: e.target.value })}
                        placeholder='Autor do Livro'
                    />
                </div>

                <div className='div-modal'>
                    <h2>Ano da Edição: </h2>
                    <Input
                        value={book ? book.year : ""}
                        onChange={(e) => setBook({ ...book, year: e.target.value })}
                        placeholder='Ano da Edição'
                    />
                </div>

                <div className='div-modal'>
                    <h2>Descrição: </h2>
                    <Input.TextArea
                        className='input-modal'
                        autoSize={{ minRows: 6, maxRows: 12 }}
                        value={book ? book.description : ""}
                        onChange={(e) => setBook({ ...book, description: e.target.value })}
                        placeholder='Descrição do Livro'
                    />
                </div>

                <Divider />

                <div className='buttons-rent-modal'>
                    <Button onClick={handleClose}>Cancelar</Button>

                    <Button className='button-modal' type="primary" onClick={handlecreate}>Criar Livro</Button>

                </div>
            </Modal>
        </div>
    );
}

export default CreateBookModal