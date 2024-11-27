package runners

import (
    "code-executor/models"
    "context"
    "os"
    "os/exec"
    "path/filepath"
    "time"
)

type JavaScriptRunner struct{}

func NewJavaScriptRunner() *JavaScriptRunner {
    return &JavaScriptRunner{}
}

func (r *JavaScriptRunner) Execute(execution *models.CodeExecution, tmpDir string) *models.ExecutionResult {
    scriptPath := filepath.Join(tmpDir, "script.js")
    if err := os.WriteFile(scriptPath, []byte(execution.Code), 0600); err != nil {
        return &models.ExecutionResult{
            ExitCode: 1,
            Stderr:   err.Error(),
        }
    }

    ctx, cancel := context.WithTimeout(context.Background(),
        time.Duration(execution.Config.TimeoutSeconds)*time.Second)
    defer cancel()

    cmd := exec.CommandContext(ctx, "node", scriptPath)
    return RunCommand(cmd, execution.Input)
}