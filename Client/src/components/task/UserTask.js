import React, { useState, useEffect } from 'react'
import { Box, Typography, Paper, IconButton, Collapse } from "@mui/material";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import axios from 'axios';
import Status from '../status/Status';

const userTask = () => {
  const [open, setOpen] = useState([false]);
  const [userData, setUserData] = useState([]);
  const [status, setStatus] = useState("");
  const user = JSON.parse(localStorage.getItem("user")).email;

  const task = async () => {
    const currentUserTasks = (await axios.get("http://localhost:8000/api/task/usertask")).data;
    const info = currentUserTasks.filter((value) => value.email == user);
    const accordionArray = new Array(info.length).fill(false);
    setUserData(info);
    setOpen(accordionArray);

    // setUserData(info);
    return info;
  }
  const changeOpen = (index)=>{
    setOpen((prev)=>{
      const newState = [...prev];
      newState[index] = !prev[index];
      return newState;
    })
  }

  const handleChange = async (e, id) => {
    let status = e.target.value;
      await axios.put("http://localhost:8000/api/task/updatestatus", { status, id })
      setStatus(e.target.value);
  }
  useEffect(() => {
   task();
  //  const accordionArray = new Array(taskArray.length).fill(false);
  //  setUserData(taskArray);
  //  setOpen(accordionArray);
  }, [])

  const boxStyle = {
    width: "100vw",
    height: "91.7vh",
    backgroundColor: "#d1dbe4",
    marginLeft: "2px",
    marginTop: "2px",
  }

  return (
    <Box style={boxStyle}>
      <Typography variant="h5" sx={{ ml: 15, mt: 2 }} component="h2">
        My Tasks
      </Typography>
      <Box sx={{
        border: "2px solid black", ml: "7vw", mt: "5vh", width: "70vw", height: "80vh", overflow: "auto",
        boxShadow: "rgba(6, 24, 44, 0.4) 0px 0px 0px 2px, rgba(6, 24, 44, 0.65) 0px 4px 6px -1px, rgba(255, 255, 255, 0.08) 0px 1px 0px inset"
      }}>

        {userData.map((value, index) => {
          return (
    
            <Box key={value._id} sx={{ textAlign: "left", p: 1 }}>
              <Paper sx={{ backgroundColor: "white", width: "100%", height: "60px", display: "flex", alignItems: "center" }} elivation={10} >
                <IconButton
                  aria-label="expand row"
                  size="small"
                  sx={{ color: "white", mr: 5 }}
                  onClick={() => changeOpen(index)}
                >
                  {open[index] ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                </IconButton>
                <Box sx={{ display: "flex", justifyContent: "space-between", width: "100%", pl: 10, pr: 2 }}>
                  <Typography sx={{ fontSize: "22px" }} >{value.title}</Typography>

                  <select
                    style={{ width: "200px", fontSize: "16px" }}
                    onChange={(e) => { handleChange(e, value._id) }}
                  >
                    {value.status == "Complete" ? (
                      <option value="Complete">Complete</option>) : (<><option value="Pending" >Pending</option>
                      <option value="Complete">Complete</option></>)
                    }
                    {/* <option value="Pending" >{value.status}</option>
                    <option value="Complete">{value.status}</option> */}

                  </select>
                  <Typography sx={{ fontSize: "22px" }} >ETA {value.endDate}</Typography>
                </Box>
              </Paper>
              <Collapse in={open[index]} timeout="auto" unmountOnExit>
                <Box sx={{ width: "100%-2", backgroundColor: "white", mt: 0.3, height: "120px", p: 2, overflow: "hidden" }}>
                  <p sx={{ fontWeight: '200px' }}> {value.task}</p>
                </Box>
              </Collapse>
            </Box>)
        })}
      </Box>
    </Box >
  )
}
export default userTask
