const Questions = [
    {
        question: " What ocean is the largest and deepest?",
        answers: [
            { text: "Atlantic", correct: false },
            { text: "Indian", correct: false },
            { text: "Pacific", correct: true },
            { text: "Arctic", correct: false },
        ]
    },
    {
        question: "What is the largest desert in the world?",
        answers: [
            { text: "Sahara desert", correct: true },
            { text: "Arabian Desert", correct: false },
            { text: "Atacama Desert", correct: false },
            { text: "Gobi Desert", correct: false },
        ]
    },
    {
        question: " What is the largest continent by land area?",
        answers: [
            { text: "Europe", correct: false },
            { text: "North America", correct: false },
            { text: "Africa", correct: false },
            { text: "Asia", correct: true },
        ]
    },
    {
        question: "What is the highest point on Earth?",
        answers: [
            { text: "Mount Everest", correct: true },
            { text: "Manaslu", correct: false },
            { text: "Dhaulagiri", correct: false },
            { text: "K2", correct: false },
        ]
    },

];
const questionElement = document.getElementById("Question");
const answerButton = document.getElementById("answer-btn");
const nextbtn = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextbtn.innerHTML = "Next";
    showQuestion();
}
function showQuestion() {
    resetState();
    let currentQuestion = Questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + "." + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");//create element button
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButton.appendChild(button);
        if(answer.correct){
            button.dataset.correct=answer.correct;
        }
        button.addEventListener("click",selectAnswer);
    });
}
function resetState(){
    nextbtn.style.display ="none";
    while(answerButton.firstChild){
        answerButton.removeChild(answerButton.firstChild);
    }
}
function selectAnswer(e){
    const selectedBtn =e.target;
    const iscorrect =selectedBtn.dataset.correct==="true";
    if(iscorrect){
        selectedBtn.classList.add("correct");
        score++;
    }
    else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButton.children).forEach(button=>{
        if(button.dataset.correct ==="true"){
            button.classList.add("correct");
        }
        button.disabled =true;
    });
    nextbtn.style.display ="block";
}


function showScore() {
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${Questions.length}!`;
    nextbtn.innerHTML = "Play Again";
    nextbtn.style.display = "block";
}


function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < Questions.length){
        showQuestion();
    }
    else{
        showScore();
    }
}
nextbtn.addEventListener("click",()=>{
    if(currentQuestionIndex < Questions.length){
       handleNextButton();

    }
    else{
        startQuiz();
    }
});
startQuiz();