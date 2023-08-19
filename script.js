let timeleft = document.querySelector(".time-left");
let quizContainer = document.getElementById("container");
let nextBtn = document.getElementById("next-button");
let countOfQuestion = document.querySelector(".number-of-question");
let displayContainer = document.getElementById("display-container");
let scoreContainer = document.querySelector(".score-container");
let restart = document.getElementById("restart");
let userScore = document.getElementById("user-score");
let startScreen = document.querySelector(".start-screen");
let startButton = document.getElementById("start-button");
let newButton = document.getElementById("new");
let elementos = document.getElementById("categorias");
let questionCount;
let scoreCount = 0;
let count = 21;
let countdown;
let quizArray = null;
let value = elementos.options[elementos.selectedIndex].value;

restart.addEventListener("click", () => {
    initial();
    displayContainer.classList.remove("hide");
    scoreContainer.classList.add("hide");
});

newButton.addEventListener("click", () => {
    startScreen.classList.remove("hide");
    displayContainer.classList.add("hide");
    scoreContainer.classList.add("hide");
});

nextBtn.addEventListener("click", (displayNext = ()=> {
    //incrementa contador
    questionCount += 1;
    if(questionCount == quizArray.length){
        displayContainer.classList.add("hide");
        scoreContainer.classList.remove("hide");

        userScore.innerHTML = "Sua pontuação foi de " + scoreCount + " de " + questionCount;
        
    }else{
        countOfQuestion.innerHTML = questionCount + 1 + " de " + quizArray.length + " questões";
        quizDisplay(questionCount);
        count = 21;
        clearInterval(countdown);
        timerDisplay();
    }
}));

//timer
const timerDisplay = () =>{
    countdown = setInterval(() => {
        count--;
        timeleft.innerHTML = `${count}s`;
        if(count == 0){
            clearInterval(countdown);
            displayNext();
        }
    }, 1000);
}

//Display
const quizDisplay = (questionCount) =>
{
    let quizCards = document.querySelectorAll(".container-mid");
    //esconde outros cards
    quizCards.forEach((card) => {
        card.classList.add("hide");
    });
    //display pergunta atual
    quizCards[questionCount].classList.remove("hide");
}


function quizCreator(){
    //perguntas aleatorias
    quizArray.sort(() => Math.random() - 0.5);

    for( let i of quizArray){
        //embaralha opções
        i.options.sort(() => Math.random() - 0.5);
        //criação de card de pergunta
        let div = document.createElement("div");
        div.classList.add("container-mid", "hide");
        //num da questão
        countOfQuestion.innerHTML = 1 + " de " + quizArray.length + " perguntas";
        //perguntas
        let question_DIV = document.createElement('p');
        question_DIV.classList.add("question");
        question_DIV.innerHTML = i.question;
        div.appendChild(question_DIV);
        //opt
        div.innerHTML += `<button class="option-div" onclick="checker(this)">${i.options[0]}</button>
        <button class="option-div" onclick="checker(this)">${i.options[1]}</button>
        <button class="option-div" onclick="checker(this)">${i.options[2]}</button>
        <button class="option-div" onclick="checker(this)">${i.options[3]}</button>`;
        
        quizContainer.appendChild(div);
    }
}

function checker(userOption) {
    let userSolution = userOption.innerText;
    let question = document.getElementsByClassName("container-mid")[questionCount];
    let options = question.querySelectorAll(".option-div");

    if(userSolution === quizArray[questionCount].correct)
    {
        userOption.classList.add("correct");
        scoreCount++;
    }
    else {
        userOption.classList.add("incorrect");
        //marca opt certa
        options.forEach((element) => {
            if(element.innerText === quizArray[questionCount].correct){
                element.classList.add("correct");
            }
        });
    }
    //para o timer
    clearInterval(countdown);
    //desabilita opçoes
    options.forEach((element) => {
        element.disabled = true;
    });
}



function initial(){
    quizContainer.innerHTML = "";
    questionCount = 0;
    scoreCount = 0;
    count = 21;
    clearInterval(countdown);
    timerDisplay();
    quizCreator();
    quizDisplay(questionCount);
}

startButton.addEventListener("click", () => {

    startScreen.classList.add("hide");
    displayContainer.classList.remove("hide");
    initial();
});

window.onload = () => {
    startButton.disabled = true;
    startScreen.classList.remove("hide");
    displayContainer.classList.add("hide");
}

const tadQuiz = [
    {
        id: "0",
        question: "As operações push (inserir no topo), pop (retirar do topo) e top (observar o topo) são utilizadas em estruturas de dados do tipo:",
        options: ["Pilha", "fila", "Tabelas Hash", "Filas de prioridade"], 
        correct: "Pilha"
    },
    {
        id: "1", 
        question: "Um software de ordenação utiliza uma estrutura de dados na qual sempre se adicionam itens no fim e remove-se do início. Esse tipo de estrutura também é conhecido como:", 
        options: ["fila", "pilha", "arvore binária", "lista duplamente encadeada"], 
        correct: "fila"
    },
    {
        id: "2", 
        question: "Júlio está desenvolvendo uma aplicação e precisa implementar um mecanismo de desfazer/refazer de um editor de texto utilizando o algoritmo LIFO (Last In, First Out).Para implementar o algoritmo LIFO, Júlio deve usar a estrutura de dados:", 
        options: ["Pilha", "Fila", "Árvore", "Tabela Hash"], 
        correct: "Pilha"
    }];

const ordenaçãoQuiz = [
    {
        id: "0", 
        question: "Métodos de ordenação são algoritmos usados para organizar elementos de uma sequência em uma ordem específica. Qual método de ordenação tem complexidade de tempo médio O(n log n) e utiliza a técnica de dividir e conquistar?", 
        options: ["Merge sort", "Selection sort", "Insertion sort", "Bubble sort"], 
        correct: "Merge sort"
    },
    {
        id: "1", 
        question: "Sobre os algoritmos para ordenação de dados, é correto afirmar que o:", 
        options: ["heapsort é considerado um algoritmo estável, fundamentado na estratégia de divisão e conquista", 
        "mergesort é considerado um algoritmo instável, apresentando uma complexidade de O(n²) comparações no melhor caso", 
        "bubblesort é considerado um algoritmo estável, apresentando uma complexidade de O(n²) comparações no pior caso", 
        "insertion sort é considerado um algoritmo instável, apresentando uma complexidade de O(n) comparações no pior caso"], 
        correct: "bubblesort é considerado um algoritmo estável, apresentando uma complexidade de O(n²) comparações no pior caso"
    },
    {
        id: "2", 
        question: "Algoritmos de ordenação são responsáveis por ordenar elementos de uma estrutura de dados de forma completa ou parcial. Sobre a complexidade dos algoritmos de ordenação, assinale, a seguir, o algoritmo de ordenação que, no pior caso, tem complexidade igual a O(n log n)", 
        options: ["Merge sort", "Quick sort", "Bubble sort", "Insertion sort"], 
        correct: "Merge sort"
    },
    {
        id: "3", 
        question: "aa", 
        options: ["a", "b", "c", "d"], 
        correct: "a"
    }
];

function update(){
    value = elementos.options[elementos.selectedIndex].value;
    if(value != "Default"){
        startButton.disabled = false;
    }
    else{
        startButton.disabled = true;
    }
    switch(value){
        case "TAD":
            quizArray = tadQuiz;
            break;
        case "Ordenação":
            quizArray = ordenaçãoQuiz;
            break;
    }
}