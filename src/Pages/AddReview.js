import * as React from 'react';
import { useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import { Button, TextField, Typography, Slider } from '@mui/material';
import { addMovieReview } from '../Services/Reviews';
import Rating from '@mui/material/Rating';

const AddReview = (props) => {
    const { success, modalClose, error, setLoading, modalData } = props;
    const [submitDisabled, setSubmitDisabled] = useState(false);

    const [input, setInput] = useState({
        comment: '',
        stars: 3,
    })

    const handleChanges = (e) => {
        const { name, value } = e.target
        setInput((prevState) => ({
            ...prevState,
            [name]: value
        }))
    }


    const submitReview = async () => {
        setSubmitDisabled(true);
        const response = await addMovieReview(modalData.imdbID, input);
        if (response === 200) {
            setLoading(true)
            success("Review enviado com sucesso!");

        } else {
            error("Erro durante a operação")
        }
        modalClose();
        setSubmitDisabled(false);
    }

    return (
        <>

            <form >
                <Typography variant="h5" padding={3} textAlign="center">
                    Faça seu review do Filme "{modalData.Title}"
                </Typography>

                <TextField
                    name="comment"
                    onChange={handleChanges}
                    value={input.comment}
                    margin='normal'
                    type={'text'}
                    variant="outlined"
                    placeholder="Escreva seu review do Filme"
                    multiline
                    rows={4}
                />


                <Typography id="non-linear-slider" gutterBottom>
                    Dê uma nota para o Filme:
                </Typography>

                <Rating
                    name="stars"
                    value={input.stars}
                    onChange={handleChanges}
                />

                <Button
                    endIcon={<SearchIcon />}
                    disabled={submitDisabled}
                    onClick={submitReview}
                    sx={{ marginTop: 3, borderRadius: 3 }}
                    variant="contained"
                    color="primary">{'Enviar review'}
                </Button>

            </form>
        </>


    );
}

export default AddReview;