package main

import "sync"

var once sync.Once


type Entity interface {
	ID() int
}

type Game struct {
	ID int
	Admin Player
	Players []Player

}

type Player struct {
	ID int
	Name string

}

var games []Game

// type global
type GamesRepository map[string]string

var (
	instance GamesRepository
	currentGameId int
	currentPlayerId int
)

func GetGamesRepository() GamesRepository {

	once.Do(func() { // <-- atomic, does not allow repeating

		instance = make(GamesRepository) // <-- thread safe
		currentGameId= 1
		currentPlayerId= 1
	})

	return instance
}

func (repo *GamesRepository) GetAllGames() []Game{
	return games
}

func (repo *GamesRepository) GetGame(gameId int) Game {

	for _, v := range games {
		if v.ID==gameId {
			return v
		}
	}
	panic("id inexistente")
}

func (repo *GamesRepository) CreateGame(admin Player) int{
	currentGameId++
	newGame := Game{ID:currentGameId,Admin:admin,Players:make([]Player,10)}
	games = append(games,newGame)
	return currentGameId
}


func (game *Game) AddPlayer(player Player) Game {
	game.Players = append(game.Players,player)
	return *game
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