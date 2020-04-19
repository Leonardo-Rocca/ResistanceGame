import Config from '../config.json'
import {myFetch} from "./myFetch";

export default function GameClient(playerName) {

    let host = 'http:/om/';
    host = "http://localhost:5000"
  //  host = Config.host

    return {

        createGame2: () => myFetch(host + '/Games', 'GET')
        ,
        createGame: (configuration) => myFetch(host + '/game/players/' + playerName, 'POST', configuration) //JSON.stringify(playerName),
        ,
        joinGame: (game) => myFetch(host + '/Games/' + game + '/players/' + playerName, 'POST', {}) //JSON.stringify(playerName),
        ,
        getCharacterInfo: (game) => myFetch(host + '/game/' + game + '/players/' + playerName + '/character', 'GET'),

        getGame: (game) => myFetch(host + '/games/' + game + '/players/' + playerName, 'GET'),

        startGame(id) {
            return myFetch(host + '/startGame/' + id, 'POST', {}) //JSON.stringify(playerName),
        }

    }
}