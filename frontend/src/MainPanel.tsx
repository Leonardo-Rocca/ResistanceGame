import Navbar from "./components/Navbar";
import {Game} from "./components/Game";
import ThemeProvider from "@material-ui/styles/ThemeProvider/ThemeProvider";
import {Router} from "@material-ui/icons";
import * as React from "react";
import {withTheme} from "@material-ui/core";

export default withTheme(MainPanel)

function MainPanel(props:any) {
return <div>
        <Navbar />
        {/*
                {AvalonImage()}*/}
        <Game />
</div>
}