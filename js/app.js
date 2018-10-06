// Enemies our player must avoid
var Enemy = function(row, speed) {
    this.x = -101;
    this.y = (row * 83) - 20;
    this.speed = speed;
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // Detect colision and reset position of the Enemy and Player
    // if (((this.x + 101 - 30 >= player.x && this.x + 101 - 30 < player.x + 101) 
    //     || (this.x >= player.x && this.x < player.x + 101)) 
    //     && this.y === player.y){
    if (this.detectCollision()) {
        player.reset();
        this.reset();
    } else { // If there is not collision Enemy continues 
        this.x += this.speed * dt;
        if(this.x >= 505){
            this.x = -101;
        }
    }
};
// Draw the enemy on the screen, required method for gamea
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};
Enemy.prototype.detectCollision = function() {
    return ((this.x + 101 - 30 >= player.x && this.x + 101 - 30 < player.x + 101) || (this.x >= player.x && this.x < player.x + 101 - 30)) && this.y === player.y;
};
// Reset Enemy position
Enemy.prototype.reset = function() {
    this.x = -101;
};

// Player class
var Player = function() {
    this.x = 202; // Initial position in X axis
    this.y = 395; // Initial position in Y axis
    this.stepX = 101;
    this.stepY = 83;
    this.movement = '';
    this.sprite = 'images/char-boy.png';
};
// Reset the player position
Player.prototype.reset = function () {
    this.x = 202;
    this.y = 395;
};
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};
Player.prototype.update = function() {
    switch (this.movement) {
        case 'left':
            if(this.x - this.stepX < 0)
                return;
            this.x -= this.stepX;
            break;
        case 'up':
            if(this.y - this.stepY < -20)
                return;
            this.y -= this.stepY;
            break;
        case 'right':
            if(this.x + this.stepX > 404)
                return;
            this.x += this.stepX;
            break;
        case 'down':
            if(this.y + this.stepY > 395)
                return;
            this.y += this.stepY;
            break;
        default:
            break;
    }

    // If player arrives to the top, position is reset to start again
    if (this.y == -20){
        console.log('finish!!');
        this.reset();
    }

    this.movement = '';
};
Player.prototype.handleInput = function(mov) {
        this.movement = mov;
};

// Create player instance
let player = new Player();
// Create Enemies instances
let allEnemies = [
    new Enemy(1, 250), 
    new Enemy(2, 100), 
    new Enemy(3, 100),
    new Enemy(1, 300), 
    new Enemy(2, 200), 
    new Enemy(3, 150)];

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
