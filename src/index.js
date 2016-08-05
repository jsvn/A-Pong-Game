const css = require('./game.css');

class Game {
	constructor() {
		const canvas = document.getElementById('game');
		this.width = canvas.width;
		this.height = canvas.height;
		this.ctx = canvas.getContext('2d');
		this.ctx.fillStyle = 'white';
	}
	drawLine() {
      this.context.setLineDash([10, 10]);
      this.context.beginPath();
      this.context.moveTo(this.width / 2, 0);
      this.context.lineTo(this.width / 2, this.height);
      this.context.strokeStyle = "white";
      this.context.stroke();
   }
   render(){
   	this.drawLine();
   }
};

var game = new Game();

const fps = 30;

function gameLoop() {
	setTimeout(window.requestAnimationFrame(gameLoop), fps);
	game.render();
}

gameLoop();