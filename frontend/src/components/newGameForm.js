import React from 'react';
import FormHelperText from "@material-ui/core/FormHelperText/FormHelperText";
import InputLabel from "@material-ui/core/InputLabel/InputLabel";
import FormControl from "@material-ui/core/FormControl/FormControl";
import Input from "@material-ui/core/Input/Input";
import Button from "@material-ui/core/Button/Button";

export default function NewGameForm(props) {

    // <form method="post" action="/game/players/name" id="newForm">
    //   </form> " changeFormUrl('/game/players/{1}','newForm','newName','')"

    const inputName=React.createRef();

    return(
    <div className="d-flex p-2 bd-highlight">
        <h2> Nueva</h2>
                <div style={{display: 'flex', flexDirection: 'column',}} className="d-flex flex-column bd-highlight mb-3">
                    <InputLabel htmlFor="newNamet">Nombre</InputLabel>
                    <Input required id="newName" aria-describedby="my-helper-text" name="player"
                           inputRef={inputName}/>

                    <br/>
                    <Button variant="contained" color="primary"  onClick={()=>props.onCreate(inputName.current.value)}
                            type="submit" className="btn btn-lg btn-primary">
                        Crear
                    </Button>
                </div>

        </div>);
}