package validator

import (
    "code-executor/models"
    "strings"
)

type Validator struct{}

func NewValidator() *Validator {
    return &Validator{}
}

func (v *Validator) Validate(result *models.ExecutionResult, testCases []models.TestCase) *models.ValidationResult {
    validationResult := &models.ValidationResult{
        Passed:    true,
        TestCases: make([]models.Result, 0),
        Summary: &models.ValidationSummary{
            TotalTests: len(testCases),
            PassedTests: 0,
            FailedTests: 0,
        },
    }

    for _, testCase := range testCases {
        // Clean up output by removing trailing newlines and spaces
        actualOutput := strings.TrimSpace(result.Stdout)
        expectedOutput := strings.TrimSpace(testCase.ExpectedOutput)
        
        passed := actualOutput == expectedOutput
        
        if passed {
            validationResult.Summary.PassedTests++
        } else {
            validationResult.Summary.FailedTests++
            validationResult.Passed = false
        }

        validationResult.TestCases = append(validationResult.TestCases, models.Result{
            Input:          testCase.Input,
            ExpectedOutput: testCase.ExpectedOutput,
            ActualOutput:   actualOutput,
            Passed:         passed,
            Description:    testCase.Description,
        })
    }

    return validationResult
}