package config

type Config struct {
    Port            string
    MaxConcurrency  int
    DefaultTimeout  int
    DefaultMemLimit int64
    AllowedOrigins  []string
    EnableCORS      bool
}

func GetDefaultConfig() *Config {
    env := LoadEnv()
    return &Config{
        Port:            env.Port,
        MaxConcurrency:  env.MaxConcurrency,
        DefaultTimeout:  env.DefaultTimeout,
        DefaultMemLimit: env.DefaultMemoryLimit,
        AllowedOrigins:  env.AllowedOrigins,
        EnableCORS:      env.EnableCORS,
    }
}