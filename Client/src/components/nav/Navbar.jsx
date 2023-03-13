import React from 'react'
import { Badge, Box, Typography } from '@mui/material'
import { useState, useContext, useEffect } from "react";
import MailIcon from '@mui/icons-material/Mail';
import loginContext from '../../context/login/loginContext';
import axios from 'axios';
const Navbar = () => {
  const data = JSON.parse(localStorage.getItem('user'));  
  return (
    <Box sx={{ backgroundColor: "#193044", }}>
      <Box position="static" sx={{ height: "70px", maxWidth: "100vw", display: "flex", alignItems: "center", justifyContent: "space-between" }} >
        <Box>
          <Typography
            variant="h6"
            noWrap
            sx={{ display: { xs: 'none', sm: 'block', color: "white" }, textAlign: "left", ml: 3 }}
          >
            TASK MANAGEMENT
          </Typography>
        </Box>
        <Box sx={{ width: "250px", mr: 2, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          {/* <Badge badgeContent={4} color="primary" >
            <MailIcon color="action" sx={{ hover: { cursor: "pointer" } }} />
          </Badge> */}
          <Typography
            variant="h6"
            noWrap
            sx={{ display: { xs: 'none', sm: 'block', color: "white" }, textAlign: "left" }}
          >
            {data.userType}
          </Typography>
          <Typography
            variant="h6"
            noWrap
            sx={{ display: { xs: 'none', sm: 'block', color: "white" }, textAlign: "left" }}
          >
            {data.fName+" "+data.lName}
          </Typography>
        </Box>
      </Box>

    </Box>

  )
}

export default Navbar
