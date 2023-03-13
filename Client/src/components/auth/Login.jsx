import React, { useContext, useState } from 'react'
import { Box, Avatar, TextField, Button, Typography, Link, Snackbar } from "@mui/material"
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import axios from 'axios';
import { useNavigate } from "react-router-dom"
import loginContext from '../../context/login/loginContext';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Login = () => {
    const navigate = useNavigate();
    const user = useContext(loginContext);  //user => {email:"",setEmail(),password:"",setPassword()};
    
    const login = async (e) => {
        e.preventDefault();
        const userData = await axios({
            method: 'post',
            url: 'http://localhost:8000/api/auth/login',
            data: {
                email: user.email,
                password: user.password
            }
        });
        if (userData) {
            localStorage.setItem("user", JSON.stringify(userData.data.user));
            localStorage.setItem("token", JSON.stringify(userData.data.token));
            user.setEmail("");
            user.setPassword("");
            navigate("/");
        }
       
    }

    return (
        <div>
            <form onSubmit={login}>
                <Box
                    display="flex"
                    flexDirection={"column"}
                    maxWidth={400}
                    height={500}
                    alignItems="center"
                    justifyContent={"center"}
                    margin="auto"
                    marginTop={15}
                    padding={3}
                    borderRadius={5}
                    boxShadow={"5px 5px 10px #ccc"}
                    sx={{
                        ":hover": {
                            boxShadow: "10px 10px 20px #ccc"
                        },
                    }}
                >
                    <Avatar sx={{ backgroundColor: "#1bbd7e" }}><LockOutlinedIcon /></Avatar>
                    <Typography variant='h4' color="#057dcd" padding={3} textAlign="center">Login</Typography>
                    <TextField
                        id="standard-password-input"
                        label="Email"
                        type="email"
                        variant="standard"
                        autoComplete='off'
                        fullWidth required
                        value={user.email}
                        margin="normal"
                        onChange={(e) => user.setEmail(e.target.value)}
                    />
                    <TextField
                        id="standard-password-input"
                        label="Password"
                        type="password"
                        variant="standard"
                        fullWidth required
                        margin="normal"
                        value={user.password}
                        onChange={(e) => user.setPassword(e.target.value)}
                    />
                    <Button sx={{ marginTop: 3, borderRadius: 3 }} type="submit" variant="contained" fullWidth>Login</Button>
                    <Link sx={{ marginTop: 3 }} href="/signup" variant="body2">
                        {"Don't have an account? Sign Up"}
                    </Link>
                </Box>
            </form>
           
        </div>
    )
}


export default Login
