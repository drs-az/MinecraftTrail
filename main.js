document.addEventListener('DOMContentLoaded', () => { const gameState = { day: 0, distance: 0, food: 100, health: 100, totalDistance: 1000 };

const canvas = document.getElementById('gameCanvas'); const ctx = canvas.getContext('2d');

function updateUI() { document.getElementById('dayCount').textContent = gameState.day; document.getElementById('distance').textContent = gameState.distance; document.getElementById('food').textContent = gameState.food; document.getElementById('health').textContent = gameState.health; document.getElementById('totalDistance').textContent = gameState.totalDistance; drawScene(); }

function randomEvent(chance) { return Math.random() < chance; }

function travel() { gameState.day++; const travelDist = Math.floor(Math.random() * 10) + 5; gameState.distance += travelDist; gameState.food -= Math.floor(Math.random() * 5) + 3; if (randomEvent(0.15)) gameState.health -= Math.floor(Math.random() * 15) + 5; checkGameStatus(); updateUI(); }

function rest() { gameState.day++; gameState.health = Math.min(100, gameState.health + 10); gameState.food -= 5; checkGameStatus(); updateUI(); }

function mine() { gameState.day++; if (randomEvent(0.5)) { const found = Math.floor(Math.random() * 10) + 5; gameState.food += found; } else { gameState.health = Math.min(100, gameState.health + 5); } gameState.food -= 4; checkGameStatus(); updateUI(); }

function hunt() { gameState.day++; if (randomEvent(0.7)) { const meat = Math.floor(Math.random() * 15) + 10; gameState.food += meat; } else { gameState.health -= Math.floor(Math.random() * 10) + 5; } gameState.food -= 6; checkGameStatus(); updateUI(); }

function checkGameStatus() { if (gameState.food <= 0 || gameState.health <= 0) { alert('Game Over! You did not survive the trail.'); resetGame(); } else if (gameState.distance >= gameState.totalDistance) { alert('Congratulations! You reached the End Portal.'); resetGame(); } }

function resetGame() { gameState.day = 0; gameState.distance = 0; gameState.food = 100; gameState.health = 100; updateUI(); }

function drawScene() { ctx.clearRect(0, 0, canvas.width, canvas.height);

// Draw grass background
ctx.fillStyle = '#7CFC00'; // Lawn green
ctx.fillRect(0, 0, canvas.width, canvas.height);

// Draw dirt trail
ctx.fillStyle = '#8B4513'; // Saddle brown
ctx.fillRect(0, canvas.height - 150, canvas.width, 100);

// Calculate wagon position
const wagonX = (gameState.distance / gameState.totalDistance) * (canvas.width - 100);
const wagonY = canvas.height - 180;

// Draw wagon
ctx.fillStyle = '#D2B48C'; // Tan
ctx.fillRect(wagonX, wagonY, 100, 50);

// Draw wheels
ctx.fillStyle = '#654321'; // Dark brown
ctx.beginPath();
ctx.arc(wagonX + 20, wagonY + 50, 10, 0, Math.PI * 2);
ctx.fill();

ctx.beginPath();
ctx.arc(wagonX + 80, wagonY + 50, 10, 0, Math.PI * 2);
ctx.fill();

}

document.getElementById('travelBtn')?.addEventListener('click', travel); document.getElementById('restBtn')?.addEventListener('click', rest); document.getElementById('mineBtn')?.addEventListener('click', mine); document.getElementById('huntBtn')?.addEventListener('click', hunt);

updateUI(); });

