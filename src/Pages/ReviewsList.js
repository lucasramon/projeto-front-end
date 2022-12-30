
import * as React from 'react';
import { useState, useEffect, useCallback } from 'react';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import DeleteIcon from '@mui/icons-material/Delete';
import { Button } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import Snackbar from '@mui/material/Snackbar';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import Alert from '@mui/material/Alert';
import PersonIcon from '@mui/icons-material/Person';
import Tooltip from '@mui/material/Tooltip';
import { getMyReviews, getReviewsFromMovie } from '../Services/Reviews';
import AddReview from './AddReview';
import { Delete } from './Delete';
import CircularProgress from '@mui/material/CircularProgress';

const Demo = styled('div')(({ theme }) => ({
    backgroundColor: theme.palette.background.paper,
}));

const ReviewsList = (props) => {
    const { modalData } = props;

    const [openModal, setOpenModal] = useState(false);
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [messageSnackbar, setMessageSnackbar] = useState("");
    const [snackbarColor, setSnackbarColor] = useState("info");
    const [loading, setLoading] = useState(true);
    const [reviewData, setReviewData] = useState([]);
    const [typeEdit, setTypeEdit] = useState("");
    const [listData, setListData] = useState([]);


    const fetchData = useCallback(async () => {
        const result = await getReviewsFromMovie(modalData.imdbID);
        const teste = await getMyReviews();
        console.log(teste)
        setListData(result);
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
    const handleAddReview = (type) => {
        setTypeEdit(type);
        handleModalOpen();
    };

    const handleDeleteReview = (data, type) => {
        setTypeEdit(type);
        setReviewData(data);
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
            case 'addReview': return <AddReview modalClose={handleModalClose} modalData={modalData} setLoading={setLoading} error={handleOpenErrorAlert} success={handleOpenSuccess} />;
            case 'deleteReview': return <Delete modalClose={handleModalClose} setLoading={setLoading} modalData={reviewData} modalText={{ message: "Deseja mesmo excluir o", type: "review" }} success={handleOpenSuccess} error={handleOpenErrorAlert} />;
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
            <Grid container spacing={2}>

                <Grid item xs={12}>
                    <Button color='secondary' onClick={() => handleAddReview('addReview')} variant="contained">Adicionar review</Button>
                </Grid>

                <Grid item xs={12}>
                    <Typography sx={{ mt: 4, mb: 2 }} variant="h6" component="div">
                        Lista de reviews do filme "{modalData.Title}"
                    </Typography>
                    <Demo>
                        {
                            loading ? <div className="loader">
                                <CircularProgress />
                            </div> :
                                <List dense={true}>
                                    {listData.map((review, index) => {
                                        return (
                                            < ListItem
                                                key={index}
                                                secondaryAction={
                                                    < Tooltip title="Excluir review" >
                                                        <IconButton edge="end" onClick={() => handleDeleteReview(review, 'deleteReview')} aria-label="delete">
                                                            <DeleteIcon />
                                                        </IconButton>
                                                    </Tooltip>
                                                }
                                            >
                                                <ListItemAvatar>
                                                    <Avatar>
                                                        <PersonIcon />
                                                    </Avatar>
                                                </ListItemAvatar>
                                                <ListItemText
                                                    primary={review.comment}
                                                    secondary={`Autor: ${review.user.name}`}
                                                />
                                            </ListItem>
                                        )

                                    })

                                    }
                                </List>
                        }
                    </Demo>
                </Grid>


            </Grid >
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
        </Paper >
    );
}

export default ReviewsList;