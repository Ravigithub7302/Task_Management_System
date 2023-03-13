import { Box } from '@mui/system'
import React from 'react'
import Navbar from '../components/nav/Navbar'
import Sidebar from '../components/sidebar/Sidebar'
import { Outlet } from 'react-router-dom'

const Home = () => {
    return (
        <Box>
            <Navbar />
            <Box style={{display:"flex"}}>
            <Sidebar />
            <Outlet/>
            </Box>
        </Box>
    )
}

export default Home
