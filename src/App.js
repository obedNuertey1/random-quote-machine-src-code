import React, { startTransition } from 'react';
import './style.css';
import {Provider, connect} from 'react-redux';
import {createStore, combineReducers, applyMiddleware} from 'redux';
import "bootstrap/dist/css/bootstrap.min.css";
import {Button, Card, Nav, Col, Row, Image} from 'react-bootstrap';
import { findDOMNode } from 'react-dom';
import $ from 'jquery';
import thunk from 'redux-thunk';
import {PropTypes} from 'prop-types';

/*State Values Definition*/
const myQuotes = [{quote: "To live is the rarest thing in the world. Most people exist, that is all.", author: "Oscar Wilde"}, {quote: "That it will never come again is what makes life so sweet.", author: "Emily Dickinson"}, {quote: "To be yourself in a world that is constantly trying to make you something else is the greatest accomplishment.", author: "Ralph Waldo Emerson"},{quote: "Pain is inevitable. Suffering is optional.", author: "Haruki Murakami"}, {quote: "All the world's a stage, and all the men and women merely players.", author: "William Shakespeare"}, {quote: "All the world's a stage, and all the men and women merely players.", author: "William Shakespeare"}, {quote: "Be kind, for everyone you meet is fighting a hard battle.", author: "Plato"}, {quote: "Unable are the loved to die for love is immortality.", author: "Emily Dickinson"}, {quote: "Let me live, love, and say it well in good sentences.", author: "Sylvia Plath"}, {quote: "Don't let your happiness depend on something you may lose.", author: "C.S. Lewis"}, {quote: "We are all broken, that's how the light gets in.", author: "Ernest Hemingway"}, {quote: "Appreciation is a wonderful thing. It makes what is excellent in others belong to us as well.", author: "Voltaire"}, {quote: "Life is tough my darling, but so are you.", author: "Stephanie Bennett Henry"}, {quote: "Self-awareness and self-love matter. Who we are is how we lead.", author: "Brene Brown"}, {quote: "Amateurs sit and wait for inspiration, the rest of us just get up and go to work.", author: "Stephen King"}, {quote: "Get it down. Take chances. It may be bad, but it's the only way you can do anything really good.", author: "William Faulkner"}, {quote: "As a writer, you should not judge, you should understand.", author: "Ernest Hemingway"}, {quote: "To produce a mighty book, you must choose a mighty theme.", author: "Herman Melville"}, {quote: "Ideas are like rabbits. You get a couple and learn how to handle them, and pretty soon you have a dozen.", author: "John Steinbeck"}, {quote: "Sometimes, you read a book and it fills you with this weird evangelical zeal, and you become convinced that the shattered world will never be put back together unless and until all living humans read the book.", author: "John Green"}, {quote: "The Six Golden Rules of Writing: Read, read, read, and write, write, write.", author: "Ernest Gaines"}, {quote: `As for Write what you know,' I was regularly told this as a beginner. I think it's a very good rule and have always obeyed it. I write about imaginary countries, alien societies on other planets, dragons, wizards, the Napa Valley in 22002. I know these things. I know them better than anybody else possibly could, so it's my duty to testify about them.`, author: "Ursula K. Le Guin"}, {quote: "You should write because you love the shape of stories and sentences and the creation of different words on a page. Writing comes from reading, and reading is the finest teacher of how to write.", author: "Annie Proulx"}, {quote: "Find out the reason that commands you to write; see whether it has spread its roots into the very depth of your heart; confess to yourself you would have to die if you were forbidden to write.", author: "Rainer Maria Rilke"}, {quote: "The purpose of a writer is to keep civilization from destroying itself.", author: "Albert Camus"}, {quote: "A writer never has a vacation. For a writer life consists of either writing or thinking about writing.", author: "Eugene Ionesco"}, {quote: "Read, read, read. Read everything – trash, classics, good and bad, and see how they do it. Just like a carpenter who works as an apprentice and studies the master. Read! You'll absorb it. Then write. If it's good, you'll find out. If it's not, throw it out of the window.", author: "William Faulkner"}, {quote: "Hunger can be a good motivator",author: "Obed Nuertey"}, {quote: "It is impossible for an empty sack to stand perpendicularly", author: "Obed Nuertey"}
];

const myColors = ["#84A9FF", "#6690FF", "#3366FF", "#CBF36B", "#B2E745", "#8ED80F", "#81E6FD", "#ABF4FE", "#62D4FB", "#FFDB8B", "#FFCD6F", "#FFB53F", "#607D8B", "#CFD8DC", "#455A64", "#455A64", "#FFCCBC", "#FF5722", "#673AB7", "#CDDC39"];

let [quoteRandIndex, colorRandIndex] = [Math.round(Math.random() * (myQuotes.length - 1 - 0) + 0), Math.round(Math.random() * (myColors.length - 1 - 0) + 0)];
const defaultQuote = myQuotes[quoteRandIndex];
const defaultColor = myColors[colorRandIndex];

//REACT-REDUX part1
const [UPDATECOLOR, UPDATEQUOTE] = ["UPDATECOLOR", "UPDATEQUOTE"];
const updateColor = (color) => ({
	type: UPDATECOLOR,
	color: color
});

const colorReducer = (state=defaultColor, action) => {
	switch(action.type){
		case UPDATECOLOR:
			return action.color;
		default:
			return state;
	}
};

const updateQuote = (quote) => ({
	type: UPDATEQUOTE,
	quote: quote
});

const quoteReducer = (state=defaultQuote, action) => {
	switch(action.type){
		case UPDATEQUOTE:
			return action.quote;
		default:
			return state;
	}
};
const rootReducer = combineReducers({
	color: colorReducer,
	quote: quoteReducer
});

const store = createStore(rootReducer);
//REACT-REDUX part1 ends

class Main extends React.Component{
	constructor(props){
		super(props);
		this.handleClick = this.handleClick.bind(this);
	}
	shouldComponentUpdate(nextState, nextProps){
		if(nextState.quote !== this.props.quote){
			if(nextState.color !== this.props.color){
				return true;
			}
		}else{
			return false;
		}
	}
	componentDidMount(){
		this.handleClick();
	}
	handleClick(){
		$("button").click(()=>{
			let [quoteRandIndex, colorRandIndex] = [Math.round(Math.random() * (myQuotes.length - 1 - 0) + 0), Math.round(Math.random() * (myColors.length - 1 - 0) + 0)];
			this.props.newColor(myColors[colorRandIndex]);
			this.props.newQuote(myQuotes[quoteRandIndex]);
			console.log(this.props.color);
			setTimeout(()=>{
				$('.textClass').removeClass('hide');
				$('.textClass').fadeIn(600);
			}, 500);
			setTimeout(()=>{
				$('.myColor').addClass("hide").css("backgroundColor", this.props.color);
				$('.myColor').removeClass("hide");
				$('.myColor').addClass("show");
				$('.quoteColor').css("color", this.props.color);
				$("#text").html(`<span class="restext">${" " + this.props.quote["quote"]}</span>`);
				$('#author').html(`<span className='resAuthor'>~${" " + this.props.quote["author"]}</span>`);
				$('.myColor').removeClass("show");
			}, 500);
			$('.textClass').fadeOut(500);
		});
	}

	render(){
		return(
			<Card fluid id="quote-box" className='box-shadow'>
				<p className='textClass quoteColor text-center container-fluid' style={{color: defaultColor}}><i className="fa fa-quote-left"  aria-hidden="true" id="font-quote"></i><span id="text" className='quoteColor' style={{color: defaultColor}}><span className="restext">{" "}{defaultQuote["quote"]}</span></span></p>
				<p id="author" className='quoteColor text-align-right textClass' style={{color: defaultColor}}><span className='resAuthor'>~{" "}{defaultQuote['author']}</span></p>
				<Row id="buttons">
					<Col fluid><a style={{color: defaultColor}} href="twitter.com/intent/tweet" id="tweet-quote" target="_blank" className='quoteColor'><i className="fa fa-twitter-square mybuttons" aria-hidden="true"></i></a><a style={{color: defaultColor}} href="" id="t-site" className='quoteColor'><i className="mybuttons fa fa-tumblr-square" aria-hidden="true"></i></a></Col>
					<Col fluid></Col>
					<Col fluid>
						<button style={{backgroundColor: defaultColor, color: "#fff"}}  id="new-quote" className='mybuttons myColor'>New quote</button>
					</Col>
				</Row>
			</Card>
		);
	}
};

//REACT REDUX part 2
const mapStateToProps = (state) => ({
	color: state.color,
	quote: state.quote
});

const mapDispatchToProps = (dispatch) => ({
	newColor: (color) => (dispatch(updateColor(color))),
	newQuote: (quote) => (dispatch(updateQuote(quote)))
});

const Container = connect(mapStateToProps, mapDispatchToProps)(Main);

export default class AppWrapper extends React.Component{
	constructor(props){
		super(props);
	}
	render(){
		return(
			<Provider store={store}>
				<Container />
			</Provider>
		)
	}
}
//REACT REDUX part 2 end