document.addEventListener('DOMContentLoaded', () => { const gameState = { day: 0, distance: 0, food: 100, health: 100, totalDistance: 1000 };

const canvas = document.getElementById('gameCanvas'); const ctx = canvas.getContext('2d'); let sunX = 0;

function resizeCanvas() { canvas.width = Math.min(window.innerWidth - 40, 800); canvas.height = Math.min(window.innerHeight - 300, 600); }

resizeCanvas(); window.addEventListener('resize', resizeCanvas);

function updateUI() { document.getElementById('dayCount').textContent = gameState.day; document.getElementById('distance').textContent = gameState.distance; document.getElementById('food').textContent = gameState.food; document.getElementById('health').textContent = gameState.health; document.getElementById('totalDistance').textContent = gameState.totalDistance; }

function randomEvent(chance) { return Math.random() < chance; }

function travel() { gameState.day++; const travelDist = Math.floor(Math.random() * 10) + 5; gameState.distance += travelDist; gameState.food -= Math.floor(Math.random() * 5) + 3; if (randomEvent(0.15)) gameState.health -= Math.floor(Math.random() * 15) + 5; checkGameStatus(); updateUI(); }

function rest() { gameState.day++; gameState.health = Math.min(100, gameState.health + 10); gameState.food -= 5; checkGameStatus(); updateUI(); }

function mine() { gameState.day++; if (randomEvent(0.5)) { const found = Math.floor(Math.random() * 10) + 5; gameState.food += found; } else { gameState.health = Math.min(100, gameState.health + 5); } gameState.food -= 4; checkGameStatus(); updateUI(); }

function hunt() { gameState.day++; if (randomEvent(0.7)) { const meat = Math.floor(Math.random() * 15) + 10; gameState.food += meat; } else { gameState.health -= Math.floor(Math.random() * 10) + 5; } gameState.food -= 6; checkGameStatus(); updateUI(); }

function checkGameStatus() { if (gameState.food <= 0 || gameState.health <= 0) { alert('Game Over! You did not survive the trail.'); resetGame(); } else if (gameState.distance >= gameState.totalDistance) { alert('Congratulations! You reached the End Portal.'); resetGame(); } }

function resetGame() { gameState.day = 0; gameState.distance = 0; gameState.food = 100; gameState.health = 100; updateUI(); }

function drawScene() { ctx.clearRect(0, 0, canvas.width, canvas.height);

// Determine biome based on distance
let groundColor = '#7CFC00'; // Grasslands
if (gameState.distance > 900) {
  groundColor = '#9370DB'; // End Portal area
} else if (gameState.distance > 600) {
  groundColor = '#F0F8FF'; // Snowy tundra
} else if (gameState.distance > 300) {
  groundColor = '#F4A460'; // Desert
}

// Draw biome background
ctx.fillStyle = groundColor;
ctx.fillRect(0, 0, canvas.width, canvas.height);

// Draw trail
const trailHeight = 100;
ctx.fillStyle = '#8B4513';
ctx.fillRect(0, canvas.height - trailHeight, canvas.width, trailHeight);

// Draw sun
ctx.fillStyle = '#FFD700';
ctx.beginPath();
ctx.arc(sunX, canvas.height * 0.15, 30, 0, Math.PI * 2);
ctx.fill();

sunX += 1;
if (sunX > canvas.width + 30) {
  sunX = -30;
}

// Draw wagon
const wagonWidth = 100;
const wagonHeight = 50;
const wagonX = (gameState.distance / gameState.totalDistance) * (canvas.width - wagonWidth);
const wagonY = canvas.height - trailHeight - wagonHeight;

ctx.fillStyle = '#D2B48C';
ctx.fillRect(wagonX, wagonY, wagonWidth, wagonHeight);

ctx.fillStyle = '#654321';
ctx.beginPath();
ctx.arc(wagonX + 20, wagonY + wagonHeight, 10, 0, Math.PI * 2);
ctx.fill();

ctx.beginPath();
ctx.arc(wagonX + 80, wagonY + wagonHeight, 10, 0, Math.PI * 2);
ctx.fill();

}

function gameLoop() { drawScene(); requestAnimationFrame(gameLoop); }

document.getElementById('travelBtn')?.addEventListener('click', travel); document.getElementById('restBtn')?.addEventListener('click', rest); document.getElementById('mineBtn')?.addEventListener('click', mine); document.getElementById('huntBtn')?.addEventListener('click', hunt);

updateUI(); gameLoop(); });

