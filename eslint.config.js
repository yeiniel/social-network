// @ts-nocheck
import js from "@eslint/js";
import tsPlugin from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";
import globals from "globals";

const tsOverrideConfig = tsPlugin.configs["eslint-recommended"].overrides[0];
const tsRecommemdedConfig = tsPlugin.configs.recommended;
const files = ["**/*.ts"];

export default [
    js.configs.recommended,
    {
        languageOptions: {
            parser: tsParser,
            globals: globals.node
        },
        plugins: {
            "@typescript-eslint": tsPlugin,
        }
    },
    { files, rules: tsOverrideConfig.rules },
    { files, rules: tsRecommemdedConfig.rules },
];