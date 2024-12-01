module.exports = {
    preset: "ts-jest",
    testEnvironment: "jsdom", // Or "node", depending on your environment
    setupFilesAfterEnv: ["<rootDir>/jest.setup.mjs"], // Ensure this points to the correct setup file
    transform: {
      "^.+\\.tsx?$": "ts-jest", // This will transform TypeScript files
    },
    transformIgnorePatterns: ["/node_modules/"], // Ignore transforming files in node_modules
  };
  