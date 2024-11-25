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


//Word Search
const originalWords = [
    "SHARK", "ANGLERFISH", "OCTOPUS", "CORAL", "TURTLE", "KELP",
    "ZONE", "BIOLUMINESCENCE", "CAMOUFLAGE", "ADAPTATION", "HABITATS", "OCEAN"
];
let words = [...originalWords];

const gridSize = 12;
let grid = Array.from({ length: gridSize }, () => Array(gridSize).fill(''));
const directions = [
    [0, 1], 
    [1, 0]  
];

const gridElement = document.getElementById("grid");
const wordListElement = document.getElementById("wordList");
const restartBtn = document.getElementById("restartBtn");
const hintBtn = document.getElementById("hintBtn");

let selectedCells = [];
let placedWords = [];
let hintUsed = false;
let hintWord = null;

function initializeGrid() {
    grid = Array.from({ length: gridSize }, () => Array(gridSize).fill(''));
    placedWords = [];
    hintUsed = false;
    hintWord = null;
    words = [...originalWords];
    words.forEach(word => placeWord(word));
    for (let row = 0; row < gridSize; row++) {
        for (let col = 0; col < gridSize; col++) {
            if (grid[row][col] === '') {
                grid[row][col] = String.fromCharCode(65 + Math.floor(Math.random() * 26));
            }
        }
    }
    renderGrid();
    renderWordList();
}

function renderGrid() {
    gridElement.innerHTML = '';
    grid.forEach((row, rowIndex) => {
        row.forEach((cell, colIndex) => {
            const cellDiv = document.createElement("div");
            cellDiv.textContent = cell;
            cellDiv.dataset.row = rowIndex;
            cellDiv.dataset.col = colIndex;
            cellDiv.classList.add('grid-cell');
            gridElement.appendChild(cellDiv);
        });
    });
    gridElement.style.gridTemplateColumns = `repeat(${gridSize}, 40px)`;
}

function renderWordList() {
    wordListElement.innerHTML = '';
    originalWords.forEach(word => {
        const listItem = document.createElement("li");
        listItem.textContent = word;
        listItem.classList.add('word-item');
        wordListElement.appendChild(listItem);
    });
}

function placeWord(word) {
    let placed = false;
    const maxAttempts = 100;
    let attempts = 0;
    while (!placed && attempts < maxAttempts) {
        attempts++;
        const direction = directions[Math.floor(Math.random() * directions.length)];
        const rowStart = Math.floor(Math.random() * gridSize);
        const colStart = Math.floor(Math.random() * gridSize);
        let row = rowStart, col = colStart;

        let fits = true;
        for (let i = 0; i < word.length; i++) {
            if (
                row < 0 || row >= gridSize || 
                col < 0 || col >= gridSize || 
                (grid[row][col] !== '' && grid[row][col] !== word[i])
            ) {
                fits = false;
                break;
            }
            row += direction[0];
            col += direction[1];
        }
        if (!fits) continue;
        row = rowStart;
        col = colStart;
        for (let i = 0; i < word.length; i++) {
            grid[row][col] = word[i];
            row += direction[0];
            col += direction[1];
        }
        placedWords.push({ word, startRow: rowStart, startCol: colStart, direction });
        placed = true;
    }
}

gridElement.addEventListener("click", event => {
    const cell = event.target;
    if (!cell.dataset.row || !cell.dataset.col) return;

    cell.classList.toggle("selected");
    const row = +cell.dataset.row;
    const col = +cell.dataset.col;

    const index = selectedCells.findIndex(c => c.row === row && c.col === col);
    if (index > -1) {
        selectedCells.splice(index, 1);
    } else {
        selectedCells.push({ row, col });
    }
    checkSelection();
});

function checkSelection() {
    const selectedWord = selectedCells.map(cell => grid[cell.row][cell.col]).join("");
    const letterCounts = countLetters(selectedWord);
    const matchedWord = words.find(word => {
        const wordCounts = countLetters(word);
        return areCountsEqual(letterCounts, wordCounts);
    });
    if (matchedWord) {
        selectedCells.forEach(cell => {
            const cellDiv = document.querySelector(`[data-row='${cell.row}'][data-col='${cell.col}']`);
            cellDiv.classList.remove("selected", "hint");
            cellDiv.classList.add("found");
        });
        const wordItem = Array.from(wordListElement.children).find(li => li.textContent === matchedWord);
        if (wordItem) {
            wordItem.classList.add("found");
        }
        words.splice(words.indexOf(matchedWord), 1);
        selectedCells = [];
        if (hintWord === matchedWord) hintWord = null;
    }
}

function countLetters(word) {
    return word.split("").reduce((counts, letter) => {
        counts[letter] = (counts[letter] || 0) + 1;
        return counts;
    }, {});
}

function areCountsEqual(count1, count2) {
    const keys1 = Object.keys(count1);
    const keys2 = Object.keys(count2);

    if (keys1.length !== keys2.length) return false;
    for (const key of keys1) {
        if (count1[key] !== count2[key]) return false;
    }
    return true;
}

restartBtn.addEventListener('click', initializeGrid);

hintBtn.addEventListener('click', () => {
    if (hintUsed) return;
    hintUsed = true;

    const wordToHint = placedWords.find(wordObj => words.includes(wordObj.word));
    if (!wordToHint) return;

    const { word, startRow, startCol } = wordToHint;
    hintWord = word; 
    const hintCell = document.querySelector(`[data-row='${startRow}'][data-col='${startCol}']`);
    if (hintCell) {
        hintCell.classList.add("hint"); 
    }
});

initializeGrid();
