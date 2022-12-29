// import React, { useState, useEffect, useCallback, Component, useRef } from 'react';
// import { getCategoryList, fetchAllActiveStores } from '../../services/Marketplace/';

// import { categoryTypeEdit } from './Enums';
// import { makeStyles, TableBody, TableRow, TableCell, TextField, Tooltip, IconButton, Button, Grid, Typography, Snackbar, TableHead, TableSortLabel, FormControl, InputLabel, Select, MenuItem, OutlinedInput, InputAdornment } from '@material-ui/core';
// import MuiAlert from '@material-ui/lab/Alert';
// import Loader from '../../components/SVGs/Loader';
// import Tables from '../../components/Table';
// import EditIcon from '@material-ui/icons/Edit';
// import CloseIcon from '@material-ui/icons/Close';
// import DeleteIcon from '@material-ui/icons/Delete';
// import QueueIcon from '@material-ui/icons/Queue';
// import { FormCategory } from './FormCategories'
// import { FormCategoriesStores } from './FormCategoriesStores';
// import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
// import { Delete } from './Delete';
// import { editOnRowClick } from './Utils';
// import { filterTypeEnum } from '../../features/Marketplace/Enums'
// import { Filter } from '../../components/FilterBar/FilterBar';
// import DialogTitle from '@mui/material/DialogTitle';
// import Dialog from '@mui/material/Dialog';

// const useStyles = makeStyles((theme) => ({
//     root: {
//         width: '100%',
//         '& > * + *': {
//             marginTop: theme.spacing(2),
//         },
//     },
//     dialogTitle: {
//         margin: 0,
//         padding: 16,
//     },
//     tableButtons: {
//         width: 80,
//     },
//     closeButton: {
//         position: 'absolute',
//         right: 8,
//         top: 8,
//         color: theme.palette.grey[500],
//     },
//     grid: {
//         marginBottom: 10,
//     },
//     loader: {
//         marginTop: 100,
//     },
//     pagination: {
//         marginTop: 10,
//         marginBottom: 20,
//         textAlign: 'right',
//         '& .MuiFormControl-root': {
//             minWidth: 100,
//         },
//         '& nav': {
//             display: 'inline-block',
//             marginRight: 10,
//             marginTop: 12,
//         },
//         '& .MuiInputLabel-outlined.MuiInputLabel-shrink': {
//             background: 'white',
//             padding: '0 5 0 0',
//         }
//     },
// }));


// function Alert(props) {
//     return <MuiAlert elevation={6} variant="filled" {...props} />;
// }

// /**
//  * Componente para gerar a tela de listagem de itens relacionados a categorias
//  *
//  *  @component
//  */

// export const TableCategories = () => {

//     const headCells = [
//         { id: 'order', label: 'Posição' },
//         { id: 'name', label: 'Nome' },
//         { id: 'isActive', label: 'Ativo' },
//         { id: 'edit', label: 'Ações', disableSorting: true }
//     ];
//     const classes = useStyles();
//     const [openSnackbar, setOpenSnackbar] = useState(false);
//     const [messageSnackbar, setMessageSnackbar] = useState("");
//     const [snackbarColor, setSnackbarColor] = useState("");
//     const [loading, setLoading] = useState(true);
//     const [categoriesList, setCategoriesList] = useState([]);
//     const [storesList, setStoresList] = useState([]);
//     const [editCategory, setEditCategory] = useState([]);
//     const [typeEdit, setTypeEdit] = useState("");
//     const [filterQuery, setFilterQuery] = useState([]);
//     const [page, setPage] = useState(1);
//     const [rowsPerPage, setRowsPerPage] = useState(10);
//     const [order, setOrder] = useState('asc');
//     const [orderBy, setOrderBy] = useState('order');


//     useEffect(async () => {
//         const limitFields = true
//         const [status, list] = await fetchAllActiveStores(limitFields);
//         setStoresList(list);
//     }, [])


//     const queryData = {
//         page: 0,
//         rowsPerPage: rowsPerPage,
//         order: order,
//         orderBy: orderBy,
//         query: filterQuery
//     }


//     const requestData = {
//         page: page,
//         limit: rowsPerPage,
//         order: order,
//         orderBy: orderBy,
//         query: filterQuery
//     }
//     const hasMore = getCategoryList(requestData, setLoading, setCategoriesList)
//     const observer = useRef();
//     const lastItemRef = useCallback(item => {
//         if (loading) return;

//         if (observer.current) observer.current.disconnect();
//         observer.current = new IntersectionObserver(entries => {
//             if (entries[0].isIntersecting && hasMore) {
//                 setPage(prevPageNumber => {
//                     return prevPageNumber > 0 ? prevPageNumber + 1 : prevPageNumber + 2
//                 })
//             }
//         })
//         if (item) observer.current.observe(item);
//     }, [loading, hasMore]);

//     const { TblContainer } = Tables.AdminTable(categoriesList, headCells);

//     const resetPageCount = () => {
//         setPage(prevPageNumber => {
//             return prevPageNumber > 0 ? 0 : 1;
//         });
//         setFilterQuery(queryData.query);
//     }

//     /**
// * Faz o tratamento do evento de quando o usuário troca a ordenação da tabela
// * @param {string} cellId id da coluna na qual a célula que foi clica está contida
// * @return  {void}
// */
//     const handleSortRequest = cellId => {
//         const isAsc = orderBy === cellId && order === "asc"
//         const orderType = isAsc ? 'desc' : 'asc'
//         setOrder(orderType)
//         setOrderBy(cellId)
//         resetPageCount();
//     }

//     const [openModal, setOpenModal] = useState(false);

//     const handleModalOpen = () => {
//         setOpenModal(true);
//     };
//     const handleModalClose = () => {
//         setOpenModal(false);
//     };
//     const handleEditCategory = (data, type) => {
//         setTypeEdit(type);
//         setEditCategory(data);
//         handleModalOpen();
//     };
//     const handleAddCategory = (type) => {
//         setTypeEdit(type);
//         setEditCategory([]);
//         handleModalOpen();
//     };
//     const handleDeleteCategory = (data, type) => {
//         setTypeEdit(type);
//         setEditCategory(data);
//         handleModalOpen();
//     }
//     const handleOpenErrorAlert = (message) => {
//         setMessageSnackbar(message);
//         setSnackbarColor("error");
//         setOpenSnackbar(true);
//     };
//     const handleOpenSuccess = (message) => {
//         setMessageSnackbar(message);
//         setSnackbarColor("success");
//         setOpenSnackbar(true);
//         resetPageCount();
//     };


//     const handleCloseErrorAlert = (event, reason) => {
//         if (reason === 'clickaway') {
//             return;
//         }
//         setOpenSnackbar(false);
//     };


//     /**
// * Faz o tratamento do evento de quando o usuário abre um modal para fazer alguma operação naquela listagem
// * @return  {Component} Retorna o modal na qual o usuário deseja utilizar
// */
//     const modalComponent = () => {
//         switch (typeEdit) {
//             case categoryTypeEdit.edit: return <FormCategory modalClose={handleModalClose} modalData={editCategory} error={handleOpenErrorAlert} success={handleOpenSuccess} />;
//             case categoryTypeEdit.add: return <FormCategory modalClose={handleModalClose} modalData={editCategory} error={handleOpenErrorAlert} success={handleOpenSuccess} />;
//             case categoryTypeEdit.associate: return <FormCategoriesStores modalClose={handleModalClose} associationOrigin={'categories'} associationData={storesList} formData={editCategory} error={handleOpenErrorAlert} success={handleOpenSuccess} />;
//             case categoryTypeEdit.delete: return <Delete modalClose={handleModalClose} modalData={editCategory} modalText={{ message: "Deseja mesmo deletar a", type: "categoria" }} success={handleOpenSuccess} error={handleOpenErrorAlert} />;
//         }
//     };


//     const SetDialogTitle = (props) => {
//         const classes = useStyles();
//         const { children, onClose, ...other } = props;
//         return (
//             <DialogTitle disableTypography className={classes.dialogTitle} {...other}>
//                 <Typography variant="h6">{children}</Typography>
//                 {onClose ? (
//                     <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
//                         <CloseIcon />
//                     </IconButton>
//                 ) : null}
//             </DialogTitle>
//         );
//     };

//     return (
//         <>
//             {loading && (!categoriesList.length > 0) ? <div className="loader">
//                 <Loader />
//             </div> :
//                 <div>
//                     <Grid
//                         className={classes.grid}
//                         container
//                         direction="row"
//                         justify="space-between"
//                         alignItems="center"

//                     >
//                         <Filter filterType={filterTypeEnum.categories} submitFilter={setFilterQuery} setPage={setPage} filterQuery={filterQuery.query ? filterQuery.query : filterQuery} />
//                         <Button variant="contained" color="primary" onClick={() => { handleAddCategory(categoryTypeEdit.add) }}>
//                             Adicionar Categoria
//                         </Button>
//                     </Grid>
//                     <TblContainer>
//                         <TableHead>
//                             <TableRow>
//                                 {headCells.map(headCell => (
//                                     <TableCell
//                                         key={headCell.id}
//                                         sortDirection={orderBy === headCell.id ? order : false}
//                                     >
//                                         {headCell.disableSorting ? headCell.label :
//                                             <TableSortLabel
//                                                 active={orderBy === headCell.id}
//                                                 direction={orderBy === headCell.id ? order : 'asc'}
//                                                 onClick={() => handleSortRequest(headCell.id)}
//                                             >
//                                                 {headCell.label}
//                                             </TableSortLabel>

//                                         }
//                                     </TableCell>
//                                 ))}
//                             </TableRow>
//                         </TableHead>
//                         <TableBody>
//                             {
//                                 categoriesList.map((category, index) => {
//                                     if (categoriesList.length === index + 1) {
//                                         return <TableRow key={category.id} ref={lastItemRef}>

//                                             <TableCell onClick={() => editOnRowClick(category, categoryTypeEdit.edit, handleEditCategory)}>{category.order}</TableCell>
//                                             <TableCell onClick={() => editOnRowClick(category, categoryTypeEdit.edit, handleEditCategory)}>{category.name}</TableCell>
//                                             <TableCell onClick={() => editOnRowClick(category, categoryTypeEdit.edit, handleEditCategory)}><FiberManualRecordIcon style={{ color: category.isActive ? '#118B09' : '#DF0000' }} /></TableCell>
//                                             <TableCell className={classes.tableButtons}>
//                                                 <Tooltip title={categoryTypeEdit.associate}>
//                                                     <IconButton edge="end" aria-label="edit" onClick={() => { handleEditCategory(category, categoryTypeEdit.associate) }}>
//                                                         <QueueIcon />
//                                                     </IconButton>
//                                                 </Tooltip>
//                                                 <Tooltip title={categoryTypeEdit.edit}>
//                                                     <IconButton edge="end" aria-label="edit" onClick={() => { handleEditCategory(category, categoryTypeEdit.edit) }}>
//                                                         <EditIcon />
//                                                     </IconButton>
//                                                 </Tooltip>
//                                                 <Tooltip title={categoryTypeEdit.delete}>
//                                                     <IconButton edge="end" aria-label="delete" onClick={() => { handleDeleteCategory(category, categoryTypeEdit.delete) }}>
//                                                         <DeleteIcon />
//                                                     </IconButton>
//                                                 </Tooltip>
//                                             </TableCell>
//                                         </TableRow>
//                                     }
//                                     else {
//                                         return <TableRow key={category.id}>

//                                             <TableCell onClick={() => editOnRowClick(category, categoryTypeEdit.edit, handleEditCategory)}>{category.order}</TableCell>
//                                             <TableCell onClick={() => editOnRowClick(category, categoryTypeEdit.edit, handleEditCategory)}>{category.name}</TableCell>
//                                             <TableCell onClick={() => editOnRowClick(category, categoryTypeEdit.edit, handleEditCategory)}><FiberManualRecordIcon style={{ color: category.isActive ? '#118B09' : '#DF0000' }} /></TableCell>
//                                             <TableCell className={classes.tableButtons}>
//                                                 <Tooltip title={categoryTypeEdit.associate}>
//                                                     <IconButton edge="end" aria-label="edit" onClick={() => { handleEditCategory(category, categoryTypeEdit.associate) }}>
//                                                         <QueueIcon />
//                                                     </IconButton>
//                                                 </Tooltip>
//                                                 <Tooltip title={categoryTypeEdit.edit}>
//                                                     <IconButton edge="end" aria-label="edit" onClick={() => { handleEditCategory(category, categoryTypeEdit.edit) }}>
//                                                         <EditIcon />
//                                                     </IconButton>
//                                                 </Tooltip>
//                                                 <Tooltip title={categoryTypeEdit.delete}>
//                                                     <IconButton edge="end" aria-label="delete" onClick={() => { handleDeleteCategory(category, categoryTypeEdit.delete) }}>
//                                                         <DeleteIcon />
//                                                     </IconButton>
//                                                 </Tooltip>
//                                             </TableCell>
//                                         </TableRow>
//                                     }
//                                 }

//                                 )
//                             }
//                         </TableBody>
//                     </TblContainer>
//                 </div>
//             }
//             {loading && categoriesList.length > 0 ? <div className="loader">
//                 <Loader />
//             </div> : ''}

//             <Dialog onClose={handleModalClose} aria-labelledby="customized-dialog-title" open={openModal}>
//                 <SetDialogTitle id="customized-dialog-title" onClose={handleModalClose}>
//                     {typeEdit}
//                 </SetDialogTitle>
//                 {modalComponent()}
//             </Dialog>

//             <Snackbar open={openSnackbar} autoHideDuration={5000} onClose={handleCloseErrorAlert}>
//                 <Alert onClose={handleCloseErrorAlert} severity={snackbarColor}>
//                     {messageSnackbar}
//                 </Alert>
//             </Snackbar>
//         </>
//     )
// }


import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import FolderIcon from '@mui/icons-material/Folder';
import DeleteIcon from '@mui/icons-material/Delete';

function generate(element) {
    return [0, 1, 2].map((value) =>
        React.cloneElement(element, {
            key: value,
        }),
    );
}

const Demo = styled('div')(({ theme }) => ({
    backgroundColor: theme.palette.background.paper,
}));

const ReviewsList = (props) => {
    const [dense, setDense] = React.useState(false);
    const [secondary, setSecondary] = React.useState(false);

    return (
        <Box sx={{ flexGrow: 1, maxWidth: 752 }}>
            <FormGroup row>
                <FormControlLabel
                    control={
                        <Checkbox
                            checked={dense}
                            onChange={(event) => setDense(event.target.checked)}
                        />
                    }
                    label="Enable dense"
                />
                <FormControlLabel
                    control={
                        <Checkbox
                            checked={secondary}
                            onChange={(event) => setSecondary(event.target.checked)}
                        />
                    }
                    label="Enable secondary text"
                />
            </FormGroup>

            <Grid container spacing={2}>

                <Grid item xs={12} md={6}>
                    <Typography sx={{ mt: 4, mb: 2 }} variant="h6" component="div">
                        Avatar with text and icon
                    </Typography>
                    <Demo>
                        <List dense={dense}>
                            {generate(
                                <ListItem
                                    secondaryAction={
                                        <IconButton edge="end" aria-label="delete">
                                            <DeleteIcon />
                                        </IconButton>
                                    }
                                >
                                    <ListItemAvatar>
                                        <Avatar>
                                            <FolderIcon />
                                        </Avatar>
                                    </ListItemAvatar>
                                    <ListItemText
                                        primary="Single-line item"
                                        secondary={secondary ? 'Secondary text' : null}
                                    />
                                </ListItem>,
                            )}
                        </List>
                    </Demo>
                </Grid>
            </Grid>
        </Box>
    );
}

export default ReviewsList;