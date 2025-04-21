// const axios = require("axios");
// const dedent = require("dedent");

// const OPENROUTER_API_URL = "https://openrouter.ai/api/v1/chat/completions";
// const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;
// const MODEL_NAME = "deepseek/deepseek-r1:free"; // Updated model

// if (!OPENROUTER_API_KEY) {
//   throw new Error("Missing OPENROUTER_API_KEY environment variable.");
// }

// const getFallbackResponse = () => ({
//   response: "Here's a basic React template (fallback):",
//   updates: [{ operation: "creating", file: "App.js" }],
//   projectTitle: "React Starter",
//   explanation: "Default project with Tailwind CSS",
//   files: {
//     "/App.js": {
//       code: `import React from 'react';\n\nexport default function App() {\n  return (\n    <div className="min-h-screen bg-gray-50 p-4">\n      <h1 className="text-2xl font-bold text-blue-500">Welcome</h1>\n      <p className="mt-2 text-gray-600">Edit this to get started</p>\n    </div>\n  );\n}`,
//       styles:
//         "min-h-screen, bg-gray-50, p-4, text-2xl, font-bold, text-blue-500, mt-2, text-gray-600",
//     },
//   },
//   setupInstructions: "npm install && npm run dev",
// });

// const responses = [
//   "Alright! Here's how we'll create your",
//   "Great! Let's build your",
//   "Okay! Here's the plan for your",
//   "Let's enhance this feature! We'll create your",
//   "No problem! Here's how we'll approach your",
//   "Let's get started! We'll create your",
// ];
// const randomResponse = responses[Math.floor(Math.random() * responses.length)];



// const CODE_GEN_PROMPT = dedent`
// # Two-Phase Response System

//  ## Phase 1: Conversational Introduction (ALWAYS START WITH THIS)
//   Respond conversationally to the user's request first, then proceed with the structured output.
  
//   Example Response Format:
//   "${randomResponse} [Project Type]: [Brief 2-3 sentence explanation of the approach].
//   I'll generate a complete React project with [Key Features]."

// Provide step-by-step updates on file operations in a structured and natural format.
// Each update should mention the operation (Creating, Updating, Deleting) and the file name.
// Keep it concise, clear, and human-readable without JSON formatting.
// Example format:
//   Creating: App.js
//   Updating: components/Navbar.jsx

// ---
// ## Phase 2: Structured Output (After conversational intro)
// Generate a programming code structure for a React project using Vite. Create multiple components, organizing them in separate folders with filenames using the .js extension, if needed. The output should use Tailwind CSS for styling, without any third-party dependencies or libraries, except for icons from the lucide-react library, which should only be used when necessary. Available icons include: Heart, Shield, Clock, Users, Play, Home, Search, Menu, User, Settings, Mail, Bell, Calendar, Star, Upload, Download, Trash, Edit, Plus, Minus, Check, X, and ArrowRight. For example, you can import an icon as import { Heart } from "lucide-react" and use it in JSX as <Heart className="" />.


// Return the response in JSON format with the following schema:

// OUTPUT FORMAT REQUIREMENTS (strict JSON):
// {
//   "response": "Conversational Introduction",
//   "updates": [
//     {
//       "operation": "creating",
//       "file": "App.js"
//     },
//     {
//       "operation": "creating",
//       "file": "components/Navbar.jsx"
//     }
//   ],
//   "projectTitle": "Descriptive project title",
//   "explanation": "Detailed description of the project",
  
//   "files": {
//     "/components/ComponentName.jsx": {
//       "code": "// Complete JavaScript component code with all imports",
//       "styles": "Tailwind classes used (text-blue-500, p-4, etc.)"
//     },
//     "/App.js": {
//       "code": "// Complete main application code with all imports"
//     }
//   },
//   "setupInstructions": "npm install && npm run dev"
// }

// EXAMPLE OUTPUT:
// {
//   "response": "I'll create a complete Task Management Dashboard for you. This will include user authentication, task creation/editing, priority management, and a statistics dashboard.",
//   "updates": [
//     {
//       "operation": "creating",
//       "file": "App.js"
//     },
//     {
//       "operation": "creating",
//       "file": "components/Navbar.jsx"
//     }
//   ],
//   "projectTitle": "Task Management Dashboard",
//   "explanation": "A responsive task management dashboard with dark mode support, user authentication, and task tracking features",
   
//   "files": {
//     "/components/Navbar.jsx": {
//       "code": "import React, { useState } from 'react';\nimport PropTypes from 'prop-types';\nimport { Menu, Search } from 'lucide-react';\n\nconst Navbar = ({ toggleSidebar }) => {\n  const [searchQuery, setSearchQuery] = useState('');\n  \n  return (\n    <nav className=\"bg-white shadow-sm py-3 px-6 flex items-center justify-between sticky top-0 z-10 dark:bg-gray-800 dark:text-white\">\n      <div className=\"flex items-center space-x-4\">\n        <button \n          onClick={toggleSidebar}\n          className=\"md:hidden text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white\"\n          aria-label=\"Toggle sidebar\"\n        >\n          <Menu size={24} />\n        </button>\n        <h1 className=\"text-xl font-semibold text-gray-800 dark:text-white\">Dashboard</h1>\n      </div>\n      \n      <div className=\"flex-1 max-w-md mx-4 hidden md:block\">\n        <div className=\"relative\">\n          <Search className=\"absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400\" size={18} />\n          <input\n            type=\"text\"\n            placeholder=\"Search...\"\n            className=\"w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white\"\n            value={searchQuery}\n            onChange={(e) => setSearchQuery(e.target.value)}\n            aria-label=\"Search dashboard\"\n          />\n        </div>\n      </div>\n      \n      <div className=\"flex items-center space-x-4\">\n        <button className=\"p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700\" aria-label=\"Notifications\">\n          <div className=\"relative\">\n            <span className=\"absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500\"></span>\n          </div>\n        </button>\n        <div className=\"h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-medium\">\n          JD\n        </div>\n      </div>\n    </nav>\n  );\n};\n\nNavbar.propTypes = {\n  toggleSidebar: PropTypes.func.isRequired\n};\n\nexport default Navbar;",
//       "styles": "bg-white, dark:bg-gray-800, shadow-sm, py-3, px-6, flex, items-center, justify-between, sticky, top-0, z-10, text-gray-600, hover:text-gray-900, dark:text-gray-300, dark:hover:text-white, text-xl, font-semibold"
//     }
//   },
//   "setupInstructions": "npm install prop-types lucide-react && npm run dev"
// }

// - Use Tailwind Classes for Adding styles to the elements.

// - If user want to develop the full website the create atleat 5 pages more than 5 components like(Navbar, Footer, HeroSection, Testimonials, Contact form ,etc.)

// - If there is no need to make a multiple page dont make it focus on functionality ok.

// - Make better UI/UX. Apply UI/UX principals.

// - Dont leave comment like this (Eg: //write logic for handel reset) please write full code logics etc.

// - If you adding conditional rendering using turnary operator so please use backticks inside css or any logic.

// - Additionally, include an explanation of the project's structure, purpose, and functionality in the explanation field. Make the response concise and clear in one paragraph.

// - When asked then only use this package to import, here are some packages available to import and use (date-fns,react-chartjs-2,"firebase","@google/generative-ai" ) only when it required

// - Add Emoji icons whenever needed to give good user experinence

// - all designs I ask you to make, have them be beautiful, not cookie cutter. Make webpages that are fully featured and worthy for production.

// - By default, this template supports JSX syntax with Tailwind CSS classes, React hooks, and Lucide React for icons. Do not install other packages for UI themes, icons, etc unless absolutely necessary or I request them.

// - Use icons from lucide-react for logos.

// - Use stock photos from unsplash where appropriate, only valid URLs you know exist. Do not download the images, only link to them in image tags.





// `;

// const generateCodeFromAI = async (
//   userPrompt,
// temperature = 0.5,
// maxTokens = 800,

// ) => {
//   try {
//     const response = await axios.post(
//       OPENROUTER_API_URL,
//       {
//         model: MODEL_NAME,
//         messages: [
//           {
//             role: "system",
//             content: CODE_GEN_PROMPT,
//           },
//           {
//             role: "user",
//             content: userPrompt || "Create a simple React component",
//           },
//         ],
//         temperature,
//         max_tokens: maxTokens,
//       },
//       {
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${OPENROUTER_API_KEY}`,
//           "HTTP-Referer": "https://www.devplex.in",
//           "X-Title": "Devplex AI",
//         },
//         timeout: 20000,
//       }
//     );

//     try {
//       const content = response.data.choices[0]?.message?.content || "";
//   const cleanJSON = content.replace(/```json|```/g, "").trim();

//   if (!cleanJSON) throw new Error("Empty response received from OpenRouter.");

//   let result;
//   try {
//     result = JSON.parse(cleanJSON);
//   } catch (jsonError) {
//     console.warn("⚠️ JSON parsing failed:", jsonError.message);
//     console.log("🚨 Raw API Response:", cleanJSON);


//     const fixedJSON = cleanJSON.replace(/,\s*}/g, "}").replace(/,\s*]/g, "]");

//     try {
//       result = JSON.parse(fixedJSON);
//     } catch (finalError) {
//       console.error("❌ Final JSON parsing failed. Falling back to default.");
//       return getFallbackResponse();
//     }
//   }

//   if (!result.files || typeof result.files !== "object") {
//     throw new Error("Invalid files structure in API response.");
//   }

//   return result;

//     } catch (e) {
//       console.warn("Response parsing failed, using fallback:", e.message);
//       return getFallbackResponse();
//     }
//   } catch (error) {
//     console.error("OpenRouter API Error:", {
//       status: error.response?.status,
//       message: error.message,
//       data: error.response?.data,
//     });

//     return {
//       error: "API request failed",
//       details: error.response?.data?.error?.message || error.message,
//       ...getFallbackResponse(),
//     };
//   }
// };

// module.exports = generateCodeFromAI;
// const axios = require("axios");
// const dedent = require("dedent");

// const OPENROUTER_API_URL = "https://openrouter.ai/api/v1/chat/completions";
// const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;
// const MODEL_NAME = "deepseek/deepseek-r1:free";

// if (!OPENROUTER_API_KEY) {
//   throw new Error("Missing OPENROUTER_API_KEY environment variable.");
// }

// // Improved fallback response with more complete structure
// const getFallbackResponse = () => ({
//   response: "Here's a basic React template (fallback):",
//   updates: [
//     { operation: "creating", file: "App.js" },
//     { operation: "creating", file: "components/Main.jsx" },
//     { operation: "creating", file: "components/Header.jsx" },
//   ],
//   projectTitle: "React Starter",
//   explanation:
//     "Default project with Tailwind CSS and basic component structure",
//   files: {
//     "/App.js": {
//       code: `import React from 'react';\nimport Header from './components/Header';\nimport Main from './components/Main';\n\nexport default function App() {\n  return (\n    <div className="min-h-screen bg-gray-50 flex flex-col">\n      <Header />\n      <Main />\n    </div>\n  );\n}`,
//       styles: "min-h-screen, bg-gray-50, flex, flex-col",
//     },
//     "/components/Header.jsx": {
//       code: `import React from 'react';\n\nexport default function Header() {\n  return (\n    <header className="bg-white shadow-sm p-4">\n      <h1 className="text-2xl font-bold text-blue-500">Welcome</h1>\n    </header>\n  );\n}`,
//       styles: "bg-white, shadow-sm, p-4, text-2xl, font-bold, text-blue-500",
//     },
//     "/components/Main.jsx": {
//       code: `import React from 'react';\n\nexport default function Main() {\n  return (\n    <main className="flex-1 p-4">\n      <p className="text-gray-600">Edit this to get started</p>\n    </main>\n  );\n}`,
//       styles: "flex-1, p-4, text-gray-600",
//     },
//   },
//   setupInstructions: "npm install && npm run dev",
// });

// const responses = [
//   "Alright! Here's how we'll create your",
//   "Great! Let's build your",
//   "Okay! Here's the plan for your",
//   "Let's enhance this feature! We'll create your",
//   "No problem! Here's how we'll approach your",
//   "Let's get started! We'll create your",
// ];
// const randomResponse = responses[Math.floor(Math.random() * responses.length)];



// const CODE_GEN_PROMPT = `
// # Two-Phase Response System

//  ## Phase 1: Conversational Introduction (ALWAYS START WITH THIS)
//   Respond conversationally to the user's request first, then proceed with the structured output.
  
//   Example Response Format:
//   "${randomResponse} [Project Type]: [Brief 2-3 sentence explanation of the approach].
//   I'll generate a complete React project with [Key Features]."

// Provide step-by-step updates on file operations in a structured and natural format.
// Each update should mention the operation (Creating, Updating, Deleting) and the file name.
// Keep it concise, clear, and human-readable without JSON formatting.
// Example format:
//   Creating: App.js
//   Updating: components/Navbar.jsx

// ---
// ## Phase 2: Structured Output (After conversational intro)
// Generate a programming code structure for a React project using Vite. Create multiple components, organizing them in separate folders with filenames using the .js extension, if needed. The output should use Tailwind CSS for styling, without any third-party dependencies or libraries, except for icons from the lucide-react library, which should only be used when necessary. Available icons include: Heart, Shield, Clock, Users, Play, Home, Search, Menu, User, Settings, Mail, Bell, Calendar, Star, Upload, Download, Trash, Edit, Plus, Minus, Check, X, and ArrowRight. For example, you can import an icon as import { Heart } from "lucide-react" and use it in JSX as <Heart className="" />.
// USER REQUIREMENTS:

// Return the response in JSON format with the following schema:

// OUTPUT FORMAT REQUIREMENTS (strict JSON):
// {
//   "response": "Conversational Introduction",
//   "updates": [
//     {
//       "operation": "creating",
//       "file": "App.js"
//     },
//     {
//       "operation": "creating",
//       "file": "components/Navbar.jsx"
//     }
//   ],
//   "projectTitle": "Descriptive project title",
//   "explanation": "Detailed description of the project",
  
//   "files": {
//     "/components/ComponentName.jsx": {
//       "code": "// Complete JavaScript component code with all imports",
//       "styles": "Tailwind classes used (text-blue-500, p-4, etc.)"
//     },
//     "/App.js": {
//       "code": "// Complete main application code with all imports"
//     }
//   },
//   "setupInstructions": "npm install && npm run dev"
// }

// EXAMPLE OUTPUT:
// {
//   "response": "I'll create a complete Task Management Dashboard for you. This will include user authentication, task creation/editing, priority management, and a statistics dashboard.",
//   "updates": [
//     {
//       "operation": "creating",
//       "file": "App.js"
//     },
//     {
//       "operation": "creating",
//       "file": "components/Navbar.jsx"
//     }
//   ],
//   "projectTitle": "Task Management Dashboard",
//   "explanation": "A responsive task management dashboard with dark mode support, user authentication, and task tracking features",
   
//   "files": {
//     "/components/Navbar.jsx": {
//       "code": "import React, { useState } from 'react';\nimport PropTypes from 'prop-types';\nimport { Menu, Search } from 'lucide-react';\n\nconst Navbar = ({ toggleSidebar }) => {\n  const [searchQuery, setSearchQuery] = useState('');\n  \n  return (\n    <nav className=\"bg-white shadow-sm py-3 px-6 flex items-center justify-between sticky top-0 z-10 dark:bg-gray-800 dark:text-white\">\n      <div className=\"flex items-center space-x-4\">\n        <button \n          onClick={toggleSidebar}\n          className=\"md:hidden text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white\"\n          aria-label=\"Toggle sidebar\"\n        >\n          <Menu size={24} />\n        </button>\n        <h1 className=\"text-xl font-semibold text-gray-800 dark:text-white\">Dashboard</h1>\n      </div>\n      \n      <div className=\"flex-1 max-w-md mx-4 hidden md:block\">\n        <div className=\"relative\">\n          <Search className=\"absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400\" size={18} />\n          <input\n            type=\"text\"\n            placeholder=\"Search...\"\n            className=\"w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white\"\n            value={searchQuery}\n            onChange={(e) => setSearchQuery(e.target.value)}\n            aria-label=\"Search dashboard\"\n          />\n        </div>\n      </div>\n      \n      <div className=\"flex items-center space-x-4\">\n        <button className=\"p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700\" aria-label=\"Notifications\">\n          <div className=\"relative\">\n            <span className=\"absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500\"></span>\n          </div>\n        </button>\n        <div className=\"h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-medium\">\n          JD\n        </div>\n      </div>\n    </nav>\n  );\n};\n\nNavbar.propTypes = {\n  toggleSidebar: PropTypes.func.isRequired\n};\n\nexport default Navbar;",
//       "styles": "bg-white, dark:bg-gray-800, shadow-sm, py-3, px-6, flex, items-center, justify-between, sticky, top-0, z-10, text-gray-600, hover:text-gray-900, dark:text-gray-300, dark:hover:text-white, text-xl, font-semibold"
//     }
//   },
//   "setupInstructions": "npm install prop-types lucide-react && npm run dev"
// }

// - Use Tailwind Classes for Adding styles to the elements.

// - If user want to develop the full website the create atleat 5 pages more than 5 components like(Navbar, Footer, HeroSection, Testimonials, Contact form ,etc.)

// - If there is no need to make a multiple page dont make it focus on functionality ok.

// - Make better UI/UX. Apply UI/UX principals.

// - Dont leave comment like this (Eg: //write logic for handel reset) please write full code logics etc.

// - If you adding conditional rendering using turnary operator so please use backticks inside css or any logic.

// - Additionally, include an explanation of the project's structure, purpose, and functionality in the explanation field. Make the response concise and clear in one paragraph.

// - When asked then only use this package to import, here are some packages available to import and use (date-fns,react-chartjs-2,"firebase","@google/generative-ai" ) only when it required

// - Add Emoji icons whenever needed to give good user experinence

// - all designs I ask you to make, have them be beautiful, not cookie cutter. Make webpages that are fully featured and worthy for production.

// - By default, this template supports JSX syntax with Tailwind CSS classes, React hooks, and Lucide React for icons. Do not install other packages for UI themes, icons, etc unless absolutely necessary or I request them.

// - Use icons from lucide-react for logos.

// - Use stock photos from unsplash where appropriate, only valid URLs you know exist. Do not download the images, only link to them in image tags.

// RESPONSE FORMAT:
// - Your response must be valid JSON ONLY, beginning with { and ending with }.
// - Do not wrap the response in markdown or add any extraneous text.


// `;

// // Helper function to determine if an error is retryable
// const isRetryableError = (error) => {
//   // Return true for network errors, 5xx server errors, etc.
//   return !error.response || error.response.status >= 500;
// };

// // Function to check for missing components and generate them
// const checkAndGenerateMissingFiles = (extractedFiles, userPrompt) => {
//   const missingImports = {};

//   // Scan all files for imports
//   Object.entries(extractedFiles).forEach(([filePath, fileData]) => {
//     const code = fileData.code;
//     const importRegex = /import\s+(\w+)\s+from\s+['"](.+?)['"]/g;
//     let match;

//     while ((match = importRegex.exec(code)) !== null) {
//       const [_, componentName, importPath] = match;

//       // Handle relative imports only
//       if (importPath.startsWith("./") || importPath.startsWith("../")) {
//         // Resolve the import path to an absolute path
//         const currentDir = filePath.substring(0, filePath.lastIndexOf("/") + 1);
//         let resolvedPath = "";

//         if (importPath.startsWith("./")) {
//           resolvedPath = currentDir + importPath.substring(2);
//         } else if (importPath.startsWith("../")) {
//           // Simple implementation - might need enhancement for complex paths
//           const parentDir = currentDir.split("/").slice(0, -2).join("/") + "/";
//           resolvedPath = parentDir + importPath.substring(3);
//         }

//         // Add .jsx extension if it's missing
//         if (!resolvedPath.endsWith(".jsx") && !resolvedPath.endsWith(".js")) {
//           resolvedPath += ".jsx";
//         }

//         // Check if the imported file exists
//         if (!extractedFiles[resolvedPath]) {
//           console.log(
//             `Missing import: ${componentName} from ${importPath} (resolved to ${resolvedPath})`
//           );
//           missingImports[resolvedPath] = componentName;
//         }
//       }
//     }
//   });

//   // Generate missing files based on common patterns
//   Object.entries(missingImports).forEach(([filePath, componentName]) => {
//     console.log(
//       `Generating fallback for missing component: ${componentName} at ${filePath}`
//     );

//     // Check for common component names and generate appropriate fallbacks
//     if (
//       componentName === "Square" &&
//       userPrompt.toLowerCase().includes("tic tac toe")
//     ) {
//       extractedFiles[filePath] = {
//         code: `import React from 'react';\n\nexport default function Square({ value, onClick, isWinning }) {\n  return (\n    <button\n      className={\`w-16 h-16 border border-gray-400 text-2xl font-bold flex items-center justify-center \${isWinning ? 'bg-green-200' : 'bg-white'}\`}\n      onClick={onClick}\n    >\n      {value}\n    </button>\n  );\n}`,
//         styles:
//           "w-16, h-16, border, border-gray-400, text-2xl, font-bold, flex, items-center, justify-center, bg-green-200, bg-white",
//       };
//     } else {
//       // Generic component fallback
//       extractedFiles[filePath] = {
//         code: `import React from 'react';\n\nexport default function ${componentName}(props) {\n  console.log('Fallback ${componentName} component props:', props);\n  return (\n    <div className="p-4 border border-red-300 bg-red-50 rounded">\n      <p className="text-red-500 font-medium">Fallback ${componentName} Component</p>\n      <p className="text-sm text-red-400">This is a generated fallback. The original component was missing in the AI response.</p>\n    </div>\n  );\n}`,
//         styles:
//           "p-4, border, border-red-300, bg-red-50, rounded, text-red-500, font-medium, text-sm, text-red-400",
//       };
//     }
//   });

//   return extractedFiles;
// };

// // Function to extract and process partial content when JSON parsing fails
// const extractPartialContent = (content, userPrompt) => {
//   console.log("Attempting to extract partial content...");
//   const fallback = getEnhancedFallback(
//     userPrompt,
//     "Parsing failed - extracting partial content"
//   );

//   // Try to extract whatever files we can
//   const filePattern =
//     /"([^"]+\.jsx?)":\s*{\s*"code":\s*"([\s\S]*?)",\s*"styles":\s*"([^"]*)"/g;
//   let match;
//   const extractedFiles = {};

//   while ((match = filePattern.exec(content)) !== null) {
//     const [_, filePath, code, styles] = match;
//     if (filePath && code) {
//       console.log(`Extracted file: ${filePath}`);
//       extractedFiles[filePath] = {
//         code: code.replace(/\\"/g, '"').replace(/\\n/g, "\n"),
//         styles: styles || "",
//       };
//     }
//   }

//   // If we found any files, merge them with the fallback
//   if (Object.keys(extractedFiles).length > 0) {
//     console.log(
//       `Successfully extracted ${Object.keys(extractedFiles).length} files`
//     );

//     // Check and generate missing components
//     const completeFiles = checkAndGenerateMissingFiles(
//       extractedFiles,
//       userPrompt
//     );

//     return {
//       ...fallback,
//       files: {
//         ...fallback.files,
//         ...completeFiles,
//       },
//     };
//   }

//   console.log("File extraction failed, using complete fallback");
//   return fallback;
// };

// // Function to handle and repair partial JSON responses
// const handlePartialResponse = (content, userPrompt) => {
//   if (!content) {
//     console.log("No content to parse");
//     return getEnhancedFallback(userPrompt, "Empty response received");
//   }

//   console.log("Content starts with:", content.substring(0, 20));

//   // Check if content is HTML
//   if (content.trim().startsWith("<")) {
//     console.log("Content appears to be HTML, not JSON");
//     return getEnhancedFallback(userPrompt, "Received HTML instead of JSON");
//   }

//   // Try to extract the most complete JSON possible
//   let jsonStart = content.indexOf("{");
//   let jsonEnd = content.lastIndexOf("}") + 1;

//   // If we can't find proper boundaries, use the whole content
//   if (jsonStart === -1 || jsonEnd <= 0) {
//     console.log("No valid JSON structure found");
//     return getEnhancedFallback(
//       userPrompt,
//       "No valid JSON structure in response"
//     );
//   }

//   let jsonStr = content.slice(jsonStart, jsonEnd);
//   console.log("Extracted JSON length:", jsonStr.length);

//   // Check for HTML within extracted JSON
//   if (jsonStr.includes("<")) {
//     const htmlIndex = jsonStr.indexOf("<");
//     console.log("HTML tag found within JSON at position:", htmlIndex);
//     console.log(
//       "Context around HTML:",
//       jsonStr.substring(Math.max(0, htmlIndex - 20), htmlIndex + 40)
//     );

//     // Try to clean the JSON string by escaping HTML characters
//     jsonStr = jsonStr.replace(/</g, "\\u003c").replace(/>/g, "\\u003e");
//     console.log("Attempted to escape HTML characters in JSON");
//   }

//   // Basic JSON repair attempts
//   const repairAttempts = [
//     // Fix truncated objects
//     () => {
//       const openBraces = (jsonStr.match(/{/g) || []).length;
//       const closeBraces = (jsonStr.match(/}/g) || []).length;
//       if (openBraces > closeBraces) {
//         console.log(
//           `Adding ${openBraces - closeBraces} missing closing braces`
//         );
//         jsonStr += "}".repeat(openBraces - closeBraces);
//       }
//     },
//     // Fix truncated arrays
//     () => {
//       const openBrackets = (jsonStr.match(/\[/g) || []).length;
//       const closeBrackets = (jsonStr.match(/\]/g) || []).length;
//       if (openBrackets > closeBrackets) {
//         console.log(
//           `Adding ${openBrackets - closeBrackets} missing closing brackets`
//         );
//         jsonStr += "]".repeat(openBrackets - closeBrackets);
//       }
//     },
//     // Fix truncated strings
//     () => {
//       const fixedStr = jsonStr.replace(/"([^"\\]*(\\.[^"\\]*)*)$/, '"$1"');
//       if (fixedStr !== jsonStr) {
//         console.log("Fixed truncated string");
//         jsonStr = fixedStr;
//       }
//     },
//     // Fix unescaped quotes in strings
//     () => {
//       // This is a simplistic approach - a full solution would be more complex
//       let inString = false;
//       let fixed = "";
//       let lastChar = "";

//       for (let i = 0; i < jsonStr.length; i++) {
//         const char = jsonStr[i];

//         if (char === '"' && lastChar !== "\\") {
//           inString = !inString;
//         } else if (char === '"' && lastChar === "\\" && inString) {
//           // This is an escaped quote in a string, leave it alone
//         } else if (inString && char === '"' && lastChar !== "\\") {
//           // Unescaped quote in a string - escape it
//           fixed += "\\" + char;
//           console.log("Fixed unescaped quote at position", i);
//           continue;
//         }

//         fixed += char;
//         lastChar = char;
//       }

//       if (fixed !== jsonStr) {
//         console.log("Fixed potentially unescaped quotes");
//         jsonStr = fixed;
//       }
//     },
//     // Handle code blocks with backticks that might not be properly escaped
//     () => {
//       // Look for unescaped backticks in what appears to be code
//       const backtickFixedStr = jsonStr.replace(/([^\\])`/g, "$1\\`");
//       if (backtickFixedStr !== jsonStr) {
//         console.log("Fixed unescaped backticks");
//         jsonStr = backtickFixedStr;
//       }
//     },
//     // Handle potential issues with backslashes before newlines
//     () => {
//       const newlineFixedStr = jsonStr.replace(/\\\n/g, "\\n");
//       if (newlineFixedStr !== jsonStr) {
//         console.log("Fixed escaped newlines");
//         jsonStr = newlineFixedStr;
//       }
//     },
//   ];

//   for (const attempt of repairAttempts) {
//     attempt();
//   }

//   try {
//     console.log("Attempting to parse JSON...");
//     const result = JSON.parse(jsonStr);
//     console.log("JSON parse successful");

//     // Validate minimum required structure
//     if (!result.files || typeof result.files !== "object") {
//       console.log("Missing or invalid files structure:", result.files);
//       throw new Error("Invalid files structure");
//     }

//     // Check for missing component imports and generate them
//     console.log("Checking for missing component imports...");
//     result.files = checkAndGenerateMissingFiles(result.files, userPrompt);

//     // If we have partial files, merge with fallback
//     if (Object.keys(result.files).length < 2) {
//       console.log("Incomplete files structure, merging with fallback");
//       const fallback = getFallbackResponse();
//       return {
//         ...fallback,
//         ...result,
//         files: {
//           ...fallback.files,
//           ...result.files,
//         },
//       };
//     }

//     return result;
//   } catch (parseError) {
//     console.error("JSON parse failed:", parseError.message);

//     // Additional debugging for specific errors
//     if (parseError.message.includes("Unexpected token")) {
//       const tokenMatch = parseError.message.match(
//         /Unexpected token (.) in JSON/
//       );
//       if (tokenMatch && tokenMatch[1]) {
//         const badToken = tokenMatch[1];
//         const tokenPos = parseError.message.match(/position (\d+)/)
//           ? parseInt(parseError.message.match(/position (\d+)/)[1])
//           : -1;

//         console.log(`Bad token '${badToken}' at position ${tokenPos}`);
//         if (tokenPos >= 0) {
//           const contextStart = Math.max(0, tokenPos - 30);
//           const contextEnd = Math.min(jsonStr.length, tokenPos + 30);
//           console.log(
//             "Context:",
//             jsonStr.substring(contextStart, tokenPos) +
//               "<<<HERE>>>" +
//               jsonStr.substring(tokenPos, contextEnd)
//           );
//         }
//       }
//     }

//     return extractPartialContent(content, userPrompt);
//   }
// };

// // Main function to generate code from AI
// const generateCodeFromAI = async (
//   userPrompt,
//   temperature = 0.5,
//   maxTokens = 2000
// ) => {
//   const MAX_RETRIES = 2;
//   let retryCount = 0;

//   while (retryCount <= MAX_RETRIES) {
//     // Create an abort controller for timeout handling
//     const controller = new AbortController();
//     const timeoutId = setTimeout(() => {
//       controller.abort();
//     }, 65000); // Slightly longer than axios timeout

//     try {
//       console.log(
//         `Making API request to OpenRouter${
//           retryCount > 0 ? ` (Retry ${retryCount}/${MAX_RETRIES})` : ""
//         }...`
//       );

//       const response = await axios.post(
//         OPENROUTER_API_URL,
//         {
//           model: MODEL_NAME,
//           messages: [
//             {
//               role: "system",
//               content: CODE_GEN_PROMPT,
//             },
//             {
//               role: "user",
//               content: userPrompt || "Create a simple React component",
//             },
//           ],
//           temperature,
//           max_tokens: maxTokens,
//           stream: false,
//         },
//         {
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${OPENROUTER_API_KEY}`,
//             "HTTP-Referer": "https://www.devplex.in",
//             "X-Title": "Devplex AI",
//           },
//           timeout: 60000,
//           signal: controller.signal,
//         }
//       );

//       // Clear the timeout since the request completed
//       clearTimeout(timeoutId);

//       // Debug logging
//       console.log("Response Status:", response.status);
//       console.log("Response Headers:", JSON.stringify(response.headers));

//       // Check if response.data is an object
//       if (typeof response.data !== "object") {
//         console.log("Response is not an object:", typeof response.data);
//         console.log("Preview:", response.data.substring(0, 200));
//         return getEnhancedFallback(userPrompt, "Invalid response format");
//       }

//       console.log("Response Data Structure:", Object.keys(response.data));

//       // Check for choices array
//       const choices = response.data.choices;
//       if (!choices || !Array.isArray(choices) || choices.length === 0) {
//         console.log("No choices or empty choices array");
//         return getEnhancedFallback(userPrompt, "No choices in response");
//       }

//       // Get the first choice
//       const firstChoice = choices[0];
//       console.log("First choice structure:", Object.keys(firstChoice));

//       // Check for message in the first choice
//       const message = firstChoice.message;
//       if (!message) {
//         console.log("No message field in first choice");
//         return getEnhancedFallback(userPrompt, "No message in choice");
//       }
//       console.log("Message structure:", Object.keys(message));

//       // Get and check content from the message
//       const content = message.content;
//       if (!content) {
//         console.log("No content in message");
//         return getEnhancedFallback(userPrompt, "Empty content in message");
//       }
//       console.log("Content type:", typeof content);
//       console.log("Content preview:", content.substring(0, 300));

//       // Process the content
//       return handlePartialResponse(content, userPrompt);
//     } catch (error) {
//       // Clear the timeout to prevent memory leaks
//       clearTimeout(timeoutId);

//       // Check for abort/timeout
//       if (error.name === "AbortError" || error.code === "ECONNABORTED") {
//         console.error("Request timed out");

//         // If we've reached max retries, return fallback
//         if (retryCount === MAX_RETRIES) {
//           return getEnhancedFallback(
//             userPrompt,
//             "API request timed out after max retries"
//           );
//         }

//         // Otherwise increment retryCount and try again
//         retryCount++;
//         console.log(`Timeout - Retry attempt ${retryCount}/${MAX_RETRIES}`);
//         await new Promise((resolve) => setTimeout(resolve, 1000 * retryCount));
//         continue;
//       }

//       // Log detailed error info
//       console.error("API Error:", {
//         status: error.response?.status,
//         statusText: error.response?.statusText,
//         message: error.message,
//         data: error.response?.data
//           ? typeof error.response.data === "string"
//             ? error.response.data.substring(0, 200)
//             : JSON.stringify(error.response.data).substring(0, 200)
//           : "No data",
//       });

//       // Check if error is retryable
//       if (retryCount < MAX_RETRIES && isRetryableError(error)) {
//         retryCount++;
//         console.log(
//           `Retryable error - Retry attempt ${retryCount}/${MAX_RETRIES}`
//         );
//         await new Promise((resolve) => setTimeout(resolve, 1000 * retryCount));
//         continue;
//       }

    
//       return  `API Error: ${error.message}`;
//     }
//   }

//   // This should only be reached if all retries fail
//   return {
//     error: "Failed to process AI response",
//     details: error.message,
//     code: "AI_SERVICE_ERROR",
//   };
// };

// // Enhanced fallback with Todo-specific template
// const getEnhancedFallback = (userPrompt, errorMsg = "") => {
//   const isTodoApp = /todo|task|reminder/i.test(userPrompt);
//   const fallback = getFallbackResponse();

//   const todoFiles = {
//     "/App.js": {
//       code: `import { useState } from 'react';\nimport TodoList from './components/TodoList';\n\nexport default function App() {\n  return (\n    <div className="min-h-screen bg-gray-50 p-4">\n      <h1 className="text-2xl font-bold text-center mb-6">Todo App</h1>\n      <TodoList />\n    </div>\n  );\n}`,
//       styles:
//         "min-h-screen, bg-gray-50, p-4, text-2xl, font-bold, text-center, mb-6",
//     },
//     "/components/TodoList.jsx": {
//       code: `import { useState } from 'react';\nimport TodoItem from './TodoItem';\n\nexport default function TodoList() {\n  const [todos, setTodos] = useState([]);\n  const [newTodo, setNewTodo] = useState('');\n\n  const addTodo = () => {\n    if (newTodo.trim()) {\n      setTodos([...todos, { id: Date.now(), text: newTodo, completed: false }]);\n      setNewTodo('');\n    }\n  };\n\n  const toggleTodo = (id) => {\n    setTodos(todos.map(todo => \n      todo.id === id ? { ...todo, completed: !todo.completed } : todo\n    ));\n  };\n\n  const deleteTodo = (id) => {\n    setTodos(todos.filter(todo => todo.id !== id));\n  };\n\n  return (\n    <div className="max-w-md mx-auto">\n      <div className="flex gap-2 mb-4">\n        <input\n          type="text"\n          value={newTodo}\n          onChange={(e) => setNewTodo(e.target.value)}\n          placeholder="Add new todo"\n          className="flex-1 p-2 border rounded"\n        />\n        <button \n          onClick={addTodo}\n          className="px-4 py-2 bg-blue-500 text-white rounded"\n        >\n          Add\n        </button>\n      </div>\n      <ul className="space-y-2">\n        {todos.map(todo => (\n          <TodoItem \n            key={todo.id} \n            todo={todo} \n            onToggle={toggleTodo} \n            onDelete={deleteTodo} \n          />\n        ))}\n      </ul>\n    </div>\n  );\n}`,
//       styles:
//         "max-w-md, mx-auto, flex, gap-2, mb-4, flex-1, p-2, border, rounded, px-4, py-2, bg-blue-500, text-white, space-y-2",
//     },
//     "/components/TodoItem.jsx": {
//       code: `export default function TodoItem({ todo, onToggle, onDelete }) {\n  return (\n    <li className="flex items-center justify-between p-3 bg-white rounded shadow">\n      <div className="flex items-center gap-3">\n        <input\n          type="checkbox"\n          checked={todo.completed}\n          onChange={() => onToggle(todo.id)}\n          className="h-5 w-5"\n        />\n        <span className={\`\${todo.completed ? 'line-through text-gray-400' : 'text-gray-800'}\`}>\n          {todo.text}\n        </span>\n      </div>\n      <button \n        onClick={() => onDelete(todo.id)}\n        className="text-red-500 hover:text-red-700"\n      >\n        Delete\n      </button>\n    </li>\n  );\n}`,
//       styles:
//         "flex, items-center, justify-between, p-3, bg-white, rounded, shadow, gap-3, h-5, w-5, line-through, text-gray-400, text-gray-800, text-red-500, hover:text-red-700",
//     },
//   };

//   return {
//     ...fallback,
//     response: `⚠️ ${errorMsg ? errorMsg + " - " : ""}Using ${
//       isTodoApp ? "Todo App" : "React"
//     } fallback template`,
//     projectTitle: isTodoApp
//       ? "Todo App (Fallback)"
//       : "React Starter (Fallback)",
//     explanation: isTodoApp
//       ? "Basic Todo application with add, toggle, and delete functionality"
//       : "Default React starter template with basic components",
//     updates: [
//       ...fallback.updates,
//       ...(isTodoApp
//         ? [
//             { operation: "creating", file: "components/TodoList.jsx" },
//             { operation: "creating", file: "components/TodoItem.jsx" },
//           ]
//         : []),
//     ],
//     files: isTodoApp ? todoFiles : fallback.files,
//     setupInstructions: "npm install && npm run dev",
//   };
// };

// module.exports = generateCodeFromAI;

const axios = require("axios");
const dedent = require("dedent");

const OPENROUTER_API_URL = "https://openrouter.ai/api/v1/chat/completions";
const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;
const MODEL_NAME = "deepseek/deepseek-r1:free";

if (!OPENROUTER_API_KEY) {
  throw new Error("Missing OPENROUTER_API_KEY environment variable.");
}

// Improved fallback response
const getFallbackResponse = () => ({
  response: "Here's a basic React template (fallback):",
  updates: [
    { operation: "creating", file: "App.js" },
    { operation: "creating", file: "components/Main.jsx" },
    { operation: "creating", file: "components/Header.jsx" },
  ],
  projectTitle: "React Starter",
  explanation:
    "Default project with Tailwind CSS and basic component structure",
  files: {
    "/App.js": {
      code: `import React from 'react';\nimport Header from './components/Header';\nimport Main from './components/Main';\n\nexport default function App() {\n  return (\n    <div className="min-h-screen bg-gray-50 flex flex-col">\n      <Header />\n      <Main />\n    </div>\n  );\n}`,
      styles: "min-h-screen, bg-gray-50, flex, flex-col",
    },
    "/components/Header.jsx": {
      code: `import React from 'react';\nexport default function Header() {\n  return (\n    <header className="bg-white shadow-sm p-4">\n      <h1 className="text-2xl font-bold text-blue-500">Welcome</h1>\n    </header>\n  );\n}`,
      styles: "bg-white, shadow-sm, p-4, text-2xl, font-bold, text-blue-500",
    },
    "/components/Main.jsx": {
      code: `import React from 'react';\nexport default function Main() {\n  return (\n    <main className="flex-1 p-4">\n      <p className="text-gray-600">Edit this to get started</p>\n    </main>\n  );\n}`,
      styles: "flex-1, p-4, text-gray-600",
    },
  },
  setupInstructions: "npm install && npm run dev",
});

const CODE_GEN_PROMPT = dedent`
# Code Generation Instructions

## Response Requirements
Return COMPLETE, PRODUCTION-READY React code with:
- Tailwind CSS styling
- Proper component structure
- Full functionality (no placeholder comments)
- Lucide-react icons when appropriate

## JSON Format Requirements
{
  "response": "[Your introduction]",
  "updates": [{"operation": "creating", "file": "filename.js"}],
  "projectTitle": "Title",
  "explanation": "Description",
  "files": {
    "/App.js": {
      "code": "COMPLETE CODE",
      "styles": "Tailwind classes"
    },
      "/components/Navbar.jsx": {
      "code": "COMPLETE CODE",
      "styles": "Tailwind classes"
    }
  },
  "setupInstructions": "npm install ..."
}

## Critical Rules:
- NEVER truncate the JSON response
- ALWAYS include ALL closing brackets
- Validate your JSON before returning
`;

const extractValidJson = (content) => {
  if (!content) return null;

  // First try direct parse
  try {
    return JSON.parse(content);
  } catch (e) {
    console.warn("Initial parse failed, attempting recovery");
  }

  // Try to extract JSON portion
  const jsonStart = content.indexOf("{");
  const jsonEnd = content.lastIndexOf("}") + 1;
  if (jsonStart === -1 || jsonEnd <= 0) return null;

  let jsonStr = content.slice(jsonStart, jsonEnd);

  // Apply common fixes
  const fixes = [
    // Balance braces
    () => {
      const open = (jsonStr.match(/{/g) || []).length;
      const close = (jsonStr.match(/}/g) || []).length;
      if (open > close) jsonStr += "}".repeat(open - close);
    },
    // Fix unquoted keys
    () =>
      (jsonStr = jsonStr.replace(
        /([{,])(\s*)([a-zA-Z0-9_]+?)\s*:/g,
        '$1"$3":'
      )),
    // Fix trailing commas
    () => (jsonStr = jsonStr.replace(/,\s*([}\]])/g, "$1")),
    // Escape HTML
    () => (jsonStr = jsonStr.replace(/</g, "\\u003c").replace(/>/g, "\\u003e")),
  ];

  fixes.forEach((fix) => fix());

  try {
    return JSON.parse(jsonStr);
  } catch (e) {
    console.error("JSON recovery failed:", e.message);
    return null;
  }
};

const generateMissingComponent = (path) => {
  const name = path.split("/").pop().replace(".jsx", "").replace(".js", "");
  return {
    code: `import React from 'react';\nexport default function ${name}() {\n  return (\n    <div className="p-4 border border-red-300 bg-red-50 rounded">\n      <p className="text-red-500">Missing ${name} component</p>\n    </div>\n  );\n}`,
    styles: "p-4, border, border-red-300, bg-red-50, rounded, text-red-500",
  };
};

const generateCodeFromAI = async (
  userPrompt,
  temperature = 0.5,
  maxTokens = 2000
) => {
  try {
    const response = await axios.post(
      OPENROUTER_API_URL,
      {
        model: MODEL_NAME,
        messages: [
          {
            role: "system",
            content: CODE_GEN_PROMPT,
          },
          {
            role: "user",
            content: userPrompt || "Create a simple React component",
          },
        ],
        temperature,
        max_tokens: maxTokens,
        stream: false,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${OPENROUTER_API_KEY}`,
          "HTTP-Referer": "https://www.devplex.in",
          "X-Title": "Devplex AI",
        },
        timeout: 60000,
      }
    );

    const content = response.data.choices[0]?.message?.content || "";
    let result = extractValidJson(content);

    if (!result || !result.files) {
      console.warn("Using fallback due to invalid response");
      result = getFallbackResponse();
    }

    // Check for missing imports and generate components
    const missingFiles = {};
    Object.values(result.files).forEach((file) => {
      const imports =
        file.code.match(/import\s+.*?\s+from\s+['"](\.\/.*?)['"]/g) || [];
      imports.forEach((imp) => {
        const path = imp.match(/['"](\.\/.*?)['"]/)[1].replace("./", "/");
        if (!result.files[path] && !missingFiles[path]) {
          missingFiles[path] = generateMissingComponent(path);
        }
      });
    });

    if (Object.keys(missingFiles).length > 0) {
      result.files = { ...result.files, ...missingFiles };
      result.updates = [
        ...result.updates,
        ...Object.keys(missingFiles).map((file) => ({
          operation: "creating",
          file: file.substring(1),
        })),
      ];
    }

    return result;
  } catch (error) {
    console.error("API Error:", error.message);
    return getFallbackResponse();
  }
};

module.exports = generateCodeFromAI;