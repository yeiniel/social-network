/** @type {import('ts-jest').JestConfigWithTsJest} */
export default {
    preset: 'ts-jest/presets/default-esm',
    testEnvironment: 'node',
    // moduleNameMapper required for relative imports on ESM modules on Node.js
    moduleNameMapper: {
        "^(\\.{1,2}/.*)\\.js$": "$1"
    },
};