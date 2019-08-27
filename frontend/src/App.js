import React from 'react';
import './App.css';
import NewGameForm from "./components/newGameForm";
import Container from "@material-ui/core/Container/Container";
import NewOrJoinGame from "./components/NewOrJoinElection";
import AppBar from "@material-ui/core/AppBar/AppBar";
import Typography from "@material-ui/core/Typography/Typography";
import {createBrowserHistory} from "history";
import GameClient from "./model/GameClient";
import {BrowserRouter as Router, Route} from "react-router-dom";
import BeginForm from "./components/BeginForm";
import TextareaAutosize from "@material-ui/core/TextareaAutosize/TextareaAutosize";
import CharacterInfo from "./components/CharacterInfo";
import JoinForm from "./components/JoinForm";
import Players from "./components/Players";

const customHistory = createBrowserHistory();

function App() {
    const [state, setState] = React.useState({player: '', game: '',characterInfo:{},players:[]});

    let createGame = (name) =>
        GameClient(name).createGame().then(resp => resp.json()).then(r => {console.log(r);setState({player: name, game: r.data})});

    let startGame = () =>
        GameClient(state.player).startGame(state.game).then(resp => resp.json()).then(r => setState({...state,
            player: state.player, game: state.game,characterInfo:r.data }));

    let getCharacterInfo = () =>
        GameClient(state.player).getCharacterInfo(state.game).then(resp => resp.json()).then(r =>
            setState({...state, characterInfo: r.data}     ));


    let joinGame = (player,game)=>  GameClient(player).joinGame(game).then(resp => resp.json())
        .then(r => {console.log(r);let all=r.data.Players;all.push(r.data.Admin); setState({player: player, game: game,players:r.data.Players})});


    return (
        <div className="App">
            <AppBar position="static">
                <Typography variant="h6">
                    Resistance Avalon
                </Typography>

            </AppBar>

            <img
                src="https://ksr-ugc.imgix.net/assets/011/406/830/6384907307c62d307d774d5f8d2107f6_original.jpg?ixlib=rb-2.1.0&crop=faces&w=1552&h=873&fit=crop&v=1463682224&auto=format&frame=1&q=92&s=eab75fb0fad787eabdf8193de93b6728"
                alt="logo" height="200px"/>
            <Container maxWidth="sm">
                <Router>
                    <Router history={customHistory}/>
                    <Route exact path="/" component={NewOrJoinGame}/>
                    <Route exact path="/new" render={props =>
                        <NewGameForm  {...props} onCreate={createGame}/>
                    }/>
                     <Route exact path="/waiting" render={props =>
                         <div>Esperando jugadores<Players players={state.players} getCharacterInfo={getCharacterInfo}/></div>}/>

                     <Route exact path="/join" render={props =>
                        <JoinForm {...props} join={joinGame}/>
                    }/>


                    <Route exact path="/newGame" render={props =>
                        <BeginForm  {...props} game={state.game} player={state.player} start={startGame}/>
                    }/>
                    <Route exact path="/game/character" render={props =>
                        <CharacterInfo  {...props} characterInfo={state.characterInfo}/>

                    }/>

                </Router>
            </Container>
        </div>
    );
}

export default App;
