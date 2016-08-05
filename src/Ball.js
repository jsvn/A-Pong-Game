const radius = 5;

export default class Ball {
	// Ball Properties
	constructor(height, width){
		this.x = width/2;
		this.y = height/2;
		this.vy = Math.floor(Math.random() * 12 - 6);
		this.vx = (7 - Math.abs(this.vy));
		this.maxHeight = height;
		this.height = height;
		this.width = width;
		// this.speed = speed;
		this.radius = radius;
	}
	//Ball Methods
	draw(ctx){
		ctx.beginPath();
		ctx.arc(this.x, this.y, this.radius, 0, Math.PI*2);
		ctx.fillStyle = "white";
		ctx.fill();
	}
	//creating the bounce effect
	wallBounce(ctx){
		const hitLeft = this.x >= this.width;
		const hitRight = this.x + this.radius <= 0;
		const hitTop = this.y + this.radius <= 0;
		const hitBottom = this.y >= this.height;

		if (hitLeft || hitRight){
			this.vx = -this.vx;
		} else if (hitTop || hitBottom){
			this.vy = -this.vy;
		}
	}

	paddleCollision(player1, player2) {
         if (this.vx > 0) {
             const inRightEnd = 
             player2.x <= this.x + this.radius &&
             player2.x > this.x - this.vx + this.radius;
             if (inRightEnd) {
                 const collisionDiff = this.x + this.radius - player2.x;
                 const k = collisionDiff / this.vx;
                 const y = this.vy * k + (this.y - this.vy);
                 const hitRightPaddle = y >= player2.y && y + this.radius <= player2.y + player2.height;
                 if (hitRightPaddle) {
                     this.x = player2.x - this.radius;
                     this.y = Math.floor(this.y - this.vy + this.vy * k);
                     this.vx = -this.vx;
                 }
             }
         } else {
             const inLeftEnd = player1.x + (player1.width*2) >= this.x;
             if (inLeftEnd) {
                 const collisionDiff = player1.x + player1.width - this.x;
                 const k = collisionDiff / -this.vx;
                 const y = this.vy * k + (this.y - this.vy);
                 const hitLeftPaddle = y >= player1.y && y + this.radius <=
                 player1.y + player1.height;
                 if (hitLeftPaddle) {
                     this.x = player1.x + player1.width;
                     this.y = Math.floor(this.y - this.vy + this.vy * k) + 1;
                     this.vx = -this.vx;
                 }
             }
         }
     } //Paddle Collision brackets

render(ctx, player1, player2) {
		this.x += this.vx;// Math.max(radius, this.vx);
		this.y += this.vy; //Math.min(this.maxHeight - radius, this.vy);
		this.draw(ctx);
		this.wallBounce(ctx);
		this.paddleCollision(player1, player2);
		

		//In the render method we will need to call this.wallBounce 
		//so it will redraw the movement

	}
}