 
//Import classes from other files
import Paddle from './Paddle';
import Board from './Board';
import Ball from './Ball';
// this is used for the x value of the paddles
const gap = 10;
// objects made to set the up and down values to be used by the keydown switch statement
const p1Keys = {up: 65, down: 90};
const p2Keys = {up: 38, down: 40};


 export default class Game {
	constructor() {
		const canvas = document.getElementById('game');
		this.width = canvas.width;
		this.height = canvas.height;
		this.ctx = canvas.getContext('2d');
		this.ctx.fillStyle = 'white';
		//game objects
		this.board = new Board(this.width, this.height);
		this.player1 = new Paddle(this.height, gap, p1Keys);  //{up: a, down: z,}
		this.player2 = new Paddle(this.height, this.width - 4 - gap, p2Keys);
		this.ball1 = new Ball(this.height, this.width);
	}

   render(){
   	this.board.render(this.ctx);
   	this.player1.render(this.ctx);
   	this.player2.render(this.ctx);
   	this.ball1.render(this.ctx);
   	
   }
};