package store

import (
    "code-executor/models"
    "sync"
)

type ExecutionStore struct {
    executions map[string]*models.CodeExecution
    mutex      sync.RWMutex
}

func NewExecutionStore() *ExecutionStore {
    return &ExecutionStore{
        executions: make(map[string]*models.CodeExecution),
    }
}

func (s *ExecutionStore) Save(execution *models.CodeExecution) {
    s.mutex.Lock()
    defer s.mutex.Unlock()
    s.executions[execution.ID] = execution
}

func (s *ExecutionStore) Get(id string) *models.CodeExecution {
    s.mutex.RLock()
    defer s.mutex.RUnlock()
    return s.executions[id]
}