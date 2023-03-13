import React, { useEffect, useState } from 'react'
import { Box, Typography, IconButton, Collapse, Paper } from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import axios from 'axios';

const Status = () => {
    const [allTask, setAllTask] = useState([]);
    const [open, setOpen] = useState([false]);
    const task = async () => {
        const userTasks = (await axios.get("http://localhost:8000/api/task/alltasks")).data;
        const accordionArray = new Array(userTasks.length).fill(false);
        setAllTask(userTasks);
        setOpen(accordionArray);
        return userTasks
        // setAllTask(userTasks);
    }
    const changeOpen = (index)=>{
      setOpen((prev)=>{
        const newState = [...prev];
        newState[index] = !prev[index];
        return newState;
      })
    }
    // task();
    useEffect(() => {
      task();
      // const taskArray = await task();
      // const accordionArray = new Array(taskArray.length).fill(false);
      // setAllTask(taskArray);
      // setOpen(accordionArray);
    }, []);
    const boxStyle = {
        width: "100vw",
        height: "91.7vh",
        backgroundColor: "white", //#3cc2d6
        marginLeft: "2px",
        marginTop: "2px",
    }
    return (
        <Box style={boxStyle}>
      <Typography variant="h5" sx={{ ml: 15, mt: 2 }} component="h2">
        Status
      </Typography>
      <Box sx={{
        border: "2px solid black", ml: "7vw", mt: "5vh", width: "70vw", height: "80vh", overflow: "auto",
        boxShadow: "rgba(6, 24, 44, 0.4) 0px 0px 0px 2px, rgba(6, 24, 44, 0.65) 0px 4px 6px -1px, rgba(255, 255, 255, 0.08) 0px 1px 0px inset"
      }}>

        {allTask.map((value,index) => {
          return (
            <Box key={value._id} sx={{ textAlign: "left", p: 1 }}>
              <Paper sx={{ backgroundColor: "#254e6c",color:"white", width: "100%", height: "60px", display: "flex", alignItems: "center" }} elivation={10} >
                <IconButton
                  aria-label="expand row"
                  size="small"
                  sx={{ color: "white", mr: 5 }}
                  onClick={() => changeOpen(index)}
                >
                  {open[index] ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                </IconButton>
                <Box sx={{ display: "flex",justifyContent: "space-between", width: "100%" }}>
                <Typography sx={{ fontSize: "18px" }} >{value.email}</Typography>
                  <Typography sx={{ fontSize: "18px" }} >{value.title}</Typography>
                  <Typography sx={{ fontSize: "18px" }} >Created: {value.startDate}</Typography>
                  <Typography sx={{ fontSize: "18px" }} >ETA: {value.endDate}</Typography>
                  <Typography sx={{ fontSize: "18px",mr:1 }} >Status: {value.status}</Typography>
                </Box>
              </Paper>
              <Collapse in={open[index]} timeout="auto" unmountOnExit>
                <Box sx={{ width: "100%-2",color:"white", backgroundColor: "#254e6c", mt: 0.3, height: "120px", p: 2, overflow: "hidden" }}>
                  <p sx={{ fontWeight: '200px' }}>{value.task}</p>
                </Box>
              </Collapse>
            </Box>)
        })}
      </Box>
    </Box >
  )
}
export default Status
