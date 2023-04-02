import React from 'react';
import { useLaunch } from '@tarojs/taro';
import './app.scss';
import { checkUpdate } from './helpers/update';

interface IProps {
	children: React.ReactNode;
}

const App: React.FC<IProps> = ({ children }) => {
	useLaunch(() => {
		checkUpdate(true);
	});

	return <>{children}</>;
};

export default App;
