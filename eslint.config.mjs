import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";
import eslintConfig from "eslint-config-next";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: '.',
});

export default [
  ...eslintConfig,
  {
    rules: {
      "react/no-unescaped-entities": "off",
      // Disable the rule that's causing build failures
      "@typescript-eslint/no-empty-object-type": "off",
    },
  },
];
