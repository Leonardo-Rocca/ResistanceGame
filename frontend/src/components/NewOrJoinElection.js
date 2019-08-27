import React from 'react';
import {Link} from "react-router-dom";
import Button from "@material-ui/core/Button/Button";
import Box from "@material-ui/core/Box/Box";


export default function NewOrJoinGame() {

    return (
        <div className="d-flex p-2 bd-highlight">
            <Box display="flex">
                <Link to="/new"> <Button variant="contained" color="primary">
                    Nueva </Button>
                </Link>
                <Link to="/join"> <Button>
                    Unirse </Button>
                </Link>
            </Box>
        </div>);
}