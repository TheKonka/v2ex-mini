export default defineAppConfig({
	// renderer: 'skyline',
	// lazyCodeLoading: 'requiredComponents',
	darkmode: false,
	style: 'v2',
	entryPagePath: 'pages/home/index',
	pages: ['pages/home/index', 'pages/topics-detail/index'],
	window: {
		backgroundTextStyle: 'light',
		navigationBarBackgroundColor: '#fff',
		navigationBarTitleText: 'WeChat',
		navigationBarTextStyle: 'black'
	}
});
