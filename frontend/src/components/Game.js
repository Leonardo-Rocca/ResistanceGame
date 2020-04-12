import Container from "@material-ui/core/Container/Container";
import Box from "@material-ui/core/Box/Box";
import {BrowserRouter as Router, Route} from "react-router-dom";
import NewOrJoinGame from "./NewOrJoinElection";
import NewGameForm from "./newGameForm";
import Players from "./Players";
import JoinForm from "./JoinForm";
import BeginForm from "./BeginForm";
import CharacterInfo from "./CharacterInfo";
import React from "react";
import GameClient from "../model/GameClient";
import {createBrowserHistory} from "history";

export const APP_STATE = 'APP_STATE';

export function Game() {
    const [state, setStateStored] = React.useState({player: '', game: '',characterInfo:{},players:[]});

    const setState = (smth)=>{
     setStateStored(smth);
        window.localStorage.setItem(APP_STATE,JSON.stringify(smth));
    };
    React.useEffect(()=>{
        if (window.localStorage.getItem(APP_STATE))
            setStateStored(JSON.parse(window.localStorage.getItem(APP_STATE)))
    },[]);

    let createGame = (name) =>
        GameClient(name).createGame().then(resp => resp.json()).then(r => {console.log(r);setState({player: name, game: r.data})});

    let startGame = () =>
        GameClient(state.player).startGame(state.game).then(resp => resp.json()).then(r => setState({...state,
            player: state.player, game: state.game,characterInfo:r.data }));

    let getCharacterInfo = () =>
        GameClient(state.player).getCharacterInfo(state.game).then(resp => resp.json()).then(r =>
            setState({...state, characterInfo: r.data}     ));

    let getGame = () =>{
        if(state.player && state.game){
            return GameClient(state.player).getGame(state.game).then(resp => resp.json());
        }else {
            console.log("false promise",state)
            return Promise.resolve({data:{Players:[]}})
        }
    };


    let joinGame = (player,game)=>  GameClient(player).joinGame(game).then(resp => resp.json())
        .then(r => {console.log(r);let all=r.data.Players;all.push(r.data.Admin); setState({player: player, game: game,players:r.data.Players})});




    const customHistory = createBrowserHistory();
    return(
        <Container maxWidth="sm">
            <Box m={2}>
                    <Router history={customHistory}/>
                    <Route exact path="/" component={NewOrJoinGame}/>
                    <Route exact path="/new" render={props =>
                        <NewGameForm  {...props} onCreate={createGame}/>
                    }/>
                    <Route exact path="/waiting" render={props =>
                        <Players players={state.players} getGame={getGame} getCharacterInfo={getCharacterInfo} withStartButton/> }/>

                    <Route exact path="/join" render={props =>
                        <JoinForm {...props} join={joinGame} />
                    }/>
                   <Route exact path="/join/:id" render={props =>
                        <JoinForm {...props} join={joinGame} gameId={props.match.params.id }/>
                    }/>


                    <Route exact path="/newGame" render={props =>
                        <BeginForm  {...props} game={state.game} player={state.player} start={startGame}  players={state.players} getGame={getGame}
                                    getCharacterInfo={getCharacterInfo}/>
                    }/>
                    <Route exact path="/game/character" render={props =>
                        <CharacterInfo  {...props} characterInfo={state.characterInfo}/>

                    }/>

            </Box>
        </Container>
    )
}