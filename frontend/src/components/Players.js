import React from 'react';
import InputLabel from "@material-ui/core/InputLabel/InputLabel";
import Input from "@material-ui/core/Input/Input";
import {Link} from "react-router-dom";
import Button from "@material-ui/core/Button/Button";
import List from "@material-ui/core/List/List";
import ListItem from "@material-ui/core/ListItem/ListItem";
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import Typography from "@material-ui/core/Typography/Typography";
import {AdapterLink} from "./AdapterLink";

export default function (props) {
    return(
        <div className="d-flex p-2 bd-highlight">

            <List component="nav" aria-label="main mailbox folders">
                {props.players.map(player=> {
                    return         <ListItem >
                            {player.Name}
                    </ListItem>
                        })}
            </List>

            <Typography variant="subtitle2">
                Espere a que todos los jugadores se hayan unido a la partida y haga click en comenzar
            </Typography>

            <Button  variant="outlined" to="/game/character" onClick={props.getCharacterInfo}  component={AdapterLink}>
                <ChevronRightIcon  />
                Comenzar
            </Button>
        </div>);
}
