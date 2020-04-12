import AppBar from "@material-ui/core/AppBar/AppBar";
import Typography from "@material-ui/core/Typography/Typography";
import React from "react";
import IconButton from "@material-ui/core/IconButton/IconButton";
import HelpIcon from '@material-ui/icons/Help';
import Toolbar from "@material-ui/core/Toolbar/Toolbar";
import Slide from "@material-ui/core/Slide/Slide";
import Modal from "@material-ui/core/Modal/Modal";
import Card from "@material-ui/core/Card/Card";
import CardMedia from "@material-ui/core/CardMedia/CardMedia";
import {allDescriptions, getGoodOrEvil, GOOD_TEAM} from "../model/constants";
import CardContent from "@material-ui/core/CardContent/CardContent";
import {makeStyles} from "@material-ui/core";
import QUESTS_RULES from "../images/quests.jpg";
import CardHeader from "@material-ui/core/CardHeader/CardHeader";
import Container from "@material-ui/core/Container/Container";
import Divider from "@material-ui/core/Divider/Divider";
import List from "@material-ui/core/List/List";
import ListItem from "@material-ui/core/ListItem/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText/ListItemText";
import {evilColor, goodColor} from "./CharacterInfo";
import BeenhereIcon from '@material-ui/icons/Beenhere';
import WhatshotIcon from '@material-ui/icons/Whatshot';
import CloseIcon from '@material-ui/icons/Close';
import HomeIcon from '@material-ui/icons/Home';
import {Link} from "react-router-dom";

const useStyles = makeStyles(theme => ({
    root: {
        color: theme.palette.text.primary,
    },
    card :{flexGrow: 1,
        maxHeight: 500, overflowY: 'scroll'
},
    icon: {
        //margin: theme.spacing(1),
        //fontSize: 32,
        color: theme.palette.primary.contrastText
    },
}));


export default function () {
    const [open, setOpen] = React.useState(false);
    const classes = useStyles();

    const handleMenu = () =>  setOpen(true);

    const handleClose = () => setOpen(false);

   return <AppBar position="static" color="primary">
       <Toolbar>
               <Link to="/" title="menu" >
                   <IconButton edge="start" aria-label="menu"  >
                   <HomeIcon className={classes.icon} />
                   </IconButton>
               </Link>

           <Typography variant="h6"  align="center" style={{flexGrow: 1}}>
            Resistance Avalon
             </Typography>

            <IconButton
                aria-label="info" title="info"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
            >
                <HelpIcon />
            </IconButton>
               <Modal
                   aria-labelledby="transition-modal-title"
                   aria-describedby="transition-modal-description"
                   open={open}
                   onClose={handleClose}
                   closeAfterTransition

               >
                   <Slide direction="up" in={open} mountOnEnter unmountOnExit>
                       <Container maxWidth="lg">


                       <Card className={classes.card}>
                               <CardHeader title="Resistance Avalon" action={ <IconButton
                                   aria-label="info"
                                   onClick={handleClose}
                               > <CloseIcon /> </IconButton>} />

                               <CardMedia
                                   component="img"
                                   alt="rules"
                                   height="140"
                                   image={QUESTS_RULES}
                                   title="rules"
                               />
                               <CardContent>

                                   <Typography gutterBottom variant="h5" component="h2">
                                       Reglas
                                   </Typography>

                                   <Typography color="textSecondary">
                                       Podes encontrar el reglamento completo en:
                                       <a href="https://www.jugonesweb.com/juego-de-mesa/the-resistance-avalon/" target="_blank"> Ver Reglas</a>
                                   </Typography>
                                   <br/>
                                   <Typography variant="body2" color="textSecondary" component="p">
                                       La Resistencia: Avalon es un juego de roll donde los jugadore se dividen en los fieles a Arturo y los leales a Mordred, donde se realizarán misiones, que definirán el resultado de la partida.

                                   </Typography>
                                   <Divider />
                                   <List component="nav" aria-label="main mailbox folders">
                                   {
                                       allDescriptions.map( ({description, character})=>{
                                           const isGood = getGoodOrEvil(character)===GOOD_TEAM;
                                           return <ListItem key={character} style={{color:(isGood?goodColor:evilColor)}} >
                                               <ListItemIcon style={{color:(isGood?goodColor:evilColor)}}>
                                                   {isGood?<BeenhereIcon/>:<WhatshotIcon />}
                                               </ListItemIcon>
                                               <ListItemText  primary={character} secondary={description} />
                                               <Divider />
                                           </ListItem>
                                       } )
                                   }
                                   </List>
                               </CardContent>
                           </Card>
                       </Container>
                   </Slide>

               </Modal>
       </Toolbar>
    </AppBar>
}