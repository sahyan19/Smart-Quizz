// insertion des quiz avec les réponses
const questions = [
    {
        question : "Symbole chimique de l'hydrogène :",
        answers : [
            {text : "H", correct : true},
            {text : "O", correct : false},
            {text : "Br", correct : false},
            {text : "Ar", correct : false},
        ]
    },
    {
        question : "Quelle est la capacité de stockage maximale d'un disque dur de 2,5 pouces ? : ",
        answers : [
            {text : "500 Go", correct : false},
            {text : "1 To", correct : false},
            {text : "2 To", correct : false},
            {text : "4 To", correct : true},
        ]
    },
    {
        question : "Quelle est la première version du langage de programmation Python ? : ",
        answers : [
            {text : "Python 1.0", correct : false},
            {text : "Python 0.9", correct : true},
            {text : " Python 2.0", correct : false},
            {text : " Python 2.0", correct : false},
        ]
    },
    {
        question : "Quel est le nom du système d'exploitation développé par Microsoft ? : ",
        answers : [
            {text : "Linux", correct : false},
            {text : "Windows", correct : true},
            {text : "macOS", correct : false},
            {text : "Android", correct : false},
        ]
    },
    {
        question : "Quel est le nom du langage de programmation créé par Guido van Rossum ? : ",
        answers : [
            {text : "Java", correct : false},
            {text : " Python", correct : true},
            {text : "C#", correct : false},
            {text : "Ruby", correct : false},
        ]
    },
    {
        question : "Quelle est la formule chimique de l'eau ? : ",
        answers : [
            {text : "H2O", correct : true},
            {text : "O2", correct : false},
            {text : "CO2", correct : false},
            {text : "H2O2", correct : false},
        ]
    },
    {
        question : "Quelle est la structure moléculaire de l'eau ? : ",
        answers : [
            {text : "Linéaire", correct : false},
            {text : "Ramifiée", correct : false},
            {text : "Tétraédrique", correct : true},
            {text : "Cyclique", correct : false},
        ]
    },
    {
        question : "Quel est le nom du processus par lequel les plantes convertissent la lumière solaire en énergie ? : ",
        answers : [
            {text : "Photosynthèse", correct : true},
            {text : "Transpiration", correct : false},
            {text : "Respiration", correct : false},
            {text : "Fermentation", correct : false},
        ]
    },
];

// déclaration de variable à partir de l' id donné au questions, réponses et le boutton Next
const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");
const lifeContenair = document.getElementById("life");
const container = document.querySelector('#container')

// initialisation du score et de la réponse
let currentQuestionIndex = 0;
let score = 0;
let vie = 3;
let life = document.getElementById("life");


const drawHeart = (numberHeart) => {
    life.innerHTML = "";
    const heartHtml =  `<img src="../img/life.png" alt="vie">`;
    for (let i=0; i < numberHeart; i++)
        life.innerHTML += heartHtml;
}

drawHeart(vie);

// fonction de démmarage du quizz
function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

// Affichage des questions récupperrer dans la liste de question réponse
function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;  // numerotation de la question
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;   // injection de la question dans le champ correspondant

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text; // j'injecte les 4 réponses dans les champs correspondantes
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}


function resetState(){
    nextButton.style.display = "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");   // mowglette : gestion du background correct (atao verre ohatra)
        score++;
    }else{
        selectedBtn.classList.add("incorrect"); // et aussi la gestion du background incorrect (atao rouge ohatra)
        vie--;
    }
    drawHeart(vie);
    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true; 
    });
    nextButton.style.display = "block";
}


function showScore(){
    resetState();
    questionElement.innerHTML = `
    <style>
    .score
    {
        background-image: url(../img/background_pic.jpeg);
        border: 5px;
        background-color: aliceblue;
        color: white;
        text-align: center;
    }
    </style>
    <div class="score">
        <div>
            <img src="../img/success.png" alt=" ">
        </div>
        <div>
            <img src="../img/cup3.jpg" alt=" " class="cup">
        </div>
    </div>`;
    nextButton.innerHTML = 
    `<div>
        <div>Score : ${score} / ${questions.length}</div>
        <a href="./corps.html">Play again </a>
    </div>`;
    nextButton.style.display = "block";
}



function handleNexButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }else{
        showScore();
    }
}




nextButton.addEventListener("click", ()=> {
    if(currentQuestionIndex < questions.length){
        handleNexButton();
    }else{
        startQuiz();
    }
    document.querySelectorAll('.btn').forEach(elt=>{
        if (vie === 1){
            elt.addEventListener('click', () =>{
                container.innerHTML = `
                
                    <section class="font">
                        <div class="content">
                            <h1>game over</h1>
                            <div class="image">
                                <img src="../img/sad_emoji.png" alt="sad_emoji">
                            </div>
                            <div>
                                <ul>
                                    <li><a href="./corps.html" class="button_1">Rejouer</a></li>
                                    <li><a href="./index.html" class="button_2">Menu principale</a></li>
                                </ul>
                            </div>
                        </div>
                    </section>
                `
            })  
        }
    })
    
});


startQuiz();
