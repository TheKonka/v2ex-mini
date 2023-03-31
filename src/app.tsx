import React from 'react';
import './app.scss';

interface IProps {
	children: React.ReactNode;
}

const App: React.FC<IProps> = ({ children }) => {
	return <>{children}</>;
};

export default App;
