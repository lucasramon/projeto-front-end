import { Button, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";
import LoginOutlinedIcon from '@mui/icons-material/LoginOutlined';
import HowToRegOutlinedIcon from '@mui/icons-material/HowToRegOutlined';
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/auth";

const Login = () => {
    const [isSignup, setIsSignup] = useState(false);
    const [input, setInput] = useState({
        name: '',
        email: '',
        password: ''
    })
    const navigate = useNavigate();
    const { login, signUp } = useAuth();

    const handleChanges = (e) => {
        setInput((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value
        }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = isSignup ? await signUp(input.email, input.name, input.password) : await login(input.email, input.password);
        if (data && !isSignup) {
            navigate("/dashboard");
        }
    }
    const resetState = () => {
        setIsSignup(!isSignup)
        setInput({
            name: '',
            email: '',
            password: ''
        })
    }
    return (

        <div>
            <form onSubmit={handleSubmit}>
                <Box display="flex"
                    flexDirection={"column"}
                    maxWidth={400}
                    alignItems="center"
                    justifyContent={"center"}
                    margin="auto"
                    marginTop={5}
                    padding={3}
                    borderRadius={5}
                    boxShadow={"5px 5px 10px #ccc"}
                    sx={{
                        ":hover": {
                            boxShadow: "10px 10px 20px #ccc"
                        },
                    }}
                >


                    <Typography variant="h2" padding={3} textAlign="center">
                        Login
                    </Typography>

                    {isSignup && (<TextField
                        name="name"
                        onChange={handleChanges}
                        value={input.name}
                        margin='normal'
                        type={'text'}
                        variant="outlined"
                        placeholder="Nome" />)}

                    <TextField
                        name="email"
                        onChange={handleChanges}
                        value={input.email}
                        margin='normal'
                        type={'email'}
                        variant="outlined"
                        placeholder="Email" />

                    <TextField
                        name="password"
                        onChange={handleChanges}
                        value={input.password}
                        margin='normal'
                        type={'password'}
                        variant="outlined"
                        placeholder="Senha" />

                    <Button
                        endIcon={isSignup ? <HowToRegOutlinedIcon /> : <LoginOutlinedIcon />}
                        type="submit"
                        sx={{ marginTop: 3, borderRadius: 3 }}
                        variant="contained"
                        color="warning">{isSignup ? 'Cadastrar' : 'Login'}
                    </Button>

                    <Button
                        onClick={resetState}
                        sx={{ marginTop: 3, borderRadius: 3 }}>
                        {isSignup ? 'Voltar para login' : 'Cadastre-se'}
                    </Button>

                </Box>
            </form>
        </div>
    );
}

export default Login;