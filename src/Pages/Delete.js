import React, { useState, useEffect } from 'react';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import { deleteMovie } from '../Services/Movies';
import { deleteReview } from '../Services/Reviews';


export const Delete = (props) => {
    const { modalData, modalText, success, modalClose, setLoading, error } = props;


    const closeButton = () => {
        modalClose();
    }
    const handleDelete = async () => {
        if (modalText.type === "filme") {
            const status = await deleteMovie(modalData.imdbID)
            if (status === 200) {
                success("Filme excluido.");
            } else {
                error("Não foi possível excluir o Filme. Por favor tente novamente mais tarde.");
            }
            setLoading(true);
        }

        if (modalText.type == "review") {
            const status = await deleteReview(modalData.imdbID)
            if (status === 200) {
                success("Review excluido.");
            } else {
                error("Não foi possível excluir o Review. Por favor tente novamente mais tarde.");
            }
            setLoading(true);
        }
        modalClose();

    }



    return (
        <>
            <DialogContent dividers>
                {modalText.type === "filme" ? `${modalText.message} ${modalText.type}: "${modalData.Title}"?` : 'Deseja excluir o Review?'}
            </DialogContent>
            <DialogActions>
                <Button autoFocus onClick={closeButton} color="primary">
                    Cancelar
                </Button>
                <Button autoFocus onClick={handleDelete} color="primary">
                    {"Excluir"}
                </Button>
            </DialogActions>
        </>
    )
}