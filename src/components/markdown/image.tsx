import { getProxyImage } from '@/helpers/img';
import { View, Image } from '@tarojs/components';
import Taro from '@tarojs/taro';
import React, { useState } from 'react';

interface CommonImageProps {
	show: boolean;
	url: string;
	onLoad: () => void;
}

const CommonImage: React.FC<CommonImageProps> = ({ url, show, onLoad }) => {
	return (
		<Image
			style={{ display: show ? 'block' : 'none' }}
			showMenuByLongpress
			className="image"
			src={url}
			mode="widthFix"
			onLoad={onLoad}
			onClick={() => {
				Taro.createSelectorQuery()
					.selectAll('.image')
					.fields({ properties: ['src'] })
					.exec((res) => {
						Taro.previewImage({
							urls: res[0].map((i: { src: string }) => i.src),
							current: url
						});
					});
			}}
		/>
	);
};

interface ImageItemProps {
	url: string;
	loadIdx: number;
	onLoad: (v: number) => void;
}

const Image1: React.FC<ImageItemProps> = ({ url, loadIdx, onLoad }) => {
	if (loadIdx > 0 && loadIdx !== 1) return null;
	return <CommonImage show={loadIdx === 1} url={url} onLoad={() => onLoad(1)} />;
};

const Image2: React.FC<ImageItemProps> = ({ url, loadIdx, onLoad }) => {
	if (loadIdx > 0 && loadIdx !== 2) return null;
	return <CommonImage show={loadIdx === 2} url={getProxyImage(url)} onLoad={() => onLoad(2)} />;
};
const Image3: React.FC<ImageItemProps> = ({ url, loadIdx, onLoad }) => {
	if (loadIdx > 0 && loadIdx !== 3) return null;
	return <CommonImage show={loadIdx === 3} url={'https://search.pstatic.net/common/?src=' + url} onLoad={() => onLoad(3)} />;
};
const Image4: React.FC<ImageItemProps> = ({ url, loadIdx, onLoad }) => {
	if (!url.startsWith('https://i.imgur.com/')) return null;
	if (loadIdx > 0 && loadIdx !== 4) return null;
	return <CommonImage show={loadIdx === 4} url={url.replace('https://i.imgur.com/', 'https://i.vps404.com/')} onLoad={() => onLoad(4)} />;
};

export default function RenderImage({ url, alt }: { url: string; alt?: string }) {
	const [loadIdx, setLoadIdx] = useState(0);

	const setLoad = (v: number) => {
		if (loadIdx === 0) {
			setLoadIdx(v);
		}
	};

	return (
		<>
			{loadIdx === 0 && (
				<View
					className="link"
					onClick={() => {
						Taro.setClipboardData({
							data: url,
							success() {
								Taro.showToast({
									title: '链接已复制',
									icon: 'none'
								});
							}
						});
					}}
				>
					{alt || '图片地址'}
				</View>
			)}

			<Image1 url={url} onLoad={setLoad} loadIdx={loadIdx} />
			<Image2 url={url} onLoad={setLoad} loadIdx={loadIdx} />
			<Image3 url={url} onLoad={setLoad} loadIdx={loadIdx} />
			<Image4 url={url} onLoad={setLoad} loadIdx={loadIdx} />
		</>
	);
}
