import React, { useState, useEffect } from 'react';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';




export const Delete = (props) => {
    const { modalData, modalText, success, modalClose } = props;

    const [deleteData, setData] = useState([]);
    const [deleteName, setDeleteName] = useState('');
    const fetchData = () => {
        if (modalData != null) {
            setData(modalData);
            if (modalText.type == "deleteMovie") setDeleteName(modalData.name);
            if (modalText.type == "deleteReview") setDeleteName(modalData.name);
        }
    }


    useEffect(() => {
        fetchData()
    }, [])

    const closeButton = () => {
        modalClose();
    }
    const handleDelete = async () => {
        modalClose();
        if (modalText.type == "deleteMovie") {
            const status = 200
            if (status === 200) {
                success("Loja Deletada.");
            } else {
                props.error("Não foi possível deletar a loja. Por favor tente novamente mais tarde.");
            }
            setData([]);
        }
        if (modalText.type == "deleteReview") {
            const status = 200

            if (status === 200) {
                success("Banner Deletado.");
            } else {
                props.error("Não foi possível deletar o Banner. Por favor tente novamente mais tarde.");
            }
            setData([]);
        }

    }



    return (
        <>
            <DialogContent dividers>
                {modalText.message} {modalText.type} "{deleteName}"?
            </DialogContent>
            <DialogActions>
                <Button autoFocus onClick={closeButton} color="primary">
                    Cancelar
                </Button>
                <Button autoFocus onClick={handleDelete} color="primary">
                    {"Deletar"}
                </Button>
            </DialogActions>
        </>
    )
}