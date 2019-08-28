package main

import (
	"math/rand"
	"sync"
	"time"
)
var once sync.Once


type Entity interface {
	ID() int
}

type Game struct {
	ID int
	Admin Player
	Players []Player
	Characters []CharacterInfo

}

type Player struct {
	ID int
	Name string

}

type Character string

const(
	SERVANT Character = "SERVANT" // :)
	MINION Character = "MINION"  // >:(
	MERLIN Character = "MERLIN"  // :) Ve a los malos
	ASSASSIN Character = "ASSASSIN" // >:( debe descubrir a merlin

	PERCIVAL Character = "PERCIVAL" // :) conoce a merlin
	MORGANA Character = "MORGANA" // >:( simula ser merlin

	OBERON Character = "OBERON" // >:( LOS DEMAS no saben quien es
	MORDRED Character = "MORDRED" // >:( MERLIN NO SABE QUIEN ES


)

type CharacterInfo struct {
	Character Character
	Player    Player
	Info      map[string]Character
}

var Games []Game

// type global
type GamesRepository map[int]*Game

var (
	instance GamesRepository
	currentGameId int
	currentPlayerId int
)

func GetGamesRepository() *GamesRepository {

	once.Do(func() { // <-- atomic, does not allow repeating

		instance =make(GamesRepository) // <-- thread safe
		currentGameId= 1
		currentPlayerId= 1
	})

	return &instance
}

func (repo *GamesRepository) GetAllGames() []Game{
	return Games
}

func (repo *GamesRepository) GetGame(gameId int) *Game {

	games := *repo
	gameToReturn := games[gameId]
	return gameToReturn
	/*for _, v := range Games {
		if v.ID==gameId {
			return &v
		}
	}
	panic("id inexistente")*/
}

func (repo GamesRepository) CreateGame(admin Player) int{
	currentGameId++
	newGame := Game{ID:currentGameId,Admin:admin,Players:make([]Player,0)}
	Games = append(Games,newGame)

	repo[currentGameId]= &newGame
	return currentGameId
}


func (game *Game) AddPlayer(player Player) *Game {
	game.Players = append(game.Players,player)
	return game
}

// "SERVANT" // :)
// "MINION"  // >:(
// "MERLIN"  // :) Ve a los malos
// "ASSASSIN" // >:( debe descubrir a merlin
// "PERCIVAL" // :) conoce a merlin
// "MORGANA" // >:( simula ser merlin
// "OBERON" // >:( LOS DEMAS no saben quien es
// "MORDRED" // >:( MERLIN NO SABE QUIEN ES
func (game *Game) Start() CharacterInfo {

	characters := [...]Character{SERVANT, MINION, MERLIN, ASSASSIN,SERVANT, PERCIVAL, MORGANA,SERVANT, OBERON, MORDRED}

	a := append(game.Players,game.Admin)
	othersEvils := make(map[string]Character)
	evilsForMerlin := make(map[string]Character)
	percivalInfo := make(map[string]Character)

	// random sort
	rand.Seed(time.Now().UnixNano())
	rand.Shuffle(len(a), func(i, j int) { a[i], a[j] = a[j], a[i] })
	allPlayers:=a

	var aPlayer CharacterInfo
	var auxCharacter Character
	for i := 0; i < len(allPlayers); i++ {
		auxCharacter = characters[i]
		infoAux := make(map[string]Character)

		if auxCharacter==MINION || auxCharacter==ASSASSIN || auxCharacter==MORGANA || auxCharacter==MORDRED{
			infoAux = othersEvils
			othersEvils[allPlayers[i].Name]=auxCharacter
		}
		if auxCharacter==MINION || auxCharacter==ASSASSIN || auxCharacter==MORGANA || auxCharacter==OBERON{
			evilsForMerlin[allPlayers[i].Name]=auxCharacter
		}

		if auxCharacter==MERLIN || auxCharacter==MORGANA{
			percivalInfo[allPlayers[i].Name]=MERLIN
		}

		if auxCharacter==MERLIN {
			infoAux = evilsForMerlin
		}
		if auxCharacter==PERCIVAL {
			infoAux = percivalInfo
		}

		aPlayer = CharacterInfo{Player: allPlayers[i],Character:auxCharacter, Info: infoAux}

		game.Characters = append(game.Characters,aPlayer)
	}

	return game.getCharacter(game.Admin.Name)
}

func (game *Game) getCharacter(playerName string) CharacterInfo {
	for _, v := range game.Characters {
		if v.Player.Name== playerName{
			return v
		}
	}
	panic("not found")
}


func createPlayer(playerName string)Player  {
	currentPlayerId++
	player := Player{
		ID:   currentPlayerId,
		Name: playerName,
	}
	return player
}







func Filter(vs []Game, f func(Game) bool) []Game {
	vsf := make([]Game, 0)
	for _, v := range vs {
		if f(v) {
			vsf = append(vsf, v)
		}
	}
	return vsf
}