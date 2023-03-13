import React, { useEffect } from 'react'
import { useState } from 'react';
import { Box, Button, Select, MenuItem, TextField,Snackbar } from "@mui/material";
import InputAdornment from '@mui/material/InputAdornment';
import SendIcon from '@mui/icons-material/Send';
import CloseIcon from '@mui/icons-material/Close';
import MuiAlert from '@mui/material/Alert';
import axios from 'axios';
const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
const Assigntask = () => {

    const [assignTask, setAssignTask] = useState({ email: "", title: "", task: "", endDate: "", startDate: "" });
    const [users, setUsers] = useState("");
    const [open, setOpen] = useState(false);

    const handleClick = () => {
        setOpen(true);
      };

      const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
    
        setOpen(false);
      };

    const handleOnChange = (e, key) => {
        const task = { ...assignTask };
        task[key] = e.target.value;
        task.startDate = new Date().toDateString();
        setAssignTask(task);
    }
    const cancleHandle = (e) => {
        setAssignTask({ email: "", title: "", task: "", endDate: "", startDate: "" });
    }
    const sendHandle = async () => {
       await axios.post("http://localhost:8000/api/task/createTask", { ...assignTask });
        setAssignTask({ email: "", title: "", task: "", endDate: "", startDate: "" });
       
    }
    const getEmails = async () => {
        try {
            const user = await axios.get("http://localhost:8000/api/user/userinfo");
            setUsers(user.data);
        } catch (err) {
            console.log(err);
        }
    }
    useEffect(() => {
        getEmails();
    }, [])
    const boxStyle = {
        width: "100vw",
        height: "91.7vh",
        marginLeft: "2px",
        marginTop: "2px",
    }
    return (
        <Box style={boxStyle}>
            <Box sx={{
                border: "2px solid black", ml: "7vw", mt: "11vh", width: "70vw", height: "70vh",
                boxShadow: "rgba(6, 24, 44, 0.4) 0px 0px 0px 2px, rgba(6, 24, 44, 0.65) 0px 4px 6px -1px, rgba(255, 255, 255, 0.08) 0px 1px 0px inset"
            }}>

                <TextField onChange={(e) => handleOnChange(e, "email")} value={assignTask.email} id="outlined-basic" type="email" label="Email" variant="outlined" sx={{ ml: "1vw", mt: "3vh", width: "30vw" }} />
                <TextField onChange={(e) => handleOnChange(e, "title")} value={assignTask.title} id="outlined-basic" type="text" label="Title" variant="outlined" sx={{ ml: "3vw", mt: "3vh", width: "30vw" }} />
                <Box>
                    <TextField onChange={(e) => handleOnChange(e, "task")} value={assignTask.task} id="outlined-basic" placeholder='Please describe task...' type="text" variant="outlined" multiline rows={13} sx={{ width: "63vw", ml: "15px", mt: "5vh", color: "black" }} />
                </Box>
                <Box sx={{ display: "flex", justifyContent: "space-between", width: "90%", mt: "3vh", ml: "4vw" }}>
                    <TextField
                        label="End Date"
                        id="outlined-start-adornment"
                        type="date"
                        value={assignTask.endDate}
                        sx={{ m: 1, width: '25ch' }}
                        onChange={(e) => handleOnChange(e, "endDate")}
                        InputProps={{
                            startAdornment: <InputAdornment position="start"></InputAdornment>,
                        }}

                    />
                    <Box sx={{ display: "flex", justifyContent: "space-between", width: "250px", alignItems: "center" }}>
                        <Button onClick={(e) => { cancleHandle() }} variant="contained" sx={{ backgroundColor: "#003f5c", height: "50px" }} endIcon={<CloseIcon />}>
                            Cancle
                        </Button>

                        <Button onClick={sendHandle} variant="contained" sx={{ backgroundColor: "#003f5c", height: "50px" }} endIcon={<SendIcon />}>
                            Send
                        </Button>
                    </Box>
                </Box>
            </Box>
            <Snackbar open={open} autoHideDuration={2000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                    Task created successful 
                </Alert>
            </Snackbar>
        </Box>
    )
}

export default Assigntask
