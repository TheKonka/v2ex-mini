module.exports = {
	root: true,
	env: {
		browser: true,
		es2021: true
	},
	ignorePatterns: ['node_modules', 'dist', 'public'],
	extends: ['plugin:react-hooks/recommended', 'plugin:react/recommended', 'plugin:@typescript-eslint/recommended', 'prettier'],
	plugins: ['react', '@typescript-eslint', 'react-hooks'],
	parser: '@typescript-eslint/parser',
	parserOptions: {
		ecmaFeatures: {
			jsx: true
		},
		ecmaVersion: 'latest',
		sourceType: 'module'
	},

	rules: {
		'react/jsx-uses-react': 'off',
		'react/react-in-jsx-scope': 'off',
		'react/self-closing-comp': ['error'],
		'no-use-before-define': 'off',
		'@typescript-eslint/no-use-before-define': ['error', { functions: true, classes: true }],
		'@typescript-eslint/no-non-null-assertion': 'off',
		'@typescript-eslint/no-explicit-any': 'off',
		'@typescript-eslint/no-var-requires': 'off',
		'@typescript-eslint/no-empty-function': 'off',
		// '@typescript-eslint/consistent-type-exports': 'warn',
		'react/prop-types': 'off',
		'linebreak-style': ['error', 'unix'],
		// 'max-len': 'off',
		'eol-last': 'error',
		// 'space-before-function-paren': ['error', 'never'],
		'prefer-promise-reject-errors': 'off',
		'curly': 'off',
		'comma-dangle': ['error', 'never'],
		'comma-spacing': 'error',
		'comma-style': 'error',
		'quote-props': ['error', 'consistent'],
		'quotes': ['error', 'single', { allowTemplateLiterals: true }],
		'space-before-blocks': ['error', 'always'],
		'spaced-comment': ['error', 'always', { markers: ['/'] }],
		'prefer-spread': 'error',
		'prefer-const': ['error', { destructuring: 'all' }],
		'array-bracket-spacing': ['error', 'never'],
		'switch-colon-spacing': 'error',
		// 'operator-linebreak': ['error', 'after'],
		'padded-blocks': ['error', 'never'],
		'no-useless-call': 'error',
		'no-trailing-spaces': 'error',
		// 'no-mixed-spaces-and-tabs': 'error',
		'no-multiple-empty-lines': ['error', { max: 2 }],
		'no-multi-str': 'error',
		'no-new-wrappers': 'error',
		'no-irregular-whitespace': [
			'error',
			{
				skipStrings: true,
				skipComments: true,
				skipRegExps: true,
				skipTemplates: true
			}
		],
		'no-unexpected-multiline': 'error'
	}
};
