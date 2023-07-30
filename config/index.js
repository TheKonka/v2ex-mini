import path from 'path';

const config = {
	projectName: 'v2ex-mini',
	designWidth: 750,
	deviceRatio: {
		640: 2.34 / 2,
		750: 1,
		828: 1.81 / 2
	},
	sourceRoot: 'src',
	outputRoot: `dist/${process.env.TARO_ENV}`,
	plugins: [],
	defineConstants: {},
	copy: {
		patterns: [],
		options: {}
	},
	framework: 'react',
	compiler: {
		type: 'webpack5',
		prebundle: {
			enable: false
		}
	},
	cache: {
		enable: false // Webpack 持久化缓存配置，建议开启。默认配置请参考：https://docs.taro.zone/docs/config-detail#cache
	},
	mini: {
		miniCssExtractPluginOption: {
			ignoreOrder: true
		},
		postcss: {
			'postcss-preset-env': {
				enable: true
			},
			'pxtransform': {
				enable: true,
				config: {}
			},
			'url': {
				enable: true,
				config: {
					limit: 1024 // 设定转换尺寸上限
				}
			},
			'cssModules': {
				enable: false, // 默认为 false，如需使用 css modules 功能，则设为 true
				config: {
					namingPattern: 'module', // 转换模式，取值为 global/module
					generateScopedName: '[name]__[local]___[hash:base64:5]'
				}
			}
		}
	},
	alias: {
		'@/components': path.resolve(__dirname, '..', 'src/components'),
		'@/assets': path.resolve(__dirname, '..', 'src/assets'),
		'@/services': path.resolve(__dirname, '..', 'src/services'),
		'@/helpers': path.resolve(__dirname, '..', 'src/helpers'),
		'@/hooks': path.resolve(__dirname, '..', 'src/hooks')
	}
};

module.exports = function (merge) {
	if (process.env.NODE_ENV === 'development') {
		return merge({}, config, require('./dev'));
	}
	return merge({}, config, require('./prod'));
};
