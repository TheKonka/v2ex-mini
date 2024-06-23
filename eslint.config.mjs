// @ts-check
import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import globals from 'globals';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import prettierConfig from 'eslint-config-prettier';
import { fixupPluginRules } from '@eslint/compat';

export default tseslint.config(
	{
		// config with just ignores is the replacement for `.eslintignore`
		ignores: ['dist/**']
	},
	{ languageOptions: { globals: globals.node } },
	{
		files: ['**/*.{ts,tsx}'],
		languageOptions: {
			parserOptions: {
				ecmaFeatures: {
					jsx: true
				}
			}
		},
		settings: {
			react: {
				version: 'detect'
			}
		},
		plugins: {
			'react': fixupPluginRules(react),
			'react-hooks': reactHooks
		},
		extends: [js.configs.recommended, ...tseslint.configs.recommended],
		rules: {
			...prettierConfig.rules,
			...react.configs.recommended.rules,
			...reactHooks.configs.recommended.rules,
			'@typescript-eslint/no-explicit-any': 'off',
			'@typescript-eslint/no-unused-vars': 'warn',
			'@typescript-eslint/no-var-requires': 'off',
			'no-case-declarations': 'off'
		}
	}
);
