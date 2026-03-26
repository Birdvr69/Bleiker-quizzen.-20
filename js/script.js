const quizData = [
    {
        question: "Hvilken avdeling tilbyr opplæring innen Elektro og datateknologi?",
        options: ["Helse- og oppvekstfag", "Elektro og datateknologi", "Idrettsfag", "Salg, service og reiseliv"],
        answer: 1
    },
    {
        question: "Hva kan man studere hvis man vil jobbe med barn- og ungdom?",
        options: ["Kjøretøy", "Barne- og ungdomsarbeiderfag", "Elektro", "Media"],
        answer: 1
    },
    {
        question: "Hvilken avdeling passer best hvis du er interessert i biler og motor?",
        options: ["Elektro", "Helse", "Kjøretøy", "Idrett"],
        answer: 2
    },
    {
        question: "Hvor kan du gå hvis du vil bli personlig trener eller jobbe med sport?",
        options: ["Idrettsfag", "Media", "Salg", "Helse"],
        answer: 0
    },
    {
        question: "Hvilket utdanningsprogram inkluderer medieproduksjon og informasjonsteknologi?",
        options: ["Informasjonsteknologi og medieproduksjon", "Teknologi- og industrifag", "Salg, service og reiseliv", "Bygg- og anleggsteknikk"],
        answer: 0
    },
    {
        question: "Hva fokuserer avdelingen for Salg, service og reiseliv på?",
        options: ["Mekanikk", "Kundebehandling og markedsføring", "Sykepleie", "Programmering"],
        answer: 1
    },
    {
        question: "Hvilken avdeling lærer deg om helsearbeid og pasientbehandling?",
        options: ["Helse- og oppvekstfag", "Idrett", "Salg", "Media"],
        answer: 0
    },
    {
        question: "Se videoen nedenfor (liksom). Hva viser videoen?",
        options: ["En bilmotor som repareres", "En robot som programmeres", "En pasient som får hjelp", "En elev som filmer"],
        answer: 3,
        video: true
    },
    {
        question: "Hva er Bleiker videregående skole kjent for?",
        options: ["Bare studiespesialisering", "Et bredt utvalg yrkesfaglige utdanninger", "Kun idrett", "At den ligger i Oslo"],
        answer: 1
    },
    {
        question: "Hva kan man utdanne seg til innen Teknologi- og industrifag?",
        options: ["Snekker", "Industrimekaniker", "Kokk", "Advokat"],
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
    nextBtn.classList.add('hidden');

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
    highscoreEl.innerHTML = highScores.map(hs => `<li>${hs.name}: ${hs.score} poeng</li>`).join('');
}

if (startBtn) startBtn.addEventListener('click', startQuiz);
if (nextBtn) nextBtn.addEventListener('click', nextQuestion);
