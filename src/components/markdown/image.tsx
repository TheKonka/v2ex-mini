import { getProxyImage } from '@/helpers/img';
import { View, Image } from '@tarojs/components';
import Taro from '@tarojs/taro';
import React, { useState } from 'react';

interface ImageItemProps {
	selfIndex: number;
	url: string;
	loadIdx: number;
	onLoad: (v: number) => void;
}

const WrapperImage: React.FC<ImageItemProps> = ({ selfIndex, url, loadIdx, onLoad }) => {
	if (loadIdx > 0 && loadIdx !== selfIndex) return null;
	let wrapperUrl = url;
	switch (selfIndex) {
		case 1:
			wrapperUrl = url;
			break;
		case 2:
			wrapperUrl = getProxyImage(url);
			break;
		case 3:
			wrapperUrl = 'https://search.pstatic.net/common/?src=' + url;
			break;
		case 4:
			if (url.startsWith('https://i.imgur.com/')) {
				wrapperUrl = url.replace('https://i.imgur.com/', 'https://i.vps404.com/');
			} else {
				return null;
			}
			break;
	}
	return (
		<Image
			style={{ display: loadIdx === selfIndex ? 'block' : 'none' }}
			showMenuByLongpress
			className="image"
			src={wrapperUrl}
			mode="widthFix"
			onLoad={() => {
				onLoad(selfIndex);
			}}
			onClick={() => {
				Taro.createSelectorQuery()
					.selectAll('.image')
					.fields({ properties: ['src'] })
					.exec((res) => {
						Taro.previewImage({
							urls: res[0].map((i: { src: string }) => i.src),
							current: wrapperUrl
						});
					});
			}}
		/>
	);
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

			<WrapperImage url={url} onLoad={setLoad} loadIdx={loadIdx} selfIndex={1} />
			<WrapperImage url={url} onLoad={setLoad} loadIdx={loadIdx} selfIndex={2} />
			<WrapperImage url={url} onLoad={setLoad} loadIdx={loadIdx} selfIndex={3} />
			<WrapperImage url={url} onLoad={setLoad} loadIdx={loadIdx} selfIndex={4} />
		</>
	);
}
