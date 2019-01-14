import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import styled from 'styled-components';

//https://stackoverflow.com/questions/40433463/what-does-calling-super-in-a-react-constructor-dovalue: null

// const BrandedButton = styled.button`
// 	color: ${(props) => props.themeColor};
// 	&:hover {
// 		color: ${(props) => props.themeHoverColor};
// 	}
// `;

// render();
// {
// 	return (
// 		<BrandedButton themeHoverColor="pink" themeColor="blue">
// 			Click Me!
// 		</BrandedButton>
// 	);
//}

class Square extends React.Component {
	render() {
		return (
			<button className="square" onClick={() => this.props.onClick()}>
				{this.props.value}
			</button>
		);
	}
}

// Replace above class component with below Function Component
// in React, FUNCTION COMPONENTS are a simpler way to write components which only contain a
// RENDER method and DONT HAVE THEIR OWN STATE. instead of defining a class which extends
// REACT.COMPONENT, we can write a function that takes PROPS as input and returns what should
// be rendered
// class Square extends React.Component {
// 	render() {
// 		return <button className="square">{this.props.value}</button>;
// 	}
// }

class Board extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			squares: Array(9).fill(null)
		};
	}

	handleClick(i) {
		const squares = this.state.squares.slice();
		if (calculateWinner(squares) || squares[i]) {
			return;
		}
		squares[i] = this.state.xIsNext ? 'X' : 'O';
		this.setState({
			squares, //WOULD THIS STILL WORK IF IT WAS  > squares, < ??? >
			xIsNext: !this.state.xIsNext
		});
	}

	renderSquare(i) {
		return <Square value={this.state.squares[i]} onClick={() => this.handleClick(i)} />;
	}
	// the arrow function in the above stateful component is used to ensure that the THIS. keyword is
	// pointing to the correct instance. YOU DONT NEED TO DO THIS WITH FUNCTION COMPONENTS

	// 	//changed from const squares = this.state.squares.slice (); (.slice copies the existing array)
	// 	// ref immutability re potential for componentDidUpdate trigger malfunction
	// 	squares[i] = 'X';
	// 	this.setState({ squares: squares });
	//	}

	// class Board extends React.Component { //https://toddmotto.com/stateful-stateless-components
	// renderSquare(i) {
	// 	return <Square value={i}/>;
	// }

	render() {
		const winner = calculateWinner(this.state.squares);
		let status;
		if (winner) {
			status = 'Winner ' + winner;
		} else {
			status = 'Next player ' + (this.state.xIsNext ? 'X' : 'O');
		}

		return (
			<div className="btn btn-primary">
				<div className="status">{status}</div>
				<div className="board-row">
					{this.renderSquare(0)}
					{this.renderSquare(1)}
					{this.renderSquare(2)}
				</div>
				<div className="board-row">
					{this.renderSquare(3)}
					{this.renderSquare(4)}
					{this.renderSquare(5)}
				</div>
				<div className="board-row">
					{this.renderSquare(6)}
					{this.renderSquare(7)}
					{this.renderSquare(8)}
				</div>
			</div>
		);
	}
}

class Game extends React.Component {
	render() {
		return (
			<div className="game">
				<div className="game-board">
					<Board />
				</div>
				<div className="game-info">
					<div>{/* status */}</div>
					<ol>{/* TODO */}</ol>
				</div>
			</div>
		);
	}
}

function calculateWinner(squares) {
	//all possible winning combinations
	const lines = [
		[ 0, 1, 2 ],
		[ 3, 4, 5 ],
		[ 6, 7, 8 ],
		[ 0, 3, 6 ],
		[ 1, 4, 7 ],
		[ 2, 5, 8 ],
		[ 0, 4, 8 ],
		[ 2, 4, 6 ]
	];
	for (let i = 0; i < lines.length; i++) {
		const [ a, b, c ] = lines[i];
		if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
			return squares[a];
		}
	}
	return null;
}

ReactDOM.render(<Game />, document.getElementById('root'));
