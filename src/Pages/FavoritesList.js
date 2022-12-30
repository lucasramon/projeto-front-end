import * as React from 'react';
import { useState, useEffect, useCallback } from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import IconButton from '@mui/material/IconButton';
import ReviewsIcon from '@mui/icons-material/Reviews';
import DeleteIcon from '@mui/icons-material/Delete';
import Tooltip from '@mui/material/Tooltip';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import Alert from '@mui/material/Alert';
import AddMovies from './AddMovies';
import ReviewsList from './ReviewsList';
import { Delete } from './Delete';
import { parseMoviesFromOMDB } from '../Services/Movies';
import CircularProgress from '@mui/material/CircularProgress';

const columns = [
    { id: 'Title', label: 'Título', minWidth: 170 },
    { id: 'Year', label: 'Ano', minWidth: 100 },
    {
        id: 'actions',
        label: 'Ações',
        minWidth: 170,
        align: 'center',
    },

];




export default function Dashboard() {

    const [openModal, setOpenModal] = useState(false);
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [messageSnackbar, setMessageSnackbar] = useState("");
    const [snackbarColor, setSnackbarColor] = useState("info");
    const [loading, setLoading] = useState(true);
    const [MovieData, setMovieData] = useState([]);
    const [typeEdit, setTypeEdit] = useState("");
    const [tableData, setTableData] = useState([]);


    const fetchData = useCallback(async () => {
        const result = await parseMoviesFromOMDB();
        setTableData(result);
        setLoading(false);
    }, [])

    useEffect(() => {
        if (loading) fetchData();
    }, [fetchData, loading]);


    const handleModalOpen = () => {
        setOpenModal(true);
    };
    const handleModalClose = () => {
        setOpenModal(false);
    };
    const handleAddMovies = (type) => {
        setTypeEdit(type);
        handleModalOpen();
    };
    const handleCheckReviews = (data, type) => {
        setTypeEdit(type);
        setMovieData(data);

        handleModalOpen();
    };
    const handleDeleteMovie = (data, type) => {
        setTypeEdit(type);
        setMovieData(data);
        handleModalOpen();
    }
    const handleOpenErrorAlert = (message) => {
        setMessageSnackbar(message);
        setSnackbarColor("error");
        setOpenSnackbar(true);
    };
    const handleOpenSuccess = (message) => {
        setMessageSnackbar(message);
        setSnackbarColor("success");
        setOpenSnackbar(true);
    };


    const handleCloseErrorAlert = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenSnackbar(false);
    };




    const modalComponent = () => {
        switch (typeEdit) {
            case 'addMovies': return <AddMovies modalClose={handleModalClose} setLoading={setLoading} error={handleOpenErrorAlert} success={handleOpenSuccess} />;
            case 'checkReviews': return <ReviewsList modalData={MovieData} />;
            case 'deleteMovie': return <Delete modalClose={handleModalClose} setLoading={setLoading} modalData={MovieData} modalText={{ message: "Deseja mesmo excluir o", type: "filme" }} success={handleOpenSuccess} error={handleOpenErrorAlert} />;
            default: break;
        }
    };


    const SetDialogTitle = (props) => {
        // const classes = useStyles();
        const { children, onClose, ...other } = props;
        // return (
        //     <DialogTitle disableTypography className={classes.dialogTitle} {...other}>
        //         <Typography variant="h6">{children}</Typography>
        //         {onClose ? (
        //             <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
        //                 <CloseIcon />
        //             </IconButton>
        //         ) : null}
        //     </DialogTitle>
        // );
        return (
            <DialogTitle   {...other}>
                <Typography variant="h6">{children}</Typography>
                {onClose ? (
                    <IconButton aria-label="close" onClick={onClose}>
                        <CloseIcon />
                    </IconButton>
                ) : null}
            </DialogTitle>
        );
    };

    return (
        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
            <Button color='secondary' onClick={() => handleAddMovies('addMovies')} variant="contained">Adicionar Filme</Button>
            <TableContainer sx={{ maxHeight: 590 }}>
                {
                    loading ? <div className="loader">
                        <CircularProgress />
                    </div> :
                        <Table stickyHeader aria-label="sticky table">
                            <TableHead>
                                <TableRow>
                                    {columns.map((column) => (
                                        <TableCell
                                            key={column.id}
                                            align={column.align}
                                            style={{ minWidth: column.minWidth }}
                                        >
                                            {column.label}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {tableData

                                    .map((row, index) => {
                                        return (
                                            <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                                                {columns.map((column, index) => {
                                                    const value = row[column.id];
                                                    if (column.id === 'actions') {
                                                        return (
                                                            <TableCell key={index} align={column.align}>
                                                                <Tooltip title="Ver Reviews">
                                                                    <IconButton onClick={() => handleCheckReviews(row, 'checkReviews')}>
                                                                        <ReviewsIcon color="secondary" />
                                                                    </IconButton>
                                                                </Tooltip>

                                                                <Tooltip title="Remover Filmes">
                                                                    <IconButton onClick={() => handleDeleteMovie(row, 'deleteMovie')}>
                                                                        <DeleteIcon color="error" />
                                                                    </IconButton>
                                                                </Tooltip>


                                                            </TableCell>
                                                        )
                                                    } else {
                                                        return (
                                                            <TableCell key={index} align={column.align}>
                                                                {value}
                                                            </TableCell>
                                                        );
                                                    }
                                                })}
                                            </TableRow>
                                        );
                                    })}
                            </TableBody>
                        </Table>
                }
            </TableContainer>


            <Dialog onClose={handleModalClose} aria-labelledby="customized-dialog-title" open={openModal}>
                <SetDialogTitle id="customized-dialog-title" onClose={handleModalClose}>
                    {typeEdit}
                </SetDialogTitle>
                {modalComponent()}
            </Dialog>

            <Snackbar open={openSnackbar} autoHideDuration={5000} onClose={handleCloseErrorAlert}>
                <Alert onClose={handleCloseErrorAlert} severity={snackbarColor}>
                    {messageSnackbar}
                </Alert>
            </Snackbar>
        </Paper>
    );
}
