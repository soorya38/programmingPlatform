## Code Execution API Curl Examples

### Execute Code with Multiple Test Cases

```bash
# Python Example: FizzBuzz Implementation
curl -X POST http://localhost:8080/execute \
  -H "Content-Type: application/json" \
  -d '{
    "language": "python",
    "code": "def fizzbuzz(n):\n    if n % 15 == 0:\n        return \"FizzBuzz\"\n    elif n % 3 == 0:\n        return \"Fizz\"\n    elif n % 5 == 0:\n        return \"Buzz\"\n    return str(n)\n\nn = int(input())\nprint(fizzbuzz(n))",
    "input": "15",
    "config": {
      "timeout_seconds": 5,
      "memory_limit_mb": 128
    },
    "test_cases": [
      {
        "input": "3",
        "expected_output": "Fizz",
        "description": "Number divisible by 3"
      },
      {
        "input": "5",
        "expected_output": "Buzz",
        "description": "Number divisible by 5"
      },
      {
        "input": "15",
        "expected_output": "FizzBuzz",
        "description": "Number divisible by both 3 and 5"
      },
      {
        "input": "7",
        "expected_output": "7",
        "description": "Number not divisible by 3 or 5"
      }
    ]
  }'

# JavaScript Example: String Reversal
curl -X POST http://localhost:8080/execute \
  -H "Content-Type: application/json" \
  -d '{
    "language": "javascript",
    "code": "function reverseString(str) {\n    return str.split(\"\").reverse().join(\"\");\n}\n\nconst readline = require(\"readline\").createInterface({input: process.stdin});\nreadline.on(\"line\", (line) => {\n    console.log(reverseString(line));\n    process.exit(0);\n});",
    "input": "hello",
    "config": {
      "timeout_seconds": 5,
      "memory_limit_mb": 128
    },
    "test_cases": [
      {
        "input": "hello",
        "expected_output": "olleh",
        "description": "Basic string reversal"
      },
      {
        "input": "12345",
        "expected_output": "54321",
        "description": "Numeric string reversal"
      },
      {
        "input": "",
        "expected_output": "",
        "description": "Empty string"
      },
      {
        "input": "a",
        "expected_output": "a",
        "description": "Single character"
      }
    ]
  }'

# Python Example: Array Sum
curl -X POST http://localhost:8080/execute \
  -H "Content-Type: application/json" \
  -d '{
    "language": "python",
    "code": "def array_sum(arr):\n    return sum(map(int, arr.split()))\n\nprint(array_sum(input()))",
    "input": "1 2 3 4 5",
    "config": {
      "timeout_seconds": 5,
      "memory_limit_mb": 128
    },
    "test_cases": [
      {
        "input": "1 2 3 4 5",
        "expected_output": "15",
        "description": "Positive numbers"
      },
      {
        "input": "-1 -2 -3",
        "expected_output": "-6",
        "description": "Negative numbers"
      },
      {
        "input": "0",
        "expected_output": "0",
        "description": "Single zero"
      },
      {
        "input": "10 -10",
        "expected_output": "0",
        "description": "Sum to zero"
      }
    ]
  }'
```

### Example Response with Multiple Test Cases

```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "language": "python",
  "code": "def fizzbuzz(n):\n    if n % 15 == 0:\n        return \"FizzBuzz\"\n    elif n % 3 == 0:\n        return \"Fizz\"\n    elif n % 5 == 0:\n        return \"Buzz\"\n    return str(n)",
  "input": "15",
  "status": "completed",
  "result": {
    "stdout": "FizzBuzz\n",
    "stderr": "",
    "exit_code": 0,
    "execution_time": 0.123,
    "memory_usage": 0
  },
  "validation": {
    "passed": true,
    "test_cases": [
      {
        "input": "3",
        "expected_output": "Fizz",
        "actual_output": "Fizz",
        "passed": true,
        "description": "Number divisible by 3"
      },
      {
        "input": "5",
        "expected_output": "Buzz",
        "actual_output": "Buzz",
        "passed": true,
        "description": "Number divisible by 5"
      },
      {
        "input": "15",
        "expected_output": "FizzBuzz",
        "actual_output": "FizzBuzz",
        "passed": true,
        "description": "Number divisible by both 3 and 5"
      },
      {
        "input": "7",
        "expected_output": "7",
        "actual_output": "7",
        "passed": true,
        "description": "Number not divisible by 3 or 5"
      }
    ],
    "summary": {
      "total_tests": 4,
      "passed_tests": 4,
      "failed_tests": 0
    }
  }
}
```