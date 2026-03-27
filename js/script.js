const quizData = [
    {
        // 1. Elektro og datateknologi
        question: "Hva måles i Ohm (Ω)?",
        options: ["Strøm", "Motstand", "Spenning", "Effekt"],
        answer: 1
    },
    {
        // 2. Helse- og oppvekstfag
        question: "Hva er normal kroppstemperatur hos mennesker?",
        options: ["35°C", "37°C", "39°C", "40°C"],
        answer: 1
    },
    {
        // 3. Idrettsfag (Videooppgave)
        question: "Se filmen og svar: Hvilken aktivitet utføres i videoen?",
        options: ["A", "B", "C"],
        answer: 1, // B
        video: true
    },
    {
        // 4. Medier og kommunikasjon
        question: "Hva betyr målgruppe i media?",
        options: ["Hvor reklamen sendes", "Hvem budskapet er laget for", "Hvor videoen spilles inn", "Hvor mange som ser"],
        answer: 1
    },
    {
        // 5. Påbygging til generell studiekompetanse
        question: "Hvilket fagområde studerer samfunn og politikk?",
        options: ["Sosiologi", "Biologi", "Fysikk", "Geografi"],
        answer: 0
    },
    {
        // 6. Salg, service og reiseliv
        question: "Hva er god kundeservice?",
        options: ["Å ignorere kunder", "Å hjelpe kunder på en vennlig og profesjonell måte", "Å selge mest mulig", "Å snakke lite"],
        answer: 1
    },
    {
        // 7. Teknologi- og industrifag
        question: "Hva brukes en dreiebenk til?",
        options: ["Sveising", "Bearbeiding av roterende materialer", "Maling", "Montering"],
        answer: 1
    },
    {
        // 8. Informasjonsteknologi og medieproduksjon
        question: "Hva betyr HTML?",
        options: ["HyperText Markup Language", "HighText Machine Language", "Hyper Transfer Media Link", "Home Tool Markup Language"],
        answer: 0
    },
    {
        // 9. Kombinasjonsklasse
        question: "Hvilket styresett har Norge?",
        options: ["Republikk", "Militærstyre", "Konstitusjonelt monarki", "Diktatur"],
        answer: 2
    },
    {
        // 10. Demokrati og medborgerskap
        question: "Hva regnes som mobbing?",
        options: ["En enkelt krangel mellom venner", "Gjentatt negativ atferd mot en person over tid", "Å være uenig med noen", "Å gi konstruktiv kritikk"],
        answer: 1
    }
];

let currentQuestion = 0;
let score = 0;
let userName = "";

const quizContainer = document.getElementById('quiz-container');
const questionEl = document.getElementById('question');
const optionsEl = document.getElementById('options');
const feedbackEl = document.getElementById('feedback');
const nextBtn = document.getElementById('next-btn');
const scoreEl = document.getElementById('score-display');
const videoEl = document.getElementById('quiz-video');
const setupEl = document.getElementById('quiz-setup');
const gameEl = document.getElementById('quiz-game');
const startBtn = document.getElementById('start-btn');
const nameInput = document.getElementById('user-name');
const finalScoreEl = document.getElementById('final-score');
const resultsEl = document.getElementById('quiz-results');
const highscoreEl = document.getElementById('highscore-list');

function startQuiz() {
    userName = nameInput.value.trim();
    if (userName === "") {
        alert("Vennligst skriv inn navnet ditt");
        return;
    }
    setupEl.classList.add('hidden');
    gameEl.classList.remove('hidden');
    showQuestion();
}

function showQuestion() {
    const q = quizData[currentQuestion];
    questionEl.textContent = q.question;
    optionsEl.innerHTML = '';
    feedbackEl.textContent = '';
    feedbackEl.className = ''; // Reset feedback color
    nextBtn.classList.add('hidden');

    // Handle options grid layout based on number of options
    if (q.options.length === 3) {
        optionsEl.style.gridTemplateColumns = "1fr";
    } else {
        optionsEl.style.gridTemplateColumns = "1fr 1fr";
    }

    if (q.video) {
        videoEl.classList.remove('hidden');
    } else {
        videoEl.classList.add('hidden');
    }

    q.options.forEach((option, index) => {
        const btn = document.createElement('button');
        btn.textContent = option;
        btn.classList.add('option-btn');
        btn.onclick = () => selectOption(index);
        optionsEl.appendChild(btn);
    });
}

function selectOption(index) {
    const q = quizData[currentQuestion];
    const buttons = optionsEl.querySelectorAll('.option-btn');

    buttons.forEach((btn, i) => {
        btn.disabled = true;
        if (i === q.answer) {
            btn.classList.add('correct');
        } else if (i === index) {
            btn.classList.add('wrong');
        }
    });

    if (index === q.answer) {
        score++;
        feedbackEl.textContent = "Riktig!";
        feedbackEl.classList.add('correct-text');
    } else {
        feedbackEl.textContent = "Galt! Riktig svar var: " + q.options[q.answer];
        feedbackEl.classList.add('wrong-text');
    }

    nextBtn.classList.remove('hidden');
    updateScore();
}

function updateScore() {
    scoreEl.textContent = `Poeng: ${score}/${currentQuestion + 1}`;
}

function nextQuestion() {
    currentQuestion++;
    if (currentQuestion < quizData.length) {
        showQuestion();
    } else {
        showResults();
    }
}

function showResults() {
    gameEl.classList.add('hidden');
    resultsEl.classList.remove('hidden');
    finalScoreEl.textContent = `${userName}, du fikk ${score} av ${quizData.length} poeng!`;
    saveHighScore();
    displayHighScores();
}

function saveHighScore() {
    let highScores = JSON.parse(localStorage.getItem('bleikerHighScores')) || [];
    highScores.push({ name: userName, score: score });
    highScores.sort((a, b) => b.score - a.score);
    highScores = highScores.slice(0, 5); // Top 5
    localStorage.setItem('bleikerHighScores', JSON.stringify(highScores));
}

function displayHighScores() {
    const highScores = JSON.parse(localStorage.getItem('bleikerHighScores')) || [];
    highscoreEl.innerHTML = '';
    highScores.forEach(hs => {
        const li = document.createElement('li');
        li.textContent = `${hs.name}: ${hs.score} poeng`;
        highscoreEl.appendChild(li);
    });
}

if (startBtn) startBtn.addEventListener('click', startQuiz);
if (nextBtn) nextBtn.addEventListener('click', nextQuestion);
