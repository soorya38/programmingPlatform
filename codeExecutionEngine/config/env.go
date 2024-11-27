package config

import (
    "os"
    "strconv"
    "strings"
)

// EnvConfig holds all environment-based configuration
type EnvConfig struct {
    // Server
    Port    string
    GinMode string

    // Execution
    MaxConcurrency     int
    DefaultTimeout     int
    DefaultMemoryLimit int64

    // Security
    AllowedOrigins []string
    EnableCORS     bool
}

// LoadEnv loads configuration from environment variables
func LoadEnv() *EnvConfig {
    return &EnvConfig{
        // Server
        Port:    getEnvString("PORT", ":8080"),
        GinMode: getEnvString("GIN_MODE", "debug"),

        // Execution
        MaxConcurrency:     getEnvInt("MAX_CONCURRENCY", 10),
        DefaultTimeout:     getEnvInt("DEFAULT_TIMEOUT_SECONDS", 5),
        DefaultMemoryLimit: getEnvInt64("DEFAULT_MEMORY_LIMIT_MB", 128),

        // Security
        AllowedOrigins: getEnvStringSlice("ALLOWED_ORIGINS", []string{"*"}),
        EnableCORS:     getEnvBool("ENABLE_CORS", true),
    }
}

// Helper functions to get environment variables with defaults
func getEnvString(key string, defaultValue string) string {
    if value, exists := os.LookupEnv(key); exists {
        return value
    }
    return defaultValue
}

func getEnvInt(key string, defaultValue int) int {
    if value, exists := os.LookupEnv(key); exists {
        if intValue, err := strconv.Atoi(value); err == nil {
            return intValue
        }
    }
    return defaultValue
}

func getEnvInt64(key string, defaultValue int64) int64 {
    if value, exists := os.LookupEnv(key); exists {
        if intValue, err := strconv.ParseInt(value, 10, 64); err == nil {
            return intValue
        }
    }
    return defaultValue
}

func getEnvBool(key string, defaultValue bool) bool {
    if value, exists := os.LookupEnv(key); exists {
        if boolValue, err := strconv.ParseBool(value); err == nil {
            return boolValue
        }
    }
    return defaultValue
}

func getEnvStringSlice(key string, defaultValue []string) []string {
    if value, exists := os.LookupEnv(key); exists {
        if value == "" {
            return defaultValue
        }
        return strings.Split(value, ",")
    }
    return defaultValue
}