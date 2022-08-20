module.exports = {
  preset: "@vue/cli-plugin-unit-jest/presets/typescript-and-babel",
  transformIgnorePatterns: [],
  transform: {
    "^.+\\.(js|jsx|mjs)$": "babel-jest",
    "^[^.]+.vue$": "@vue/vue3-jest",
    "^.+\\.ts?$": "ts-jest",
  },
  setupFilesAfterEnv: ["<rootDir>/tests/jest.setup.ts"],
};
