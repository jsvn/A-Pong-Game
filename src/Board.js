 // Board.js
export default class Board {
    // board properties
    constructor(width, height) {
        this.width = width;
        this.height = height;
    }
    //draws the center line
    drawLine(ctx) {
        ctx.setLineDash([10, 10]);
        ctx.beginPath();
        ctx.moveTo(this.width / 2, 0);
        ctx.lineTo(this.width / 2, this.height);
        ctx.strokeStyle = "white";
        ctx.stroke();
    }
    // renders the center line by calling the this.drawLine() method
    render(ctx) {
    ctx.clearRect(0, 0, this.width, this.height);
    	this.drawLine(ctx);

    }
};
