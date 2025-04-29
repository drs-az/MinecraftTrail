document.addEventListener('DOMContentLoaded', () => { const gameState = { day: 0, distance: 0, food: 100, health: 100, totalDistance: 1000 };

function updateUI() { document.getElementById('dayCount').textContent = gameState.day; document.getElementById('distance').textContent = gameState.distance; document.getElementById('food').textContent = gameState.food; document.getElementById('health').textContent = gameState.health; document.getElementById('totalDistance').textContent = gameState.totalDistance; }

function randomEvent(chance) { return Math.random() < chance; }

function travel() { gameState.day++; const travelDist = Math.floor(Math.random() * 10) + 5; gameState.distance += travelDist; gameState.food -= Math.floor(Math.random() * 5) + 3; if (randomEvent(0.15)) gameState.health -= Math.floor(Math.random() * 15) + 5; checkGameStatus(); updateUI(); }

function rest() { gameState.day++; gameState.health = Math.min(100, gameState.health + 10); gameState.food -= 5; checkGameStatus(); updateUI(); }

function mine() { gameState.day++; if (randomEvent(0.5)) { const found = Math.floor(Math.random() * 10) + 5; gameState.food += found; } else { gameState.health = Math.min(100, gameState.health + 5); } gameState.food -= 4; checkGameStatus(); updateUI(); }

function hunt() { gameState.day++; if (randomEvent(0.7)) { const meat = Math.floor(Math.random() * 15) + 10; gameState.food += meat; } else { gameState.health -= Math.floor(Math.random() * 10) + 5; } gameState.food -= 6; checkGameStatus(); updateUI(); }

function checkGameStatus() { if (gameState.food <= 0 || gameState.health <= 0) { alert('Game Over! You did not survive the trail.'); resetGame(); } else if (gameState.distance >= gameState.totalDistance) { alert('Congratulations! You reached the End Portal.'); resetGame(); } }

function resetGame() { gameState.day = 0; gameState.distance = 0; gameState.food = 100; gameState.health = 100; updateUI(); }

document.getElementById('travelBtn')?.addEventListener('click', travel); document.getElementById('restBtn')?.addEventListener('click', rest); document.getElementById('mineBtn')?.addEventListener('click', mine); document.getElementById('huntBtn')?.addEventListener('click', hunt);

updateUI(); });

