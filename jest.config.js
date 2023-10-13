/** @type {import('ts-jest').JestConfigWithTsJest} */
export default {
  preset: 'ts-jest/presets/default-esm',
  testEnvironment: 'node',
  moduleNameMapper: {
    "^(\\.{1,2}/.*)\\.js$": "$1"
  },
  collectCoverageFrom: ['src/**/*.ts'],
};