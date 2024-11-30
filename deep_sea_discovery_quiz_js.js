const questions = [
    {
        question: "What Adaption Do Octupi Possess?",
        options: ["Streamlined Shape", "Longer Lives", "Camouflage", "None of these"],
        answer: 2
    },
    {
        question: "What Ocean is the Mariana Trench located in?",
        options: ["Indian", "Atlantic", "Pacific", "Other"],
        answer: 2
    },
    {
        question: "Which form of energy is associated with marine microbial life?",
        options: ["Chemical energy", "Solar Energy", "Geothermal Energy", "Nuclear Energy"],
        answer: 0
    },
    {
        question: "Which is the deepest part of the world's oceans?",
        options: ["The Bermuda Triangle", "Gulf of Mexico", "The Mariana Trench", "The Red Sea"],
        answer: 2
    },
    {
        question: "The Bermuda Triangle is located between which of the following areas?",
        options: [" Hawaii, Mexico, and California", "Puerto Rico, Bermuda, and Miami", "Miami, Panama, and Haiti", "Cuba, Bahamas, and Bermuda"],
        answer: 1
    },
    {
        question: "The Titanic sank after hitting what type of natural structure?",
        options: ["Iceberg", "Underwater Volcano", "Volcano", "Sandbank"],
        answer: 0
    },
    {
        question: "What natural phenomenon is frequently found in the Mariana Trench?",
        options: ["Tsunamis", "Underwater Volcanoes", "Coral Reefs", "Marine Tornadoes"],
        answer: 1
    },
    {
        question: "Which Coral Reef Tends to Encircle Lagoons?",
        options: ["Barrier Reefs", "Ribbon Reef", "Atolls", "Fringing Reefs"],
        answer: 2
    },
    {
        question: "What is the role of marine microbes in the ocean ecosystem?",
        options: ["Consuming oxygen to grow", " Producing oxygen through photosynthesis", "Depleting energy from larger marine animals", "Causing tidal waves"],
        answer: 1
    },
    {
        question: "Which of the following is a possible cause of strange disappearances in the Bermuda Triangle?",
        options: ["Sudden volcanic eruptions", "Underwater cities", "Sharks", "Magnetic anomalies"],
        answer: 3
    }
];

const startQuizButton = document.getElementById("start-quiz");
const quizContainer = document.querySelector(".quiz-container");
const startButtonContainer = document.querySelector(".start-button-container");

startQuizButton.addEventListener('click', () => {
    quizContainer.style.display = "block";
    startButtonContainer.style.display = "none";
    loadQuestion(); 
});

let currentQuestion = 0;
let score = 0;
let timerInterval;
const timerBar = document.getElementById("timer-bar");
const questionElement = document.getElementById("question");
const options = document.querySelectorAll(".option");
const questionNumberElement = document.getElementById("question-number");
const scoreElement = document.getElementById("score");
const resultModal = document.getElementById("result-modal");
const finalScore = document.getElementById("final-score");
const finalPercentage = document.getElementById("final-percentage");
const playAgainButton = document.getElementById("play-again");

function loadQuestion() {
    clearInterval(timerInterval);
    resetOptions();
    const current = questions[currentQuestion];
    questionElement.innerHTML = current.question;
    options.forEach((option, index) => {
        option.innerHTML = current.options[index];
        option.addEventListener('click', checkAnswer);
    });
    questionNumberElement.innerText = `Q ${currentQuestion + 1}/10`;
    startTimer();
}

function startTimer() {
    let width = 100;
    timerInterval = setInterval(() => {
        if (width <= 0) {
            clearInterval(timerInterval);
            revealCorrectAnswer();
            setTimeout(nextQuestion, 2000); 
        } else {
            width--;
            timerBar.style.width = width + "%";
        }
    }, 100); 
}

function checkAnswer(event) {
    clearInterval(timerInterval);
    const selectedOption = event.target;
    const answerIndex = questions[currentQuestion].answer;
    const selectedIndex = parseInt(selectedOption.getAttribute("data-index"));
    if (selectedIndex === answerIndex) {
        selectedOption.classList.add("correct");
        score++;
        scoreElement.innerText = `Score: ${score}`;
    } else {
        selectedOption.classList.add("wrong");
        revealCorrectAnswer();
    }
    disableOptions();
    setTimeout(nextQuestion, 2000); 
}

function revealCorrectAnswer() {
    options.forEach(option => {
        const index = parseInt(option.getAttribute("data-index"));
        if (index === questions[currentQuestion].answer) {
            option.classList.add("correct");
        }
    });
}

function disableOptions() {
    options.forEach(option => {
        option.removeEventListener('click', checkAnswer);
    });
}

function resetOptions() {
    options.forEach(option => {
        option.classList.remove("correct", "wrong");
    });
}

function nextQuestion() {
    currentQuestion++;
    if (currentQuestion < questions.length) {
        loadQuestion();
    } else {
        showResults();
    }
}

function showResults() {
    const percentage = (score / questions.length) * 100;
    finalScore.innerText = `Final Score: ${score}/10`;
    finalPercentage.innerText = `You scored: ${percentage.toFixed(2)}%`;
    resultModal.classList.remove("hidden");
}

playAgainButton.addEventListener('click', () => {
    resultModal.classList.add("hidden");
    currentQuestion = 0;
    score = 0;
    scoreElement.innerText = `Score: ${score}`;
    loadQuestion();
});

loadQuestion();
 

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


