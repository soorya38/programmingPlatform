// import React, { useState } from 'react';
// import Editor from '@monaco-editor/react';
// import axios from 'axios';
// import { CodingQuestion as CodingQuestionType } from '../../types';

// interface CodingQuestionProps {
//   question: CodingQuestionType;
//   answer?: string;
//   onChange: (value: string) => void;
// }

// export default function CodingQuestion({
//   question,
//   answer,
//   onChange
// }: CodingQuestionProps) {
//   const [testResult, setTestResult] = useState<string | null>(null);
//   const [isLoading, setIsLoading] = useState(false);
//   const [selectedLanguage, setSelectedLanguage] = useState<number>(63); // Default: JavaScript

//   // Supported languages (IDs based on Judge0 documentation)
//   const languages = [
//     { id: 63, name: 'JavaScript' },
//     { id: 54, name: 'C++ (GCC 9.2.0)' },
//     { id: 62, name: 'Java (OpenJDK 13.0.1)' },
//     { id: 71, name: 'Python (3.8.1)' },
//     { id: 60, name: 'Go (1.13.5)' },
//     // Add more languages as needed
//   ];

//   const testCode = async () => {
//     try {
//       setIsLoading(true);
//       setTestResult(null);
  
//       // Prepare the request payload
//       const payload = {
//         source_code: answer || question.starterCode,
//         language_id: selectedLanguage,
//         stdin: question.testCases[0]?.input || '',
//         expected_output: question.testCases[0]?.output || '',
//       };
  
//       // Log the request payload
//       console.log('Request Payload:', payload);
  
//       // Send the request to Judge0
//       const response = await axios.post('http://localhost:2358/submissions', payload);
  
//       // Get the token from the response to fetch the result
//       const { token } = response.data;
  
//       // Poll the Judge0 API for the result
//       const resultResponse = await axios.get(
//         `http://localhost:2358/submissions/${token}`,
//         { params: { base64_encoded: false } }
//       );
  
//       const result = resultResponse.data;
//       setTestResult(result.status.description);
//     } catch (error) {
//       console.error('Error testing code:', error);
//       setTestResult('Error occurred while testing the code.');
//     } finally {
//       setIsLoading(false);
//     }
//   };
  

//   return (
//     <div className="space-y-4">
//       <div className="prose max-w-none">
//         <p className="text-lg">{question.content}</p>
//       </div>

//       <div className="space-y-4">
//         {/* Language Selector */}
//         <div>
//           <label className="block text-sm font-medium text-gray-700" htmlFor="language">
//             Select Language
//           </label>
//           <select
//             id="language"
//             className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
//             value={selectedLanguage}
//             onChange={(e) => setSelectedLanguage(Number(e.target.value))}
//           >
//             {languages.map((language) => (
//               <option key={language.id} value={language.id}>
//                 {language.name}
//               </option>
//             ))}
//           </select>
//         </div>

//         {/* Code Editor */}
//         <div className="border rounded-lg overflow-hidden">
//           <Editor
//             height="400px"
//             defaultLanguage="javascript"
//             theme="vs-light"
//             value={answer || question.starterCode}
//             onChange={(value) => onChange(value || '')}
//             options={{
//               minimap: { enabled: false },
//               fontSize: 14,
//               lineNumbers: 'on',
//               scrollBeyondLastLine: false,
//               automaticLayout: true,
//             }}
//           />
//         </div>

//         {/* Test Code Button */}
//         <button
//           onClick={testCode}
//           className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
//           disabled={isLoading}
//         >
//           {isLoading ? 'Running...' : 'Test Code'}
//         </button>

//         {/* Test Result */}
//         {testResult && (
//           <div className="mt-4">
//             <h4 className="text-sm font-medium text-gray-700">Test Result:</h4>
//             <p className="text-sm text-gray-600">{testResult}</p>
//           </div>
//         )}

//         {/* Test Cases */}
//         {question.testCases.filter(tc => !tc.hidden).length > 0 && (
//           <div className="space-y-2">
//             <h3 className="text-sm font-medium text-gray-700">Sample Test Cases</h3>
//             <div className="grid gap-4 md:grid-cols-2">
//               {question.testCases
//                 .filter(tc => !tc.hidden)
//                 .map((testCase, index) => (
//                   <div
//                     key={index}
//                     className="p-4 bg-gray-50 rounded-lg space-y-2"
//                   >
//                     <div>
//                       <span className="text-sm font-medium text-gray-700">Input:</span>
//                       <pre className="mt-1 text-sm text-gray-600 whitespace-pre-wrap">
//                         {testCase.input}
//                       </pre>
//                     </div>
//                     <div>
//                       <span className="text-sm font-medium text-gray-700">Expected Output:</span>
//                       <pre className="mt-1 text-sm text-gray-600 whitespace-pre-wrap">
//                         {testCase.output}
//                       </pre>
//                     </div>
//                   </div>
//                 ))}
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }
