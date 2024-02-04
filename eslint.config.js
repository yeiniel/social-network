import path from "node:path";
import { fileURLToPath } from "node:url";
import { FlatCompat } from "@eslint/eslintrc";
import js from "@eslint/js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({ resolvePluginsRelativeTo: __dirname });

export default [
    js.configs.recommended,

    // use our recommended config
    ...compat.extends("plugin:@typescript-eslint/recommended"),

    // use our plugin by itself
    ...compat.plugins("@typescript-eslint"),

    {
        "files": ["*.js"],
        "rules": {
            "@typescript-eslint/*": "off",
        }
    }
];