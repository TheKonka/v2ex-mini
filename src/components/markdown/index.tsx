import classNames from 'classnames';
import { RichText, View } from '@tarojs/components';
import { getProxyImage } from '@/helpers/img';
import './index.scss';

interface Props {
	nodes: string;
	className?: string;
}

const MarkDown: React.FC<Props> = ({ nodes, className }) => {
	if (nodes.includes('<img')) {
		//	nodes = nodes.replace(/(?<=(img[^>]*src="))[^"]*/g, ($1) => getProxyImage($1));
		nodes = nodes.replace(/<img[^>]*src=['"]([^'"]+)[^>]*>/g, ($1, $2) => $1.replace($2, getProxyImage($2)));
	}
	if (nodes.includes('<code>')) {
		nodes = nodes.replace(/<code>/g, '<code class="hljs">');
	}
	if (nodes.includes('<pre>')) {
		nodes = nodes.replace(/<pre>/g, '<pre class="pre">');
	}

	return (
		<>
			<View className={classNames('markdown_body', className)}>
				<RichText nodes={nodes} userSelect />
			</View>
		</>
	);
};

export default MarkDown;
