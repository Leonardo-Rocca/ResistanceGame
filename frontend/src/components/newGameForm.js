import React from 'react';
import FormHelperText from "@material-ui/core/FormHelperText/FormHelperText";
import InputLabel from "@material-ui/core/InputLabel/InputLabel";
import FormControl from "@material-ui/core/FormControl/FormControl";
import Input from "@material-ui/core/Input/Input";
import Button from "@material-ui/core/Button/Button";
import {Link} from "react-router-dom";
import Box from "@material-ui/core/Box/Box";
import TextField from "@material-ui/core/TextField/TextField";
import {AdapterLink} from "./AdapterLink";

export default function NewGameForm(props) {

    // <form method="post" action="/game/players/name" id="newForm">
    //   </form> " changeFormUrl('/game/players/{1}','newForm','newName','')"

    const inputName=React.createRef();
    const [disabled, setDisabled] = React.useState(true);

    function handleDisable() {
       setDisabled(inputName.current && inputName.current.value==='');
    }

    return(
    <div className="d-flex p-2 bd-highlight">
        <h2> Nueva Partida</h2>
                <div style={{display: 'flex', flexDirection: 'column',}} className="d-flex flex-column bd-highlight mb-3">
                    <InputLabel required htmlFor="newNamet">Nombre del jugador</InputLabel>
                    <TextField required id="newName" aria-describedby="my-helper-text" name="player"
                           inputRef={inputName} onChange={handleDisable}/>

                    <br/>
                    <Button variant="contained" color="primary" to="/newGame"  onClick={()=>props.onCreate(inputName.current.value)}
                             component={AdapterLink} disabled={disabled}
                            type="submit" className="btn btn-lg btn-primary">
                        Crear
                    </Button>
                </div>

        </div>);
}