import React from 'react';
import Article from './article.jsx';
import AppActions from '../../flux/app-actions';
import AppStore from '../../flux/app-store';
import AppConstants from '../../shared/app-constants';

const articleId = (location.pathname.indexOf('article') >-1) ? Number(location.pathname.replace('/article/', '')) : 1;

let List = React.createClass({

	getInitialState(){
		return {
			articles: [],
			nextArticleId: null,
			scrollPos: 0
		};
	},

	componentDidMount() {
		document.documentElement.scrollTop = 0;
		this.getArticle(articleId)
		AppStore.addChangeListener(AppConstants.RECEIVE_ARTICLES,this.receivedArticle);
		AppStore.addChangeListener(AppConstants.LOAD_NEXT_ARTICLE,this.getArticle);
		window.addEventListener('scroll', this.handleScroll);
	},

	handleScroll(e) {
		this.setState({
			scrollPos: window.scrollY
		});
	},

	getArticle(id) {
		const reqestUrl = 'article/' + id;
		AppActions.apiRequest(reqestUrl,{
			"event" : AppConstants.RECEIVE_ARTICLES
		});
	},

	receivedArticle(data) {
		console.log(data);
		const articles = this.state.articles;
		articles.push(data);
		this.setState({
			articles: articles,
			nextArticleId: data.next_article
		});
	},

	componentWillUnmount() {
	    window.removeEventListener('scroll', this.handleScroll);
	},

	render() {
		let scrollPos = this.state.scrollPos;
		let articles = this.state.articles.map(function(article, index) {
			return <Article data={article} scrollPos={scrollPos} key={index}/>
		});

		return(
			<div className="article-list"  id="docs" ref={(ref) => this.articleList = ref}>
				{articles}
			</div>
		);
	}
});

export default List;
