export default defineAppConfig({
	// renderer: 'skyline',
	// lazyCodeLoading: 'requiredComponents',
	darkmode: false,
	style: 'v2',
	debug: process.env.NODE_ENV !== 'production',
	entryPagePath: 'pages/home/index',
	resizable: true,
	pages: [
		'pages/home/index',
		'pages/planes/index',
		'pages/topics-detail/index',
		'pages/topics-of-node/index',
		'pages/member/index',
		'pages/my/index'
	],
	tabBar: {
		color: '#fff',
		selectedColor: '#fff',
		backgroundColor: '#fff',
		list: [
			{
				pagePath: 'pages/home/index',
				text: '',
				iconPath: './assets/logo.png',
				selectedIconPath: './assets/logo.png'
			},
			{
				pagePath: 'pages/planes/index',
				text: '',
				iconPath: './assets/planes.png',
				selectedIconPath: './assets/planes.png'
			},
			{
				pagePath: 'pages/my/index',
				text: '',
				iconPath: './assets/my.png',
				selectedIconPath: './assets/my.png'
			}
		]
	},
	window: {
		backgroundTextStyle: 'light',
		navigationBarBackgroundColor: '#fff',
		navigationBarTitleText: 'WeChat',
		navigationBarTextStyle: 'black'
	}
});
