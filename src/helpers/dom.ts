import Taro from '@tarojs/taro';

interface IRect {
	id: string;
	dataset: Record<string, any>;
	bottom: number;
	height: number;
	width: number;
	top: number;
	left: number;
	right: number;
}

export function getRect(selector: any): Promise<IRect> {
	return new Promise((resolve) => {
		Taro.createSelectorQuery()
			.select(selector)
			.boundingClientRect()
			.exec((rect: any = []) => {
				return resolve(rect[0]);
			});
	});
}
export function getAllRect(selector: any): Promise<IRect[]> {
	return new Promise((resolve) => {
		Taro.createSelectorQuery()
			.selectAll(selector)
			.boundingClientRect()
			.exec((rect = []) => resolve(rect[0]));
	});
}
