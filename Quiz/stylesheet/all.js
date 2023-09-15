const Questions = [
    {
        question: "What is the only mammal capable of true flight?",
        answers: [
            { text: "Rabbit", correct: false },
            { text: "Horse", correct: false },
            { text: "Bats", correct: true },
            { text: "Deer", correct: false },
        ]
    },
    {
        question: "Which has the thickest fur of any mammal?",
        answers: [
            { text: "Sea otter", correct: true },
            { text: "Sheep", correct: false },
            { text: "Yaks", correct: false },
            { text: "Bear", correct: false },
        ]
    },
    {
        question: "The age of a lion can be determined by it?",
        answers: [
            { text: "Tails", correct: false },
            { text: "Nails", correct: false },
            { text: "Hairs", correct: false },
            { text: "Nose", correct: true },
        ]
    },
    {
        question: "What is the smallest mammal in the world?",
        answers: [
            { text: "Bumblebee bat", correct: true },
            { text: "Etruscan shrew", correct: false },
            { text: "Kitti's hog-nosed bat", correct: false },
            { text: "Mouse lemur", correct: false },
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