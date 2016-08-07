var Game = function(opt){
	this.options = opt;
	this.canvas = this.options.targetElement;
	this.context = this.canvas.getContext('2d');
	this.keysDown = {};

	window.addEventListener('keydown', function(event) {
	    this.keysDown[event.which] = true;
	  }.bind(this), false);
	  window.addEventListener('keyup', function(event) {
	    this.keysDown[event.which] = false;
	  }.bind(this), false);

	this.render();
}

Game.prototype = {

	drawPlayer: function(){
		this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
		this.context.strokeRect(0, 0, this.canvas.width, this.canvas.height);
		this.context.drawImage(this.playerImage, this.playerX, this.playerY);
	},

	update: function(){
		if(this.keysDown[37])
			this.playerX -= 10; // move left by 10px
		if(this.keysDown[38])
			this.playerY -= 10; // move down by 10px
		if(this.keysDown[39])
			this.playerX += 10; // move right by 10px
		if(this.keysDown[40])
			this.playerY += 10; // move up by 10px

		this.playerX = this.clamp(this.playerX, 0, this.canvas.width - this.playerImage.width);
		this.playerY = this.clamp(this.playerY, 0, this.canvas.height - this.playerImage.height);
	},

	clamp: function(x, min, max){
		return x < min ? min : (x > max ? max : x);
	},
	selectPlayer: function(){

	},

	createEnemies: function(){

	},
	drawStars: function(){
		for (var i=0; i<1500; i++) {
	      // Generate random parameters for the stars.
	      var x = Math.round(Math.random() * this.canvas.width);
	      var y = Math.round(Math.random() * this.canvas.height);
	      var rad = Math.ceil(Math.random() * 2);
	      var alpha = Math.min(Math.random() + 0.25, 1);

	      // Draw the star.
	      var star  = new PIXI.Graphics();
	      star.beginFill(0xFFFFFF, alpha);
	      star.drawCircle(x, y, rad);
	      star.endFill();

	      // Attach the star to the stage.
	      this.stage.addChild(star);
	    }
	},

	render: function(){
		// Draw player
		var self = this;
		this.playerImage = new Image();
		this.playerImage.src='../images/player.png';

		this.playerX = (this.canvas.width/2)-(this.playerImage.width/2);
		this.playerY = (this.canvas.height/2)-(this.playerImage.height/2);

		var FPS = 30;
		setInterval(function(){
			self.update();
			self.drawPlayer();
		}, 1000/FPS);

		this.createEnemies();
	}	
}