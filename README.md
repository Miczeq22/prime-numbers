## Introduction

This project utilizes TypeScript to enhance code readability and the overall developer experience. However, it's important to note that using TypeScript can result in slower development cycles during the initial stages. This slowdown occurs because the code needs to be transpiled to JavaScript before it can be executed, especially when running the project in a development environment using `npm run dev`.

For "production" environments, it's recommended to build the project first using `npm run build`, which compiles the TypeScript code into optimized JavaScript. After building, the project can be run with `npm run start`, ensuring that the production environment runs efficiently without the need for on-the-fly transpilation.

## Commands

- **Development Environment**: To run the project in a development environment, where you can benefit from live reloading and debugging, use: `npm run dev`

- **Build project**: To transpile TS code to JS code use: `npm run build`

- **Run Program**: To run JS code use: `npm start` or `npm run start`
