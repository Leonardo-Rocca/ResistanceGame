package main

import (
	"fmt"
	"github.com/gin-contrib/cors"
	"log"
	"net/http"
	"os"
	"strconv"
	"time"

	"github.com/gin-gonic/gin"
	_ "github.com/heroku/x/hmetrics/onload"
)

const (
	STATIC_DIR = "/static/"
	PORT       = "5000"
)


func main() {
	port := os.Getenv("PORT")

	router := gin.New()

	if port == "" {
		//DEV
		port = PORT
		log.Print("$PORT must be set")

		//router.Use(cors.Default())
		router.Use(cors.New(cors.Config{
			AllowOrigins:     []string{"*"},
			AllowMethods:     []string{"PUT", "PATCH", "GET", "POST", "DELETE"},
			AllowHeaders:     []string{"*"},
			AllowCredentials: false,

			MaxAge: 12 * time.Hour,
		}))
	//	router.OPTIONS("/:sm", preflight)

	}

	repo := GetGamesRepository()

	router.Use(gin.Logger())

	router.LoadHTMLGlob("frontend/build/*.html")
	router.Static("/static", "frontend/build/static")

	router.GET("/", func(c *gin.Context) {
		c.HTML(http.StatusOK, "index.html", nil)
	})
	router.GET("/home", func(c *gin.Context) {
		c.HTML(http.StatusOK, "home.tmpl.html", nil)
	})
	router.GET("/Games", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{"status": http.StatusOK, "data": repo.GetAllGames()})

	})

	test(repo)

	router.POST("/game/players/:name", createGame(repo))

	router.POST("/Games/:id/players/:name", func(context *gin.Context) {
		id, _ := strconv.Atoi(context.Param("id"))
		gameSelected := repo.GetGame(id)

		player := createPlayer(context.Param("name"))
		context.JSON(http.StatusOK, gin.H{"status": http.StatusOK, "data": (*gameSelected).AddPlayer(player)})

	})

	router.POST("/startGame/:id", func(context *gin.Context) {
		id, _ := strconv.Atoi(context.Param("id"))
		gameSelected := repo.GetGame(id)

		context.JSON(http.StatusOK, gin.H{"status": http.StatusOK, "data": (*gameSelected).Start()})

	})

	router.GET("/game/:id/players/:name/character", func(context *gin.Context) {
		id, _ := strconv.Atoi(context.Param("id"))
		gameSelected := repo.GetGame(id)

		context.JSON(http.StatusOK, gin.H{"status": http.StatusOK, "data": gameSelected.getCharacter(context.Param("name"))})
	})

	router.GET("/games/:id/players/:name", func(context *gin.Context) {
		id, _ := strconv.Atoi(context.Param("id"))
		context.JSON(http.StatusOK, gin.H{"status": http.StatusOK, "data": repo.GetGame(id)})
	})

	router.Run(":" + port)
}

func createGame(repo *GamesRepository) func(context *gin.Context) {
	return func(context *gin.Context) {
		adminName := context.Param("name")
		player := createPlayer(adminName)

		context.JSON(http.StatusOK, gin.H{"status": http.StatusOK, "data": repo.CreateGame(player)})
	}
}

func preflight(c *gin.Context) {
	c.Header("Access-Control-Allow-Origin", "*")
	c.Header("Access-Control-Allow-Headers", "access-control-allow-origin, access-control-allow-headers")
	c.JSON(http.StatusOK, struct{}{})
}

func test(repo *GamesRepository) {
	player := createPlayer("jhon")
	gid := repo.CreateGame(player)
	game := repo.GetGame(gid)
	//pgame := &game
	fmt.Println((*game).AddPlayer(createPlayer("Drake")))
	fmt.Println(*game.AddPlayer(createPlayer("Drake2")))
	(*game).ID = 123
	game2 := repo.GetGame(gid)
	fmt.Println("- - - ")
	fmt.Println(*game)
	fmt.Println(*game2)
	fmt.Println((*game2).AddPlayer(createPlayer("pita")))
	//	fmt.Println(game.AddPlayer(createPlayer("matias")))
	fmt.Println(game.Start())
	fmt.Println(game.Characters)
	fmt.Println(" ")
	fmt.Println(game.getCharacter("pita"))
}
