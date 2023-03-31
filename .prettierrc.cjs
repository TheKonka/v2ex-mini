module.exports = {
	semi: true,
	trailingComma: 'none',
	singleQuote: true,
	useTabs: true,
	printWidth: 140,
	quoteProps: 'consistent',
	plugins: [require('@trivago/prettier-plugin-sort-imports')],
	importOrder: ['^react$', '<THIRD_PARTY_MODULES> ', '^@tarojs/', '@/(.*)', '^[./]'],
	importOrderSeparation: false
};
