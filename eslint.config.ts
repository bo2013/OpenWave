import { defineConfig } from "eslint/config";

import js from "@eslint/js";
import tseslint from "typescript-eslint";

import react from "eslint-plugin-react"
import { reactRefresh } from "eslint-plugin-react-refresh"

export default defineConfig([
	{
		ignores: [
			"**/dist/**",
			"**/public/**"
		]
	},
	js.configs.recommended,
	tseslint.configs.recommended,
	{
		settings: {
			react: {
				version: "detect"
			}
		}
	},
	react.configs.flat.recommended,
	react.configs.flat["jsx-runtime"],
	reactRefresh.configs.vite()
]);
