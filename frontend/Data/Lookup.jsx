// import React from "react";
// export default {
//   DEFAULT_FILE: {
//     "/public/index.html": {
//       code: `<!DOCTYPE html>
// <html lang="en">
//   <head>
//     <meta charset="UTF-8">
//     <meta name="viewport" content="width=device-width, initial-scale=1.0">
//     <title>Document</title>
//     <script src="https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4"></script>
//   </head>
//   <body>
//     <div id="root"></div>
//   </body>
// </html>`,
//     },
//     "/src/index.js": {
//       code: `
//       import React from "react";
//       import ReactDOM from "react-dom";
//       import App from "./App";

//       ReactDOM.render(<App />, document.getElementById("root"));
//     `,
//     },
//     "/src/App.js": {
//       code: `
//       import React from "react";

//       export default function App() {
//         return <h1>Hello World!</h1>;
//       }
//     `,
//     },
//     "/App.css": {
//       code: `
//             @tailwind base;
// @tailwind components;
// @tailwind utilities;`,
//     },
//     "/tailwind.config.js": {
//       code: `
//             /** @type {import('tailwindcss').Config} */
// module.exports = {
//   content: [
//     "./src/**/*.{js,jsx,ts,tsx}",
//   ],
//   theme: {
//     extend: {},
//   },
//   plugins: [],
// }`,
//     },
//     "/postcss.config.js": {
//       code: `/** @type {import('postcss-load-config').Config} */
// const config = {
//   plugins: {
//     tailwindcss: {},
//   },
// };

// export default config;
// `,
//     },
//   },

//   DEPENDENCY: {
//     react: "latest",
//     "react-dom": "latest",
//     "react-scripts": "latest",
//     postcss: "^8",
//     tailwindcss: "^3.4.1",
//     autoprefixer: "^10.0.0",
//     uuid4: "^2.0.3",
//     "tailwind-merge": "^2.4.0",
//     "tailwindcss-animate": "^1.0.7",
//     "lucide-react": "latest",
//     "react-router-dom": "latest",
//     firebase: "^11.1.0",
//     "@google/generative-ai": "^0.21.0",
//   },
// };
export default {
  DEFAULT_FILE: {
    "/public/index.html": {
      code: `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>My React App</title>
  </head>
  <body>
    <div id="root"></div>
  </body>
</html>`,
    },

    "/App.css": {
      code: `@tailwind base;
@tailwind components;
@tailwind utilities;`,
    },

    "/tailwind.config.js": {
      code: `/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [],
};`,
    },

    "/postcss.config.js": {
      code: `/** @type {import('postcss-load-config').Config} */
const config = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};

export default config;`,
    },
  },

  DEPENDENCY: {
    react: "^18.2.0",
    "react-dom": "^18.2.0",
    "react-router-dom": "^6.14.1",
    "react-scripts": "^5.0.1",
    "prop-types": "^15.8.1",
    tailwindcss: "^3.4.1",
    autoprefixer: "^10.4.14",
    postcss: "^8.4.28",
    uuid4: "^2.0.3",
    "date-fns": "^3.3.0",
    "tailwind-merge": "^2.4.0",
    "tailwindcss-animate": "^1.0.7",
    "lucide-react": "latest",
    firebase: "^11.1.0",
    "@google/generative-ai": "^0.21.0",
  },
};

