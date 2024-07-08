import globals from "globals";


export default [
  { files: ["**/*.js"], languageOptions: { sourceType: "script" } },
  { languageOptions: { globals: globals.node }, parserOptions: { ecmaVersion: 2020, sourceType: "module" } },
];
