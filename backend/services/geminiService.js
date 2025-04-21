const axios = require("axios");
const dedent = require("dedent");

const MAX_RETRIES = 2;


const generateCodeFromAI = async (userPrompt, retryCount=0) => {
  const API_KEY = process.env.GEMINI_API;

  if (!API_KEY) {
    console.error("Error: Missing GEMINI_API key in environment variables.");
    return {
      error: "API key is missing",
      details: "Please check your environment configuration",
    };
  }

  const API_URL = `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-pro:generateContent?key=${API_KEY}`;

  const responses = [
    "Alright! Here's how we'll create your",
    "Great! Let's build your",
    "Okay! Here's the plan for your",
    "Let's enhance this feature! We'll create your",
    "No problem! Here's how we'll approach your",
    "Let's get started! We'll create your",
  ];
  const randomResponse =
    responses[Math.floor(Math.random() * responses.length)];

  const CODE_GEN_PROMPT = `
# Two-Phase Response System

 ## Phase 1: Conversational Introduction (ALWAYS START WITH THIS)
  Respond conversationally to the user's request first, then proceed with the structured output.
  
  Example Response Format:
  "${randomResponse} [Project Type]: [Brief 2-3 sentence explanation of the approach]. 
  I'll generate a complete React project with [Key Features]."

Provide step-by-step updates on file operations in a structured and natural format.
Each update should mention the operation (Creating, Updating, Deleting) and the file name.
Keep it concise, clear, and human-readable without JSON formatting.
Example format:
  Creating: App.js 
  Updating: components/Navbar.jsx

---
## Phase 2: Structured Output (After conversational intro)
Generate a programming code structure for a React project using Vite. Create multiple components, organizing them in separate folders with filenames using the .js extension, if needed. The output should use Tailwind CSS for styling, without any third-party dependencies or libraries, except for icons from the lucide-react library, which should only be used when necessary. Available icons include: Heart, Shield, Clock, Users, Play, Home, Search, Menu, User, Settings, Mail, Bell, Calendar, Star, Upload, Download, Trash, Edit, Plus, Minus, Check, X, and ArrowRight. For example, you can import an icon as import { Heart } from "lucide-react" and use it in JSX as <Heart className="" />.
USER REQUIREMENTS:
${userPrompt || "No additional requirements provided"}
Return the response in JSON format with the following schema:

OUTPUT FORMAT REQUIREMENTS (strict JSON):
{
  "response": "Conversational Introduction",
  "updates": [
    {
      "operation": "creating",
      "file": "App.js"
    },
    {
      "operation": "creating",
      "file": "components/Navbar.jsx"
    }
  ],
  "projectTitle": "Descriptive project title",
  "explanation": "Detailed description of the project",
  
  "files": {
    "/components/ComponentName.jsx": {
      "code": "// Complete JavaScript component code with all imports",
      "styles": "Tailwind classes used (text-blue-500, p-4, etc.)"
    },
    "/App.js": {
      "code": "// Complete main application code with all imports"
    },
    "/package.json": {
      "code": "Install required Dependencies"
    }
  },
  "setupInstructions": "npm install && npm run dev"
}

EXAMPLE OUTPUT:
{
  "response": "I'll create a complete Task Management Dashboard for you. This will include user authentication, task creation/editing, priority management, and a statistics dashboard.",
  "updates": [
    {
      "operation": "creating",
      "file": "App.js"
    },
    {
      "operation": "creating",
      "file": "components/Navbar.jsx"
    }
  ],
  "projectTitle": "Task Management Dashboard",
  "explanation": "A responsive task management dashboard with dark mode support, user authentication, and task tracking features",
   
  "files": {
    "/components/Navbar.jsx": {
      "code": "import React, { useState } from 'react';\nimport PropTypes from 'prop-types';\nimport { Menu, Search } from 'lucide-react';\n\nconst Navbar = ({ toggleSidebar }) => {\n  const [searchQuery, setSearchQuery] = useState('');\n  \n  return (\n    <nav className=\"bg-white shadow-sm py-3 px-6 flex items-center justify-between sticky top-0 z-10 dark:bg-gray-800 dark:text-white\">\n      <div className=\"flex items-center space-x-4\">\n        <button \n          onClick={toggleSidebar}\n          className=\"md:hidden text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white\"\n          aria-label=\"Toggle sidebar\"\n        >\n          <Menu size={24} />\n        </button>\n        <h1 className=\"text-xl font-semibold text-gray-800 dark:text-white\">Dashboard</h1>\n      </div>\n      \n      <div className=\"flex-1 max-w-md mx-4 hidden md:block\">\n        <div className=\"relative\">\n          <Search className=\"absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400\" size={18} />\n          <input\n            type=\"text\"\n            placeholder=\"Search...\"\n            className=\"w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white\"\n            value={searchQuery}\n            onChange={(e) => setSearchQuery(e.target.value)}\n            aria-label=\"Search dashboard\"\n          />\n        </div>\n      </div>\n      \n      <div className=\"flex items-center space-x-4\">\n        <button className=\"p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700\" aria-label=\"Notifications\">\n          <div className=\"relative\">\n            <span className=\"absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500\"></span>\n          </div>\n        </button>\n        <div className=\"h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-medium\">\n          JD\n        </div>\n      </div>\n    </nav>\n  );\n};\n\nNavbar.propTypes = {\n  toggleSidebar: PropTypes.func.isRequired\n};\n\nexport default Navbar;",
      "styles": "bg-white, dark:bg-gray-800, shadow-sm, py-3, px-6, flex, items-center, justify-between, sticky, top-0, z-10, text-gray-600, hover:text-gray-900, dark:text-gray-300, dark:hover:text-white, text-xl, font-semibold"
    }
  },
  "setupInstructions": "npm install prop-types lucide-react && npm run dev"
}

Dont make structure like this (src/components/Navbar.jsx)
Structure format: (/components/Navbar.jsx)

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

RESPONSE FORMAT:
- Your response must be valid JSON ONLY, beginning with { and ending with }.
- Do not wrap the response in markdown or add any extraneous text.



`;
  const CHAT_PROMPT = `
  'You are a AI Assistant and experience in React Development.
  GUIDELINES:
  - Tell user what your are building
  - response less than 15 lines. 
  - Skip code examples and commentary'
`;
  try {
    const response = await axios.post(API_URL, {
      contents: [{ parts: [{ text: CODE_GEN_PROMPT }] }],
    });

    const responseText =
      response.data?.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!responseText) {
      console.error("❌ No response text found in API response.");
      return {
        error: "No response text",
        details: "AI response was empty",
        fullResponse: response.data,
      };
    }

    // Extract JSON from AI response
    const jsonMatch = responseText.match(/```json\s*([\s\S]*?)\s*```/);
    const jsonString = jsonMatch ? jsonMatch[1] : responseText;

    let jsonResponse;
    try {
      jsonResponse = JSON.parse(jsonString);
    } catch (parseError) {
      console.error("❌ JSON Parsing Error:", parseError);

      // Attempt second parsing with raw JSON extraction
      const jsonFallbackMatch = responseText.match(/\{[\s\S]*\}/);
      if (jsonFallbackMatch) {
        try {
          jsonResponse = JSON.parse(jsonFallbackMatch[0]);
        } catch (secondAttemptError) {
          console.error("❌ Secondary parsing failed:", secondAttemptError);
          return {
            error: "Invalid JSON response",
            details: secondAttemptError.message,
            rawResponse: responseText,
          };
        }
      } else {
        return {
          error: "No valid JSON found",
          details: parseError.message,
          rawResponse: responseText,
        };
      }
    }

    // Validate JSON response structure
    if (!jsonResponse.files || typeof jsonResponse.files !== "object") {
      return {
        error: "Invalid project structure",
        details: "Response missing required 'files' object",
        response: jsonResponse,
      };
    }

    // Check for missing logic
    let missingLogic = false;
    let retryPrompt = `The following files are missing complete logic. Please generate the full code, ensuring that all logic is implemented:\n\n`;

    const processedFiles = {};
    for (const [path, file] of Object.entries(jsonResponse.files)) {
      let codeContent = file.code
        ? file.code.replace(/\\n/g, "\n").replace(/\\"/g, '"')
        : "";

      if (!codeContent.trim() || /^\/\//.test(codeContent.trim())) {
        console.warn(`🚨 Missing logic detected in ${path}`);
        missingLogic = true;
        retryPrompt += `- ${path}\n`;
      } else {
        processedFiles[path] = { code: codeContent };
      }
    }

    // Retry AI request with fix prompt if logic is missing
    if (missingLogic && retryCount < MAX_RETRIES) {
      console.log(
        `🔄 Requesting AI to fix missing logic (attempt ${
          retryCount + 1
        }/${MAX_RETRIES})...`
      );

      const FIX_PROMPT = dedent(`
        Your previous response had missing logic in some files. Please regenerate only the missing files with full code implementation.
        ${retryPrompt}

        USER REQUIREMENTS:
        ${userPrompt || "No additional requirements provided"}

        OUTPUT FORMAT (strict JSON):
        {
          "files": {
            "/components/ComponentName.jsx": { "code": "// Full JSX component code" },
            "/App.js": { "code": "// Full React app code" }
          }
        }
      `);

      try {
        const fixResponse = await axios.post(API_URL, {
          contents: [{ parts: [{ text: FIX_PROMPT }] }],
        });

        console.log(
          "🔍 Fix AI Response:",
          JSON.stringify(fixResponse.data, null, 2)
        );

        const fixText =
          fixResponse.data?.candidates?.[0]?.content?.parts?.[0]?.text;
        const fixJsonMatch = fixText.match(/```json\s*([\s\S]*?)\s*```/);
        const fixJsonString = fixJsonMatch ? fixJsonMatch[1] : fixText;

        let fixedResponse;
        try {
          fixedResponse = JSON.parse(fixJsonString);
          console.log("✅ Fixed JSON Response:", fixedResponse);
        } catch (parseError) {
          console.error("❌ JSON Parsing Error in Fix Response:", parseError);
          return {
            error: "Invalid fix JSON response",
            details: parseError.message,
            rawResponse: fixText,
          };
        }

        // Merge fixed files into processedFiles
        for (const [path, file] of Object.entries(fixedResponse.files || {})) {
          processedFiles[path] = {
            code: file.code.replace(/\\n/g, "\n").replace(/\\"/g, '"'),
          };
        }
      } catch (fixError) {
        console.error("❌ AI Service Error in Fix Request:", {
          message: fixError.message,
          stack: fixError.stack,
          response: fixError.response?.data,
        });
        return {
          error: "Failed to fix missing logic",
          details: fixError.message,
          code: "AI_FIX_ERROR",
        };
      }
    }

    return { ...jsonResponse, files: processedFiles };
  } catch (error) {
    console.error("❌ AI Service Error:", {
      message: error.message,
      stack: error.stack,
      response: error.response?.data,
    });

    return {
      error: "Failed to process AI response",
      details: error.message,
      code: "AI_SERVICE_ERROR",
    };
  }
};

module.exports = generateCodeFromAI;



//   const CODE_GEN_PROMPT = `
//   # Two-Phase Response System

//   ## Phase 1: Conversational Introduction (ALWAYS START WITH THIS)
//   Respond conversationally to the user's request first, then proceed with the structured output.
  
//   Example Response Format:
//   "${randomResponse} [Project Type]: [Brief 2-3 sentence explanation of the approach]. 
//   I'll generate a complete React project with [Key Features]."

//   Provide step-by-step updates on file operations in a structured and natural format.
//   Each update should mention the operation (Creating, Updating, Deleting), the file name.
//   Keep it concise, clear, and human-readable without JSON formatting.
//   Example format:
//     Creating: App.jsx 
//     Updating: Navbar.jsx

//   ---
//   ## Phase 2:  Structured Output (After conversational intro)
//   Generate a COMPLETE production-ready React project with JavaScript and Tailwind CSS.
//   The design should follow the latest UI/UX trends, ensuring a clean, professional, and visually appealing interface.
//   The output must be a fully functional application with all necessary components, styles, and logic.

//   USER REQUIREMENTS:
//   ${userPrompt || "No additional requirements provided"}

//   TECHNICAL REQUIREMENTS:
//   1. Project Structure:
//      - Use App.js (not App.jsx)
//      - All components/pages must use .jsx (e.g., Navbar.jsx, Home.jsx)
//      - Use functional components with JavaScript
//      - Follow React best practices
//      - Include proper JavaScript interfaces/types
//      - Don't use TypeScript
//      - Use modern React hooks (useState, useEffect, etc.)
     

//   2. Component Requirements:
//      - Minimum 5 meaningful components
//      - Each component must be fully self-contained
//      - Include proper props typing
//      - State management where appropriate
//      - Complete JSX structure
//      - Meaningful component names

//   3. Styling Requirements:
//      - Use Tailwind CSS for all styling
//      - Mobile-first responsive design
//      - Consistent spacing (px-4, py-2, etc.)
//      - Responsive breakpoints (sm, md, lg, xl)
//      - Dark mode support
//      - Hover/focus states
//      - Smooth transitions
//      - Accessible color contrast

//   4. Accessibility:
//      - Semantic HTML
//      - ARIA attributes
//      - Keyboard navigation support
//      - Focus management
//      - Screen reader support

//   5. Code Quality:
//      - Proper error handling
//      - Loading states
//      - Clean code structure
//      - JSDoc comments
//      - ESLint compliant
//      - Prettier formatted
   
//      - Use date-fns for date formatting and react-chartjs-2 for charts/graphs if necessary.
//      - Find and use high-quality, royalty-free images from Pexels that best match the website's theme. Prioritize visually appealing, modern, and relevant images based on the website's niche. Ensure that the images enhance the user experience and fit seamlessly into the design     - Make all designs production-worthy, not generic.
//      - Use stock photos from Unsplash when appropriate.    
//      - Use lucide-react for icons if necessary.

  

//   OUTPUT FORMAT REQUIREMENTS (strict JSON):
//   {

//     "response":"Conversational Introduction",
//     "updates": [
//     {
//       "operation": "creating",
//       "file": "App.jsx"
//     },
//     {
//       "operation": "updating",
//       "file": "Navbar.jsx"
//     }
//   ],
//     "projectTitle": "Descriptive project title",
//     "explanation": "Detailed description of the project",
    
    
//     "files": {
//       "/components/ComponentName.jsx": {
//         "code": "Complete JavaScript component code",
//         "styles": "Tailwind classes used"
//       },
//       "/App.js": {
//         "code": "Complete main application code"
//       }
//     },
//     "setupInstructions": "npm install && npm run dev"
//   }

//   EXAMPLE OUTPUT:
//   {
//     "response": "Conversational Introduction",
//         "updates": [
//     {
//       "operation": "creating",
//       "file": "App.jsx"
//     },
//     {
//       "operation": "updating",
//       "file": "Navbar.jsx"
//     }
//   ],
//     "projectTitle": "Task Management Dashboard",
//     "explanation": "A responsive task management dashboard with dark mode support",
     

//     "files": {
//       "/components/Navbar.jsx": {
//         "code": "import React, { useState } from 'react';\nimport { Menu, X, Search } from 'lucide-react';\n\nconst Navbar = ({ toggleSidebar }) => {\n  const [searchQuery, setSearchQuery] = useState('');\n  \n  return (\n    <nav className=\"bg-white shadow-sm py-3 px-6 flex items-center justify-between sticky top-0 z-10\">\n      <div className=\"flex items-center space-x-4\">\n        <button \n          onClick={toggleSidebar}\n          className=\"md:hidden text-gray-600 hover:text-gray-900\"\n          aria-label=\"Toggle sidebar\"\n        >\n          <Menu size={24} />\n        </button>\n        <h1 className=\"text-xl font-semibold text-gray-800\">Dashboard</h1>\n      </div>\n      \n      <div className=\"flex-1 max-w-md mx-4 hidden md:block\">\n        <div className=\"relative\">\n          <Search className=\"absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400\" size={18} />\n          <input\n            type=\"text\"\n            placeholder=\"Search...\"\n            className=\"w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent\"\n            value={searchQuery}\n            onChange={(e) => setSearchQuery(e.target.value)}\n            aria-label=\"Search dashboard\"\n          />\n        </div>\n      </div>\n      \n      <div className=\"flex items-center space-x-4\">\n        <button className=\"p-2 rounded-full hover:bg-gray-100\" aria-label=\"Notifications\">\n          <div className=\"relative\">\n            <span className=\"absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500\"></span>\n          </div>\n        </button>\n        <div className=\"h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-medium\">\n          JD\n        </div>\n      </div>\n    </nav>\n  );\n};\n\nexport default Navbar;",
//         "styles": "bg-white, dark:bg-gray-800, p-4, rounded-lg, shadow, text-lg, font-medium"
//       }
//     },
//     "setupInstructions": "npm install && npm run dev"
//   }

//   IMPORTANT RULES:
//   1. EVERY component must be fully complete and production-ready
//   2. Include ALL necessary imports and exports
//   3. Use PROPER JavaScript typing
//   4. Style EVERY visible element
//   5. Include responsive design
//   6. No placeholder comments - only actual code
//   7. All components must be connected and work together
//   8. If requirements aren't met, the response will be rejected
//   9. Dont use TypeScript

//   RESPONSE FORMAT:
//   Your response must be valid JSON ONLY, beginning with { and ending with }.
//   Do not wrap the response in markdown or add any extraneous text.

//     IMPORTANT: Your response MUST be valid JSON ONLY. Do not wrap the response in markdown code blocks or backticks of any kind.
//   The response must begin with { and end with } with properly escaped strings inside.
// `;
// 
// 
// 
// 
//  // const CODE_GEN_PROMPT = dedent`
  //   User Additional Context: ${userPrompt || "No additional context provided"}
  //   Generate a Project in React. Create multiple components, organizing them in separate folders with filenames using the .js extension, if needed. 
  //   The output should use Tailwind CSS for styling, without any third-party dependencies or libraries, except for icons from the lucide-react library.
  //   Return the response in valid JSON format with this schema:
  //   {
  //     "projectTitle": "",
  //     "explanation": "",
  //     "files": {
  //       "/App.js": {
  //         "code": ""
  //       }
  //     },
  //     "generatedFiles": []
  //   }

  //   - Use date-fns for date formatting and react-chartjs-2 for charts/graphs if necessary.
  //   - Placeholder images: https://archive.org/download/placeholder-image/placeholder-image.jpg
  //   - Make all designs production-worthy, not generic.
  //   - Use stock photos from Unsplash when appropriate.    
  //   - Use lucide-react for icons if necessary.
    
  //   IMPORTANT: Return ONLY raw JSON without any markdown formatting or backticks.
  // `;
  
// const CODE_GEN_PROMPT = dedent`
//   User Additional Context: ${userPrompt || "No additional context provided"}

//   Generate a COMPLETE production-ready React project with multiple components. Each component must be fully developed with:
//   - Complete structure (not just 2-3 lines)
//   - Proper Tailwind CSS styling
//   - Responsive design
//   - Accessibility features
//   - Clear documentation

//   REQUIREMENTS:
//   1. Create at least 5 meaningful components (e.g.,  MainContent, Navbar, Sidebar, Footer, etc.)
//   2. Each component must have:
//      - Complete JSX structure
//      - Meaningful props (when applicable)
//      - State management (useState/useEffect)
//      - Proper Tailwind classes for styling
//      - Mobile-first responsive design
//      - ARIA attributes for accessibility
//   3. Include a proper layout structure with:
//      - Navbar with navigation
//      - Main content area
//      - Sidebar (when applicable)
//      - Footer
//   4. Use the following Tailwind styling standards:
//      - Consistent color palette
//      - Proper spacing (p-4, m-2, etc.)
//      - Responsive breakpoints (sm:, md:, lg:)
//      - Hover/focus states
//      - Smooth transitions

//   Available dependencies (use as needed):
//   - lucide-react for icons
//   - date-fns for dates
//   - react-chartjs-2 for charts
//   - firebase for backend
//   - @google/generative-ai for AI features

//   STRICT FORMAT REQUIREMENTS:
//   {
//     "projectTitle": "Descriptive title",
//     "explanation": "Detailed explanation of components and architecture",
//     "files": {
//       "/components/Navbar.js": {
//         "code": "COMPLETE component code with styling"
//       },
//       "/components/MainContent.js": {
//         "code": "COMPLETE component code with styling"
//       },
//       // At least 3 more components
//       "/App.js": {
//         "code": "Complete main app structure"
//       }
//     },
//     "generatedFiles": [
//       "/components/Navbar.js",
//       "/components/MainContent.js",
//       // List all files
//     ]
//   }

//   IMPORTANT:
//   - DO NOT return partial or incomplete code
//   - EVERY component must be fully functional
//   - Include ALL necessary imports
//   - Use PROPER indentation and formatting
//   - Style EVERY visible element
//   - If you return incomplete code, I will REJECT the response

//     IMPORTANT: Your response MUST be valid JSON ONLY. Do not wrap the response in markdown code blocks or backticks of any kind.
//   The response must begin with { and end with } with properly escaped strings inside.
// `;
