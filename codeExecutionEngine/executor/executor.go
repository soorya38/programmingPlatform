package executor

import (
    "code-executor/executor/languages"
    "code-executor/executor/runners"
    "code-executor/executor/store"
    "code-executor/executor/validator"
    "code-executor/models"
    "fmt"
    "os"
    "time"
)

type Executor struct {
    store          *store.ExecutionStore
    pythonRunner   *runners.PythonRunner
    jsRunner       *runners.JavaScriptRunner
    validator      *validator.Validator
}

func NewExecutor() *Executor {
    return &Executor{
        store:        store.NewExecutionStore(),
        pythonRunner: runners.NewPythonRunner(),
        jsRunner:     runners.NewJavaScriptRunner(),
        validator:    validator.NewValidator(),
    }
}

func (e *Executor) Execute(execution *models.CodeExecution) {
    e.store.Save(execution)
    execution.Status = models.StatusRunning

    tmpDir, err := os.MkdirTemp("", "code-execution-*")
    if err != nil {
        e.handleExecutionError(execution, err)
        return
    }
    defer os.RemoveAll(tmpDir)

    result := &models.ExecutionResult{}
    startTime := time.Now()

    // Execute with main input first
    switch execution.Language {
    case "javascript":
        result = e.jsRunner.Execute(execution, tmpDir)
    case "python":
        result = e.pythonRunner.Execute(execution, tmpDir)
    default:
        e.handleExecutionError(execution, fmt.Errorf("unsupported language"))
        return
    }

    result.ExecutionTime = time.Since(startTime).Seconds()
    
    // If test cases are provided, validate them
    if len(execution.TestCases) > 0 {
        execution.Validation = e.validator.Validate(result, execution.TestCases)
    }

    execution.Status = models.StatusCompleted
    execution.Result = result
    e.store.Save(execution)
}

func (e *Executor) GetExecution(id string) *models.CodeExecution {
    return e.store.Get(id)
}

func (e *Executor) handleExecutionError(execution *models.CodeExecution, err error) {
    execution.Status = models.StatusError
    execution.Result = &models.ExecutionResult{
        ExitCode: 1,
        Stderr:   err.Error(),
    }
    e.store.Save(execution)
}

func IsSupportedLanguage(language string) bool {
    return languages.IsSupported(language)
}

func GetSupportedLanguages() []string {
    return languages.GetSupported()
}