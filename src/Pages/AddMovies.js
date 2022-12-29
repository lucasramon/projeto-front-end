import * as React from 'react';
import { useState } from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import CommentIcon from '@mui/icons-material/Comment';
import SearchIcon from '@mui/icons-material/Search';
import { Button, TextField, Typography } from '@mui/material';
import { getMoviesList, addMoviesToFavorites } from '../Services/Movies';

const AddMovies = (props) => {
    const { success, modalClose, error } = props;
    const [checked, setChecked] = useState([]);
    const [moviesData, setMoviesData] = useState([]);
    const [submitDisabled, setSubmitDisabled] = useState(false);

    const handleToggle = (value) => () => {
        const currentIndex = checked.indexOf(value);
        const newChecked = [...checked];

        if (currentIndex === -1) {
            newChecked.push(value);
        } else {
            newChecked.splice(currentIndex, 1);
        }

        setChecked(newChecked);
    };

    const [input, setInput] = useState('')

    const handleChanges = (e) => {
        setInput(e.target.value)
    }

    const handleGetMovies = async (e) => {
        e.preventDefault();
        const data = await getMoviesList(input);
        setInput('');
        setMoviesData(data)
    }

    const submitFavorites = async () => {
        setSubmitDisabled(true)
        const selectedMovies = checked.map(movie => movie.imdbID);
        const response = await addMoviesToFavorites(selectedMovies);
        if (response === 200) {
            success("Filmes favoritados com sucesso.");

        } else {
            error("Erro durante a operação")
        }
        modalClose();
        setSubmitDisabled(false)
    }

    return (
        <><>
            <form onSubmit={handleGetMovies}>
                <Typography variant="h5" padding={3} textAlign="center">
                    Buscar filmes
                </Typography>

                <TextField
                    name="name"
                    onChange={handleChanges}
                    value={input}
                    margin='normal'
                    type={'text'}
                    variant="outlined"
                    placeholder="Digite o nome do filme" />

                <Button
                    endIcon={<SearchIcon />}
                    type="submit"
                    sx={{ marginTop: 3, borderRadius: 3 }}
                    variant="contained"
                    color="primary">{'Buscar'}
                </Button>

            </form>
        </><>
                <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                    {moviesData.map((movie) => {
                        const labelId = `checkbox-list-label-${movie.imdbId}`;

                        return (
                            <ListItem
                                key={movie.imdbId}
                                // secondaryAction={<IconButton edge="end" aria-label="comments">
                                //     <CommentIcon />
                                // </IconButton>}
                                disablePadding
                            >
                                <ListItemButton role={undefined} onClick={handleToggle(movie)} dense>
                                    <ListItemIcon>
                                        <Checkbox
                                            edge="start"
                                            checked={checked.indexOf(movie) !== -1}
                                            tabIndex={-1}
                                            disableRipple
                                            inputProps={{ 'aria-labelledby': labelId }} />
                                    </ListItemIcon>
                                    <ListItemText id={labelId} primary={`Nome: ${movie.Title}`} secondary={`Ano de lançamento: ${movie.Year}`} />
                                </ListItemButton>
                            </ListItem>
                        );
                    })}
                </List>
                <Button
                    endIcon={<SearchIcon />}
                    disabled={submitDisabled}
                    onClick={() => { submitFavorites() }}
                    sx={{ marginTop: 3, borderRadius: 3 }}
                    variant="contained"
                    color="primary">{'Cadastrar'}

                </Button>
            </></>

    );
}

export default AddMovies;