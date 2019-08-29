import React from 'react';
import './App.css';
import NewGameForm from "./components/newGameForm";
import Container from "@material-ui/core/Container/Container";
import NewOrJoinGame from "./components/NewOrJoinElection";
import AppBar from "@material-ui/core/AppBar/AppBar";
import Typography from "@material-ui/core/Typography/Typography";
import GameClient from "./model/GameClient";
import Players from "./components/Players";
import ThemeProvider from "@material-ui/styles/ThemeProvider/ThemeProvider";
import color from '@material-ui/core/colors/blueGrey';
import {createMuiTheme} from "@material-ui/core";
import Box from "@material-ui/core/Box/Box";
import {Game} from "./components/Game";

const theme = createMuiTheme({
    palette: {

        primary:color,
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
    return <img
        src="https://www.ultraboardgames.com/gfx/avalon.jpg"
        alt="logo" height="200px" />;
}

function App() {

    return (
        <div className="App">
            <ThemeProvider theme={theme}>

                <AppBar position="static" color="primary">
                    <Typography variant="h6">
                        Resistance Avalon
                    </Typography>

                </AppBar>

                {AvalonImage()}
                    <Game />
            </ThemeProvider>
        </div>
    );
}

export default App;
