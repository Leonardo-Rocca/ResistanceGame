
import Config from '../config.json'

export default function  GameClient(playerName) {

    let host = 'http:/om/';
    host = "http://localhost:5000"
    host = Config.host

    return {

        createGame() {
            return fetch(host + '/Games' , {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                }
            });
        }
        ,
        createGame2(){
            return fetch(host+'/game/players/'+playerName, {
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