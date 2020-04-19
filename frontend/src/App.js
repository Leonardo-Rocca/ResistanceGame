import React from 'react';
import './App.css';
import {ThemeProvider} from "@material-ui/styles";
import color from '@material-ui/core/colors/blue';
import {createMuiTheme} from "@material-ui/core";
import {Game} from "./components/Game";
import Navbar from "./components/Navbar";
import {BrowserRouter as Router} from "react-router-dom";
import Button from "@material-ui/core/Button/Button";
import { withTheme } from '@material-ui/core/styles';
import MainPanel from "./MainPanel";


const theme = createMuiTheme({
    palette: {

        primary:{
            light:color.A100,
            main:color[900]
        },
        secondary: {
            main: '#156668',
            //  contrastText: '#ffffff',
        },
        contrastThreshold: 3,
    },
    status: {
        danger: 'red',
    },
});


function AvalonImage() {
    const source = require("./images/avalonLogo.jpg");
    return <img
        src={source}
         //src="https://www.ultraboardgames.com/gfx/avalon.jpg"
        alt="logo" height="200px" />;
}

function App() {

    return (
        <div className="App">
            <ThemeProvider theme={theme}>
                <Router>
                    <MainPanel/>
                </Router>
            </ThemeProvider>
        </div>
    );
}

export default App;
