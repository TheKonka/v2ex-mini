import classNames from 'classnames';
import { Image, View, Text } from '@tarojs/components';
import { getProxyImage } from '@/helpers/img';
import Taro from '@tarojs/taro';
import './index.scss';
import { useMemo } from 'react';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkGfm from 'remark-gfm';

const parser = unified().use(remarkParse).use(remarkGfm);
interface Props {
	nodes: string;
	className?: string;
}

function renderImage(url: string) {
	return (
		<Image
			className="image"
			src={getProxyImage(url)}
			mode="aspectFit"
			onClick={() => {
				Taro.createSelectorQuery()
					.selectAll('.image')
					.fields({ properties: ['src'] })
					.exec((res) => {
						Taro.previewImage({
							urls: res[0].map((i: { src: string }) => i.src),
							current: getProxyImage(url)
						});
					});
			}}
		/>
	);
}

function render(node: any): React.ReactNode {
	function renderArray(children: any[]) {
		const res = [];
		for (const item of children) {
			res.push(render(item));
		}
		return res.flat();
	}

	switch (node.type) {
		case 'root':
			return renderArray(node.children);
		case 'text':
			return <Text userSelect>{node.value}</Text>;
		case 'image':
			return renderImage(node.url);
		case 'code':
			return <View className="code">{node.value}</View>;
		case 'paragraph':
			return <View className="paragraph">{renderArray(node.children)}</View>;
		case 'link':
			if (node.url.endsWith('.jpg') || node.url.endsWith('.png')) {
				return renderImage(node.url);
			}
			return (
				<View
					className="link"
					onClick={() => {
						if (node.url.includes('v2ex.com/t/')) {
							Taro.navigateTo({
								url: `/pages/topics-detail/index?id=${node.url.split('v2ex.com/t/')[1].split('#')[0]}`
							});
							return;
						}
						Taro.setClipboardData({
							data: node.url,
							success() {
								Taro.showToast({
									title: '链接已复制',
									icon: 'none'
								});
							}
						});
					}}
				>
					{render(node.children[0])}
				</View>
			);
		case 'heading':
			return <View className="heading">{renderArray(node.children)}</View>;
		case 'list':
			return <View className="list">{renderArray(node.children)}</View>;
		case 'listItem':
			return <View className="list-item">{render(node.children[0])}</View>;
		case 'table':
			return <View className="table">{renderArray(node.children)}</View>;
		case 'tableRow':
			return <View className="table-row">{renderArray(node.children)}</View>;
		case 'tableCell':
			return <View className="table-cell">{render(node.children[0])}</View>;
		case 'inlineCode':
			return <Text className="inline-code">{node.value}</Text>;
		case 'strong':
			return <Text className="strong">{render(node.children[0])}</Text>;
		case 'blockquote':
			return <View>{render(node.children[0])}</View>;
		case 'thematicBreak':
			return <View className="thematicBreak" />;
		case 'break':
			return <View className="break" />;
		case 'emphasis':
			return <View className="emphasis">{render(node.children[0])}</View>;
	}
}

const MarkDown: React.FC<Props> = ({ nodes, className }) => {
	const renderNode = useMemo(() => {
		const t = parser.parse(nodes);

		return render(t);
	}, [nodes]);

	return <View className={classNames('markdown_body', className)}>{renderNode}</View>;
};

export default MarkDown;
