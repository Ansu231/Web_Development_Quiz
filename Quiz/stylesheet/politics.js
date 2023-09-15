const Questions = [
    {
        question: "The members of the Rajya Sabha are elected by",
        answers: [
            { text: "The People", correct: false },
            { text: "Lok Sabha", correct: false },
            { text: "elected members of the legislative assembly", correct: true },
            { text: "elected members of the legislative council", correct: false },
        ]
    },
    {
        question: "The power to decide an election petition is vested in the",
        answers: [
            { text: "High courts", correct: true },
            { text: "Supreme Court", correct: false },
            { text: "Parliament", correct: false },
            { text: "Election Commission", correct: false },
        ]
    },
    {
        question: "The present Lok Sabha is the",
        answers: [
            { text: "14th Lok Sabha", correct: false },
            { text: "16th Lok Sabha", correct: false },
            { text: "15th Lok Sabha", correct: false },
            { text: "17th Lok Sabha", correct: true },
        ]
    },
    {
        question: "The members of Lok Sabha hold office for a term of",
        answers: [
            { text: "5 years", correct: true },
            { text: "4 years", correct: false },
            { text: "3 years", correct: false },
            { text: "2 years", correct: false },
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