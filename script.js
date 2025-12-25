const questions = [
    {
        question: "What does HTML stand for?",
        answers: [
            { text: "Hyper Trainer Marking Language", correct: false },
            { text: "Hyper Text Markup Language", correct: true },
            { text: "High Text Machine Language", correct: false },
            { text: "Hyper Tool Markup Language", correct: false }
        ]
    },
    {
        question: "Which symbol is used to write a single-line comment in JavaScript?",
        answers: [
            { text: "&lt;!-- --&gt;", correct: false },
            { text: "#", correct: false },
            { text: "//", correct: true },
            { text: "/* */", correct: false }
        ]
    },
    {
        question: "Which CSS property is used to change the text color?",
        answers: [
            { text: "background-color", correct: false },
            { text: "font-style", correct: false },
            { text: "color", correct: true },
            { text: "text-align", correct: false }
        ]
    },
    {
        question: "Which keyword is used to declare a variable in JavaScript?",
        answers: [
            { text: "int", correct: false },
            { text: "var", correct: true },
            { text: "string", correct: false },
            { text: "float", correct: false }
        ]
    }

]

const questionElement = document.querySelector("#question");
const answerButtons = document.querySelector("#answer-buttons");
const nextButton = document.querySelector("#next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}
function showQuestion() {
    resetState();
    let currenQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = `${questionNo}. ${currenQuestion.question}`;

    currenQuestion.answers.forEach((answer) => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer)
    });
}
startQuiz();


function resetState() {
    nextButton.style.display = "none";
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
}
function selectAnswer(e) {
    const selectButton = e.target;
    const isCorrect = selectButton.dataset.correct == "true";
    if (isCorrect) {
        selectButton.classList.add("correct");
        score++;
    }
    else {
        selectButton.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if (button.dataset.correct === "true") {
            button.classList.add("correct");
        }
        button.disabled = "true";
    });
    nextButton.style.display = "block";
}
nextButton.addEventListener("click", () => {
    if (currentQuestionIndex < questions.length) {
        handleNextButton();
    }
    else {
        startQuiz();
    }
});
function handleNextButton() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    }
    else {
        showScore();
    }
}
function showScore() {
    resetState();
    questionElement.innerHTML = `You Scored ${score} out of the ${questions.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}