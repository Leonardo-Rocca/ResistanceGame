
import Config from '../config.json'

export default function  GameClient(playerName) {

    let host = 'http:/om/';
    host = "http://localhost:5000"
  //  host = Config.host

    return {

        createGame2() {
            return fetch(host + '/Games' , {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                }
            });
        }
        ,
        createGame(){
            return fetch(host+'/game/players/'+playerName, {
                method: 'POST',
                body: {},//JSON.stringify(playerName),
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                }
            });
        }        ,
        joinGame(game){
            return fetch(host+'/Games/'+game+'/players/'+playerName, {
                method: 'POST',
                body: {},//JSON.stringify(playerName),
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                }
            });
        }      ,
        getCharacterInfo(game){
            return fetch(host+'/game/'+game+'/players/'+playerName+'/character', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                }
            });
        }       ,
        startGame(id){
            return fetch(host+'/startGame/'+id, {
                method: 'POST',
                body: {},//JSON.stringify(playerName),
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                }
            });
        }
    }

}