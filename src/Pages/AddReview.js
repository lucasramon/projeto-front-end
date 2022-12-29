// import React, { useState, useEffect, useCallback } from 'react';
// import { makeStyles, withStyles, Box, Button, FormGroup, FormControlLabel, Switch, Snackbar } from '@material-ui/core';
// import { editCategory } from '../../services/Marketplace/';
// import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
// import MuiDialogContent from '@material-ui/core/DialogContent';
// import MuiDialogActions from '@material-ui/core/DialogActions';
// import MuiAlert from '@material-ui/lab/Alert';
// import { ImgUploader } from '../../components/ImgUploader/ImgUploader';

// const useStyles = makeStyles((theme) => ({
//     closeButton: {
//         position: 'absolute',
//         right: 8,
//         top: 8,
//         color: theme.palette.grey[500],
//     },
//     modalContent: {
//         width: 450,
//     },

//     formInput: {
//         width: 450,
//         marginBottom: 10,
//     },
//     imageUpload: {
//         maxWidth: 450,
//         marginBottom: 10,
//     },

//     formHeight: {
//         height: 'fit-content',
//     },
//     formInputRow2: {
//         width: 200,
//         marginRight: 10,
//     }
// }));

// const DialogContent = withStyles((theme) => ({
//     root: {
//         padding: theme.spacing(2),
//     },
// }))(MuiDialogContent);

// const DialogActions = withStyles((theme) => ({
//     root: {
//         margin: 0,
//         padding: theme.spacing(1),
//     },
// }))(MuiDialogActions);

// function Alert(props) {
//     return <MuiAlert elevation={6} variant="filled" {...props} />;
// }

// /**
//  * Componente para gerar o modal de formulário de categorias.
//  *
//  *  @component
//  * @param   {props} modalClose   Método para tratar o evento de fechar o modal de formulário.
//  * @param   {props} modalData  Dados que serão mostrados do modal em caso de edição de uma categoria.
//  * @param   {props} success   Método para tratar o evento de sucesso da operação de adição ou edição de uma categoria.
//  */


// export const FormCategory = (props) => {
//     const classes = useStyles();
//     const { modalClose, modalData, success } = props


//     /**
// * Atribui os dados vindos do props de modalData, caso não venha nenhum dado, são inseridos dados default no formulário
// * @return  {void}
// */
//     const setDefaultData = useCallback(async () => {
//         try {
//             if (modalData.length != 0) {
//                 setCategorydata(modalData);
//             } else {
//                 setCategorydata({
//                     id: "",
//                     isActive: false,
//                     name: "",
//                     thumbnail: "",
//                     order: 0
//                 });
//             }
//         } catch (error) {
//             console.log(error);
//         } finally {
//         }
//     }, [])

//     useEffect(() => {
//         numberCustomValidator()
//         setDefaultData()
//     }, [setDefaultData])

//     const [openSnackbar, setOpenSnackbar] = React.useState(false);
//     const [messageSnackbar, setMessageSnackbar] = useState("");
//     const [fileImg, setFileImg] = useState();
//     const [submitDisabled, setSubmitDisabled] = useState(false);

//     const [categoryData, setCategorydata] = useState([{
//         id: "",
//         isActive: false,
//         name: "",
//         thumbnail: "",
//         order: 0
//     }]);

//     /**
// * Faz a alteração no estado da propriedade "Ativo" no formulário
// * @param   {Event} e  Evento de clique no switch da propriedade especificada
// * @return  {void}
// */
//     const switchCategoriesChange = (e) => {
//         const { name, checked } = e.target;
//         setCategorydata(prevState => ({
//             ...prevState,
//             [name]: checked
//         }));
//     }

//     /**
// * Faz a alteração nos estados das propriedades "Nome" e "Ordem" no formulário
// * @param   {Event} e  Evento de mudança de valor nas propriedades citadas
// * @return  {void}
// */
//     const valueChange = (e) => {
//         const { name, value } = e.target;
//         if (name === "order" && value > 9999999) return;
//         setCategorydata(prevState => ({
//             ...prevState,
//             [name]: value
//         }));
//     }

//     /**
// * Checa se foi coloca um input válido no campo numérico do formulário
// * @param   {Event} e  Evento de mudança de valor na propriedade citada
// * @return  {boolean} a informação se o valor digitado é válido ou não
// */
//     const checkIfNumberInputIsValid = (e) => {
//         if (e.target.value > 0 && e.key === "0") return false;
//         return (['e', 'E', '+', '-', '0', ',', '.'].includes(e.key) && e.preventDefault());
//     }

//     /**
// * Função de validação customizada para checar se o input tem algum número
// * @return  {void} 
// */
//     const numberCustomValidator = () =>
//         ValidatorForm.addValidationRule('doesItHaveNumber', (value) => {
//             if (value) {
//                 return isNaN(value)
//             }
//             return true
//         });

//     /**
// * Função para tratar o evento de clicar no botão de fechar o modal
// * @return  {void} 
// */
//     const closeButton = () => {
//         modalClose();
//         setCategorydata([]);
//     }

//     const handleCloseErrorAlert = (event, reason) => {
//         if (reason === 'clickaway') {
//             return;
//         }
//         setOpenSnackbar(false);
//     };

//     /**
// * Função para tratar o evento de clicar no botão de enviar o formulário
// * @return  {void} 
// */
//     const onSubmit = async () => {

//         setSubmitDisabled(true);
//         const formData = new FormData();
//         if (fileImg != null) {
//             formData.append('file', fileImg);
//         }
//         formData.append('thumbnail', categoryData.thumbnail ? categoryData.thumbnail : '');
//         formData.append('isActive', categoryData.isActive);
//         formData.append('name', categoryData.name);
//         formData.append('order', categoryData.order);

//         const response = await editCategory(formData, categoryData.id);

//         if (response.status === 200 || response.status === 201) {

//             if (!categoryData.id) {
//                 success("A Categoria foi adicionada.");
//             } else {
//                 success("A Categoria foi editada.");
//             }
//             modalClose();
//         } else {
//             setOpenSnackbar(true);

//             if (response.status === 415 || response.status === 413 || response.status === 406) {
//                 setMessageSnackbar(`Não foi possível salvar os dados! ${response.message}.`);
//             }
//             else {
//                 setMessageSnackbar("Não foi possível salvar os dados! Por favor tente novamente mais tarde.");
//             }
//         }
//         setSubmitDisabled(false);
//     }



//     return (
//         <>
//             <ValidatorForm onSubmit={onSubmit} >
//                 <DialogContent dividers className={classes.formHeight}>
//                     <Box className={classes.modalContent}>

//                         <TextValidator
//                             id="name"
//                             label="Nome"
//                             variant="outlined"
//                             name="name"
//                             className={classes.formInput}
//                             value={categoryData.name ? categoryData.name : ''}
//                             onChange={valueChange}
//                             validators={['required', 'doesItHaveNumber']}
//                             errorMessages={['Por favor digite o nome da Categoria.', 'Campo Nome não pode conter apenas Números.']}
//                         />
//                         <TextValidator
//                             className={classes.formInput}
//                             id="order"
//                             label="Ordem"
//                             type="number"
//                             variant="outlined"
//                             name="order"
//                             onKeyDown={checkIfNumberInputIsValid}
//                             value={categoryData.order ? categoryData.order : ''}
//                             onChange={valueChange}
//                             validators={['required']}
//                             errorMessages={['Por favor digite a ordem da Categoria.']}
//                         />

//                         <ImgUploader thumbnail={categoryData.thumbnail} setData={setCategorydata} setImgFile={setFileImg}
//                             setMessageSnackbar={setMessageSnackbar}
//                             setOpenSnackbar={setOpenSnackbar}

//                             uploaderOrigin={"categories"}
//                         />


//                         <FormGroup row className={classes.formInput}>
//                             <FormControlLabel
//                                 control={
//                                     <Switch
//                                         checked={categoryData.isActive ? categoryData.isActive : false}
//                                         onChange={switchCategoriesChange}
//                                         name="isActive"
//                                         color="primary"
//                                     />
//                                 }
//                                 label="Ativo"
//                             />
//                         </FormGroup>
//                     </Box >
//                 </DialogContent>
//                 <DialogActions>
//                     <Button onClick={closeButton} color="primary">
//                         Cancelar
//                     </Button>
//                     <Button disabled={submitDisabled} type="submit" color="primary">
//                         Salvar
//                     </Button>
//                 </DialogActions>
//             </ValidatorForm>
//             <Snackbar
//                 open={openSnackbar}
//                 anchorOrigin={{
//                     vertical: 'top',
//                     horizontal: 'center',
//                 }}
//                 onClose={handleCloseErrorAlert}>
//                 <Alert onClose={handleCloseErrorAlert} severity="warning">
//                     {messageSnackbar}
//                 </Alert>
//             </Snackbar>
//         </>
//     )

// }
import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default AddReview = () => {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <Button variant="outlined" onClick={handleClickOpen}>
                Open form dialog
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Subscribe</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        To subscribe to this website, please enter your email address here. We
                        will send updates occasionally.
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Email Address"
                        type="email"
                        fullWidth
                        variant="standard"
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleClose}>Subscribe</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}