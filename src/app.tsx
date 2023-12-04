import React from 'react';
import { useLaunch } from '@tarojs/taro';
import './app.scss';
import { checkUpdate } from './helpers/update';

interface IProps {
	children: React.ReactNode;
}

function App({ children }: IProps) {
	useLaunch(() => {
		checkUpdate();
	});

	return children;
}

export default App;
