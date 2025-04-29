document.addEventListener('DOMContentLoaded', () => { const gameState = { day: 0, distance: 0, food: 100, health: 100, totalDistance: 1000 };

const travelStories = [ "You crossed a wide river safely!", "You found a beautiful valley filled with flowers.", "A wild horse ran alongside your wagon.", "You discovered an abandoned village.", "A skeleton fired arrows at your wagon, but you escaped!", "You followed a winding trail through towering mountains.", "You spotted a desert temple far in the distance.", "You stumbled upon a herd of llamas grazing peacefully.", "You crossed a swampy bog, boots heavy with mud.", "A thunderstorm soaked the trail, but your wagon pressed on.", "You watched the sunrise over the snowy peaks.", "You avoided a hidden ravine just in time.", "You navigated through a dense jungle, vines tugging at your wagon.", "You found ancient ruins crumbling in the plains.", "A cool breeze made for a perfect day of travel." ];

const restStories = [ "You rested under a giant oak tree.", "Everyone feels refreshed after a night's sleep.", "You found a small pond and refilled your water.", "A warm campfire lifted everyone's spirits.", "You slept under a blanket of stars.", "You shared stories around the fire.", "You crafted new tools while resting.", "You cooked a hearty stew that boosted morale.", "You repaired the wagon's broken wheel.", "A wandering trader passed by and gave you a map.", "You found shelter inside a small cave during a storm.", "You carved your initials into an old oak tree.", "You built a cozy shelter from fallen logs.", "A pack of wolves howled nearby as you rested.", "You spent the day fishing and feasting." ];

const mineStories = [ "You mined some rare ores!", "You found a small cave filled with coal.", "You stumbled across a silver vein!", "You dug deep but found only rocks.", "You discovered a glowing patch of redstone.", "You found emeralds hidden behind gravel walls!", "You battled a creeper deep underground but won.", "You slipped but caught yourself before a steep fall.", "You tunneled into a hidden cavern lit by lava.", "You found ancient fossils buried in stone.", "You harvested a handful of useful iron ingots.", "You unearthed a geode sparkling with amethyst crystals.", "You scared away a horde of bats fluttering in the mine.", "You ran low on torches but made it back safely.", "You mapped a small network of tunnels for future miners." ];

const huntStories = [ "You hunted a wild boar!", "You caught a fish from a nearby stream.", "You chased a rabbit but missed.", "You scared away some sheep and gathered wool.", "You spotted deer tracks but lost the trail.", "You caught a chicken and added it to your supplies.", "You trapped a fox but let it go.", "You shot a creeper from a safe distance — close call!", "You gathered berries and wild mushrooms for a meal.", "You found a hidden beehive buzzing with honey.", "You scared a parrot that flew off into the trees.", "You harvested sweet berries but got scratched by thorns.", "You set snares overnight and caught two rabbits.", "You heard wolves howling but stayed hidden.", "You tracked a group of pigs back to a lush meadow." ];

let travelQueue = shuffleArray([...travelStories]); let restQueue = shuffleArray([...restStories]); let mineQueue = shuffleArray([...mineStories]); let huntQueue = shuffleArray([...huntStories]);

const canvas = document.getElementById('gameCanvas'); const ctx = canvas.getContext('2d'); let sunX = 0;

function shuffleArray(array) { return array.sort(() => Math.random() - 0.5); }

function getNextStory(queue, originalList) { if (queue.length === 0) { queue.push(...shuffleArray([...originalList])); } return queue.shift(); }

function resizeCanvas() { canvas.width = Math.min(window.innerWidth - 40, 800); canvas.height = Math.min(window.innerHeight - 350, 500); }

resizeCanvas(); window.addEventListener('resize', resizeCanvas);

function updateUI() { document.getElementById('dayCount').textContent = gameState.day; document.getElementById('distance').textContent = gameState.distance; document.getElementById('food').textContent = gameState.food; document.getElementById('health').textContent = gameState.health; document.getElementById('totalDistance').textContent = gameState.totalDistance; }

function setStory(text) { document.getElementById('storyText').textContent = text; }

function randomEvent(chance) { return Math.random() < chance; }

function travel() { gameState.day++; const travelDist = Math.floor(Math.random() * 10) + 5; gameState.distance += travelDist; gameState.food -= Math.floor(Math.random() * 5) + 3; if (randomEvent(0.15)) gameState.health -= Math.floor(Math.random() * 15) + 5;

setStory(getNextStory(travelQueue, travelStories));

checkGameStatus();
updateUI();

}

function rest() { gameState.day++; gameState.health = Math.min(100, gameState.health + 10); gameState.food -= 5;

setStory(getNextStory(restQueue, restStories));

checkGameStatus();
updateUI();

}

function mine() { gameState.day++; if (randomEvent(0.5)) { const found = Math.floor(Math.random() * 10) + 5; gameState.food += found; } else { gameState.health = Math.min(100, gameState.health + 5); } gameState.food -= 4;

setStory(getNextStory(mineQueue, mineStories));

checkGameStatus();
updateUI();

}

function hunt() { gameState.day++; if (randomEvent(0.7)) { const meat = Math.floor(Math.random() * 15) + 10; gameState.food += meat; } else { gameState.health -= Math.floor(Math.random() * 10) + 5; } gameState.food -= 6;

setStory(getNextStory(huntQueue, huntStories));

checkGameStatus();
updateUI();

}

function checkGameStatus() { if (gameState.food <= 0 || gameState.health <= 0) { alert('Game Over! You did not survive the trail.'); resetGame(); } else if (gameState.distance >= gameState.totalDistance) { alert('Congratulations! You reached the End Portal.'); resetGame(); } }

function resetGame() { gameState.day = 0; gameState.distance = 0; gameState.food = 100; gameState.health = 100; travelQueue = shuffleArray([...travelStories]); restQueue = shuffleArray([...restStories]); mineQueue = shuffleArray([...mineStories]); huntQueue = shuffleArray([...huntStories]); setStory("Your adventure begins..."); updateUI(); }

function drawScene() { ctx.clearRect(0, 0, canvas.width, canvas.height);

let groundColor = '#7CFC00';
if (gameState.distance > 900) {
  groundColor = '#9370DB';
} else if (gameState.distance > 600) {
  groundColor = '#F0F8FF';
} else if (gameState.distance > 300) {
  groundColor = '#F4A460';
}

ctx.fillStyle = groundColor;
ctx.fillRect(0, 0, canvas.width, canvas.height);

const trailHeight = 100;
ctx.fillStyle = '#8B4513';
ctx.fillRect(0, canvas.height - trailHeight, canvas.width, trailHeight);

ctx.fillStyle = '#FFD700';
ctx.beginPath();
ctx.arc(sunX, canvas.height * 0.15, 30, 0, Math.PI * 2);
ctx.fill();

sunX += 1;
if (sunX > canvas.width + 30) {
  sunX = -30;
}

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

