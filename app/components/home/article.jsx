import React from 'react';
import ReactDOM from 'react-dom';
import AppActions from '../../flux/app-actions';

let Article = React.createClass({

	getInitialState() {
		return {
			scrollable: true
		};
	},
	
	componentWillReceiveProps(nextProps) {

		if(this.art) {
			const scroll = nextProps.scrollPos;
			const art = ReactDOM.findDOMNode(this);
			const rect = art.getBoundingClientRect();
			const bottom = (rect.top + rect.height) - window.innerHeight;

			if (bottom < 100 && this.state.scrollable) {
				this.setState({
					scrollable: false
				});
				console.log('hit bottom');
				AppActions.loadNextArticle(this.props.data.next_article);
			}
		}
	},

	render() {
		const article = this.props.data;
		return(
			<div className="article" ref={(ref) => this.art = ref}>
				<h1>{article.title}</h1>
				<p>{article.body}</p>
				<p>{article.body}</p>
				<p>{article.body}</p>
				<p>{article.body}</p>
				<p>{article.body}</p>
				<p>{article.body}</p>
			</div>
		);
	}
});

export default Article;