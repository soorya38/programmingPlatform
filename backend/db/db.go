package db

import (
	"go.mongodb.org/mongo-driver/mongo"
)

var (
	QuestionsCollection       *mongo.Collection
	TestsCollection          *mongo.Collection
	TestSubmissionsCollection *mongo.Collection
	UsersCollection          *mongo.Collection
)

func InitDB(database *mongo.Database) {
	QuestionsCollection = database.Collection("questions")
	TestsCollection = database.Collection("tests")
	TestSubmissionsCollection = database.Collection("test_submissions")
	UsersCollection = database.Collection("users")
}