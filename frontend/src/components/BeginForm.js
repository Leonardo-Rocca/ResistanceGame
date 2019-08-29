import React from 'react';
import Button from "@material-ui/core/Button/Button";
import {Link} from "react-router-dom";
import Box from "@material-ui/core/Box/Box";
import Typography from "@material-ui/core/Typography/Typography";
import TapAndPlayIcon from "@material-ui/icons/TapAndPlay";

export default function (props) {
    return                   <div>
        Jugador: {props.player}
        <br/>
        Codigo de Partida: {props.game}
        <br/>

        <br/>
        <Typography variant="subtitle2">
            Espere a que todos los jugadores se hayan unido a la partida y haga click en comenzar
        </Typography>
        <Link to="/game/character" onClick={props.start}>
        <Button variant="contained" color="primary" >
            <TapAndPlayIcon />
            Comenzar partida
        </Button>
        </Link>

    </div>
}