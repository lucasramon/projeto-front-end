import React, { useState, useEffect } from 'react';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import { deleteMovie } from '../Services/Movies';



export const Delete = (props) => {
    const { modalData, modalText, success, modalClose, setLoading } = props;


    const closeButton = () => {
        modalClose();
    }
    const handleDelete = async () => {
        console.log(modalText)
        if (modalText.type === "filme") {
            const status = await deleteMovie(modalData.imdbID)
            if (status === 200) {
                success("Filme excluido.");
            } else {
                props.error("Não foi possível deletar o Filme. Por favor tente novamente mais tarde.");
            }
            setLoading(true);
        }
        if (modalText.type == "deleteReview") {
            const status = 200

            if (status === 200) {
                success("Banner Deletado.");
            } else {
                props.error("Não foi possível deletar o Banner. Por favor tente novamente mais tarde.");
            }
            setLoading(true);
        }
        modalClose();

    }



    return (
        <>
            <DialogContent dividers>
                {modalText.message} {modalText.type}: "{modalData.Title}"?
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