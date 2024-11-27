package runners

import (
    "code-executor/models"
    "io"
    "os/exec"
)

func RunCommand(cmd *exec.Cmd, input string) *models.ExecutionResult {
    stdin, err := cmd.StdinPipe()
    if err != nil {
        return &models.ExecutionResult{
            ExitCode: 1,
            Stderr:   err.Error(),
        }
    }

    stdout, err := cmd.StdoutPipe()
    if err != nil {
        return &models.ExecutionResult{
            ExitCode: 1,
            Stderr:   err.Error(),
        }
    }

    stderr, err := cmd.StderrPipe()
    if err != nil {
        return &models.ExecutionResult{
            ExitCode: 1,
            Stderr:   err.Error(),
        }
    }

    if err := cmd.Start(); err != nil {
        return &models.ExecutionResult{
            ExitCode: 1,
            Stderr:   err.Error(),
        }
    }

    if input != "" {
        io.WriteString(stdin, input)
        stdin.Close()
    }

    stdoutBytes, _ := io.ReadAll(stdout)
    stderrBytes, _ := io.ReadAll(stderr)

    err = cmd.Wait()
    exitCode := 0
    if err != nil {
        if exitErr, ok := err.(*exec.ExitError); ok {
            exitCode = exitErr.ExitCode()
        }
    }

    return &models.ExecutionResult{
        Stdout:   string(stdoutBytes),
        Stderr:   string(stderrBytes),
        ExitCode: exitCode,
    }
}