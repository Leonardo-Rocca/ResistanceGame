import React from 'react';
import logo from './logo.svg';
import './App.css';
import Button from '@material-ui/core/Button';
import NewGameForm from "./components/newGameForm";
import Container from "@material-ui/core/Container/Container";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import NewOrJoinGame from "./components/NewOrJoinElection";

function App() {

    return (
    <div className="App">


        <img src="https://ksr-ugc.imgix.net/assets/011/406/830/6384907307c62d307d774d5f8d2107f6_original.jpg?ixlib=rb-2.1.0&crop=faces&w=1552&h=873&fit=crop&v=1463682224&auto=format&frame=1&q=92&s=eab75fb0fad787eabdf8193de93b6728"
              alt="logo" height="200px" />
        <Container maxWidth="sm">
            <Router>
                <Route exact path="/" component={NewOrJoinGame} />
                <Route exact path="/new" component={NewGameForm} />

            </Router>
        </Container>
    </div>
  );
}

export default App;
