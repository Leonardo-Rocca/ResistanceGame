import React from 'react';
import Button from "@material-ui/core/Button/Button";
import {Link} from "react-router-dom";
import Box from "@material-ui/core/Box/Box";

export default function (props) {
    return                   <div>
        Jugador: {props.player}
        <br/>
        Partida: {props.game}
        <br/>

        <Link to="/game/character" onClick={props.start}>
        <Button variant="contained" color="primary" >
            Comenzar
        </Button>
        </Link>

    </div>
}