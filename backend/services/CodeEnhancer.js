// const axios = require("axios");
// const dedent = require("dedent");

// const MAX_RETRIES = 2;
// const RETRY_DELAY_MS = 1000; // 1 second between retries

// /**
//  * Improved JSON extraction that better handles markdown-formatted responses
//  */
// const safeJsonParse = (data, fallback = {}) => {
//   try {
//     // Check if we're dealing with empty data
//     if (!data || typeof data !== "string") {
//       console.warn("❌ Empty or non-string data provided for parsing");
//       return fallback;
//     }

//     // More robust JSON extraction that handles various markdown formats
//     // First, extract JSON from markdown code blocks if present
//     let jsonString = data;

//     // Remove markdown code block formatting if present
//     const codeBlockMatch = data.match(/```(?:json)?\n([\s\S]*?)\n```/);
//     if (codeBlockMatch && codeBlockMatch[1]) {
//       jsonString = codeBlockMatch[1];
//     } else {
//       // Try to clean the string in case it's not in code blocks
//       jsonString = data
//         .replace(/^```(?:json)?/gm, "") // Remove starting ```
//         .replace(/```$/gm, "") // Remove ending ```
//         .trim();
//     }

//     // Try to parse the extracted JSON
//     return JSON.parse(jsonString);
//   } catch (e) {
//     console.warn("❌ JSON parsing failed:", e.message);
//     return fallback;
//   }
// };

// const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// const enhanceGeneratedCode = async (
//   userEnhancementPrompt,
//   existingFiles,
//   retryCount = 0
// ) => {
//   const API_KEY = process.env.GEMINI_API?.trim();

//   if (!API_KEY) {
//     console.error("❌ Missing GEMINI_API key in environment variables.");
//     return {
//       error: "API key is missing",
//       code: "MISSING_API_KEY",
//     };
//   }

//   const API_URL = `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-pro:generateContent?key=${API_KEY}`;

//   // Format the existing files for the prompt
//   const filesDescription = Object.entries(existingFiles)
//     .map(
//       ([filename, file]) => `### ${filename}\n${file.code.substring(0, 200)}...`
//     )
//     .join("\n\n");

//   // Create the prompt text with clear instructions about output format
//   const promptText = dedent(`
//     # CODE ENHANCEMENT REQUEST

//     ## EXISTING FILES:
//     ${filesDescription}

//     ## USER REQUEST:
//     ${userEnhancementPrompt}

//     ## INSTRUCTIONS:
//     1. Respond with PLAIN JSON ONLY, DO NOT use markdown code blocks or backticks.
//     2. Ensure all values, including "code", are valid JSON strings with proper escaping.
//     3. Only use Tailwind CSS dont add external css files.
//     4. Dont structure like this (src/components/filename.jsx) do this (/components/filename.jsx)
//     5. App.js is in root folder like /App.js
//     6. Use Pexels free stock images if needed.Dont downloac the image just add the url . If you want to add api of pexels then add this (API : D1IxovArVb0qq9ujsq7pbO510mOoHNDCVl4nKwNp13s4MKEDrG0p3m0p) and use this (url:'https://api.pexels.com/v1/search?query=nature&per_page=12')
//     7. Generate all the files which are previously sent sand the New you created don't remove old files.
//     8. Follow this exact structure:
//     {
//       "enhancedFiles": {
//         "/App.js": {
//           "code": "full code here as a valid JSON string",
//           "notes": "optional notes"
//         },
//           "/components/Navbar.jsx": {
//           "code": "full code here as a valid JSON string",
//           "notes": "optional notes"
//         }
//       },
//       "explanation": "summary of changes"
//     }
//     9. Do NOT include any text before or after the JSON object.

// STYLING Guidelines:

// ✅ **Beautiful UI/UX principles**
// ✅ **Modern typography and responsive layouts**
// ✅ **Vibrant colors, gradients, shadows, and smooth animations**
// ✅ **Proper padding, margins, and spacing for a professional look**
// ✅ **Interactive elements with hover, focus, and click animations**

// 🟢 **Mandatory Styling Enhancements:**
// - Use **primary color palettes** (\`bg-gradient-to-r from-blue-500 to-indigo-600\`, \`text-white\`).
// - Ensure **contrast & accessibility** (\`text-gray-800 dark:text-gray-100\`).
// - Apply **drop shadows and smooth transitions** (\`shadow-lg hover:shadow-2xl transition-all duration-300\`).
// - Use **rounded corners** for elements (\`rounded-xl\`).
// - Implement **card-based layouts** where necessary (\`p-6 bg-white shadow-md rounded-lg\`).
// - Forms should have **modern input fields** (\`border-gray-300 focus:ring-2 focus:ring-blue-500\`).


// Ensure:
// - **Hover effects** (\`hover:bg-opacity-80 transition-all\`).
// - **Button animations** (\`transform hover:scale-105\`).
// - **Card animations** (\`hover:shadow-xl\`).

// ### 🚀 **Now Your Generated UI Will Always Be:**
// ✅ **Modern & Attractive** (gradients, animations, proper spacing)
// ✅ **Highly Usable** (intuitive UI/UX principles)
// ✅ **Beautifully Styled** (no more dull designs)
// ✅ **Production-Ready** (no placeholder comments, only full logic)

//   `);

//   try {
//     const response = await axios.post(
//       API_URL,
//       {
//         contents: [
//           {
//             parts: [{ text: promptText }],
//             role: "user",
//           },
//         ],
//         generationConfig: {
//           temperature: 0.7,
//           maxOutputTokens: 2048,
//           stopSequences: [],
//         },
//         safetySettings: [
//           {
//             category: "HARM_CATEGORY_HARASSMENT",
//             threshold: "BLOCK_ONLY_HIGH",
//           },
//         ],
//       },
//       {
//         headers: {
//           "Content-Type": "application/json",
//         },
//         timeout: 30000,
//       }
//     );

//     const responseText =
//       response.data?.candidates?.[0]?.content?.parts?.[0]?.text || "";

//     let jsonResponse = null;

//     try {
//       jsonResponse = JSON.parse(responseText);
//     } catch (parseError) {
//       console.log("Direct JSON parsing failed, trying extraction methods...");

//       jsonResponse = safeJsonParse(responseText, null);

//       if (!jsonResponse) {
//         throw new Error(
//           `Failed to parse API response: ${
//             parseError.message
//           }\nResponse starts with: ${responseText.substring(0, 100)}...`
//         );
//       }
//     }

//     if (!jsonResponse?.enhancedFiles) {
//       throw new Error(
//         "Response missing enhancedFiles property. Received: " +
//           JSON.stringify(jsonResponse).substring(0, 100) +
//           "..."
//       );
//     }

//     const result = {
//       enhancedFiles: {},
//       explanation: jsonResponse.explanation || "No explanation provided",
//       updates: [],
//     };

//     for (const [path, file] of Object.entries(jsonResponse.enhancedFiles)) {
//       if (!file?.code) {
//         console.warn(`⚠️ Missing code in enhanced file: ${path}`);
//         continue;
//       }

  
//       let codeString = file.code;
//       try {
//         // Check if the code is itself a JSON string that needs parsing
//         if (
//           typeof file.code === "string" &&
//           file.code.startsWith("{") &&
//           file.code.includes("\\n")
//         ) {
//           const possibleJsonCode = JSON.parse(file.code);
//           if (typeof possibleJsonCode === "object") {
//             // It was double-encoded, use the parsed version
//             codeString = file.code;
//           }
//         }
//       } catch (e) {
//         // Not double-encoded, continue with the original string
//       }

//       result.enhancedFiles[path] = {
//         code: codeString.replace(/\\n/g, "\n").replace(/\\"/g, '"').trim(),
//         notes: file.notes || "",
//       };

//       result.updates.push({
//         file: path,
//         operation: existingFiles[path] ? "updated" : "created",
//         changes: file.notes || "Code enhancements applied",
//       });
//     }

//     return result;
//   } catch (error) {
//     console.error("❌ AI Enhancement Error:", {
//       message: error.message,
//       code: error.code || error.response?.status || "AI_PROCESSING_ERROR",
//       responseData: error.response?.data,
//       retryCount,
//     });

//     // Handle rate limiting specifically
//     if (error.response?.status === 429) {
//       console.error(
//         "⚠️ Rate limit exceeded. You may need to wait before trying again."
//       );
//       return {
//         error: "Rate limit exceeded",
//         details: "The API rate limit has been reached. Please try again later.",
//         code: "RATE_LIMIT_EXCEEDED",
//         enhancedFiles: existingFiles, // Return original files as fallback
//       };
//     }

//     // Don't retry on 400 errors (bad requests) or rate limits (429)
//     if (
//       retryCount < MAX_RETRIES &&
//       (!error.response ||
//         (error.response.status !== 400 && error.response.status !== 429))
//     ) {
//       const delay = RETRY_DELAY_MS * Math.pow(2, retryCount); // Exponential backoff
//       console.log(`🔁 Retrying in ${delay}ms (attempt ${retryCount + 1})...`);
//       await sleep(delay);
//       return enhanceGeneratedCode(
//         userEnhancementPrompt,
//         existingFiles,
//         retryCount + 1
//       );
//     }

//     return {
//       error: "Failed to process enhancement",
//       details: error.message,
//       code: error.code || error.response?.status || "AI_ENHANCEMENT_FAILED",
//       enhancedFiles: existingFiles, // Return original files as fallback
//     };
//   }
// };

// module.exports = enhanceGeneratedCode;
// const axios = require("axios");
// const dedent = require("dedent");

// const MAX_RETRIES = 2;
// const RETRY_DELAY_MS = 1000;


// const safeJsonParse = (data, fallback = {}) => {
//   try {
//     // Check if we're dealing with empty data
//     if (!data || typeof data !== "string") {
//       console.warn("❌ Empty or non-string data provided for parsing");
//       return fallback;
//     }

//     // More robust JSON extraction that handles various markdown formats
//     let jsonString = data;

//     // Remove markdown code block formatting if present
//     const codeBlockMatch = data.match(/```(?:json)?\n([\s\S]*?)\n```/);
//     if (codeBlockMatch && codeBlockMatch[1]) {
//       jsonString = codeBlockMatch[1];
//     } else {
//       // Try to clean the string in case it's not in code blocks
//       jsonString = data
//         .replace(/^```(?:json)?/gm, "") // Remove starting ```
//         .replace(/```$/gm, "") // Remove ending ```
//         .trim();
//     }

//     // Replace single quotes with double quotes in property values
//     // But be careful not to replace quotes in already valid JSON strings
//     jsonString = jsonString.replace(/: *'([^']*)'/g, ': "$1"');

//     // Replace unescaped single quotes in strings
//     jsonString = jsonString.replace(
//       /([{,]\s*"[^"]*"\s*:\s*)"([^"]*)'/g,
//       '$1"$2"'
//     );

//     // Try to parse the extracted JSON
//     return JSON.parse(jsonString);
//   } catch (e) {
//     // If standard parsing fails, try a more aggressive approach
//     try {
//       console.warn("⚠️ Standard JSON parsing failed, trying aggressive fix...");

//       // Replace all single quotes with double quotes (risky but might work)
//       const fixedString = data
//         .replace(/'/g, '"')
//         // Fix double-converted quotes in keys and values
//         .replace(/"([^"]*)"": ""([^"]*)""/, '"$1": "$2"');

//       return JSON.parse(fixedString);
//     } catch (secondError) {
//       console.warn("❌ JSON parsing failed:", e.message);
//       console.warn("Secondary parsing also failed:", secondError.message);
//       return fallback;
//     }
//   }
// };

// const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// const enhanceGeneratedCode = async (
//   userEnhancementPrompt,
//   existingFiles,
//   retryCount = 0
// ) => {
//   const API_KEY = process.env.GEMINI_API?.trim();

//   if (!API_KEY) {
//     console.error("❌ Missing GEMINI_API key in environment variables.");
//     return {
//       error: "API key is missing",
//       code: "MISSING_API_KEY",
//     };
//   }

//   const API_URL = `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-pro:generateContent?key=${API_KEY}`;


//   const filesDescription = Object.entries(existingFiles)
//     .map(
//       ([filename, file]) => `### ${filename}\n${file.code.substring(0, 200)}...`
//     )
//     .join("\n\n");


//   const promptText = dedent(`
//     # CODE ENHANCEMENT REQUEST

//     ## EXISTING FILES:
//     ${filesDescription}

//     ## USER REQUEST:
//     ${userEnhancementPrompt}

//     ## INSTRUCTIONS:
//     1. Respond with PLAIN JSON ONLY, DO NOT use markdown code blocks or backticks.
//     2. IMPORTANT: Use DOUBLE QUOTES for ALL strings, including inside code. Do NOT use single quotes anywhere.
//     3. Ensure all values, including "code", are valid JSON strings with proper escaping.
//     4. Only use Tailwind CSS dont add external css files.
//     5. Dont structure like this (src/components/filename.jsx) do this (/components/filename.jsx)
//     6. App.js is in root folder like /App.js
//     7. Use Pexels free stock images if needed. Dont download the image just add the url. If you want to add api of pexels then add this (API : D1IxovArVb0qq9ujsq7pbO510mOoHNDCVl4nKwNp13s4MKEDrG0p3m0p) and use this (url:"https://api.pexels.com/v1/search?query=nature&per_page=12")
//     8. Generate all the files which are previously sent sand the New you created don't remove old files.
//     9. Follow this exact structure:
//     {
//       "enhancedFiles": {
//         "/App.js": {
//           "code": "full code here as a valid JSON string with double quotes only",
//           "notes": "optional notes"
//         },
//           "/components/Navbar.jsx": {
//           "code": "full code here as a valid JSON string with double quotes only",
//           "notes": "optional notes"
//         }
//       },
//       "explanation": "summary of changes"
//     }
//     10. Do NOT include any text before or after the JSON object.
//     11. MOST IMPORTANT: All code must use double quotes, not single quotes. Example: import { useState } from "react"; NOT from 'react'

//     ## CRITICAL REACT COMPONENT REQUIREMENTS:

//     1. Every React component file MUST have ONE of these export patterns:
//        - DEFAULT EXPORT: "export default function ComponentName() {...}"
//        - or "const ComponentName = () => {...}; export default ComponentName;"
//        - NEVER use "export { ComponentName }" or "export { ComponentName as default }"

//     2. In App.js or any file importing components:
//        - For default exports: "import ComponentName from './components/ComponentName';"
//        - NEVER mix default and named imports incorrectly

//     3. Components must return ONE parent element (or Fragment).
//        For example: return (<div className="container">{/* content here */}</div>);

//     4. All JSX elements must be properly closed
//        - Self-closing: <img src="/api/placeholder/200/200" alt="placeholder" />
//        - Regular: <div>Content</div>

//     5. Always add "key" prop to elements inside map() functions:
//        {items.map((item) => (<div key={item.id}>...</div>))}

//     6. For dynamic images from Pexels, ensure correct URL format:
//        "https://images.pexels.com/photos/[ID]/pexels-photo-[ID].jpeg"

//     7. Do NOT use Context API or other advanced patterns unless explicitly requested.

//     8. Use React hooks correctly:
//        - useState: "const [state, setState] = useState(initialValue);"
//        - useEffect: "useEffect(() => { /* effect */ }, [dependencies]);"

//     STYLING Guidelines:

//     ✅ Beautiful UI/UX principles
//     ✅ Modern typography and responsive layouts
//     ✅ Vibrant colors, gradients, shadows, and smooth animations
//     ✅ Proper padding, margins, and spacing for a professional look
//     ✅ Interactive elements with hover, focus, and click animations

//     Mandatory Styling Enhancements:
//     - Use primary color palettes (bg-gradient-to-r from-blue-500 to-indigo-600, text-white).
//     - Ensure contrast & accessibility (text-gray-800 dark:text-gray-100).
//     - Apply drop shadows and smooth transitions (shadow-lg hover:shadow-2xl transition-all duration-300).
//     - Use rounded corners for elements (rounded-xl).
//     - Implement card-based layouts where necessary (p-6 bg-white shadow-md rounded-lg).
//     - Forms should have modern input fields (border-gray-300 focus:ring-2 focus:ring-blue-500).

//     Ensure:
//     - Hover effects (hover:bg-opacity-80 transition-all).
//     - Button animations (transform hover:scale-105).
//     - Card animations (hover:shadow-xl).

//     Your Generated UI Will Always Be:
//     ✅ Modern & Attractive (gradients, animations, proper spacing)
//     ✅ Highly Usable (intuitive UI/UX principles)
//     ✅ Beautifully Styled (no more dull designs)
//     ✅ Production-Ready (no placeholder comments, only full logic)
//   `);

//   try {
//     const response = await axios.post(
//       API_URL,
//       {
//         contents: [
//           {
//             parts: [{ text: promptText }],
//             role: "user",
//           },
//         ],
//         generationConfig: {
//           temperature: 0.7,
//           maxOutputTokens: 2048,
//           stopSequences: [],
//         },
//         safetySettings: [
//           {
//             category: "HARM_CATEGORY_HARASSMENT",
//             threshold: "BLOCK_ONLY_HIGH",
//           },
//         ],
//       },
//       {
//         headers: {
//           "Content-Type": "application/json",
//         },
//         timeout: 30000,
//       }
//     );

//     const responseText =
//       response.data?.candidates?.[0]?.content?.parts?.[0]?.text || "";

//     console.log("Response preview:", responseText.substring(0, 200) + "...");

//     let jsonResponse = null;

//     try {
//       jsonResponse = JSON.parse(responseText);
//       console.log("✅ Direct JSON parsing succeeded!");
//     } catch (parseError) {
//       console.log("Direct JSON parsing failed, trying extraction methods...");

//       jsonResponse = safeJsonParse(responseText, null);

//       if (!jsonResponse) {
//         throw new Error(
//           `Failed to parse API response: ${
//             parseError.message
//           }\nResponse starts with: ${responseText.substring(0, 200)}...`
//         );
//       }
//     }

//     if (!jsonResponse?.enhancedFiles) {
//       throw new Error(
//         "Response missing enhancedFiles property. Received: " +
//           JSON.stringify(jsonResponse).substring(0, 200) +
//           "..."
//       );
//     }

//     const result = {
//       enhancedFiles: {},
//       explanation: jsonResponse.explanation || "No explanation provided",
//       updates: [],
//     };

//     for (const [path, file] of Object.entries(jsonResponse.enhancedFiles)) {
//       if (!file?.code) {
//         console.warn(`⚠️ Missing code in enhanced file: ${path}`);
//         continue;
//       }

//       let codeString = file.code;
//       try {
//         // Check if the code is itself a JSON string that needs parsing
//         if (
//           typeof file.code === "string" &&
//           file.code.startsWith("{") &&
//           file.code.includes("\\n")
//         ) {
//           const possibleJsonCode = JSON.parse(file.code);
//           if (typeof possibleJsonCode === "object") {
//             // It was double-encoded, use the parsed version
//             codeString = file.code;
//           }
//         }
//       } catch (e) {
//         // Not double-encoded, continue with the original string
//       }

//       result.enhancedFiles[path] = {
//         code: codeString.replace(/\\n/g, "\n").replace(/\\"/g, '"').trim(),
//         notes: file.notes || "",
//       };

//       result.updates.push({
//         file: path,
//         operation: existingFiles[path] ? "updated" : "created",
//         changes: file.notes || "Code enhancements applied",
//       });
//     }

//     return result;
//   } catch (error) {
//     console.error("❌ AI Enhancement Error:", {
//       message: error.message,
//       code: error.code || error.response?.status || "AI_PROCESSING_ERROR",
//       responseData: error.response?.data,
//       retryCount,
//     });

//     // Handle rate limiting specifically
//     if (error.response?.status === 429) {
//       console.error(
//         "⚠️ Rate limit exceeded. You may need to wait before trying again."
//       );
//       return {
//         error: "Rate limit exceeded",
//         details: "The API rate limit has been reached. Please try again later.",
//         code: "RATE_LIMIT_EXCEEDED",
//         enhancedFiles: existingFiles, // Return original files as fallback
//       };
//     }

//     // Don't retry on 400 errors (bad requests) or rate limits (429)
//     if (
//       retryCount < MAX_RETRIES &&
//       (!error.response ||
//         (error.response.status !== 400 && error.response.status !== 429))
//     ) {
//       const delay = RETRY_DELAY_MS * Math.pow(2, retryCount); // Exponential backoff
//       console.log(`🔁 Retrying in ${delay}ms (attempt ${retryCount + 1})...`);
//       await sleep(delay);
//       return enhanceGeneratedCode(
//         userEnhancementPrompt,
//         existingFiles,
//         retryCount + 1
//       );
//     }

//     return {
//       error: "Failed to process enhancement",
//       details: error.message,
//       code: error.code || error.response?.status || "AI_ENHANCEMENT_FAILED",
//       enhancedFiles: existingFiles, // Return original files as fallback
//     };
//   }
// };

// module.exports = enhanceGeneratedCode;

// const axios = require("axios");
// const dedent = require("dedent");

// const MAX_RETRIES = 2;
// const RETRY_DELAY_MS = 1000; // 1 second between retries

// /**
//  * Improved JSON extraction that better handles markdown-formatted responses
//  * and deals with quote character issues
//  */
// const safeJsonParse = (data, fallback = {}) => {
//   try {
//     // Check if we're dealing with empty data
//     if (!data || typeof data !== "string") {
//       console.warn("❌ Empty or non-string data provided for parsing");
//       return fallback;
//     }

//     // More robust JSON extraction that handles various markdown formats
//     let jsonString = data;

//     // Remove markdown code block formatting if present
//     const codeBlockMatch = data.match(/```(?:json)?\n([\s\S]*?)\n```/);
//     if (codeBlockMatch && codeBlockMatch[1]) {
//       jsonString = codeBlockMatch[1];
//     } else {
//       // Try to clean the string in case it's not in code blocks
//       jsonString = data
//         .replace(/^```(?:json)?/gm, "") // Remove starting ```
//         .replace(/```$/gm, "") // Remove ending ```
//         .trim();
//     }

//     // Replace single quotes with double quotes in property values
//     // But be careful not to replace quotes in already valid JSON strings
//     jsonString = jsonString.replace(/: *'([^']*)'/g, ': "$1"');

//     // Replace unescaped single quotes in strings
//     jsonString = jsonString.replace(
//       /([{,]\s*"[^"]*"\s*:\s*)"([^"]*)'/g,
//       '$1"$2"'
//     );

//     // Try to parse the extracted JSON
//     return JSON.parse(jsonString);
//   } catch (e) {
//     // If standard parsing fails, try a more aggressive approach
//     try {
//       console.warn("⚠️ Standard JSON parsing failed, trying aggressive fix...");

//       // Replace all single quotes with double quotes (risky but might work)
//       const fixedString = data
//         .replace(/'/g, '"')
//         // Fix double-converted quotes in keys and values
//         .replace(/"([^"]*)"": ""([^"]*)""/, '"$1": "$2"');

//       return JSON.parse(fixedString);
//     } catch (secondError) {
//       console.warn("❌ JSON parsing failed:", e.message);
//       console.warn("Secondary parsing also failed:", secondError.message);
//       return fallback;
//     }
//   }
// };

// const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// const enhanceGeneratedCode = async (
//   userEnhancementPrompt,
//   existingFiles,
//   retryCount = 0
// ) => {
//   const API_KEY = process.env.GEMINI_API?.trim();

//   if (!API_KEY) {
//     console.error("❌ Missing GEMINI_API key in environment variables.");
//     return {
//       error: "API key is missing",
//       code: "MISSING_API_KEY",
//     };
//   }

//   const API_URL = `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-pro:generateContent?key=${API_KEY}`;

//   // Format the existing files for the prompt
//   const filesDescription = Object.entries(existingFiles)
//     .map(
//       ([filename, file]) => `### ${filename}\n${file.code.substring(0, 200)}...`
//     )
//     .join("\n\n");

//   // Create the prompt text with modified instructions about output format
//   const promptText = dedent(`
//     # CODE ENHANCEMENT REQUEST

//     ## EXISTING FILES:
//     ${filesDescription}

//     ## USER REQUEST:
//     ${userEnhancementPrompt}

//     ## INSTRUCTIONS:
//     1. Respond with PLAIN JSON ONLY, DO NOT use markdown code blocks or backticks.
//     2. IMPORTANT: Use DOUBLE QUOTES for ALL strings, including inside code. Do NOT use single quotes anywhere.
//     3. Ensure all values, including "code", are valid JSON strings with proper escaping.
//     4. Only use Tailwind CSS dont add external css files.
//     5. Dont structure like this (src/components/filename.jsx) do this (/components/filename.jsx)
//     6. App.js is in root folder like /App.js
//     7. Use Pexels free stock images if needed. Dont download the image just add the url. If you want to add api of pexels then add this (API : D1IxovArVb0qq9ujsq7pbO510mOoHNDCVl4nKwNp13s4MKEDrG0p3m0p) and use this (url:"https://api.pexels.com/v1/search?query=nature&per_page=12")
//     8. Generate all the files which are previously sent sand the New you created don't remove old files.
//     9. Follow this exact structure:
//     {
//       "enhancedFiles": {
//         "/App.js": {
//           "code": "full code here as a valid JSON string with double quotes only",
//           "notes": "optional notes"
//         },
//           "/components/Navbar.jsx": {
//           "code": "full code here as a valid JSON string with double quotes only",
//           "notes": "optional notes"
//         }
//       },
//       "explanation": "summary of changes"
//     }
//     10. Do NOT include any text before or after the JSON object.
//     11. MOST IMPORTANT: All code must use double quotes, not single quotes. Example: import { useState } from "react"; NOT from 'react'

//     ## CRITICAL REACT COMPONENT REQUIREMENTS:

//     1. Every React component file MUST have ONE of these export patterns:
//        - DEFAULT EXPORT: "export default function ComponentName() {...}"
//        - or "const ComponentName = () => {...}; export default ComponentName;"
//        - NEVER use "export { ComponentName }" or "export { ComponentName as default }"

//     2. In App.js or any file importing components:
//        - For default exports: "import ComponentName from './components/ComponentName';"
//        - NEVER mix default and named imports incorrectly

//     3. Components must return ONE parent element (or Fragment).
//        For example: return (<div className="container">{/* content here */}</div>);

//     4. All JSX elements must be properly closed
//        - Self-closing: <img src="/api/placeholder/200/200" alt="placeholder" />
//        - Regular: <div>Content</div>

//     5. Always add "key" prop to elements inside map() functions:
//        {items.map((item) => (<div key={item.id}>...</div>))}

//     6. For dynamic images from Pexels, ensure correct URL format:
//        "https://images.pexels.com/photos/[ID]/pexels-photo-[ID].jpeg"

//     7. Do NOT use Context API or other advanced patterns unless explicitly requested.

//     8. Use React hooks correctly:
//        - useState: "const [state, setState] = useState(initialValue);"
//        - useEffect: "useEffect(() => { /* effect */ }, [dependencies]);"

//     STYLING Guidelines:

//     ✅ Beautiful UI/UX principles
//     ✅ Modern typography and responsive layouts
//     ✅ Vibrant colors, gradients, shadows, and smooth animations
//     ✅ Proper padding, margins, and spacing for a professional look
//     ✅ Interactive elements with hover, focus, and click animations

//     Mandatory Styling Enhancements:
//     - Use primary color palettes (bg-gradient-to-r from-blue-500 to-indigo-600, text-white).
//     - Ensure contrast & accessibility (text-gray-800 dark:text-gray-100).
//     - Apply drop shadows and smooth transitions (shadow-lg hover:shadow-2xl transition-all duration-300).
//     - Use rounded corners for elements (rounded-xl).
//     - Implement card-based layouts where necessary (p-6 bg-white shadow-md rounded-lg).
//     - Forms should have modern input fields (border-gray-300 focus:ring-2 focus:ring-blue-500).

//     Ensure:
//     - Hover effects (hover:bg-opacity-80 transition-all).
//     - Button animations (transform hover:scale-105).
//     - Card animations (hover:shadow-xl).

//     Your Generated UI Will Always Be:
//     ✅ Modern & Attractive (gradients, animations, proper spacing)
//     ✅ Highly Usable (intuitive UI/UX principles)
//     ✅ Beautifully Styled (no more dull designs)
//     ✅ Production-Ready (no placeholder comments, only full logic)
//   `);

//   try {
//     const response = await axios.post(
//       API_URL,
//       {
//         contents: [
//           {
//             parts: [{ text: promptText }],
//             role: "user",
//           },
//         ],
//         generationConfig: {
//           temperature: 0.7,
//           maxOutputTokens: 2048,
//           stopSequences: [],
//         },
//         safetySettings: [
//           {
//             category: "HARM_CATEGORY_HARASSMENT",
//             threshold: "BLOCK_ONLY_HIGH",
//           },
//         ],
//       },
//       {
//         headers: {
//           "Content-Type": "application/json",
//         },
//         timeout: 30000,
//       }
//     );

//     const responseText =
//       response.data?.candidates?.[0]?.content?.parts?.[0]?.text || "";

//     console.log("Response preview:", responseText.substring(0, 200) + "...");

//     let jsonResponse = null;

//     try {
//       jsonResponse = JSON.parse(responseText);
//       console.log("✅ Direct JSON parsing succeeded!");
//     } catch (parseError) {
//       console.log("Direct JSON parsing failed, trying extraction methods...");

//       jsonResponse = safeJsonParse(responseText, null);

//       if (!jsonResponse) {
//         throw new Error(
//           `Failed to parse API response: ${
//             parseError.message
//           }\nResponse starts with: ${responseText.substring(0, 200)}...`
//         );
//       }
//     }

//     if (!jsonResponse?.enhancedFiles) {
//       throw new Error(
//         "Response missing enhancedFiles property. Received: " +
//           JSON.stringify(jsonResponse).substring(0, 200) +
//           "..."
//       );
//     }

//     const result = {
//       enhancedFiles: {},
//       explanation: jsonResponse.explanation || "No explanation provided",
//       updates: [],
//     };

//     // Process and validate the enhanced files
//     for (const [path, file] of Object.entries(jsonResponse.enhancedFiles)) {
//       if (!file?.code) {
//         console.warn(`⚠️ Missing code in enhanced file: ${path}`);
//         continue;
//       }

//       let codeString = file.code;
//       try {
//         // Check if the code is itself a JSON string that needs parsing
//         if (
//           typeof file.code === "string" &&
//           file.code.startsWith("{") &&
//           file.code.includes("\\n")
//         ) {
//           const possibleJsonCode = JSON.parse(file.code);
//           if (typeof possibleJsonCode === "object") {
//             // It was double-encoded, use the parsed version
//             codeString = file.code;
//           }
//         }
//       } catch (e) {
//         // Not double-encoded, continue with the original string
//       }

//       // Process and validate React component exports
//       let processedCode = codeString
//         .replace(/\\n/g, "\n")
//         .replace(/\\"/g, '"')
//         .trim();

//       // Simple validation for React component exports
//       if (path.endsWith(".jsx") || path.endsWith(".js")) {
//         // Check if file has proper exports
//         const hasDefaultExport = /export\s+default\s+\w+/.test(processedCode);
//         const hasDefaultExportFunction =
//           /export\s+default\s+function\s+\w+/.test(processedCode);
//         const hasNamedExportOnly =
//           /export\s+{\s*\w+\s*}/.test(processedCode) && !hasDefaultExport;

//         if (hasNamedExportOnly) {
//           console.warn(
//             `⚠️ Potential React component issue in ${path}: Found named export only`
//           );
//           // Try to fix named export to default export
//           const compNameMatch = processedCode.match(/function\s+(\w+)/);
//           if (compNameMatch && compNameMatch[1]) {
//             const componentName = compNameMatch[1];
//             processedCode = processedCode.replace(
//               /export\s+{\s*\w+\s*}/,
//               `export default ${componentName}`
//             );
//             console.log(
//               `✅ Fixed: Converted named export to default export for ${componentName}`
//             );
//           }
//         }
//       }

//       result.enhancedFiles[path] = {
//         code: processedCode,
//         notes: file.notes || "",
//       };

//       result.updates.push({
//         file: path,
//         operation: existingFiles[path] ? "updated" : "created",
//         changes: file.notes || "Code enhancements applied",
//       });
//     }

//     return result;
//   } catch (error) {
//     console.error("❌ AI Enhancement Error:", {
//       message: error.message,
//       code: error.code || error.response?.status || "AI_PROCESSING_ERROR",
//       responseData: error.response?.data,
//       retryCount,
//     });

//     // Handle rate limiting specifically
//     if (error.response?.status === 429) {
//       console.error(
//         "⚠️ Rate limit exceeded. You may need to wait before trying again."
//       );
//       return {
//         error: "Rate limit exceeded",
//         details: "The API rate limit has been reached. Please try again later.",
//         code: "RATE_LIMIT_EXCEEDED",
//         enhancedFiles: existingFiles, // Return original files as fallback
//       };
//     }

//     // Don't retry on 400 errors (bad requests) or rate limits (429)
//     if (
//       retryCount < MAX_RETRIES &&
//       (!error.response ||
//         (error.response.status !== 400 && error.response.status !== 429))
//     ) {
//       const delay = RETRY_DELAY_MS * Math.pow(2, retryCount); // Exponential backoff
//       console.log(`🔁 Retrying in ${delay}ms (attempt ${retryCount + 1})...`);
//       await sleep(delay);
//       return enhanceGeneratedCode(
//         userEnhancementPrompt,
//         existingFiles,
//         retryCount + 1
//       );
//     }

//     return {
//       error: "Failed to process enhancement",
//       details: error.message,
//       code: error.code || error.response?.status || "AI_ENHANCEMENT_FAILED",
//       enhancedFiles: existingFiles, // Return original files as fallback
//     };
//   }
// };

// module.exports = enhanceGeneratedCode;

// const axios = require("axios");
// const dedent = require("dedent");

// const MAX_RETRIES = 2;
// const RETRY_DELAY_MS = 1000; // 1 second between retries
// const MAX_OUTPUT_TOKENS = 8192; // Increased token limit for larger responses

// /**
//  * Improved JSON extraction that handles truncated responses
//  */
// const safeJsonParse = (data, fallback = {}) => {
//   try {
//     // Check if we're dealing with empty data
//     if (!data || typeof data !== "string") {
//       console.warn("❌ Empty or non-string data provided for parsing");
//       return fallback;
//     }

//     // More robust JSON extraction that handles various markdown formats
//     let jsonString = data;

//     // Remove markdown code block formatting if present
//     const codeBlockMatch = data.match(/```(?:json)?\n([\s\S]*?)\n```/);
//     if (codeBlockMatch && codeBlockMatch[1]) {
//       jsonString = codeBlockMatch[1];
//     } else {
//       // Try to clean the string in case it's not in code blocks
//       jsonString = data
//         .replace(/^```(?:json)?/gm, "") // Remove starting ```
//         .replace(/```$/gm, "") // Remove ending ```
//         .trim();
//     }

//     // Replace single quotes with double quotes in property values
//     jsonString = jsonString.replace(/: *'([^']*)'/g, ': "$1"');

//     // Replace unescaped single quotes in strings
//     jsonString = jsonString.replace(
//       /([{,]\s*"[^"]*"\s*:\s*)"([^"]*)'/g,
//       '$1"$2"'
//     );

//     // Check if JSON appears to be truncated
//     if (isLikelyTruncated(jsonString)) {
//       console.warn("⚠️ JSON appears to be truncated, attempting repair");
//       jsonString = attemptToRepairTruncatedJson(jsonString);
//     }

//     // Try to parse the extracted JSON
//     return JSON.parse(jsonString);
//   } catch (e) {
//     // If standard parsing fails, try a more aggressive approach
//     try {
//       console.warn("⚠️ Standard JSON parsing failed, trying aggressive fix...");

//       // Check if JSON appears to be truncated before aggressive replacements
//       let fixedString = data;

//       if (isLikelyTruncated(fixedString)) {
//         console.warn(
//           "⚠️ JSON appears to be truncated, attempting repair before aggressive fix"
//         );
//         fixedString = attemptToRepairTruncatedJson(fixedString);
//       }

//       // Replace all single quotes with double quotes (risky but might work)
//       fixedString = fixedString
//         .replace(/'/g, '"')
//         // Fix double-converted quotes in keys and values
//         .replace(/"([^"]*)"": ""([^"]*)""/, '"$1": "$2"');

//       return JSON.parse(fixedString);
//     } catch (secondError) {
//       console.warn("❌ JSON parsing failed:", e.message);
//       console.warn("Secondary parsing also failed:", secondError.message);

//       // Last resort: attempt to extract and recreate the JSON structure
//       try {
//         console.warn(
//           "🔄 Last resort: attempting to extract partial JSON structure"
//         );
//         return extractPartialJson(data);
//       } catch (finalError) {
//         console.warn("💥 All JSON parsing attempts failed", finalError.message);
//         return fallback;
//       }
//     }
//   }
// };

// /**
//  * Checks if a JSON string appears to be truncated
//  */
// const isLikelyTruncated = (jsonString) => {
//   // Count opening and closing braces/brackets
//   const openBraces = (jsonString.match(/{/g) || []).length;
//   const closeBraces = (jsonString.match(/}/g) || []).length;
//   const openBrackets = (jsonString.match(/\[/g) || []).length;
//   const closeBrackets = (jsonString.match(/\]/g) || []).length;

//   // If we have more opening than closing, it's likely truncated
//   return openBraces > closeBraces || openBrackets > closeBrackets;
// };

// /**
//  * Attempts to repair truncated JSON by closing missing brackets and braces
//  */
// const attemptToRepairTruncatedJson = (jsonString) => {
//   let repaired = jsonString;

//   // Count opening and closing braces/brackets
//   const openBraces = (jsonString.match(/{/g) || []).length;
//   const closeBraces = (jsonString.match(/}/g) || []).length;
//   const openBrackets = (jsonString.match(/\[/g) || []).length;
//   const closeBrackets = (jsonString.match(/\]/g) || []).length;

//   // Close missing braces and brackets
//   for (let i = 0; i < openBraces - closeBraces; i++) {
//     repaired += "}";
//   }

//   for (let i = 0; i < openBrackets - closeBrackets; i++) {
//     repaired += "]";
//   }

//   return repaired;
// };

// /**
//  * Attempts to extract a partial JSON structure from a truncated string
//  */
// const extractPartialJson = (jsonString) => {
//   // First see if we can extract the enhancedFiles structure
//   const result = {
//     enhancedFiles: {},
//     explanation: "Partially recovered from truncated response",
//   };

//   // Check if we have an App.js file
//   const appJsMatch = jsonString.match(/"\/App\.js":\s*{\s*"code":\s*"([^"]*)/);
//   if (appJsMatch && appJsMatch[1]) {
//     result.enhancedFiles["/App.js"] = {
//       code: appJsMatch[1].replace(/\\n/g, "\n").replace(/\\"/g, '"'),
//       notes: "Partially recovered from truncated response",
//     };
//   }

//   // Try to extract component filenames
//   const componentMatches = jsonString.matchAll(
//     /"(\/components\/[^"]+)":\s*{\s*"code":\s*"([^"]*)/g
//   );
//   for (const match of componentMatches) {
//     if (match[1] && match[2]) {
//       result.enhancedFiles[match[1]] = {
//         code: match[2].replace(/\\n/g, "\n").replace(/\\"/g, '"'),
//         notes: "Partially recovered from truncated response",
//       };
//     }
//   }

//   // If we found any files, return the result
//   if (Object.keys(result.enhancedFiles).length > 0) {
//     return result;
//   }

//   // If we couldn't extract anything, throw an error
//   throw new Error("Failed to extract any files from truncated JSON");
// };

// const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// const enhanceGeneratedCode = async (
//   userEnhancementPrompt,
//   existingFiles,
//   retryCount = 0
// ) => {
//   const API_KEY = process.env.GEMINI_API?.trim();

//   if (!API_KEY) {
//     console.error("❌ Missing GEMINI_API key in environment variables.");
//     return {
//       error: "API key is missing",
//       code: "MISSING_API_KEY",
//     };
//   }

//   const API_URL = `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-pro:generateContent?key=${API_KEY}`;

//   // Format the existing files for the prompt - limit size to prevent token overflow
//   const filesDescription = Object.entries(existingFiles)
//     .map(
//       ([filename, file]) => `### ${filename}\n${file.code.substring(0, 150)}...`
//     )
//     .join("\n\n");

//   // Create the prompt text with modified instructions about output format
//   const promptText = dedent(`
//     # CODE ENHANCEMENT REQUEST

//     ## EXISTING FILES:
//     ${filesDescription}

//     ## USER REQUEST:
//     ${userEnhancementPrompt}

//   ## INSTRUCTIONS:
//   1. Respond with PLAIN JSON ONLY, DO NOT use markdown code blocks or backticks.
//   2. IMPORTANT: Use DOUBLE QUOTES for ALL strings, including inside code. Do NOT use single quotes anywhere.
//   3. Ensure all values, including "code", are valid JSON strings with proper escaping.
//   4. Only use Tailwind CSS dont add external css files.
//   5. Dont structure like this (src/components/filename.jsx) do this (/components/filename.jsx)
//   6. App.js is in root folder like /App.js
//   7. IMPORTANT: Only update files that actually need changes - preserve all other files exactly as they are.
//   8. Preserve existing styling and components unless explicitly requested to change them.
//   9. Please also give the Updated+ Not Updated files.
//     10. Follow this exact structure:
//     {
//       "enhancedFiles": {
//         "/App.js": {
//           "code": "full code here as a valid JSON string with double quotes only",
//           "notes": "optional notes"
//         },
//         "/components/Navbar.jsx": {
//           "code": "full code here as a valid JSON string with double quotes only",
//           "notes": "optional notes"
//         }
//       },
//       "explanation": "summary of changes"
//     }
//     11. Do NOT include any text before or after the JSON object.
//     12. MOST IMPORTANT: Keep code simple and minimal to avoid response truncation.

//     ## CRITICAL REACT COMPONENT REQUIREMENTS:

//     1. Every React component file MUST use DEFAULT EXPORT: "export default function ComponentName() {...}"
//     2. In App.js importing components: "import ComponentName from './components/ComponentName';"
//     3. Components must return ONE parent element (or Fragment).
//     4. All JSX elements must be properly closed.
//     5. Always add "key" prop to elements inside map() functions.
//     6. Use React hooks correctly.
    
//     STYLING Guidelines:

// ✅ **Beautiful UI/UX principles**
// ✅ **Modern typography and responsive layouts**
// ✅ **Vibrant colors, gradients, shadows, and smooth animations**
// ✅ **Proper padding, margins, and spacing for a professional look**
// ✅ **Interactive elements with hover, focus, and click animations**

// 🟢 **Mandatory Styling Enhancements:**
// - Use **primary color palettes** (\`bg-gradient-to-r from-blue-500 to-indigo-600\`, \`text-white\`).
// - Ensure **contrast & accessibility** (\`text-gray-800 dark:text-gray-100\`).
// - Apply **drop shadows and smooth transitions** (\`shadow-lg hover:shadow-2xl transition-all duration-300\`).
// - Use **rounded corners** for elements (\`rounded-xl\`).
// - Implement **card-based layouts** where necessary (\`p-6 bg-white shadow-md rounded-lg\`).
// - Forms should have **modern input fields** (\`border-gray-300 focus:ring-2 focus:ring-blue-500\`).


// Ensure:
// - **Hover effects** (\`hover:bg-opacity-80 transition-all\`).
// - **Button animations** (\`transform hover:scale-105\`).
// - **Card animations** (\`hover:shadow-xl\`).

// ### 🚀 **Now Your Generated UI Will Always Be:**
// ✅ **Modern & Attractive** (gradients, animations, proper spacing)
// ✅ **Highly Usable** (intuitive UI/UX principles)
// ✅ **Beautifully Styled** (no more dull designs)
// ✅ **Production-Ready** (no placeholder comments, only full logic
    
//   `);

//   try {
//     const response = await axios.post(
//       API_URL,
//       {
//         contents: [
//           {
//             parts: [{ text: promptText }],
//             role: "user",
//           },
//         ],
//         generationConfig: {
//           temperature: 0.7,
//           maxOutputTokens: MAX_OUTPUT_TOKENS, // Increased token limit
//           stopSequences: [],
//         },
//         safetySettings: [
//           {
//             category: "HARM_CATEGORY_HARASSMENT",
//             threshold: "BLOCK_ONLY_HIGH",
//           },
//         ],
//       },
//       {
//         headers: {
//           "Content-Type": "application/json",
//         },
//         timeout: 60000, // Increased timeout for larger responses
//       }
//     );

//     const responseText =
//       response.data?.candidates?.[0]?.content?.parts?.[0]?.text || "";

//     console.log("Response preview:", responseText.substring(0, 200) + "...");
//     console.log("Response length:", responseText.length);

//     let jsonResponse = null;

//     try {
//       jsonResponse = JSON.parse(responseText);
//       console.log("✅ Direct JSON parsing succeeded!");
//     } catch (parseError) {
//       console.log("Direct JSON parsing failed, trying extraction methods...");

//       jsonResponse = safeJsonParse(responseText, null);

//       if (!jsonResponse) {
//         throw new Error(
//           `Failed to parse API response: ${
//             parseError.message
//           }\nResponse starts with: ${responseText.substring(0, 200)}...`
//         );
//       }
//     }

//     if (!jsonResponse?.enhancedFiles) {
//       throw new Error(
//         "Response missing enhancedFiles property. Received: " +
//           JSON.stringify(jsonResponse).substring(0, 200) +
//           "..."
//       );
//     }

//     const result = {
//       enhancedFiles: {},
//       explanation: jsonResponse.explanation || "No explanation provided",
//       updates: [],
//     };

//     // Process and validate the enhanced files
//     for (const [path, file] of Object.entries(jsonResponse.enhancedFiles)) {
//       if (!file?.code) {
//         console.warn(`⚠️ Missing code in enhanced file: ${path}`);
//         continue;
//       }

//       let codeString = file.code;
//       try {
//         // Check if the code is itself a JSON string that needs parsing
//         if (
//           typeof file.code === "string" &&
//           file.code.startsWith("{") &&
//           file.code.includes("\\n")
//         ) {
//           const possibleJsonCode = JSON.parse(file.code);
//           if (typeof possibleJsonCode === "object") {
//             // It was double-encoded, use the parsed version
//             codeString = file.code;
//           }
//         }
//       } catch (e) {
//         // Not double-encoded, continue with the original string
//       }

//       // Process and validate React component exports
//       let processedCode = codeString
//         .replace(/\\n/g, "\n")
//         .replace(/\\"/g, '"')
//         .replace(/\\'/g, "'")
//         .trim();

//       // Simple validation for React component exports
//       if (path.endsWith(".jsx") || path.endsWith(".js")) {
//         // Check if file has proper exports
//         const hasDefaultExport = /export\s+default\s+\w+/.test(processedCode);
//         const hasDefaultExportFunction =
//           /export\s+default\s+function\s+\w+/.test(processedCode);
//         const hasNamedExportOnly =
//           /export\s+{\s*\w+\s*}/.test(processedCode) && !hasDefaultExport;

//         if (hasNamedExportOnly) {
//           console.warn(
//             `⚠️ Potential React component issue in ${path}: Found named export only`
//           );
//           // Try to fix named export to default export
//           const compNameMatch = processedCode.match(/function\s+(\w+)/);
//           if (compNameMatch && compNameMatch[1]) {
//             const componentName = compNameMatch[1];
//             processedCode = processedCode.replace(
//               /export\s+{\s*\w+\s*}/,
//               `export default ${componentName}`
//             );
//             console.log(
//               `✅ Fixed: Converted named export to default export for ${componentName}`
//             );
//           }
//         }
//       }

//       result.enhancedFiles[path] = {
//         code: processedCode,
//         notes: file.notes || "",
//       };

//       result.updates.push({
//         file: path,
//         operation: existingFiles[path] ? "updated" : "created",
//         changes: file.notes || "Code enhancements applied",
//       });
//     }

//     return result;
//   } catch (error) {
//     console.error("❌ AI Enhancement Error:", {
//       message: error.message,
//       code: error.code || error.response?.status || "AI_PROCESSING_ERROR",
//       responseData: error.response?.data,
//       retryCount,
//     });

//     // Handle rate limiting specifically
//     if (error.response?.status === 429) {
//       console.error(
//         "⚠️ Rate limit exceeded. You may need to wait before trying again."
//       );
//       return {
//         error: "Rate limit exceeded",
//         details: "The API rate limit has been reached. Please try again later.",
//         code: "RATE_LIMIT_EXCEEDED",
//         enhancedFiles: existingFiles, // Return original files as fallback
//       };
//     }

//     // Special handling for truncated responses
//     if (
//       error.message.includes("Unexpected end of JSON input") ||
//       error.message.includes("Failed to parse API response")
//     ) {
//       console.warn(
//         "⚠️ Likely encountered truncated response. Attempting recovery..."
//       );

//       // If we have a partial response, try to extract what we can
//       if (error.message.includes("Response starts with:")) {
//         const partialResponse = error.message.split("Response starts with:")[1];
//         if (partialResponse) {
//           try {
//             const partialJson = extractPartialJson(partialResponse);
//             if (
//               partialJson &&
//               Object.keys(partialJson.enhancedFiles).length > 0
//             ) {
//               console.log("✅ Recovered partial files from truncated response");

//               // Create a result with the recovered files
//               const result = {
//                 enhancedFiles: {},
//                 explanation: "Partially recovered from truncated response",
//                 updates: [],
//                 warning:
//                   "The response was truncated. Some code may be incomplete.",
//               };

//               // Process the recovered files
//               for (const [path, file] of Object.entries(
//                 partialJson.enhancedFiles
//               )) {
//                 result.enhancedFiles[path] = {
//                   code: file.code,
//                   notes: "Partially recovered from truncated response",
//                 };

//                 result.updates.push({
//                   file: path,
//                   operation: existingFiles[path] ? "updated" : "created",
//                   changes: "Partially recovered from truncated response",
//                 });
//               }

//               return result;
//             }
//           } catch (recoveryError) {
//             console.error("❌ Recovery attempt failed:", recoveryError.message);
//           }
//         }
//       }
//     }

//     // Don't retry on 400 errors (bad requests) or rate limits (429)
//     if (
//       retryCount < MAX_RETRIES &&
//       (!error.response ||
//         (error.response.status !== 400 && error.response.status !== 429))
//     ) {
//       const delay = RETRY_DELAY_MS * Math.pow(2, retryCount); // Exponential backoff
//       console.log(`🔁 Retrying in ${delay}ms (attempt ${retryCount + 1})...`);
//       await sleep(delay);

//       // For the next retry, simplify the prompt even more to reduce response size
//       if (retryCount > 0) {
//         console.log("📉 Simplifying prompt for retry to reduce response size");
//         userEnhancementPrompt =
//           "Simplify and optimize the code. Keep responses minimal.";
//       }

//       return enhanceGeneratedCode(
//         userEnhancementPrompt,
//         existingFiles,
//         retryCount + 1
//       );
//     }

//     return {
//       error: "Failed to process enhancement",
//       details: error.message,
//       code: error.code || error.response?.status || "AI_ENHANCEMENT_FAILED",
//       enhancedFiles: existingFiles, // Return original files as fallback
//     };
//   }
// };

// module.exports = enhanceGeneratedCode;

const axios = require("axios");
const dedent = require("dedent");

const MAX_RETRIES = 2;
const RETRY_DELAY_MS = 1000; // 1 second between retries
const MAX_OUTPUT_TOKENS = 8192; // Increased token limit for larger responses

/**
 * Improved JSON extraction that handles truncated responses
 */
const safeJsonParse = (data, fallback = {}) => {
  try {
    // Check if we're dealing with empty data
    if (!data || typeof data !== "string") {
      console.warn("❌ Empty or non-string data provided for parsing");
      return fallback;
    }

    // More robust JSON extraction that handles various markdown formats
    let jsonString = data;

    // Remove markdown code block formatting if present
    const codeBlockMatch = data.match(/```(?:json)?\n([\s\S]*?)\n```/);
    if (codeBlockMatch && codeBlockMatch[1]) {
      jsonString = codeBlockMatch[1];
    } else {
      // Try to clean the string in case it's not in code blocks
      jsonString = data
        .replace(/^```(?:json)?/gm, "") // Remove starting ```
        .replace(/```$/gm, "") // Remove ending ```
        .trim();
    }

    // Handle mangled or improperly formatted JSON
    // Replace single quotes with double quotes for property names
    jsonString = jsonString.replace(/(\w+):'([^']*)'/g, '"$1":"$2"');

    // Replace single quotes with double quotes in property values
    jsonString = jsonString.replace(/: *'([^']*)'/g, ': "$1"');

    // Fix double quotes inside strings that should be escaped
    jsonString = jsonString.replace(/([^\\])"([^"]*)"(,|}|])/g, '$1\\"$2\\"$3');

    // Check if JSON appears to be truncated
    if (isLikelyTruncated(jsonString)) {
      console.warn("⚠️ JSON appears to be truncated, attempting repair");
      jsonString = attemptToRepairTruncatedJson(jsonString);
    }

    // Try to parse the extracted JSON
    return JSON.parse(jsonString);
  } catch (e) {
    // If standard parsing fails, try a more aggressive approach
    try {
      console.warn("⚠️ Standard JSON parsing failed, trying aggressive fix...");

      // Check if JSON appears to be truncated before aggressive replacements
      let fixedString = data;

      if (isLikelyTruncated(fixedString)) {
        console.warn(
          "⚠️ JSON appears to be truncated, attempting repair before aggressive fix"
        );
        fixedString = attemptToRepairTruncatedJson(fixedString);
      }

      // More aggressive cleaning for malformed JSON
      fixedString = fixedString
        // Replace all single quotes with double quotes (risky but might work)
        .replace(/'/g, '"')
        // Fix double-converted quotes in keys and values
        .replace(/"([^"]*)"": ""([^"]*)""/, '"$1": "$2"')
        // Fix escaped quotes that got double-escaped
        .replace(/\\\\\"/g, '\\"')
        // Handle unescaped backslashes before quotes
        .replace(/([^\\])\\([^"])/g, "$1\\\\$2");

      return JSON.parse(fixedString);
    } catch (secondError) {
      console.warn("❌ JSON parsing failed:", e.message);
      console.warn("Secondary parsing also failed:", secondError.message);

      // Last resort: attempt to extract and recreate the JSON structure
      try {
        console.warn(
          "🔄 Last resort: attempting to extract partial JSON structure"
        );
        return extractPartialJson(data);
      } catch (finalError) {
        console.warn("💥 All JSON parsing attempts failed", finalError.message);
        return fallback;
      }
    }
  }
};

/**
 * Checks if a JSON string appears to be truncated
 */
const isLikelyTruncated = (jsonString) => {
  // Count opening and closing braces/brackets
  const openBraces = (jsonString.match(/{/g) || []).length;
  const closeBraces = (jsonString.match(/}/g) || []).length;
  const openBrackets = (jsonString.match(/\[/g) || []).length;
  const closeBrackets = (jsonString.match(/\]/g) || []).length;

  // If we have more opening than closing, it's likely truncated
  return openBraces > closeBraces || openBrackets > closeBrackets;
};

/**
 * Attempts to repair truncated JSON by closing missing brackets and braces
 */
const attemptToRepairTruncatedJson = (jsonString) => {
  let repaired = jsonString;

  // Count opening and closing braces/brackets
  const openBraces = (jsonString.match(/{/g) || []).length;
  const closeBraces = (jsonString.match(/}/g) || []).length;
  const openBrackets = (jsonString.match(/\[/g) || []).length;
  const closeBrackets = (jsonString.match(/\]/g) || []).length;

  // Close missing braces and brackets in the correct order
  // Analyze the structure to determine nesting
  const stack = [];
  for (let i = 0; i < jsonString.length; i++) {
    const char = jsonString[i];
    if (char === "{" || char === "[") {
      stack.push(char);
    } else if (char === "}" && stack[stack.length - 1] === "{") {
      stack.pop();
    } else if (char === "]" && stack[stack.length - 1] === "[") {
      stack.pop();
    }
  }

  // Close the stack in reverse order
  while (stack.length > 0) {
    const opener = stack.pop();
    if (opener === "{") {
      repaired += "}";
    } else if (opener === "[") {
      repaired += "]";
    }
  }

  return repaired;
};

/**
 * Attempts to extract a partial JSON structure from a truncated string
 */
const extractPartialJson = (jsonString) => {
  // First see if we can extract the enhancedFiles structure
  const result = {
    enhancedFiles: {},
    explanation: "Partially recovered from truncated response",
  };

  try {
    // Try to find the beginning of the enhancedFiles object
    const enhancedFilesMatch = jsonString.match(/"enhancedFiles"\s*:\s*{/);
    if (enhancedFilesMatch) {
      const startIndex = enhancedFilesMatch.index;
      let braceCount = 1; // We've found the opening brace of enhancedFiles
      let endIndex = startIndex + enhancedFilesMatch[0].length;

      // Find where enhancedFiles object ends by counting braces
      for (let i = endIndex; i < jsonString.length && braceCount > 0; i++) {
        if (jsonString[i] === "{") braceCount++;
        if (jsonString[i] === "}") braceCount--;
        endIndex = i;
      }

      if (braceCount === 0) {
        // We successfully found the complete enhancedFiles object
        const enhancedFilesObj = jsonString.substring(
          startIndex + 15,
          endIndex + 1
        );
        try {
          const parsed = JSON.parse(`{${enhancedFilesObj}}`);
          if (parsed && Object.keys(parsed).length > 0) {
            result.enhancedFiles = parsed;
            return result;
          }
        } catch (e) {
          console.warn("Could not parse extracted enhancedFiles object", e);
          // Continue to file-by-file extraction below
        }
      }
    }

    // If we couldn't extract the full enhancedFiles object, try file by file

    // Check if we have an App.js file
    const appJsMatch = jsonString.match(
      /"\/App\.js":\s*{\s*"code":\s*"([^"]*)"/
    );
    if (appJsMatch && appJsMatch[1]) {
      result.enhancedFiles["/App.js"] = {
        code: appJsMatch[1].replace(/\\n/g, "\n").replace(/\\"/g, '"'),
        notes: "Partially recovered from truncated response",
      };
    }

    // Try to extract component filenames
    const componentMatches = jsonString.matchAll(
      /"(\/components\/[^"]+)":\s*{\s*"code":\s*"([^"]*)"/g
    );
    for (const match of Array.from(componentMatches)) {
      if (match[1] && match[2]) {
        result.enhancedFiles[match[1]] = {
          code: match[2].replace(/\\n/g, "\n").replace(/\\"/g, '"'),
          notes: "Partially recovered from truncated response",
        };
      }
    }

    // If we found any files, return the result
    if (Object.keys(result.enhancedFiles).length > 0) {
      return result;
    }
  } catch (e) {
    console.warn("Error during partial JSON extraction:", e);
  }

  // If we couldn't extract anything, throw an error
  throw new Error("Failed to extract any files from truncated JSON");
};

/**
 * Extracts class names from a string of JSX/React code
 * @param {string} code - The code to analyze
 * @returns {string[]} - Array of found class names
 */
const extractClassNames = (code) => {
  const classNames = [];

  // Match className="..." patterns
  const classRegex = /className\s*=\s*["']([^"']+)["']/g;
  let match;

  while ((match = classRegex.exec(code)) !== null) {
    const classes = match[1].split(/\s+/);
    classNames.push(...classes);
  }

  // Match className={`...`} patterns
  const templateRegex = /className\s*=\s*{\s*`([^`]+)`\s*}/g;
  while ((match = templateRegex.exec(code)) !== null) {
    const classes = match[1].split(/\s+/);
    classNames.push(...classes);
  }

  // Match className={cx('...', '...')} patterns
  const cxRegex =
    /className\s*=\s*{\s*(?:cx|clsx|classNames)\(\s*['"]([^'"]+)['"]/g;
  while ((match = cxRegex.exec(code)) !== null) {
    const classes = match[1].split(/\s+/);
    classNames.push(...classes);
  }

  return [...new Set(classNames)]; // Remove duplicates
};

/**
 * Merges original and enhanced code to preserve styling
 * @param {string} originalCode - The original code with styles to preserve
 * @param {string} enhancedCode - The enhanced code with new functionality
 * @returns {string} - Merged code that preserves original styling with enhanced functionality
 */
const mergeCodePreservingStyles = (originalCode, enhancedCode) => {
  // If the files are React components, try to preserve Tailwind classes
  if (
    originalCode.includes("import React") ||
    originalCode.includes('from "react"')
  ) {
    const originalClasses = extractClassNames(originalCode);

    if (originalClasses.length > 0) {
      console.log(`Found ${originalClasses.length} CSS classes to preserve`);

      // For each element in the enhanced code, try to find matching elements in original code
      // and preserve their classes

      // This is a simplified approach - for complex cases, we might need a more robust solution
      // with AST parsing, but this should handle common cases

      // Extract element structures from both codes
      const elementRegex = /<([a-zA-Z][a-zA-Z0-9]*)([^>]*?)(?:\/?>|\/>)/g;
      const originalElements = [];
      const enhancedElements = [];

      let match;
      while ((match = elementRegex.exec(originalCode)) !== null) {
        originalElements.push({
          tag: match[1],
          attrs: match[2],
          full: match[0],
        });
      }

      let enhancedCodeWithPreservedStyles = enhancedCode;
      let elemCount = 0;

      while ((match = elementRegex.exec(enhancedCode)) !== null) {
        const enhancedElem = {
          tag: match[1],
          attrs: match[2],
          full: match[0],
        };

        // Find matching element in original code (same tag)
        const matchingOriginals = originalElements.filter(
          (elem) => elem.tag === enhancedElem.tag
        );

        if (matchingOriginals.length > 0) {
          // Use the first match for simplicity (can be improved)
          const originalElem =
            matchingOriginals[elemCount % matchingOriginals.length];

          // Extract className from original
          const originalClassMatch = originalElem.attrs.match(
            /className\s*=\s*["']([^"']+)["']/
          );
          const enhancedClassMatch = enhancedElem.attrs.match(
            /className\s*=\s*["']([^"']+)["']/
          );

          if (originalClassMatch && enhancedClassMatch) {
            // Combine classes from both
            const originalClasses = originalClassMatch[1].split(/\s+/);
            const enhancedClasses = enhancedClassMatch[1].split(/\s+/);

            // Merge classes, prioritizing enhanced ones for functional classes
            const mergedClasses = [
              ...new Set([...enhancedClasses, ...originalClasses]),
            ];

            // Create new element with merged classes
            const newElemAttrs = enhancedElem.attrs.replace(
              enhancedClassMatch[0],
              `className="${mergedClasses.join(" ")}"`
            );

            const newElem = enhancedElem.full.replace(
              enhancedElem.attrs,
              newElemAttrs
            );

            // Replace in enhanced code
            enhancedCodeWithPreservedStyles =
              enhancedCodeWithPreservedStyles.replace(
                enhancedElem.full,
                newElem
              );
          }

          elemCount++;
        }
      }

      return enhancedCodeWithPreservedStyles;
    }
  }

  // If we couldn't do smart merging, just return the enhanced code
  return enhancedCode;
};

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const enhanceGeneratedCode = async (
  userEnhancementPrompt,
  existingFiles,
  retryCount = 0
) => {
  const API_KEY = process.env.GEMINI_API?.trim();

  if (!API_KEY) {
    console.error("❌ Missing GEMINI_API key in environment variables.");
    return {
      error: "API key is missing",
      code: "MISSING_API_KEY",
    };
  }

  const API_URL = `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-pro:generateContent?key=${API_KEY}`;

  // Format the existing files for the prompt - include more code to give better context
  const filesDescription = Object.entries(existingFiles)
    .map(
      ([filename, file]) => `### ${filename}\n${file.code.substring(0, 300)}...`
    )
    .join("\n\n");

  // Create the prompt text with modified instructions about preserving styles
  const promptText = dedent(`
    # CODE ENHANCEMENT REQUEST

    ## EXISTING FILES:
    ${filesDescription}

Enhance or fix this Vite + React project using Tailwind CSS. All files must follow clean component-based architecture. Organize the project with reusable UI components, layout wrappers, and pages inside their respective folders.

Do not use any third-party libraries or frameworks apart from lucide-react icons—only use icons when semantically meaningful. Icons available: Heart, Shield, Clock, Users, Play, Home, Search, Menu, User, Settings, Mail, Bell, Calendar, Star, Upload, Download, Trash, Edit, Plus, Minus, Check, X, ArrowRight.

Follow Tailwind utility-first styling principles. Layouts should be responsive. Ensure the file structure is scalable and the code is maintainable. Improve or fix the app based on provided user goals or requirements.USER REQUIREMENTS: ${userEnhancementPrompt}
Follow this exact structure:
    {
      "enhancedFiles": {
        "/App.js": {
          "code": "import React from \\"react\\";\\n\\nfunction App() {\\n  return (\\n    <div>Hello</div>\\n  );\\n}\\n\\nexport default App;",
          "notes": "optional notes"
        },
        "/components/Navbar.jsx": {
          "code": "import React from \\"react\\";\\n\\nexport default function Navbar() {\\n  return (\\n    <nav>Navigation</nav>\\n  );\\n}",
          "notes": "optional notes"
        }
      },
      "explanation": "summary of changes"
    }

IMPORTANT: When returning code in the JSON response, DO NOT use backticks around code. 
    Instead, properly escape all special characters including backticks, quotes, and newlines 
    in the code string using double backslashes. For example:
    
"code": "import React from \\"react\\";\\n\\nconst template = \`This is a template literal\`;\\n\\nfunction App() {\\n  return (\\n    <div>Hello</div>\\n  );\\n}\\n\\nexport default App;"
    

STYLING Guidelines:

✅ **Beautiful UI/UX principles**  
✅ **Modern typography and responsive layouts**  
✅ **Vibrant colors, gradients, shadows, and smooth animations**  
✅ **Proper padding, margins, and spacing for a professional look**  
✅ **Interactive elements with hover, focus, and click animations**  

🟢 **Mandatory Styling Enhancements:**  
- Use **primary color palettes** (\`bg-gradient-to-r from-blue-500 to-indigo-600\`, \`text-white\`).  
- Ensure **contrast & accessibility** (\`text-gray-800 dark:text-gray-100\`).  
- Apply **drop shadows and smooth transitions** (\`shadow-lg hover:shadow-2xl transition-all duration-300\`).  
- Use **rounded corners** for elements (\`rounded-xl\`).  
- Implement **card-based layouts** where necessary (\`p-6 bg-white shadow-md rounded-lg\`).  
- Forms should have **modern input fields** (\`border-gray-300 focus:ring-2 focus:ring-blue-500\`).  


Ensure:
- **Hover effects** (\`hover:bg-opacity-80 transition-all\`).  
- **Button animations** (\`transform hover:scale-105\`).  
- **Card animations** (\`hover:shadow-xl\`).  

### 🚀 **Now Your Generated UI Will Always Be:**
✅ **Modern & Attractive** (gradients, animations, proper spacing)  
✅ **Highly Usable** (intuitive UI/UX principles)  
✅ **Beautifully Styled** (no more dull designs)  
✅ **Production-Ready** (no placeholder comments, only full logic)

- Use Tailwind Classes for Adding styles to the elements.

- If user want to develop the full website the create atleat 5 pages more than 5 components like(Navbar, Footer, HeroSection, Testimonials, Contact form ,etc.)

- If there is no need to make a multiple page dont make it focus on functionality ok.

- Make better UI/UX. Apply UI/UX principals.

- Add Proper Styling using Tailwind css classes

- Dont leave comment like this (Eg: //write logic for handel reset) please write full code logics etc.

- If you adding conditional rendering using turnary operator so please use backticks inside css or any logic.

- Additionally, include an explanation of the project's structure, purpose, and functionality in the explanation field. Make the response concise and clear in one paragraph.

- When asked then only use this package to import, here are some packages available to import and use (date-fns,react-chartjs-2,"firebase","@google/generative-ai" ) only when it required

- Add Emoji icons whenever needed to give good user experinence

- all designs I ask you to make, have them be beautiful, not cookie cutter. Make webpages that are fully featured and worthy for production.

- By default, this template supports JSX syntax with Tailwind CSS classes, React hooks, and Lucide React for icons. Do not install other packages for UI themes, icons, etc unless absolutely necessary or I request them.

- Use icons from lucide-react for logos.

- Use stock photos from pexels where appropriate, only valid URLs you know exist. Do not download the images, only link to them in image tags. If you want to add api of pexels then add this (API : D1IxovArVb0qq9ujsq7pbO510mOoHNDCVl4nKwNp13s4MKEDrG0p3m0p) and use this (url:'https://api.pexels.com/v1/search?query=nature&per_page=12')
    


  `);

  try {
    const response = await axios.post(
      API_URL,
      {
        contents: [
          {
            parts: [{ text: promptText }],
            role: "user",
          },
        ],
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: MAX_OUTPUT_TOKENS, // Increased token limit
          stopSequences: [],
        },
        safetySettings: [
          {
            category: "HARM_CATEGORY_HARASSMENT",
            threshold: "BLOCK_ONLY_HIGH",
          },
        ],
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
        timeout: 60000, // Increased timeout for larger responses
      }
    );

    const responseText =
      response.data?.candidates?.[0]?.content?.parts?.[0]?.text || "";

    console.log("Response preview:", responseText.substring(0, 200) + "...");
    console.log("Response length:", responseText.length);

    let jsonResponse = null;

    try {
      // First try direct parsing
      jsonResponse = JSON.parse(responseText);
      console.log("✅ Direct JSON parsing succeeded!");
    } catch (parseError) {
      console.log("Direct JSON parsing failed, trying extraction methods...");

      // Try our enhanced parser
      jsonResponse = safeJsonParse(responseText, null);

      if (!jsonResponse) {
        throw new Error(
          `Failed to parse API response: ${
            parseError.message
          }\nResponse starts with: ${responseText.substring(0, 200)}...`
        );
      }
    }

    if (!jsonResponse?.enhancedFiles) {
      throw new Error(
        "Response missing enhancedFiles property. Received: " +
          JSON.stringify(jsonResponse).substring(0, 200) +
          "..."
      );
    }

    const result = {
      enhancedFiles: {},
      explanation: jsonResponse.explanation || "No explanation provided",
      updates: [],
    };

    // Process and validate the enhanced files
    for (const [path, file] of Object.entries(jsonResponse.enhancedFiles)) {
      if (!file?.code) {
        console.warn(`⚠️ Missing code in enhanced file: ${path}`);
        continue;
      }

      let codeString = file.code;
      try {
        // Check if the code is itself a JSON string that needs parsing
        if (
          typeof file.code === "string" &&
          (file.code.startsWith("{") || file.code.startsWith('"'))
        ) {
          try {
            const possibleJsonCode = JSON.parse(file.code);
            if (
              typeof possibleJsonCode === "object" ||
              typeof possibleJsonCode === "string"
            ) {
              // It was double-encoded, use the parsed version
              codeString =
                typeof possibleJsonCode === "string"
                  ? possibleJsonCode
                  : JSON.stringify(possibleJsonCode);
            }
          } catch (e) {
            // Not valid JSON, continue with the original string
          }
        }
      } catch (e) {
        // Not double-encoded, continue with the original string
      }

      // Process and clean up the code
      let processedCode = codeString
        .replace(/\\n/g, "\n")
        .replace(/\\"/g, '"')
        .replace(/\\'/g, "'")
        .trim();

      // If the file exists in existingFiles, try to preserve styles by merging
      if (existingFiles[path]) {
        const originalCode = existingFiles[path].code;
        processedCode = mergeCodePreservingStyles(originalCode, processedCode);
        console.log(`✅ Preserved styling for ${path}`);
      }

      // Simple validation for React component exports
      if (path.endsWith(".jsx") || path.endsWith(".js")) {
        // Check if file has proper exports
        const hasDefaultExport = /export\s+default\s+\w+/.test(processedCode);
        const hasDefaultExportFunction =
          /export\s+default\s+function\s+\w+/.test(processedCode);
        const hasNamedExportOnly =
          /export\s+{\s*\w+\s*}/.test(processedCode) && !hasDefaultExport;

        if (hasNamedExportOnly) {
          console.warn(
            `⚠️ Potential React component issue in ${path}: Found named export only`
          );
          // Try to fix named export to default export
          const compNameMatch = processedCode.match(/function\s+(\w+)/);
          if (compNameMatch && compNameMatch[1]) {
            const componentName = compNameMatch[1];
            processedCode = processedCode.replace(
              /export\s+{\s*\w+\s*}/,
              `export default ${componentName}`
            );
            console.log(
              `✅ Fixed: Converted named export to default export for ${componentName}`
            );
          }
        }
      }

      result.enhancedFiles[path] = {
        code: processedCode,
        notes: file.notes || "",
      };

      result.updates.push({
        file: path,
        operation: existingFiles[path] ? "updated" : "created",
        changes: file.notes || "Code enhancements applied",
      });
    }

    // Add any files that weren't in the response but were in the original
    for (const [path, file] of Object.entries(existingFiles)) {
      if (!result.enhancedFiles[path]) {
        result.enhancedFiles[path] = {
          code: file.code,
          notes: "Preserved original file",
        };
        result.updates.push({
          file: path,
          operation: "preserved",
          changes: "No changes needed",
        });
      }
    }

    return result;
  } catch (error) {
    console.error("❌ AI Enhancement Error:", {
      message: error.message,
      code: error.code || error.response?.status || "AI_PROCESSING_ERROR",
      responseData: error.response?.data,
      retryCount,
    });

    // Handle rate limiting specifically
    if (error.response?.status === 429) {
      console.error(
        "⚠️ Rate limit exceeded. You may need to wait before trying again."
      );
      return {
        error: "Rate limit exceeded",
        details: "The API rate limit has been reached. Please try again later.",
        code: "RATE_LIMIT_EXCEEDED",
        enhancedFiles: existingFiles, // Return original files as fallback
      };
    }

    // Special handling for truncated responses
    if (
      error.message.includes("Unexpected end of JSON input") ||
      error.message.includes("Failed to parse API response") ||
      error.message.includes("Unexpected token")
    ) {
      console.warn(
        "⚠️ Likely encountered truncated response. Attempting recovery..."
      );

      // If we have a partial response, try to extract what we can
      if (error.message.includes("Response starts with:")) {
        const partialResponse = error.message.split("Response starts with:")[1];
        if (partialResponse) {
          try {
            const partialJson = extractPartialJson(partialResponse);
            if (
              partialJson &&
              Object.keys(partialJson.enhancedFiles).length > 0
            ) {
              console.log("✅ Recovered partial files from truncated response");

              // Create a result with the recovered files
              const result = {
                enhancedFiles: {},
                explanation: "Partially recovered from truncated response",
                updates: [],
                warning:
                  "The response was truncated. Some code may be incomplete.",
              };

              // Process the recovered files and merge with existing
              for (const [path, file] of Object.entries(
                partialJson.enhancedFiles
              )) {
                let processedCode = file.code;

                // If the file exists in existingFiles, preserve styles
                if (existingFiles[path]) {
                  const originalCode = existingFiles[path].code;
                  processedCode = mergeCodePreservingStyles(
                    originalCode,
                    processedCode
                  );
                  console.log(
                    `✅ Preserved styling for ${path} after recovery`
                  );
                }

                result.enhancedFiles[path] = {
                  code: processedCode,
                  notes: "Partially recovered from truncated response",
                };

                result.updates.push({
                  file: path,
                  operation: existingFiles[path] ? "updated" : "created",
                  changes: "Partially recovered from truncated response",
                });
              }

              // Add any files that weren't in the response but were in the original
              for (const [path, file] of Object.entries(existingFiles)) {
                if (!result.enhancedFiles[path]) {
                  result.enhancedFiles[path] = {
                    code: file.code,
                    notes: "Preserved original file",
                  };
                  result.updates.push({
                    file: path,
                    operation: "preserved",
                    changes: "No changes needed",
                  });
                }
              }

              return result;
            }
          } catch (recoveryError) {
            console.error("❌ Recovery attempt failed:", recoveryError.message);
          }
        }
      }
    }

    // Don't retry on 400 errors (bad requests) or rate limits (429)
    if (
      retryCount < MAX_RETRIES &&
      (!error.response ||
        (error.response.status !== 400 && error.response.status !== 429))
    ) {
      const delay = RETRY_DELAY_MS * Math.pow(2, retryCount); // Exponential backoff
      console.log(`🔁 Retrying in ${delay}ms (attempt ${retryCount + 1})...`);
      await sleep(delay);

      // For the next retry, simplify the prompt even more to reduce response size
      if (retryCount > 0) {
        console.log("📉 Simplifying prompt for retry to reduce response size");
        userEnhancementPrompt =
          "Simplify and optimize the code. Keep responses minimal and preserve all existing styles.";
      }

      return enhanceGeneratedCode(
        userEnhancementPrompt,
        existingFiles,
        retryCount + 1
      );
    }

    return {
      error: "Failed to process enhancement",
      details: error.message,
      code: error.code || error.response?.status || "AI_ENHANCEMENT_FAILED",
      enhancedFiles: existingFiles, // Return original files as fallback
    };
  }
};

module.exports = enhanceGeneratedCode;