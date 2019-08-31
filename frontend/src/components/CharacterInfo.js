import React from 'react';
import Button from "@material-ui/core/Button/Button";
import {Link} from "react-router-dom";
import Box from "@material-ui/core/Box/Box";
import TextareaAutosize from "@material-ui/core/TextareaAutosize/TextareaAutosize";
import DeleteIcon from '@material-ui/icons/Delete';
import { makeStyles } from '@material-ui/core/styles';
import  servant from './../images/SERVANT.png'
import  minion from './../images/MINION.png'
import  merlin from './../images/MERLIN.png'
import  assassin from './../images/ASSASSIN.png'
import  morgana from './../images/MORGANA.png'
import  percival from './../images/PERCIVAL.png'
import  mordred from './../images/MORDRED.png'
import  oberon from './../images/OBERON.png'

const useStyles = makeStyles(theme => ({
    root: {
        color: theme.palette.text.primary,
    },
    icon: {
        margin: theme.spacing(1),
        fontSize: 32,
    },
}));

function getSource(character) {
    console.log(character)
    const sources = {'SERVANT':servant,'MINION':minion,'MERLIN':merlin,'ASSASSIN':assassin,'MORGANA':morgana,'PERCIVAL':percival,'MORDRED':mordred,'OBERON':oberon};
    return sources[character.toUpperCase()];
}

export default function (props) {
    const classes = useStyles();

    let characterInfo=props.characterInfo;console.log(characterInfo)
//    Partida: {props.game}

    if (!characterInfo) return <div>Partida no empezada</div>
    // data: {Character: "SERVANT", Player: {ID: 18, Name: "leo"}, Info: {}}
    let info = JSON.stringify(characterInfo.Info);
    console.log(Object.keys(info))
    let infoText = (Object.keys(info).length!==0)?(  <TextareaAutosize disabled aria-label="empty textarea" placeholder={info}/>):<div></div>;

    return <div>
        {characterInfo.Player.Name}
        <br/>
        Personaje: {characterInfo.Character}

        <br/>
        <img src={getSource(characterInfo.Character )} alt="logo" height="200px" />

        <br/>
        <div>
            {infoText}

            <footer >
            <Link to="/" onClick={props.start}>
              Terminar partida  <DeleteIcon className={classes.icon}/>
            </Link>
            </footer>

        </div>
    </div>
}