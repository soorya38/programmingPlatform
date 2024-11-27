package main

import (
    "code-executor/config"
    "code-executor/executor"
    "code-executor/handlers"
    "github.com/gin-gonic/gin"
    "github.com/gin-contrib/cors"
    "os"
)

func main() {
    cfg := config.GetDefaultConfig()

    // Set Gin mode
    gin.SetMode(os.Getenv("GIN_MODE"))
    
    exec := executor.NewExecutor()
    handler := handlers.NewExecuteHandler(exec)

    r := gin.Default()

    // Configure CORS if enabled
    if cfg.EnableCORS {
        r.Use(cors.New(cors.Config{
            AllowOrigins:     cfg.AllowedOrigins,
            AllowMethods:     []string{"GET", "POST"},
            AllowHeaders:     []string{"Content-Type"},
            ExposeHeaders:    []string{"Content-Length"},
            AllowCredentials: true,
            MaxAge:           12 * 60 * 60,
        }))
    }

    r.POST("/execute", handler.ExecuteCode)
    r.GET("/languages", handler.GetSupportedLanguages)
    r.GET("/status/:id", handler.GetExecutionStatus)

    r.Run(cfg.Port)
}