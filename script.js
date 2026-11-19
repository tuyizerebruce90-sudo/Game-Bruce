
let level = 1;
let score = 0;
let moves = 0;

let numbers = [1, 2, 3, 4, 5, 6, 7, 8, 0];

const puzzle = document.getElementById("puzzle");
const levelDisplay = document.getElementById("level");
const scoreDisplay = document.getElementById("score");
const movesDisplay = document.getElementById("moves");
const message = document.getElementById("message");

// Kugaragaza imibare
function displayPuzzle() {
    puzzle.innerHTML = "";

    numbers.forEach((number, index) => {
        const button = document.createElement("button");

        button.className = number === 0
            ? "tile empty"
            : "tile";

        button.textContent = number === 0 ? "" : number;

        button.addEventListener("click", () => {
            moveTile(index);
        });

        puzzle.appendChild(button);
    });

    levelDisplay.textContent = level;
    scoreDisplay.textContent = score;
    movesDisplay.textContent = moves;
}

// Gushyira imibare ku murongo
function isSolved() {
    return numbers.every((number, index) =>
        number === (index === 8 ? 0 : index + 1)
    );
}

// Kugenzura niba akazu kari hafi y'ubusa
function moveTile(index) {
    const emptyIndex = numbers.indexOf(0);

    const sameRow =
        Math.floor(index / 3) === Math.floor(emptyIndex / 3);

    const sameColumn =
        index % 3 === emptyIndex % 3;

    const adjacent =
        (sameRow && Math.abs(index - emptyIndex) === 1) ||
        (sameColumn && Math.abs(index - emptyIndex) === 3);

    if (!adjacent) return;

    [numbers[index], numbers[emptyIndex]] =
        [numbers[emptyIndex], numbers[index]];

    moves++;

    if (isSolved()) {
        score += level * 100;

        message.textContent =
            "🎉 Congratulations! Level " + level + " completed!";

        level++;

        setTimeout(() => {
            startLevel();
        }, 1200);

    } else {
        message.textContent = "Keep playing! 🔥";
    }

    displayPuzzle();
}

// Umubare w'inshuro imibare ivangwa
function getShuffleMoves() {
    return Math.min(10 + level * 5, 500);
}

// Kuvanga imibare hakoreshejwe moves zemewe
function shufflePuzzle() {
    let emptyIndex = numbers.indexOf(0);
    let previousIndex = -1;

    let totalMoves = getShuffleMoves();

    for (let i = 0; i < totalMoves; i++) {
        let possible = [];

        const row = Math.floor(emptyIndex / 3);
        const col = emptyIndex % 3;

        if (row > 0) possible.push(emptyIndex - 3);
        if (row < 2) possible.push(emptyIndex + 3);
        if (col > 0) possible.push(emptyIndex - 1);
        if (col < 2) possible.push(emptyIndex + 1);

        let choices = possible.filter(
            index => index !== previousIndex
        );

        if (choices.length === 0) choices = possible;

        const randomIndex =
            choices[Math.floor(Math.random() * choices.length)];

        [numbers[emptyIndex], numbers[randomIndex]] =
            [numbers[randomIndex], numbers[emptyIndex]];

        previousIndex = emptyIndex;
        emptyIndex = randomIndex;
    }

    if (isSolved()) {
        shufflePuzzle();
        return;
    }

    moves = 0;
    message.textContent = "Arrange the numbers! 🎯";
    displayPuzzle();
}

// Gutangira Level
function startLevel() {
    shufflePuzzle();

    message.textContent =
        "🔥 Welcome to Level " + level;
}

// Restart
function resetGame() {
    level = 1;
    score = 0;
    moves = 0;

    numbers = [1, 2, 3, 4, 5, 6, 7, 8, 0];

    message.textContent = "New Game Started!";

    startLevel();
}

// Gutangira umukino
displayPuzzle();
shufflePuzzle();


// BACKGROUND MUSIC

const backgroundMusic =
    document.getElementById("backgroundMusic");

const musicBtn =
    document.getElementById("musicBtn");

let musicOn = true;

function toggleMusic() {

    if (musicOn) {
        backgroundMusic.pause();
        musicBtn.textContent = "🔇 Music OFF";
        musicOn = false;
    } else {
        backgroundMusic.play();
        musicBtn.textContent = "🎵 Music ON";
        musicOn = true;
    }
}

// Music izatangira nyuma yo gukanda kuri game
document.addEventListener("click", function startMusic() {
    if (musicOn) {
        backgroundMusic.play().catch(() => {});
    }

    document.removeEventListener("click", startMusic);
});
