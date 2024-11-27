package models

import (
	"time"
)

// Test represents the test document structure
type Test struct {
	ID              string    `json:"id,omitempty" bson:"_id,omitempty"`
	Title           string    `json:"title" bson:"title"`
	Description     string    `json:"description" bson:"description"`
	StartTime       time.Time `json:"startTime" bson:"startTime"`
	EndTime         time.Time `json:"endTime" bson:"endTime"`
	Duration        int       `json:"duration" bson:"duration"`
	Questions       []string  `json:"questions" bson:"questions"`
	AllowedStudents []string  `json:"allowedStudents" bson:"allowedStudents"` // Updated to string for parsing
}

type TestSubmission struct {
	ID          string    `json:"id,omitempty" bson:"_id,omitempty"`
	TestID      string    `json:"testId" bson:"testId"`
	StudentID   string    `json:"studentId" bson:"studentId"`
	SubmittedAt time.Time `json:"submittedAt" bson:"submittedAt"`
	Answers     []Answer  `json:"answers" bson:"answers"`
}

type Answer struct {
	QuestionID string `json:"questionId" bson:"questionId"`
	AnswerText string `json:"answerText" bson:"answerText"`
}
