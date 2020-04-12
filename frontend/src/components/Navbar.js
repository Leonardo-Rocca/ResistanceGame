import AppBar from "@material-ui/core/AppBar/AppBar";
import Typography from "@material-ui/core/Typography/Typography";
import ThemeProvider from "@material-ui/styles/ThemeProvider/ThemeProvider";
import React from "react";
import IconButton from "@material-ui/core/IconButton/IconButton";
import Menu from "@material-ui/core/Menu/Menu";
import MenuItem from "@material-ui/core/MenuItem/MenuItem";
import HelpIcon from '@material-ui/icons/Help';
import Toolbar from "@material-ui/core/Toolbar/Toolbar";
import Slide from "@material-ui/core/Slide/Slide";
import Modal from "@material-ui/core/Modal/Modal";
import Card from "@material-ui/core/Card/Card";
import CardMedia from "@material-ui/core/CardMedia/CardMedia";
import {getCharacterDesciption, getSource} from "../model/constants";
import CardContent from "@material-ui/core/CardContent/CardContent";
import {makeStyles} from "@material-ui/core";
import QUESTS_RULES from "../images/quests.jpg";
import CardHeader from "@material-ui/core/CardHeader/CardHeader";
import Container from "@material-ui/core/Container/Container";


const useStyles = makeStyles(theme => ({
    root: {
        color: theme.palette.text.primary,
    },
    card :{maxWidth:345,flexGrow: 1},
    icon: {
        margin: theme.spacing(1),
        fontSize: 32,
    },
}));


export default function () {
    const [open, setOpen] = React.useState(false);
    const classes = useStyles();

    const handleMenu = () =>  setOpen(true);

    const handleClose = () => setOpen(false);

   return <AppBar position="static" color="primary">
       <Toolbar>
           <Typography variant="h6"  align="center" style={{flexGrow: 1}}>
            Resistance Avalon
             </Typography>

            <IconButton
                aria-label="info"
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
                  /* className={classes.modal}
                  *                    BackdropComponent={Backdrop}
                  *                                       BackdropProps={{
                       timeout: 500,
                   }}
                  * */
                   open={open}
                   onClose={handleClose}
                   closeAfterTransition

               >
                   <Slide direction="up" in={open} mountOnEnter unmountOnExit>
                       <Container maxWidth="xs">


                       <Card className={classes.card}>
                               <CardHeader title="Resistance Avalon" />

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
                                       Podes encontrar el reglamento en:
                                       <a href="https://www.jugonesweb.com/juego-de-mesa/the-resistance-avalon/" target="_blank">Ver Reglas</a>
                                   </Typography>
                                   <br/>
                                   <Typography variant="body2" color="textSecondary" component="p">
                                       La Resistencia: Avalon es un juego de roll donde los jugadore se dividen en los fieles a Arturo y los leales a Mordred, donde se realizarán misiones, que definirán el resultado de la partida.

                                   </Typography>
                               </CardContent>
                           </Card>
                       </Container>
                   </Slide>

               </Modal>
       </Toolbar>
    </AppBar>
}