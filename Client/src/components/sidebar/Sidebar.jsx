import React from 'react'
import { Box, ListItem, List, ListItemText, ListItemIcon, ListSubheader } from '@mui/material';
import AssignmentIcon from '@mui/icons-material/Assignment';
import AddTaskIcon from '@mui/icons-material/AddTask';
import LogoutIcon from '@mui/icons-material/Logout';
import PersonIcon from '@mui/icons-material/Person';
import SmsIcon from '@mui/icons-material/Sms';
import GradingIcon from '@mui/icons-material/Grading';
import { useNavigate } from "react-router-dom"
import { Link } from "react-router-dom";
const Sidebar = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  }

  const boxStyle = {
    marginTop: "1px",
    width: "270px",
    height: "808px",
    backgroundColor: "#003f5c",
  }
  return (
    <div>
      <Box style={boxStyle}>
        <List
          sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper', backgroundColor: "#003f5c" }}
          subheader={<ListSubheader sx={{ backgroundColor: "#003f5c", fontSize: "15px", color: "white" }}>Collections</ListSubheader>}
        >
          {user.userType == "Admin" ? (
            <div>
              <ListItem sx={{ mt: "10px", cursor: "pointer", ml: "10px" }}>
                <ListItemIcon>
                  <AddTaskIcon sx={{ color: "white" }} />
                </ListItemIcon>
                <Link to={'assigntask'}><ListItemText id="switch-list-label-wifi" sx={{ color: "white" }} primary="Assign Task" /></Link>
              </ListItem>
              <ListItem sx={{ mt: "20px", cursor: "pointer", ml: "10px" }}>
                <ListItemIcon>
                  <GradingIcon sx={{ color: "white" }} />
                </ListItemIcon>
                <Link to={'status'}><ListItemText id="switch-list-label-wifi" sx={{ color: "white" }} primary="Status" /></Link>
              </ListItem>
            </div>
          ) : <ListItem sx={{ mt: "20px", cursor: "pointer", ml: "10px" }}>
            <ListItemIcon>
              <AssignmentIcon sx={{ color: "white" }} />
            </ListItemIcon>
            <Link to={'usertask'}><ListItemText id="switch-list-label-wifi" sx={{ color: "white" }} primary="Task" /></Link>
          </ListItem>}

          {/* <ListItem sx={{ mt: "20px", cursor: "pointer", ml: "10px" }}>
            <ListItemIcon>
              <SmsIcon sx={{ color: "white" }} />
            </ListItemIcon>
            <ListItemText id="switch-list-label-bluetooth" sx={{ color: "white" }} primary="Chat" />
          </ListItem> */}

          <ListItem sx={{ mt: "20px", cursor: "pointer", ml: "10px" }}>
            <ListItemIcon>
              <PersonIcon sx={{ color: "white" }} />
            </ListItemIcon>
            <Link to={'profile'}><ListItemText id="switch-list-label-wifi" sx={{ color: "white" }} primary="Profile" /></Link>
          </ListItem>

          <ListItem sx={{ mt: "20px", cursor: "pointer", ml: "10px" }}>
            <ListItemIcon>
              <LogoutIcon sx={{ color: "white" }} />
            </ListItemIcon>
            <ListItemText onClick={logout} id="switch-list-label-bluetooth" sx={{ color: "white" }} primary="Logout" />
          </ListItem>

        </List>
      </Box>
    </div>
  )
}

export default Sidebar
