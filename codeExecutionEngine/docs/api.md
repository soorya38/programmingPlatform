```markdown
# Code Execution API Documentation

## Execute Code Endpoint

### POST /execute

Executes code with optional test cases and returns the results.

#### Request Structure

```json
{
    "language": "string",       // Programming language (e.g., "python", "javascript")
    "code": "string",          // Source code to execute
    "input": "string",         // Input data for the program
    "config": {
        "timeout_seconds": "number",  // Maximum execution time
        "memory_limit_mb": "number"   // Maximum memory usage in MB
    },
    "test_cases": [            // Optional test cases
        {
            "input": "string",           // Test input
            "expected_output": "string",  // Expected program output
            "description": "string"       // Test case description
        }
    ]
}
```

#### Response Structure

```json
{
    "id": "string",            // Unique execution ID
    "language": "string",      // Programming language used
    "code": "string",          // Executed source code
    "input": "string",         // Input provided
    "status": "string",        // Execution status
    "result": {
        "stdout": "string",         // Program output
        "stderr": "string",         // Error output
        "exit_code": "number",      // Program exit code
        "execution_time": "number", // Execution time in seconds
        "memory_usage": "number"    // Memory usage in bytes
    },
    "validation": {
        "passed": "boolean",        // Overall test suite result
        "test_cases": [
            {
                "input": "string",           // Test input
                "expected_output": "string", // Expected output
                "actual_output": "string",   // Actual output
                "passed": "boolean",         // Test case result
                "description": "string"      // Test description
            }
        ],
        "summary": {
            "total_tests": "number",   // Total number of tests
            "passed_tests": "number",  // Number of passed tests
            "failed_tests": "number"   // Number of failed tests
        }
    }
}
```

#### Status Codes

- 200: Successful execution
- 400: Invalid request
- 422: Execution error
- 500: Server error
```