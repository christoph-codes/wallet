module.exports = {
	env: {
		browser: true,
		es2021: true,
		node: true,
	},
	extends: ["plugin:react/recommended", "xo"],
	parser: ["@typescript-eslint/parser", "@babel/eslint-parser"],
	parserOptions: {
		ecmaFeatures: {
			jsx: true,
		},
		ecmaVersion: "latest",
		sourceType: "module",
	},
	plugins: ["react", "@typescript-eslint"],
	rules: {
		semi: ["error", "always"],
		quotes: ["error", "single"],
		"jsx-quotes": ["error", "prefer-single"],
	},
};
