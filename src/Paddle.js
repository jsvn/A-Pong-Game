
export default class Paddle {
	// Paddle properties defines it's width, height, the max height it can go too, a speed, and positioning
	constructor(height, x, controls){
		this.height = 40;
		this.maxHeight = height;
		this.width = 5;
		this.x = x;
		this.y = (height / 2) - (this.height / 2);
		this.speed = 10;
	//this property listens for the keydown event, controls calls the controll argument 
	//which is set by passing an object through it with up & down being a key for that object
		document.addEventListener('keydown', event => {
			switch(event.keyCode) {
				case controls.up:
					this.y = Math.max(0, this.y - this.speed);
					console.log('up');
					break;
				case controls.down:
					this.y = Math.min(this.maxHeight - this.height, this.y + this.speed);
					console.log('down');
					break;
			}
		});	
	}
	//this draws the paddle and renders it.
	// Maybe split up the fillRect into it's own draw method to be rendered in the render()
	render(ctx){
		ctx.fillStyle = 'rose';
		ctx.fillRect(
			this.x, this.y, 
			this.width, this.height
			);
	}
	
};

