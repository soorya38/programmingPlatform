package models

import (
	"time"

	"go.mongodb.org/mongo-driver/bson/primitive"
)

type User struct {
	ID           primitive.ObjectID `json:"id" bson:"_id,omitempty"`
	FullName     string            `json:"fullName" bson:"fullName"`
	Email        string            `json:"email" bson:"email"`
	Phone        string            `json:"phone" bson:"phone"`
	Institution  string            `json:"institution" bson:"institution"`
	Department   string            `json:"department" bson:"department"`
	StudentID    string            `json:"studentId,omitempty" bson:"studentId,omitempty"`
	Bio          string            `json:"bio" bson:"bio"`
	CreatedAt    time.Time         `json:"createdAt" bson:"createdAt"`
	UpdatedAt    time.Time         `json:"updatedAt" bson:"updatedAt"`
}