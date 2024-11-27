package services

import (
    "code-executor/models"
    "code-executor/executor"
)

type StatusService struct {
    executor *executor.Executor
}

func NewStatusService(executor *executor.Executor) *StatusService {
    return &StatusService{
        executor: executor,
    }
}

func (s *StatusService) GetExecutionStatus(id string) (*models.CodeExecution, error) {
    execution := s.executor.GetExecution(id)
    if execution == nil {
        return nil, ErrExecutionNotFound
    }
    return execution, nil
}