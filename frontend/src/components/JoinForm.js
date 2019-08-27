import React from 'react';
import InputLabel from "@material-ui/core/InputLabel/InputLabel";
import Input from "@material-ui/core/Input/Input";
import {Link} from "react-router-dom";
import Button from "@material-ui/core/Button/Button";

export default function (props) {
    const inputName=React.createRef();
    const inputGame=React.createRef();


    return(
    <div className="d-flex p-2 bd-highlight">
        <h2> Unirse</h2>
        <div style={{display: 'flex', flexDirection: 'column',}} className="d-flex flex-column bd-highlight mb-3">
            <InputLabel htmlFor="game">Partida</InputLabel>
            <Input required id="game" aria-describedby="my-helper-text" name="game" type="number"
                   inputRef={inputGame}/>

            <InputLabel htmlFor="newNamet">Nombre</InputLabel>
            <Input required id="newName" aria-describedby="my-helper-text" name="player"
                   inputRef={inputName}/>

            <br/>
            <Link to="/waiting"  onClick={()=>props.join(inputName.current.value,inputGame.current.value)}>
                <Button variant="contained" color="primary"
                        type="submit" className="btn btn-lg btn-primary">
                    Unirse
                </Button>
            </Link>
        </div>

    </div>);
}
