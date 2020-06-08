import React from 'react';
import {Link} from "react-router-dom";
import Button from "@material-ui/core/Button/Button";
import Box from "@material-ui/core/Box/Box";
import MainFeaturedPost from "./MainImage";
import Container from "@material-ui/core/Container/Container";
import {CharactersInfo} from "./Navbar";


export default function NewOrJoinGame() {

    // @ts-ignore
    const source = require("..//images/castle.png");

    return (<>
        <MainFeaturedPost  post={{title:'AVALON',description: 'Resistance Game' ,image:source}}/>
        <div className="d-flex p-2 bd-highlight">
            <Box display="flex" justifyContent="center" >
                <Link to="/new"> <Button variant="contained" color="primary">
                    Nueva </Button>
                </Link>
                <Link to="/join"> <Button>
                    Unirse </Button>
                </Link>
            </Box>
        </div>
        <Container maxWidth="xl">
            <br/>
            <br/>

            <CharactersInfo  />
        </Container>
    </>);
}