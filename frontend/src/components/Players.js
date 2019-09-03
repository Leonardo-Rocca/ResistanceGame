import React from 'react';
import Button from "@material-ui/core/Button/Button";
import List from "@material-ui/core/List/List";
import ListItem from "@material-ui/core/ListItem/ListItem";
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import SyncIcon from '@material-ui/icons/Sync';
import Typography from "@material-ui/core/Typography/Typography";
import {AdapterLink} from "./AdapterLink";

export default function (props) {
    const [started, setStarted] = React.useState(false);
    const [players, setPlayers] = React.useState([]);

    let refresh = () => {
        props.getGame().then(r => {
            let all = r.data.Players;
            all.push(r.data.Admin);
            setPlayers(all);
            setStarted(r.data.Characters)
        })
    };

    //const characterRequest = setInterval(refresh, 3000);
    //   clearInterval(characterRequest);

    function StartButton() {
        if (!started) return <Button variant="outlined" onClick={refresh}>
            <SyncIcon/>
                Actualizar
        </Button>;

        return <div>
            <Typography variant="subtitle2">
                Espere a que todos los jugadores se hayan unido a la partida y haga click en comenzar
            </Typography>

            <Button variant="outlined" to="/game/character" onClick={props.getCharacterInfo} component={AdapterLink}>
                <ChevronRightIcon/>
                Comenzar
            </Button>
        </div>;
    }

    return (
        <div>Esperando jugadores

            <div className="d-flex p-2 bd-highlight">

                <List component="nav" aria-label="main mailbox folders">
                    {players.map(player => {
                        return <ListItem key={player.Name}>
                            {player.Name}
                        </ListItem>
                    })}
                </List>


                {StartButton()}
            </div>
        </div>);
}
