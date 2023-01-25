var timerEl = document.getElementById('timer');
var mainEl = document.getElementById('main');
var timeLeft = 30;

var questions = [
    {
        text: "How many provinces and territories are there in Canada?",
        options: [
            "19",
            "11",
            "13",
            "15"
        ],
        correct: "13"
    },
    {
        text: "What is the capital city of Canada?",
        options: [
            "New York",
            "Toronto",
            "Vancouver",
            "Ottawa"
        ],
        correct: "Ottawa"
    },
    {
        text: "What is the capital of Yukon?",
        options: [
            "Yellowknife",
            "Whitehorse",
            "Iqualuit",
            "Bluepenguin"
        ],
        correct: "Whitehorse"
    },
    {
        text: "How many great lakes are there in Ontario?",
        options: [
            "5",
            "6",
            "7",
            "8"
        ],
        correct: "5"
    },
    {
        text: "What is the oldest company in Canada?",
        options: [
            "Canada Goose",
            "Tim Hortons",
            "MEC",
            "Hudson's Bay Company"
        ],
        correct: "Hudson's Bay Company"
    },
    {
        text: "How many time zones does Canada have?",
        options: [
            "4",
            "5",
            "6",
            "7"
        ],
        correct: "6"
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
var seeScore = document.querySelector("#scoresList")

startEl.addEventListener("click", startGame);
option1.addEventListener("click", checkAnswers);
option2.addEventListener("click", checkAnswers);
option3.addEventListener("click", checkAnswers);
option4.addEventListener("click", checkAnswers);
saveScoreBtn.addEventListener("click", saveScore);

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
    saveScore();
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
            
        }
        
        }, 1000);
}

function saveScore () {
    var data = {
        score: totalScore,
        name: inputName.value
    };

    records.push(data);

    localStorage.setItem("highscores", JSON.stringify(records));
    
    showScore();
};
function showScore() {
    var highScores = JSON.parse(localStorage.getItem("highscores")) || [];
    if (highScores !== null) {
        for(var i = 0; i<highScores.length; i++){
           document.getElementById("score").innerHTML = highScores[0].score;
           document.getElementById("name").innerHTML = highScores[0].inputName;
        } 
    } else {
        return;
    }
};