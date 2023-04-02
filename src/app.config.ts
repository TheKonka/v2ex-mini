export default defineAppConfig({
	// renderer: 'skyline',
	// lazyCodeLoading: 'requiredComponents',
	darkmode: false,
	style: 'v2',
	debug: process.env.NODE_ENV !== 'production',
	entryPagePath: 'pages/home/index',
	resizable: true,
	pages: ['pages/home/index', 'pages/planes/index', 'pages/topics-detail/index', 'pages/topics-of-node/index', 'pages/member/index'],
	tabBar: {
		color: '#fff',
		selectedColor: '#fff',
		backgroundColor: '#fff',
		list: [
			{
				pagePath: 'pages/home/index',
				text: '首页',
				iconPath: './assets/logo.png',
				selectedIconPath: './assets/logo.png'
			},
			{
				pagePath: 'pages/planes/index',
				text: '节点',
				iconPath: './assets/planes.png',
				selectedIconPath: './assets/planes.png'
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
