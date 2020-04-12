import React from 'react';
import Button from "@material-ui/core/Button/Button";
import {BrowserRouter as Router, Link} from "react-router-dom";
import Box from "@material-ui/core/Box/Box";
import Typography from "@material-ui/core/Typography/Typography";
import TapAndPlayIcon from "@material-ui/icons/TapAndPlay";
import Players from "./Players";
import {Route} from "./Game";

export default function ({player, game, start,players,getGame,getCharacterInfo}) {

 //   players={state.players} getGame={getGame}
//    getCharacterInfo={getCharacterInfo}
    return                   <div>
        Jugador: {player}
        <br/>
        Codigo de Partida: {game}
        <br/>

        <br/>
        <Typography variant="subtitle2">
            Espere a que todos los jugadores se hayan unido a la partida y haga click en comenzar
        </Typography>

        <Players players={players} getGame={getGame} />

        <Link to="/game/character" onClick={start}>
            <Button variant="contained" color="primary" >
                <TapAndPlayIcon />
                Comenzar partida
            </Button>
        </Link>

    </div>
}