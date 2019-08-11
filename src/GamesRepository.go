package main

import "sync"

var once sync.Once

// type global
type singleton map[string]string

var (
	instance singleton
)

func GamesRepository() singleton {

	once.Do(func() { // <-- atomic, does not allow repeating

		instance = make(singleton) // <-- thread safe

	})

	return instance
}