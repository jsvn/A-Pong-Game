 
//Import classes from other files
import Paddle from './Paddle';
import Board from './Board';
import Ball from './Ball';
import ScoreBoard from './ScoreBoard';
// this is used for the x value of the paddles
const gap = 10;
// objects made to set the up and down values to be used by the keydown switch statement
const p1Keys = {up: 65, down: 90};
const p2Keys = {up: 38, down: 40};
const start = {start: 32, pause: 32};


 export default class Game {
	constructor() {
		const canvas = document.getElementById('game');
		//setting the canvas structure
		this.width = canvas.width;
		this.height = canvas.height;
		this.ctx = canvas.getContext('2d');
		this.ctx.fillStyle = 'white';
		//game objects
		this.board = new Board(this.width, this.height);
		this.player1 = new Paddle(this.height, gap, p1Keys);  //{up: a, down: z,}
		this.player2 = new Paddle(this.height, this.width - 5 - gap, p2Keys);
		this.ball1 = new Ball(this.height, this.width, start, this);
		this.leftScore = new ScoreBoard(this.width/4 + 20,  30, 0);
		this.rightScore = new ScoreBoard(this.width/4 + 120, 30, 0);
	}
   render(){
   	this.board.render(this.ctx);
   	this.player1.render(this.ctx);
   	this.player2.render(this.ctx);
   	this.ball1.render(this.ctx, this.player1, this.player2);
   	this.leftScore.render(this.ctx);
   	this.rightScore.render(this.ctx);
   }
};