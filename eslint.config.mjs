import next from "eslint-config-next";
import coreWebVitals from "eslint-config-next/core-web-vitals";
import typescript from "eslint-config-next/typescript";
import prettier from "eslint-config-prettier";

const config = [
  {
    ignores: [".next/**", "node_modules/**", "lib/generated/**", "next-env.d.ts"],
  },
  ...next,
  ...coreWebVitals,
  ...typescript,
  {
    rules: {
      "@typescript-eslint/no-unused-vars": [
        "error",
        { argsIgnorePattern: "^_", varsIgnorePattern: "^_" },
      ],
      "no-console": ["warn", { allow: ["warn", "error"] }],
      eqeqeq: ["error", "smart"],
    },
  },
  prettier,
  {
    files: ["prisma/**/*.ts", "scripts/**/*.ts"],
    rules: { "no-console": "off" },
  },
];

export default config;
