import React from 'react';
import FormHelperText from "@material-ui/core/FormHelperText/FormHelperText";
import InputLabel from "@material-ui/core/InputLabel/InputLabel";
import FormControl from "@material-ui/core/FormControl/FormControl";
import Input from "@material-ui/core/Input/Input";
import Button from "@material-ui/core/Button/Button";

export default function NewGameForm() {

    return(
        <div className="d-flex p-2 bd-highlight">
            <h2> Nueva</h2>
            <form method="post" action="/game/players/name" id="newForm">
                <div style={{display: 'flex', flexDirection: 'column',}} className="d-flex flex-column bd-highlight mb-3">
                    <InputLabel htmlFor="newNamet">Nombre</InputLabel>
                    <Input required id="newName" aria-describedby="my-helper-text" name="player" onKeyUp="changeFormUrl('joinForm',this.value,'name')"/>

                    <br/>
                    <Button variant="contained" color="primary"  onClick=" changeFormUrl('/game/players/{1}','newForm','newName','')"
                            type="submit" className="btn btn-lg btn-primary">
                        Crear
                    </Button>
                </div>
            </form>

        </div>);
}