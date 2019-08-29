import React from 'react';
import InputLabel from "@material-ui/core/InputLabel/InputLabel";
import Input from "@material-ui/core/Input/Input";
import {Link} from "react-router-dom";
import Button from "@material-ui/core/Button/Button";
import {AdapterLink} from "./AdapterLink";
import TextField from "@material-ui/core/TextField/TextField";
import FormGroup from "@material-ui/core/FormGroup/FormGroup";

export default function (props) {
    const inputName=React.createRef();
    const inputGame=React.createRef();
    const [disabled, setDisabled] = React.useState(true);

    function handleDisable() {
        setDisabled((inputName.current && inputName.current.value==='')||(inputGame.current && inputGame.current.value===''));
    }

    return(
    <div className="d-flex p-2 bd-highlight">
        <h2> Unirse</h2>
        <div style={{display: 'flex', flexDirection: 'column',}} className="d-flex flex-column bd-highlight mb-3">
            <FormGroup >
                <InputLabel htmlFor="game" required>Codigo de Partida</InputLabel>
            <TextField required id="game" aria-describedby="my-helper-text" name="game" type="number"
                   inputRef={inputGame} onChange={handleDisable}/>

            <InputLabel htmlFor="newNamet" required>Nombre del Jugador</InputLabel>
            <TextField required id="newName" aria-describedby="my-helper-text" name="player"
                   inputRef={inputName} onChange={handleDisable}/>

            <br/>
            <Button variant="contained" color="primary" to="/waiting" onClick={()=>{if(!disabled)
                props.join(inputName.current.value,inputGame.current.value);}}
                    component={AdapterLink} disabled={disabled}
                    type="submit" className="btn btn-lg btn-primary">
                Unirse
            </Button>
            </FormGroup>
        </div>

    </div>);
}
