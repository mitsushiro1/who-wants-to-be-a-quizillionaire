var timerEl = document.getElementById('timer');
var mainEl = document.getElementById('main');
var timeLeft = 30;

var questions = [
    {
        text: "Question 1???",
        options: [
            "Q1 option1",
            "Q1 option2",
            "Q1 option3",
            "Q1 option4"
        ],
        correct: "Q1 option1"
    },
    {
        text: "Question 2???",
        options: [
            "Q2 option1",
            "Q2 option2",
            "Q2 option3",
            "Q2 option4"
        ],
        correct: "Q2 option4"
    },
    {
        text: "Question 3???",
        options: [
            "Q3 option1",
            "Q3 option2",
            "Q3 option3",
            "Q3 option4"
        ],
        correct: "Q3 option2"
    }
];

var currentIndex = 0;
var totalScore = 0;
var timeInterval;
var records = [];

var sendMessage = "you lose";
var startEl = document.querySelector('#start-button');
var questionText = document.querySelector("#question-text");
var option1 = document.querySelector("#option-1");
var option2 = document.querySelector("#option-2");
var option3 = document.querySelector("#option-3");
var option4 = document.querySelector("#option-4");
var startContainer = document.querySelector(".start-container");
var questionContainer = document.querySelector(".question-container");
var endContainer = document.querySelector(".end-container");
var endScore = document.querySelector("#end-score");
var saveScoreBtn = document.querySelector("#save-score")
var inputName = document.querySelector("#input-name")

startEl.addEventListener("click", startGame);
option1.addEventListener("click", checkAnswers);
option2.addEventListener("click", checkAnswers);
option3.addEventListener("click", checkAnswers);
option4.addEventListener("click", checkAnswers);
saveScoreBtn.addEventListener("click", saveScore)

function startGame (event){
    startTimer()
    // hide the start container
    startContainer.classList.add("hide");

    // show the question container
    questionContainer.classList.remove("hide");

    displayQuestion();
}

function endGame () {
    clearInterval(timeInterval);

    questionContainer.classList.add("hide");
    endContainer.classList.remove("hide");

    endScore.textContent = "Your score: " + totalScore
}

function displayQuestion () {
   if(currentIndex < questions.length) {
     // change the question text
     questionText.textContent = questions[currentIndex].text;

     // change the option button text
     option1.textContent = questions[currentIndex].options[0];
     option2.textContent = questions[currentIndex].options[1];
     option3.textContent = questions[currentIndex].options[2];
     option4.textContent = questions[currentIndex].options[3];
 
     currentIndex++;
   } else {
     endGame()
   }
}

function checkAnswers (event) {
    // check if correct
    var correctAnswer = questions[currentIndex-1].correct ;
    var userAnswer = event.target.textContent;
    console.log(correctAnswer)
    console.log(userAnswer)

    if(userAnswer == correctAnswer) {
        alert("correct")
        totalScore++;
    } else {
        alert("wrong!")
    }

    displayQuestion();
}

function startTimer () {
    timeInterval = setInterval(function() {
        if(timeLeft>1){
            timerEl.textContent = 'seconds left:' + timeLeft;
            timeLeft--;
        } else if (timeLeft === 1){
        
            timerEl.textcontent = 'second left:';
            timeLeft--;
        } else{
            
            clearInterval(timeInterval);
            // sendMessage();
        }
        
        }, 1000);
}

function saveScore () {
    var data = {
        score: totalScore,
        name: inputName.value
    };

    records.push(data);

    localStorage.setItem("highscores", JSON.stringify(records))
}