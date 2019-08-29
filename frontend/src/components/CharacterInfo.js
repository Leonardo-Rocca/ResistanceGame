import React from 'react';
import Button from "@material-ui/core/Button/Button";
import {Link} from "react-router-dom";
import Box from "@material-ui/core/Box/Box";
import TextareaAutosize from "@material-ui/core/TextareaAutosize/TextareaAutosize";
import DeleteIcon from '@material-ui/icons/Delete';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    root: {
        color: theme.palette.text.primary,
    },
    icon: {
        margin: theme.spacing(1),
        fontSize: 32,
    },
}));

export default function (props) {
    const classes = useStyles();

    let characterInfo=props.characterInfo;console.log(characterInfo)
//    Partida: {props.game}

    if (!characterInfo) return <div>Partida no empezada</div>
    // data: {Character: "SERVANT", Player: {ID: 18, Name: "leo"}, Info: {}}
    let info = JSON.stringify(characterInfo.Info);
    let infoText = (Object.keys(info).length!==0)?(        <TextareaAutosize aria-label="empty textarea" placeholder={info}/>):<div></div>;
    var source="/static/images/"+characterInfo.Character+".png";
    return <div>
        {characterInfo.Player.Name}
        <br/>
        Personaje: {characterInfo.Character}

        <br/>
        <img
            src={source}
            alt="logo" height="200px" />;
        <div>
            {infoText}

            <Link to="/" onClick={props.start}>
                <DeleteIcon className={classes.icon}/>
            </Link>

        </div>
    </div>
}