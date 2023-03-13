import React, { useState } from 'react'
import { Box, Avatar, TextField, Button, Typography, Link, Snackbar } from "@mui/material"
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import { useNavigate } from "react-router-dom"
import axios from 'axios'
import MuiAlert from '@mui/material/Alert';
const Signup = () => {
    const navigate = useNavigate();
    const [userData, setUserData] = useState({ fName: "", lName: "", email: "", password: "", secretKey: "", userType: "User" });

    const handleOnChange = (e, key) => {
        const data = { ...userData };
        data[key] = e.target.value;
        setUserData(data);
    }
    const signup = async (e, res) => {
        if (userData.userType == "Admin" && userData.secretKey != "Admin") {
            e.preventDefault();
            alert("Invalid Secret key");
            setUserData({ fName: "", lName: "", email: "", password: "", secretKey: "" });
        } else {
            e.preventDefault();
            await axios.post("http://localhost:8000/api/auth/signup", JSON.stringify({ ...userData }), {
                headers: {
                    "Content-Type": "application/json",
                    'Access-Control-Allow-Origin': '*'
                }
            })
                .then(
                    navigate("/login")
                )
                .catch(handleClick());
            setUserData({ fName: "", lName: "", email: "", password: "", secretKey: "" });
        }
        // await axios.post("http://localhost:8000/api/auth/signup", JSON.stringify({ ...userData }), {
        
    }
    return (
        <div>
            <form onSubmit={signup}>
                <Box
                    display="flex"
                    flexDirection={"column"}
                    maxWidth={400}
                    height={600}
                    alignItems="center"
                    justifyContent={"center"}
                    margin="auto"
                    marginTop={10}
                    padding={3}
                    borderRadius={5}
                    boxShadow={"5px 5px 10px #ccc"}
                    sx={{
                        ":hover": {
                            boxShadow: "10px 10px 20px #ccc"
                        },
                    }}>
                    <Avatar sx={{ backgroundColor: "#1bbd7e" }}><LockOutlinedIcon /></Avatar>
                    <Typography variant='h4' color="#057dcd" padding={3} textAlign="center">Sign Up</Typography>
                    <Box sx={{ display: "flex", width: 250, justifyContent: "space-between" }}>
                        Register_As
                        <input checked={userData.userType == "User" ? true : false} type="radio" name="UserType" value="User" onChange={(e) => handleOnChange(e, "userType")} />
                        User
                        <input type="radio" name="UserType" value="Admin" onChange={(e) => handleOnChange(e, "userType")} />
                        Admin
                    </Box>
                    {userData.userType == "Admin" ? (
                        <TextField
                            id="standard-password-input"
                            label="Secret Key"
                            type="text"
                            variant="standard"
                            autoComplete='off'
                            fullWidth required
                            margin="normal"
                            value={userData.secretKey}
                            onChange={(e) => handleOnChange(e, "secretKey")}
                        />) : null}

                    <TextField
                        id="standard-password-input"
                        label="First Name"
                        type="text"
                        variant="standard"
                        autoComplete='off'
                        fullWidth required
                        margin="normal"
                        value={userData.fName}
                        onChange={(e) => handleOnChange(e, "fName")}
                    />
                    <TextField
                        id="standard-password-input"
                        label="Last Name"
                        type="text"
                        variant="standard"
                        autoComplete='off'
                        fullWidth required
                        margin="normal"
                        value={userData.lName}
                        onChange={(e) => handleOnChange(e, "lName")}
                    />
                    <TextField
                        id="standard-password-input"
                        label="Email"
                        type="email"
                        variant="standard"
                        autoComplete='off'
                        fullWidth required
                        margin="normal"
                        value={userData.email}
                        onChange={(e) => handleOnChange(e, "email")}
                    />
                    <TextField
                        id="standard-password-input"
                        label="Password"
                        type="password"
                        variant="standard"
                        fullWidth required
                        margin="normal"
                        value={userData.password}
                        onChange={(e) => handleOnChange(e, "password")}
                    />
                    <Button sx={{ marginTop: 3, borderRadius: 3 }} type="submit" variant="contained" fullWidth>Sign up</Button>
                    <Link sx={{ marginTop: 3 }} href="/login" variant="body2" >
                        Already have an account? Sign in
                    </Link>
                </Box>
            </form>
        </div >
    )
}

export default Signup
