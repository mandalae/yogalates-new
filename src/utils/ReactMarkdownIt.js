import React from 'react'
import MarkdownIt from 'markdown-it'
import stripIndent from 'strip-indent'

import CenterText from 'markdown-it-center-text';

export default class extends React.Component {
	static defaultProps = {
		container: 'div',
		options: {}
	}

	render() {
		var Container = this.props.container
		return <Container>{this.content()}</Container>
	}

	componentWillUpdate(nextProps, nextState) {
		if (nextProps.options !== this.props.options) {
			this.md = new MarkdownIt(nextProps.options).use(CenterText);
		}
	}

	content() {
		if (this.props.source) {
			return <span dangerouslySetInnerHTML={{__html: this.renderMarkdown(this.props.source)}}/>
		} else {
			return React.Children.map(this.props.children, child => {
				if (typeof child === 'string') {
					return <span dangerouslySetInnerHTML={{__html: this.renderMarkdown(child)}}/>
				} else {
					return child
				}
			})
		}
	}

	renderMarkdown(source) {
		if (!this.md) {
			this.md = new MarkdownIt(this.props.options).use(CenterText);
		}
		return this.md.render(stripIndent(source))
	}
}
