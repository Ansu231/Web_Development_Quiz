const Questions = [
    {
        question: "Which country won the World Cup 2018?",
        answers: [
            { text: "Canada", correct: false },
            { text: "India", correct: false },
            { text: "France", correct: true },
            { text: "United States", correct: false },
        ]
    },
    {
        question: " How many players are there on a baseball team?",
        answers: [
            { text: "9 player", correct: true },
            { text: "7 player", correct: false },
            { text: "8 player", correct: false },
            { text: "3 player", correct: false },
        ]
    },
    {
        question: "What sport is considered the “king of sports”?",
        answers: [
            { text: "Gymnastics", correct: false },
            { text: "Cricket ", correct: false },
            { text: "Football", correct: false },
            { text: "Soccer", correct: true },
        ]
    },
    {
        question: " What sport is played with this ball?",
        answers: [
            { text: "Pool", correct: true },
            { text: "Snooker", correct: false },
            { text: "Water polo", correct: false },
            { text: "Lacrosse", correct: false },
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