package main

import (
	"fmt"
	"log"
	"net/http"
	"os"
	"strconv"

	"github.com/gin-gonic/gin"
	_ "github.com/heroku/x/hmetrics/onload"
)

const (
	STATIC_DIR = "/static/"
	PORT       = "8080"
)


func main() {
	port := os.Getenv("PORT")
	if port == "" {
		port = "5000"
		log.Fatal("$PORT must be set")
	}
	repo := GetGamesRepository()

	router := gin.New()
	router.Use(gin.Logger())
	router.LoadHTMLGlob("templates/*.tmpl.html")
	router.Static("/static", "static")

	router.GET("/", func(c *gin.Context) {
		c.HTML(http.StatusOK, "index.tmpl.html", nil)
	})
	router.GET("/home", func(c *gin.Context) {
		c.HTML(http.StatusOK, "home.tmpl.html", nil)
	})
	router.GET("/Games", func(c *gin.Context) {
		c.JSON(http.StatusOK,gin.H{"status": http.StatusOK, "data": repo.GetAllGames()})

	})


	player :=createPlayer("jhon")

	gid:=repo.CreateGame(player)
	game := repo.GetGame(gid)

	//pgame := &game
	fmt.Println((*game).AddPlayer(createPlayer("Drake")))
	fmt.Println(*game.AddPlayer(createPlayer("Drake2")))

	(*game).ID=123
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



	router.POST("/game/players/:name", func(context *gin.Context) {
		adminName := context.Param("name")
		player :=createPlayer(adminName)

		context.JSON(http.StatusOK, gin.H{"status": http.StatusOK, "data": repo.CreateGame(player)} )
	})



	router.POST("/Games/:id/players/:name", func(context *gin.Context) {
		id, _ := strconv.Atoi(context.Param("id"))
		gameSelected := repo.GetGame(id)

			player:=createPlayer(context.Param("name"))
			context.JSON(http.StatusOK, gin.H{"status": http.StatusOK, "data": (*gameSelected).AddPlayer(player)} )

	})

	router.POST("/startGame/:id", func(context *gin.Context) {
		id, _ := strconv.Atoi(context.Param("id"))
		gameSelected := repo.GetGame(id)

			context.JSON(http.StatusOK, gin.H{"status": http.StatusOK, "data": (*gameSelected).Start()} )

	})

	router.GET("/game/:id/players/:name/character", func(context *gin.Context) {
		id, _ := strconv.Atoi(context.Param("id"))
		gameSelected := repo.GetGame(id)

			context.JSON(http.StatusOK, gin.H{"status": http.StatusOK, "data": gameSelected.getCharacter(context.Param("name"))} )

	})

	router.Run(":" + port)
}
