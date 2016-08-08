export default class ScoreBoard {
	constructor (x, y, score){
		this.x = x;
		this.y = y;
		this.score = score;
	}
	draw(ctx){
		ctx.font = " 30px Helvetica";
		ctx.fillText(this.score, this.x, this.y);
	}
	render(ctx){
		this.draw(ctx);
	}
} 