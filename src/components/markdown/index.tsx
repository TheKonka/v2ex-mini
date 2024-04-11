import classNames from 'classnames';
import { Image, RichText, Text, View } from '@tarojs/components';
import { getProxyImage } from '@/helpers/img';
import Taro from '@tarojs/taro';
import './index.scss';
import React, { useMemo, useState } from 'react';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkGfm from 'remark-gfm';

const parser = unified().use(remarkParse).use(remarkGfm);

interface Props {
	nodes: string;
	className?: string;
}

function RenderImage({ url, alt }: any) {
	const [error, setError] = useState(false);
	return error ? (
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
	) : (
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
			onError={() => {
				setError(true);
			}}
		/>
	);
}

function render(node: Record<string, any>): React.ReactNode {
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
			const atPeople = node.value.match(/@([^\s]+)(?:[ \r\n]|$)/g);
			if (atPeople) {
				const parts = node.value.split(/(@[^\s]+)(?:[ \r\n]|$)/).map((part: string) => {
					if (atPeople.map((i: string) => i.trim()).includes(part)) {
						return [
							React.createElement(
								'Text',
								{
									'className': 'at',
									'data-name': part.slice(1),
									'onClick': (e: any) => {
										const name = e.target.dataset.name.trim();
										Taro.eventCenter.trigger('replyBySomeone', { name, topic_id: Taro.getCurrentInstance()!.router!.params.id });
									}
								},
								part.trim()
							),
							React.createElement('Text', {}, ' ')
						];
					} else {
						return React.createElement('Text', {}, part);
					}
				});
				return <View>{parts}</View>;
			}
			return <Text userSelect>{node.value}</Text>;
		case 'image':
			return <>{<RenderImage url={node.url} alt={node.alt} />}</>;
		case 'code':
			return <View className="code">{node.value}</View>;
		case 'paragraph':
			return <View className="paragraph">{renderArray(node.children)}</View>;
		case 'link':
			if (node.url.endsWith('.jpg') || node.url.endsWith('.png') || node.url.endsWith('.jpeg')) {
				return <RenderImage url={node.url} />;
			}
			return (
				<View
					className="link"
					onClick={() => {
						if (node.url.match(/\/t\/(\d+)/)) {
							Taro.navigateTo({
								url: `/pages/topics-detail/index?id=${node.url.match(/\/t\/(\d+)/)[1]}`
							});
							return;
						}
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
			return <View className="thematic-break" />;
		case 'break':
			return <View className="break" />;
		case 'emphasis':
			return <View className="emphasis">{render(node.children[0])}</View>;
		case 'html':
			return <RichText nodes={node.value} userSelect className={classNames('rich-text', { hide: node.value === '<b>' })} />;
	}
}

const MarkDown: React.FC<Props> = ({ nodes, className }) => {
	const renderNode = useMemo(() => {
		return render(parser.parse(nodes));
	}, [nodes]);

	return <View className={classNames('markdown-body', className)}>{renderNode}</View>;
};

export default MarkDown;
