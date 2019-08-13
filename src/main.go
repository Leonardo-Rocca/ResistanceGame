package main

import (
	"fmt"
	"log"
	"net/http"
	"os"
	"strconv"

	"github.com/gin-gonic/gin"
	"github.com/gorilla/mux"
	_ "github.com/heroku/x/hmetrics/onload"
)

const (
	STATIC_DIR = "/static/"
	PORT       = "8080"
)

func main2(){
	myRouter := mux.NewRouter().StrictSlash(true)
	//myRouter.PathPrefix("/").Handler(http.FileServer(http.Dir("/templates/home.tmpl.html")))
	myRouter.HandleFunc("/", homePage).Methods("GET")
	myRouter.HandleFunc("/game/player/:name", createNewGame).Methods("POST")
	http.Handle("/", myRouter) // enable the router

	myRouter.PathPrefix(STATIC_DIR)
	log.Fatal(http.ListenAndServe(":10000", myRouter))
}
func push(w http.ResponseWriter, resource string) {
	pusher, ok := w.(http.Pusher)
	fmt.Print(ok)
	if ok {
		if err := pusher.Push(resource, nil); err == nil {
			return
		}
	}
}
func createNewGame(writer http.ResponseWriter, request *http.Request) {
	vars := mux.Vars(request)
	key := vars["name"]

	fmt.Fprintf(writer, "Key: " + key)
}

func homePage(w http.ResponseWriter, r *http.Request){
	push(w,"/templates/home.tmpl.html")

//	fmt.Fprintf(w, "Welcome to the HomePage!")
//	fmt.Println("Endpoint Hit: homePage")

}

func main() {
	port := os.Getenv("PORT")
	port = "5001"
	if port == "" {
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
	router.GET("/games", func(c *gin.Context) {
		c.JSON(http.StatusOK,gin.H{"status": http.StatusOK, "data": repo.GetAllGames()})

	})


	player :=createPlayer("jhon")

	gid:=repo.CreateGame(player)
	game := repo.GetGame(gid)

	fmt.Println(game.AddPlayer(player))
	fmt.Println(game.AddPlayer(createPlayer("pita")))
	fmt.Println(game.Players)



	router.POST("/game/player/:name", func(context *gin.Context) {
		adminName := context.Param("name")
		player :=createPlayer(adminName)

		context.JSON(http.StatusOK, gin.H{"status": http.StatusOK, "data": repo.CreateGame(player)} )
	})

	router.POST("/games/:id/players/:name", func(context *gin.Context) {

		player:=createPlayer(context.Param("name"))
		fmt.Println(player)
		id, _ := strconv.Atoi(context.Param("id"))
		game := repo.GetGame(id)
		context.JSON(http.StatusOK, gin.H{"status": http.StatusOK, "data": game.AddPlayer(player)} )
	})


	router.Run(":" + port)
}
