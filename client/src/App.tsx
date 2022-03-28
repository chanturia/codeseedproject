import React from 'react'
import {
    AppBar,
    Typography,
    Toolbar,
    Box,
} from "@mui/material";
import {
    Routes,
    Route,
} from "react-router-dom";
import Home from "./components/pages/Home";

const App = () => {

    return (
        <main className='App'>
            <AppBar
                position="sticky"
                color="default"
                elevation={0}
            >
                <Toolbar sx={{flexWrap: 'wrap', justifyContent: 'space-between'}}>
                    <Typography variant="h6" color="inherit" noWrap sx={{flexGrow: 1}}>
                        Code Seed Project
                    </Typography>
                    <Box>
                        <img src="https://www.codeseed.io/wp-content/uploads/2021/09/logo-codeseed.png" alt="Code Seed Logo"/>
                    </Box>
                </Toolbar>
            </AppBar>

            <Routes>
                <Route path="/" element={<Home/>}/>
            </Routes>
        </main>
    )
}

export default App
