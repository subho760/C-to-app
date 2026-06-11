const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

canvas.width = 400;
canvas.height = 600;

let playerX = 175; 
const playerY = 500;
let score = 0;
let gameOver = false;

// 🖼️ Loads your graphic asset directly from flash storage
const carImg = new Image();
carImg.src = "assets/player_car.png"; 

let enemyX = Math.floor(Math.random() * 320);
let enemyY = -100;
let enemySpeed = 5;

document.getElementById("leftBtn").addEventListener("touchstart", (e) => { e.preventDefault(); if(playerX > 10) playerX -= 35; });
document.getElementById("rightBtn").addEventListener("touchstart", (e) => { e.preventDefault(); if(playerX < 340) playerX += 35; });

function gameLoop() {
    if (gameOver) {
        ctx.fillStyle = "white";
        ctx.font = "30px Arial";
        ctx.fillText("GAME OVER", 110, 300);
        ctx.font = "20px Arial";
        ctx.fillText("Score: " + score, 160, 340);
        return;
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draws custom car if asset exists, otherwise draws clean fallback block
    if (carImg.complete && carImg.naturalWidth !== 0) {
        ctx.drawImage(carImg, playerX, playerY, 50, 80);
    } else {
        ctx.fillStyle = "#a855f7"; 
        ctx.fillRect(playerX, playerY, 50, 80); 
    }

    enemyY += enemySpeed;
    if (enemyY > canvas.height) {
        enemyY = -100;
        enemyX = Math.floor(Math.random() * 320);
        score += 10;
        enemySpeed += 0.4; 
    }

    ctx.fillStyle = "#ef4444"; 
    ctx.fillRect(enemyX, enemyY, 50, 80);

    if (playerX < enemyX + 50 && playerX + 50 > enemyX && playerY < enemyY + 80 && playerY + 80 > enemyY) {
        gameOver = true;
    }

    ctx.fillStyle = "white";
    ctx.font = "20px Arial";
    ctx.fillText("Score: " + score, 20, 40);

    requestAnimationFrame(gameLoop);
}

gameLoop();
