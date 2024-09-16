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
	plugins: [
		[
			'taro-plugin-remove',
			{
				components: {
					'view': [
						'hover-stop-propagation',
						'hover-start-time',
						'hover-class',
						'hover-stay-time',
						'bindtouchstart',
						'bindtouchmove',
						'bindtouchend',
						'bindtouchcancel',
						'bindlongpress',
						'animation',
						'bindanimationstart',
						'bindanimationiteration',
						'bindanimationend',
						'bindtransitionend',
						'catchtouchmove'
					],
					'scroll-view': [
						'bindtap',
						'lower-threshold',
						'upper-threshold',
						'padding',
						'enable-back-to-top',
						'refresher-enabled',
						'refresher-threshold',
						'refresher-default-style',
						'refresher-background',
						'refresher-triggered',
						'bindanimationend',
						'bindanimationiteration',
						'bindanimationstart',
						'binddragend',
						'binddragging',
						'binddragstart',
						'bindlongpress',
						'bindrefresherabort',
						'bindrefresherpulling',
						'bindrefresherrefresh',
						'bindrefresherrestore',
						'bindrefresherwillrefresh',
						'clip',
						'bindtouchcancel',
						'bindtouchend',
						'bindscrolltoupper',
						'bindscroll',
						'bindscrollend',
						'bindscrollstart',
						'bindtouchmove',
						'bindtouchstart',
						'bindtransitionend',
						'scroll-left',
						'scroll-top',
						'refresher-two-level-enabled',
						'refresher-two-level-triggered',
						'refresher-two-level-threshold',
						'refresher-two-level-close-threshold',
						'refresher-two-level-scroll-enabled',
						'refresher-ballistic-refresh-enabled',
						'refresher-two-level-pinned',
						'bindrefresherstatuschange',
						'reverse',
						'using-sticky',
						'cache-extent',
						'scroll-into-view-within-extent',
						'scroll-into-view-offset'
					],
					'swiper': [
						'indicator-dots',
						'bindanimationfinish',
						'bindlongpress',
						'bindtouchcancel',
						'bindtouchend',
						'bindtouchmove',
						'bindtouchstart',
						'bindtransition',
						'next-margin',
						'previous-margin',
						'snap-to-edge',
						'easing-function',
						'display-multiple-items',
						'indicator-active-color',
						'indicator-color'
					],
					'swiper-item': ['item-id'],
					'input': [
						'name',
						'password',
						'auto-fill',
						'hold-keyboard',
						'safe-password-cert-path',
						'safe-password-length',
						'safe-password-time-stamp',
						'safe-password-nonce',
						'safe-password-salt',
						'safe-password-custom-hash',
						'bindkeyboardheightchange',
						'bindnicknamereview',
						'cursor-spacing',
						'cursor',
						'cursor-color',
						'selection-start',
						'selection-end'
					],
					'button': [
						'form-type',
						'hover-class',
						'hover-stop-propagation',
						'hover-start-time',
						'hover-stay-time',
						'lang',
						'session-from',
						'send-message-title',
						'send-message-path',
						'send-message-img',
						'show-message-card',
						'app-parameter',
						'bindchooseavatar',
						'business-id',
						'open-type'
					],
					'text': ['bindlongpress', 'bindtouchstart', 'bindtouchmove', 'bindtouchend', 'bindtouchcancel']
				}
			}
		]
	],
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
			'autoprefixer': {
				enable: false
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
