package main

import (
	"fmt"
	"log"
	"net/http"
	"os"

	"github.com/gin-gonic/gin"
	"github.com/gorilla/mux"
	_ "github.com/heroku/x/hmetrics/onload"
)

const (
	STATIC_DIR = "/static/"
	PORT       = "8080"
)

func main(){
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

func main2() {
	port := os.Getenv("PORT")
	port = "5001"
	if port == "" {
		log.Fatal("$PORT must be set")
	}

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

	router.Run(":" + port)

	GamesRepository()

	router.POST("/game/player/:name", func(context *gin.Context) {
		context.HTML(http.StatusOK, "home.tmpl.html", 43535)
	})
}
