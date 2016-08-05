
export default class Paddle {
	constructor(height, x, controls){
		this.height = 30;
		this.maxHeight = height;
		this.width = 5;
		this.x = x;
		this.y = (height / 2) - (this.height / 2);
		this.speed = 5;
		
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
	render(ctx){
		ctx.fillRect(
			this.x, this.y, 
			this.width, this.height
			);
		ctx.fillStyle = 'gold';
	}
	
};

