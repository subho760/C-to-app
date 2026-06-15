const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const levelTitle = document.getElementById('level-title');
const statusMsg = document.getElementById('status-message');

const GRID_SIZE = 4;
const CELL_SIZE = 100;

// Arrow definitions map: 0=Empty, 1=Up, 2=Down, 3=Left, 4=Right
const LEVELS = [
    // Level 1: Starter
    [
        [0, 2, 0, 0],
        [4, 0, 3, 0],
        [0, 1, 0, 0],
        [0, 0, 0, 0]
    ],
    // Level 2: Simple Interlocking
    [
        [0, 4, 3, 0],
        [2, 0, 0, 1],
        [1, 0, 0, 2],
        [0, 4, 3, 0]
    ],
    // Level 3: The Box Escape
    [
        [4, 2, 2, 3],
        [1, 0, 0, 2],
        [1, 0, 0, 2],
        [4, 1, 1, 3]
    ],
    // Level 4: Pinwheel
    [
        [0, 4, 2, 0],
        [1, 0, 2, 3],
        [4, 1, 0, 2],
        [0, 1, 3, 0]
    ],
    // Level 5: Grid Lockdown
    [
        [2, 4, 3, 2],
        [1, 3, 4, 1],
        [4, 1, 2, 3],
        [3, 2, 1, 4]
    ],
    // Level 6: Wall Blockade
    [
        [4, 4, 4, 2],
        [1, 0, 0, 2],
        [1, 0, 0, 2],
        [1, 3, 3, 3]
    ],
    // Level 7: Center Target
    [
        [2, 2, 2, 2],
        [4, 1, 3, 4],
        [3, 4, 2, 3],
        [1, 1, 1, 1]
    ],
    // Level 8: Zig Zag Cross
    [
        [1, 3, 2, 4],
        [4, 2, 3, 1],
        [2, 4, 1, 3],
        [3, 1, 4, 2]
    ],
    // Level 9: Dense Maze
    [
        [4, 3, 4, 2],
        [2, 1, 3, 1],
        [1, 4, 2, 4],
        [3, 2, 1, 3]
    ],
    // Level 10: The Grand Escape
    [
        [2, 3, 3, 2],
        [4, 1, 1, 3],
        [4, 2, 2, 3],
        [1, 4, 4, 1]
    ]
];

let currentLevelIdx = 0;
let grid = [];
let animatingArrows = []; // Tracks arrows currently sliding out

class AnimatingArrow {
    constructor(row, col, type) {
        this.row = row;
        this.col = col;
        this.type = type;
        this.x = col * CELL_SIZE;
        this.y = row * CELL_SIZE;
        this.speed = 18; // Speed of sliding out animation
        this.isDone = false;

        // Get movement speed steps
        this.dx = 0;
        this.dy = 0;
        if (type === 1) this.dy = -this.speed; // Up
        if (type === 2) this.dy = this.speed;  // Down
        if (type === 3) this.dx = -this.speed; // Left
        if (type === 4) this.dx = this.speed;  // Right
    }

    update() {
        this.x += this.dx;
        this.y += this.dy;

        // Check if fully off screen bounds
        if (this.x < -CELL_SIZE || this.x > canvas.width || this.y < -CELL_SIZE || this.y > canvas.height) {
            this.isDone = true;
        }
    }

    draw() {
        drawArrowIcon(this.x, this.y, this.type, true);
    }
}

function loadLevel(idx) {
    currentLevelIdx = idx;
    levelTitle.innerText = `LEVEL ${idx + 1}`;
    statusMsg.innerText = "Clear all arrows to escape!";
    statusMsg.style.color = "#94a3b8";
    animatingArrows = [];
    
    // Deep copy matrix configuration array
    grid = LEVELS[idx].map(row => [...row]);
    render();
}

function resetLevel() {
    loadLevel(currentLevelIdx);
}

// Low-level canvas rendering blocks
function drawArrowIcon(x, y, type, isAnimating = false) {
    ctx.save();
    ctx.translate(x + CELL_SIZE / 2, y + CELL_SIZE / 2);
    
    // Rotate canvas context tracking coordinates to match block indexes
    if (type === 2) ctx.rotate(Math.PI);        // Down
    if (type === 3) ctx.rotate(-Math.PI / 2);   // Left
    if (type === 4) ctx.rotate(Math.PI / 2);    // Right

    // Draw Arrow Background Box Shape
    ctx.shadowBlur = isAnimating ? 0 : 8;
    ctx.shadowColor = "rgba(0,0,0,0.25)";
    ctx.fillStyle = isAnimating ? "#60a5fa" : "#3b82f6";
    
    ctx.beginPath();
    ctx.roundRect(-36, -36, 72, 72, 16);
    ctx.fill();
    ctx.restore();

    // Draw Pure Vector Arrowhead Structure
    ctx.save();
    ctx.translate(x + CELL_SIZE / 2, y + CELL_SIZE / 2);
    if (type === 2) ctx.rotate(Math.PI);
    if (type === 3) ctx.rotate(-Math.PI / 2);
    if (type === 4) ctx.rotate(Math.PI / 2);

    ctx.fillStyle = "#ffffff";
    ctx.beginPath();
    ctx.moveTo(0, -22);       // Tip
    ctx.lineTo(18, -4);       // Right barb
    ctx.lineTo(7, -4);        // Right inner corner
    ctx.lineTo(7, 22);        // Bottom right shaft
    ctx.lineTo(-7, 22);       // Bottom left shaft
    ctx.lineTo(-7, -4);       // Left inner corner
    ctx.lineTo(-18, -4);      // Left barb
    ctx.closePath();
    ctx.fill();
    ctx.restore();
}

function render() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw Grid Slots Lines background
    for (let r = 0; r < GRID_SIZE; r++) {
        for (let c = 0; c < GRID_SIZE; c++) {
            ctx.strokeStyle = "#2e2e38";
            ctx.lineWidth = 2;
            ctx.strokeRect(c * CELL_SIZE, r * CELL_SIZE, CELL_SIZE, CELL_SIZE);
        }
    }

    // Draw static board objects
    for (let r = 0; r < GRID_SIZE; r++) {
        for (let c = 0; c < GRID_SIZE; c++) {
            if (grid[r][c] !== 0) {
                drawArrowIcon(c * CELL_SIZE, r * CELL_SIZE, grid[r][c], false);
            }
        }
    }

    // Draw moving animations items
    animatingArrows.forEach(arrow => arrow.draw());
}

function handleTap(clickX, clickY) {
    if (animatingArrows.length > 0) return; // Wait for active move animations to clear

    const col = Math.floor(clickX / CELL_SIZE);
    const row = Math.floor(clickY / CELL_SIZE);

    if (row < 0 || row >= GRID_SIZE || col < 0 || col >= GRID_SIZE) return;

    const type = grid[row][col];
    if (type === 0) return;

    let dr = 0, dc = 0;
    if (type === 1) dr = -1;
    if (type === 2) dr = 1;
    if (type === 3) dc = -1;
    if (type === 4) dc = 1;

    let checkR = row + dr;
    let checkC = col + dc;
    let pathBlocked = false;

    // Raycast loop verification along layout matrix bounds
    while (checkR >= 0 && checkR < GRID_SIZE && checkC >= 0 && checkC < GRID_SIZE) {
        if (grid[checkR][checkC] !== 0) {
            pathBlocked = true;
            break;
        }
        checkR += dr;
        checkC += dc;
    }

    if (pathBlocked) {
        statusMsg.innerText = "💥 Path Blocked! Try another order.";
        statusMsg.style.color = "#ef4444";
    } else {
        // Safe to escape! Launch global animation tracking sequence
        animatingArrows.push(new AnimatingArrow(row, col, type));
        grid[row][col] = 0; 
        statusMsg.innerText = "Sliding out!";
        statusMsg.style.color = "#10b981";
    }
}

// Master animation canvas engine updating ticks loop
function gameLoop() {
    if (animatingArrows.length > 0) {
        animatingArrows.forEach((arrow, index) => {
            arrow.update();
            if (arrow.isDone) {
                animatingArrows.splice(index, 1);
                
                // Check if level has been successfully cleared out completely
                const isCleared = grid.every(row => row.every(val => val === 0));
                if (isCleared) {
                    if (currentLevelIdx + 1 < LEVELS.length) {
                        currentLevelIdx++;
                        loadLevel(currentLevelIdx);
                    } else {
                        statusMsg.innerText = "🏆 You beat all 10 levels! Incredible!";
                        statusMsg.style.color = "#fbbf24";
                        levelTitle.innerText = "VICTORY";
                    }
                }
            }
        });
        render();
    }
    requestAnimationFrame(gameLoop);
}

// Input listeners handling standard interactions and touch events
canvas.addEventListener('mousedown', (e) => {
    const rect = canvas.getBoundingClientRect();
    const x = (e.clientX - rect.left) * (canvas.width / rect.width);
    const y = (e.clientY - rect.top) * (canvas.height / rect.height);
    handleTap(x, y);
});

canvas.addEventListener('touchstart', (e) => {
    e.preventDefault();
    const rect = canvas.getBoundingClientRect();
    const touch = e.touches[0];
    const x = (touch.clientX - rect.left) * (canvas.width / rect.width);
    const y = (touch.clientY - rect.top) * (canvas.height / rect.height);
    handleTap(x, y);
});

// Run
loadLevel(0);
gameLoop();
