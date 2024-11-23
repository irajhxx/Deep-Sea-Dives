//Snake Game 
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const scoreElement = document.getElementById("score");
const highScoreElement = document.getElementById("highScore");
const playAgainButton = document.getElementById("playAgain");

const box = 20; 
const canvasSize = canvas.width / box;

let snake, food, direction, score, game;
let highScore = localStorage.getItem("highScore") ? localStorage.getItem("highScore") : 0;
highScoreElement.innerHTML = "High Score: " + highScore;

playAgainButton.addEventListener("click", resetGame); 

// Initialise the game
function initGame() {
    snake = [{ x: 9 * box, y: 10 * box }];
    food = { 
        x: Math.floor(Math.random() * canvasSize) * box,
        y: Math.floor(Math.random() * canvasSize) * box 
    };
    direction = null;
    score = 0;
    scoreElement.innerHTML = "Score: 0";
    playAgainButton.style.display = "none"; 
    game = setInterval(gameLoop, 100); 
}

document.addEventListener("keydown", changeDirection);

function changeDirection(event) {
    if (event.keyCode === 37 && direction !== "RIGHT") direction = "LEFT";  
    else if (event.keyCode === 38 && direction !== "DOWN") direction = "UP";    
    else if (event.keyCode === 39 && direction !== "LEFT") direction = "RIGHT"; 
    else if (event.keyCode === 40 && direction !== "UP") direction = "DOWN";    
}

// Main Game Loop
function gameLoop() {
    let headX = snake[0].x;
    let headY = snake[0].y;

    if (direction === "LEFT") headX -= box;
    if (direction === "UP") headY -= box;
    if (direction === "RIGHT") headX += box;
    if (direction === "DOWN") headY += box;

    if (headX === food.x && headY === food.y) {
        score++;
        food = {
            x: Math.floor(Math.random() * canvasSize) * box,
            y: Math.floor(Math.random() * canvasSize) * box
        };
    } else {
        snake.pop();
    }

    let newHead = { x: headX, y: headY };

    if (
        headX < 0 || headX >= canvas.width || headY < 0 || headY >= canvas.height ||
        collision(newHead, snake)
    ) {
        clearInterval(game);
        updateHighScore();
        playAgainButton.style.display = "block"; 
        return;
    }

    snake.unshift(newHead);

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    snake.forEach(part => {
        ctx.fillStyle = "#a47e1b";
        ctx.fillRect(part.x, part.y, box, box);
    });

    ctx.fillStyle = "#31572c"; 
    ctx.fillRect(food.x, food.y, box, box);

    scoreElement.innerHTML = "Score: " + score;
}

function collision(head, snake) {
    for (let i = 0; i < snake.length; i++) {
        if (head.x === snake[i].x && head.y === snake[i].y) {
            return true;
        }
    }
    return false;
}

function updateHighScore() {
    if (score > highScore) {
        highScore = score;
        localStorage.setItem("highScore", highScore);
        highScoreElement.innerHTML = "High Score: " + highScore;
    }
}

function resetGame() {
    initGame(); 
}

initGame();

const keys = {
    up: document.getElementById('up'),
    down: document.getElementById('down'),
    left: document.getElementById('left'),
    right: document.getElementById('right')
};

function handleInteraction(buttonDirection) {
    if (buttonDirection === 'up' && direction !== "DOWN") {
        direction = "UP";
    } else if (buttonDirection === 'down' && direction !== "UP") {
        direction = "DOWN";
    } else if (buttonDirection === 'left' && direction !== "RIGHT") {
        direction = "LEFT";
    } else if (buttonDirection === 'right' && direction !== "LEFT") {
        direction = "RIGHT";
    }
}

Object.keys(keys).forEach((key) => {
    keys[key].addEventListener('click', () => handleInteraction(key));
});

document.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowUp' || event.key === 'ArrowDown' || event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
        const direction = event.key.replace('Arrow', '').toLowerCase();
        handleInteraction(direction);
    }
});


//Cursor
const cursor = document.getElementById("cursor");
document.addEventListener("mousemove", (e) => {
    cursor.style.left = `${e.pageX}px`;
    cursor.style.top = `${e.pageY}px`;
});

const hoverElements = document.querySelectorAll('.hover-btn, button, a'); 

hoverElements.forEach(element => {
    element.addEventListener('mouseenter', () => {
        cursor.classList.add('hovered');
    });

    element.addEventListener('mouseleave', () => {
        cursor.classList.remove('hovered');
    });
});

document.addEventListener('click', () => {
    cursor.classList.add('clicked');

    setTimeout(() => {
        cursor.classList.remove('clicked');
    }, 200);
});




