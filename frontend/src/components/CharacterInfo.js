import React from 'react';
import {Link} from "react-router-dom";
import DeleteIcon from '@material-ui/icons/Delete';
import {makeStyles} from '@material-ui/core/styles';
import List from "@material-ui/core/List/List";
import ListItem from "@material-ui/core/ListItem/ListItem";
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import ListItemIcon from "@material-ui/core/ListItemIcon/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText/ListItemText";
import Divider from "@material-ui/core/Divider/Divider";
import Card from "@material-ui/core/Card/Card";
import CardMedia from "@material-ui/core/CardMedia/CardMedia";
import CardContent from "@material-ui/core/CardContent/CardContent";
import Typography from "@material-ui/core/Typography/Typography";
import {getCharacterDesciption, getGoodOrEvil, getSource, GOOD_TEAM} from "../model/constants";
import CardHeader from "@material-ui/core/CardHeader/CardHeader";
import BeenhereIcon from '@material-ui/icons/Beenhere';
import WhatshotIcon from '@material-ui/icons/Whatshot';
import RED from '@material-ui/core/colors/red';
import BLUE from '@material-ui/core/colors/blue';

export const evilColor = RED[500];
export const goodColor = BLUE[500];

const useStyles = makeStyles(theme => ({
    root: {
        color: theme.palette.text.primary,
    },
    card :{maxWidth: 245,
    },
icon: {
        margin: theme.spacing(1),
        fontSize: 32,
    },
    container:{
        display:'flex',
        justifyContent:'space-around',
        flexWrap:'wrap',
    }
}));

export default function (props) {
    const classes = useStyles();

    let characterInfo=props.characterInfo;console.log(characterInfo)
    const hasInfo = characterInfo && characterInfo.Info;

    if (!hasInfo) return <div>Partida no empezada</div>;

    // data: {Character: "SERVANT", Player: {ID: 18, Name: "leo"}, Info: {}}
    let info = JSON.stringify(characterInfo.Info);


    const getCharItem = char => <ListItem key={char} >
        <ListItemIcon>
            <AccountCircleIcon />
        </ListItemIcon>
        <ListItemText  primary={char} secondary={characterInfo.Info[char]} />
        <Divider />
    </ListItem>;


    const team = getGoodOrEvil(characterInfo.Character)

    const isGood = team===GOOD_TEAM;
    const teamDesc =  <div className={classes.container} style={{color:(isGood?goodColor:evilColor)}}>{
        (isGood?<BeenhereIcon/>:<WhatshotIcon />)
    }
    <Typography variant="body2"  >
    {team}
        </Typography></div>


    return <div>

        <div className={classes.container}>

        <Card className={classes.card}>
            <CardHeader title={characterInfo.Player.Name} />

            <CardMedia
                    component="img"
                    alt="My Character"
                    height="290"
                    image={getSource(characterInfo.Character )}
                    title={characterInfo.Character}
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">

                    </Typography>
                    <Typography color="textSecondary">
                        Personaje: {characterInfo.Character}
                    </Typography>
                    <br/>
                    <Typography variant="body2" color="textSecondary" component="p">
                        {getCharacterDesciption(characterInfo.Character)}
                    </Typography>
                    <Divider />
                    <br/>

                    {teamDesc}


                </CardContent>
        </Card>
            { Object.keys(characterInfo.Info).length>0 &&
            <div>
                <Card className={classes.card}>
                    <CardHeader title="Información de los jugadores"/>
                    <CardContent>

                        <List component="nav" aria-label="main mailbox folders">
                            {
                                Object.keys(characterInfo.Info).map(getCharItem)
                            }
                        </List>
                    </CardContent>

                </Card>
            </div>
            }


        </div>
        <br/>


            <footer >
                <Link to="/" onClick={props.start}>
                    Terminar partida  <DeleteIcon className={classes.icon}/>
                </Link>
            </footer>

    </div>
}