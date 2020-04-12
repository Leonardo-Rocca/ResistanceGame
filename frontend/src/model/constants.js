import servant from "../images/SERVANT.png";
import minion from "../images/MINION.png";
import merlin from "../images/MERLIN.png";
import assassin from "../images/ASSASSIN.png";
import morgana from "../images/MORGANA.png";
import percival from "../images/PERCIVAL.png";
import mordred from "../images/MORDRED.png";
import oberon from "../images/OBERON.png";

const characterDesciptions = new Map();
const SERVANT = "SERVANT";
const MINION = "MINION";
const MERLIN = "MERLIN";
const ASSASSIN = "ASSASSIN";
const MORGANA = "MORGANA";
const PERCIVAL = "PERCIVAL";
const MORDRED = "MORDRED";
const OBERON = "OBERON";

characterDesciptions.set(SERVANT,"Lancelot es el leal sirviente de Arthur");
characterDesciptions.set(MINION,"Súbdito de Mordred");
characterDesciptions.set(MERLIN,"Merlin sabe quienes son los malechores, pero debe mantener su anonimato ya que si lo descubren, los infiltrados ganarán la partida.");
characterDesciptions.set(ASSASSIN,"Si los seguidores de Mordred pierden, el Asesino tiene una oportunidad para adivinar quien es Merlin y si lo descubren, los infiltrados ganarán la partida.");
characterDesciptions.set(MORGANA,"Morgana pertenece también al lado del mal y su habilidad es hacerse pasar por Merlín ante Perceval.");
characterDesciptions.set(PERCIVAL,"Perceval: Su habilidad es que sabe quién es Merlín, lo que hace que el bando del bien sea más fuerte incrementando sus posibilidades para ganar.");
characterDesciptions.set(MORDRED,"Mordred es del lado del mal. Su habilidad es que no revela su identidad a Merlín.");
characterDesciptions.set(OBERON,"Oberon es un jugador del lado del mal. No revela su identidad ante los demás jugadores.");


export function getSource(character) {
    const sources = {'SERVANT':servant,'MINION':minion,'MERLIN':merlin,'ASSASSIN':assassin,'MORGANA':morgana,'PERCIVAL':percival,'MORDRED':mordred,'OBERON':oberon};
    return sources[character.toUpperCase()];
}

export const getCharacterDesciption =(name)=>{
    const desc= characterDesciptions.get(name.toUpperCase());
    return desc || ""
}