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
let count = 31;
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
        count = 31;
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
    count = 31;
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
        options: ["Pilha",
        "Fila", 
        "Tabelas Hash", 
        "Filas de prioridade"], 
        correct: "Pilha"
    },
    {
        id: "1", 
        question: "Um software de ordenação utiliza uma estrutura de dados na qual sempre se adicionam itens no fim e remove-se do início. Esse tipo de estrutura também é conhecido como:", 
        options: ["Fila",
        "Pilha",
        "Arvore binária",
        "Lista duplamente encadeada"], 
        correct: "Fila"
    },
    {
        id: "2", 
        question: "Para implementar um algoritmo LIFO (Last in, First Out), qual estrutura de dados deve ser utilizada?", 
        options: ["Pilha", 
        "Fila", 
        "Árvore", 
        "Tabela Hash"], 
        correct: "Pilha"
    },
    {
        id: "3",
        question: "Considere uma pilha que implementa um algoritmo para verificar se uma sequência de caracteres contém parênteses balanceados. Assinale a alternativa que apresenta o funcionamento desse algoritmo.",
        options: ["A pilha armazena apenas parênteses abertos e fecha parênteses quando os encontra",
        "A pilha armazena apenas parênteses fechados e os remove ao encontrar parênteses abertos",
        "A pilha armazena apenas parênteses abertos e os remove ao encontrar parênteses correspondentes fechados",
        "A pilha armazena todos os parênteses e remove-os apenas após percorrer toda a sequência"],
        correct: "A pilha armazena apenas parênteses abertos e os remove ao encontrar parênteses correspondentes fechados"
    },
    {
        id: "4",
        question: "Sobre Filas e Pilhas:<br>I - Filas e Pilhas são tipos abstrato de dados.<br>II - Nas filas, geralmente, todos os acessos são feitos em apenas um extremo.<br>III - Nas pilhas os primeiros elementos incluídos são os primeiros retirados.",
        options: ["Apenas I e II estão corretas",
        "Todas as opções estão corretas",
        "Apenas I e III estão corretas",
        "Apenas II e III estão corretas"],
        correct: "Apenas I e II estão corretas"
    },
    {
        id: "5",
        question: "A estrutura de dados em que o primeiro elemento a ser inserido também será o primeiro a ser removido, o que é conhecido como FIFO (first in, first out), é chamada de: ",
        options: ["Pilha",
        "Fila",
        "Vetor",
        "Lista ligada"],
        correct: "Fila"
    },
    {
        id: "6",
        question: "Sobre as estruturas de dados, considere as afirmativas a seguir:<br>I - Uma Pilha pode ser implementada com FIFO (first-in, first-out).<br>II - Uma Pilha pode ser implementada com uma Lista Ligada.<br>III - O topo de uma Pilha é o elemento mais antigo inserido.",
        options: ["Apenas I",
        "Apenas I e II",
        "Apenas II e III",
        "Apenas II"],
        correct: "Apenas II"
    },
    {
        id: "7",
        question: "As estruturas de dados são usadas para armazenar dados de uma forma organizada. Sobre elas, é correto afirmar que:",
        options: ["As filas usam a lógica FIFO, um acrônimo para \“First Information, First Operation\”",
        "Uma operação append (enfileirar) insere um elemento ao final da fila",
        "As pilhas usam a lógica LIFO, um acrônimo para \“Last In, First Out\”",
        "Uma operação enqueue (empilhar) insere um elemento no topo da pilha"],
        correct: "As pilhas usam a lógica LIFO, um acrônimo para \“Last In, First Out\”"
    },
    {
        id: "8",
        question: "Listas encadeadas constituem estruturas de dados muito úteis na concepção de algoritmos e simulações. O atendimento de um caixa de banco, por exemplo, é simulado por uma lista do tipo:",
        options: ["Circular",
        "FIFO",
        "LIFO",
        "FILO"],
        correct: "FIFO"
    },
    {
        id: "9",
        question: "Com relação aos conceitos de pilha e fila, qual a alternativa correta?",
        options: ["A estrutura denominada pilha é considerada do tipo FIFO",
        "Tanto na pilha quanto na fila, a inserção e a remoção ocorrem da mesma forma",
        "Na fila, o primeiro elemento inserido será o primeiro a ser removido",
        "Na fila, o primeiro elemento inserido será o último a ser removido"],
        correct: "Na fila, o primeiro elemento inserido será o primeiro a ser removido"
    },
    {
        id: "10",
        question: "Assinale as operações características de uma estrutura de dados do tipo pilha:",
        options: ["IMPORT, EXPORT",
        "INPUT, OUPUT",
        "INSERT, REMOVE",
        "PUSH, POP"],
        correct: "PUSH, POP"
    },
    {
        id: "11",
        question: "Em um sistema operacional, a estrutura de dados utilizada para organizar chamadas de funções recursivas por meio da inserção ou remoção de elementos via operações como push e pop é denominada:",
        options: ["Fila",
        "Pilha",
        "Lista Encadeada",
        "Hash"],
        correct: "Pilha"
    },
    {
        id: "12",
        question: "Dado a seguinte sequencia de operações:<br>Push(5), Push(2), Push(3), Pop(), Push(8), Pop(), Push(1), Pop(), Pop()<br>Qual será o elemento no topo da pilha?",
        options: ["5",
        "2",
        "3",
        "1"],
        correct: "5"
    },
    {
        id: "13",
        question: "Sobre Filas e Pilhas, qual a alternativa INCORRETA?",
        options: ["Em uma pilha, é implementada uma política LIFO (last-in, first-out)",
        "Em uma fila, é implementada uma política FIFO (first-in, first-out)",
        "O atributo topo de uma pilha indexa o elemento mais recentemente inserido",
        "Ao tentar extrair algo de uma pilha vazia, acontece um erro de Stack Overflow"],
        correct: "Ao tentar extrair algo de uma pilha vazia, acontece um erro de Stack Overflow"
    },
    {
        id: "14",
        question: "Qual a alternativa que apresenta uma característica da estrutura de dados Pilha INCORRETA?",
        options: ["As inserções e retiradas de itens ocorrem em apenas um extremo da lista",
        "O último elemento incluído é o primeiro que pode ser retirado",
        "Ocorre em estruturas de natureza recursiva",
        "Utiliza a política de remoção e inserção FIFO"],
        correct: "Utiliza a política de remoção e inserção FIFO"
    },
];
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
        question: "Algoritmos de ordenação são responsáveis por ordenar elementos de uma estrutura de dados de forma completa ou parcial. Sobre a complexidade dos algoritmos de ordenação, assinale, a seguir, o algoritmo de ordenação que, no pior caso, tem complexidade igual a O(n log n):", 
        options: ["Merge sort", "Quick sort", "Bubble sort", "Insertion sort"], 
        correct: "Merge sort"
    },
    {
        id: "3", 
        question: "Quais são os algoritmos de ordenação de complexidade O(n²)?", 
        options: ["Quick Sort e Merge Sort",
        "Bubble Sort e Insertion Sort",
        "Selection Sort e Heap Sort",  
        "Merge Sort e Selection Sort"], 
        correct: "Bubble Sort e Insertion Sort"
    },
    {
        id: "4", 
        question: "Qual algoritmo de ordenação é conhecido por sua eficiência em arrays parcialmente ordenados?", 
        options: ["Bubble Sort",
        "Insertion Sort",
        "Quick Sort",  
        "Merge Sort"], 
        correct: "Insertion Sort"
    },
    {
        id: "5", 
        question: "O que é um algoritmo de ordenação estável?", 
        options: ["Um algoritmo que não muda a ordem dos elementos",
        "Um algoritmo que mantém a ordem relativa de elementos com chaves iguais",
        "Um algoritmo que nunca tem um desempenho ruim",  
        "Um algoritmo que ordena os elementos em uma lista circular"], 
        correct: "Um algoritmo que mantém a ordem relativa de elementos com chaves iguais"
    },
    {
        id: "6", 
        question: "Qual é a principal ideia por trás do algoritmo Bubble Sort?", 
        options: ["Dividir a lista em duas partes e ordená-las separadamente",
        "Trocar os elementos adjacentes fora de ordem",
        "Escolher o menor elemento e colocá-lo no início",  
        "Dividir a lista ao meio e ordenar cada metade"], 
        correct: "Trocar os elementos adjacentes fora de ordem"
    },
    {
        id: "7", 
        question: "Qual é a principal vantagem do algoritmo Quick Sort em relação a outros algoritmos de ordenação?", 
        options: ["Sua simplicidade",
        "Sua estabilidade",
        "Seu desempenho médio geralmente é melhor",  
        "Sua capacidade de ordenar listas circulares"], 
        correct: "Seu desempenho médio geralmente é melhor"
    },
    {
        id: "8", 
        question: "Qual das seguintes afirmações sobre o algoritmo Merge Sort está correta?", 
        options: ["O Merge Sort é um algoritmo de ordenação com pior caso O(n²)",
        "O Merge Sort utiliza a estratégia dividir para conquistar",
        "O Merge Sort é mais eficiente em ordenar pequenos conjuntos de dados do que em ordenar grandes conjuntos",  
        "O Merge Sort tem melhor desempenho quando os dados estão quase totalmente ordenados"], 
        correct: "O Merge Sort utiliza a estratégia dividir para conquistar"
    },
    {
        id: "9", 
        question: "Qual dos seguintes algoritmos de ordenação é conhecido por ser estável e eficiente, mas requer um espaço adicional para armazenar um array auxiliar durante sua execução?", 
        options: ["Insertion Sort",
        "Merge Sort",
        "Bubble Sortc",  
        "QuickSort"], 
        correct: "Merge Sort"
    },
    {
        id: "10", 
        question: "Qual algoritmo de ordenação é conhecido por ter uma complexidade média de tempo de O(n log n) e, frequentemente, superar outros algoritmos de ordenação em cenários práticos?", 
        options: ["Bubble Sort",
        "QuickSort",
        "Selection Sort",  
        "Insertion Sort"], 
        correct: "QuickSort"
    },
    {
        id: "11", 
        question: "Qual das seguintes afirmações é verdadeira em relação ao algoritmo HeapSort?", 
        options: ["O HeapSort possui complexidade de tempo O(n²) no melhor caso.",
        "O HeapSort é um algoritmo de ordenação estável",
        "O HeapSort é eficiente para ordenar listas de tamanho pequeno",  
        "O HeapSort utiliza uma estrutura de dados chamada \"árvore binária de busca\""], 
        correct: "O HeapSort é eficiente para ordenar listas de tamanho pequeno"
    },
    {
        id: "12", 
        question: "Qual algoritmo de ordenação que, no pior caso, tem complexidade igual a O(n log n)?", 
        options: ["Quick sort",
        "Merge sort",
        "Insertion sort",  
        "Selection sort"], 
        correct: "Merge sort"
    },
    {
        id: "13", 
        question: "Na ordenação por seleção, é necessário permutar o vetor. Para esse caso, o significado de \"permutar\" é :", 
        options: ["substituir o vetor por chaves de ordenação",
        "Rearranjar os elementos do vetor",
        "Alterar os valores de um vetor A depois de ordenado em um vetor B",  
        "Alternar os valores de um vetor A com um vetor B"], 
        correct: "Rearranjar os elementos do vetor"
    },
    {
        id: "14", 
        question: "O método de ordenação caracterizado por ser o mais simples, cuja ideia é percorrer o vetor (ou array) diversas vezes, e a cada passagem fazer flutuar para o topo o maior elemento da sequência, é o método:", 
        options: ["Bubble Sort",
        "Merge Sort",
        "Heap Sort",  
        "Selection Sort"], 
        correct: "Bubble Sort"
    },
];
const recQuiz = [
    {
        id: "0", 
        question: "O que é recursividade em programação?", 
        options: ["Uma estrutura de dados linear",
         "Uma técnica para criar loops em algoritmos", 
         "Uma função que chama a si mesma", 
         "Um tipo de variável global"], 
        correct: "Uma função que chama a si mesma"
    },
    {
        id: "1", 
        question: "O que é um \"caso base\" em uma função recursiva?", 
        options: ["Um caso difícil de resolver", 
        "O primeiro passo em uma função recursiva", 
        "Um caso que não requer recursão", 
        "Um caso de teste"], 
        correct: "Um caso que não requer recursão"
    },
    {
        id: "2", 
        question: "Em qual situação pode ocorrer um \"stack overflow\" ao usar recursividade?", 
        options: ["Quando a função recursiva nunca é chamada",
         "Quando a função recursiva não tem um caso base", 
         "Quando a função recursiva atinge o caso base", 
         "Quando a função recursiva retorna um valor incorreto"], 
        correct: "Quando a função recursiva não tem um caso base"
    },
    {
        id: "3", 
        question: "Qual é a principal diferença entre uma função recursiva e uma função iterativa?", 
        options: ["Funções recursivas não podem chamar outras funções.", 
        "Funções iterativas usam mais memória",
        "Funções recursivas chamam a si mesmas",
        "Funções iterativas não podem ser otimizadas"], 
        correct: "Funções recursivas chamam a si mesmas"
    },
    {
        id: "4", 
        question: "Qual é uma aplicação prática comum da recursividade em programação?", 
        options: ["Operações matriciais", 
        "Processamento de imagens", 
        "Cálculos financeiros", 
        "Resolução de problemas de busca"], 
        correct: "Resolução de problemas de busca"
    },
    {
        id: "5", 
        question: "Um problema de algoritmo em uma estrutura recursiva demostra que:", 
        options: ["Cada instância do problema contém uma instância menor do mesmo problema", 
        "Toda instância do problema contém uma instância maior do mesmo problema", 
        "Cada instância do problema contém uma instância maior de outro problema", 
        "Cada instância do problema contém uma instância menor de outro problema"], 
        correct: "Cada instância do problema contém uma instância menor do mesmo problema"
    },
    {
        id: "6", 
        question: "A respeito de um algoritmo recursivo, analise as afirmativas abaixo e assinale a alternativa correta.<br>I. Deve conter pelo menos uma estrutura de repetição.<br>II. Deve conter pelo menos uma estrutura de seleção.<br>III. Deve invocar a si mesmo pelo menos uma vez ao ser executado", 
        options: ["Todas as afirmativas estão corretas", 
        "Somente a afirmativa II está correta", 
        "Somente as afirmativas I e II estão corretas", 
        "Somente as afirmativas II e III estão corretas"], 
        correct: "Somente as afirmativas II e III estão corretas"
    },
    {
        id: "7", 
        question: "Um método que, para ser aplicado a uma estrutura, envolve a aplicação dele mesmo às subestruturas componentes, é chamado de:", 
        options: ["Autorrelacionamento", 
        "Descritor", 
        "Ponteiro", 
        "Recursividade"], 
        correct: "Recursividade"
    },
    {
        id: "8", 
        question: "A recursividade na programação de computadores envolve a definição de uma função que:", 
        options: ["apresenta outra função como resultado", 
        "pode chamar a si mesma", 
        "aponta para uma variável", 
        "chama uma outra função"], 
        correct: "pode chamar a si mesma"
    },
    {
        id: "9", 
        question: "Qual é a principal desvantagem da recursão em comparação com a iteração?", 
        options: ["A recursão nunca pode ser usada para resolver problemas complexos", 
        "Nenhuma", 
        "A recursão é mais difícil de implementar do que a iteração", 
        "A recursão pode levar a um consumo excessivo de memória devido à pilha de chamadas"], 
        correct: "A recursão pode levar a um consumo excessivo de memória devido à pilha de chamadas"
    },
    {
        id: "10", 
        question: "Qual dos seguintes é um exemplo clássico de problema que pode ser resolvido de maneira eficiente usando recursão?", 
        options: ["Cálculo de raízes quadradas", 
        "Ordenação de uma lista de números", 
        "Busca binária em um array ordenado", 
        "Adição de números inteiros"], 
        correct: "Busca binária em um array ordenado"
    },
    {
        id: "11", 
        question: "Qual é a relação entre uma chamada recursiva e a pilha de chamadas (call stack)?", 
        options: ["A chamada recursiva é armazenada na pilha de chamadas", 
        "A pilha de chamadas é uma técnica alternativa para a recursão", 
        "A chamada recursiva elimina a necessidade da pilha de chamadas", 
        "A pilha de chamadas é usada apenas em algoritmos iterativos"], 
        correct: "A chamada recursiva é armazenada na pilha de chamadas"
    },
    {
        id: "12", 
        question: "Qual dos seguintes termos se refere à característica de uma função recursiva que garante que cada chamada gera subproblemas mais simples até atingir o caso base?", 
        options: ["Repetição", 
        "Iteração", 
        "Enumeração", 
        "Decomposição"], 
        correct: "Decomposição"
    },
    {
        id: "13", 
        question: "Em algoritmos recursivos, qual é a importância do caso base?", 
        options: ["Define o número máximo de chamadas recursivas permitidas", 
        "Garante que o algoritmo seja executado pelo menos uma vez", 
        "Evita um loop infinito e permite que a recursão termine", 
        "Permite a criação de problemas complexos"], 
        correct: "Evita um loop infinito e permite que a recursão termine"
    },
    {
        id: "14", 
        question: "Qual é o objetivo principal de dividir um problema em subproblemas menores em um algoritmo recursivo?", 
        options: ["Aumentar a complexidade do problema", 
        "Acelerar o tempo de execução", 
        "Facilitar a implementação da recursão", 
        "Reduzir um problema complexo a problemas mais simples"], 
        correct: "Reduzir um problema complexo a problemas mais simples"
    }
];
const complexQuiz = [
    {
        id: "0", 
        question: "O que é complexidade de tempo em algoritmos?", 
        options: ["O tempo real que um algoritmo leva para executar",
         "O número de instruções em um algoritmo", 
         "A quantidade de memória usada por um algoritmo", 
         "Uma medida da quantidade de recursos consumidos por um algoritmo"], 
        correct: "Uma medida da quantidade de recursos consumidos por um algoritmo"
    },
    {
        id: "1", 
        question: "Qual é a diferença entre complexidade de tempo e complexidade de espaço?", 
        options: ["Complexidade de tempo se refere ao espaço físico ocupado por um algoritmo",
         "Complexidade de tempo é a quantidade de recursos consumidos, enquanto a complexidade de espaço é a quantidade de memória usada", 
         "Complexidade de espaço é a quantidade de operações realizadas, enquanto a complexidade de tempo é a quantidade de memória usada", 
         "Não há diferença; os termos são intercambiáveis"], 
        correct: "Complexidade de tempo é a quantidade de recursos consumidos, enquanto a complexidade de espaço é a quantidade de memória usada"
    },
    {
        id: "2", 
        question: "O que significa que um algoritmo é \"eficiente\" em termos de complexidade?", 
        options: ["O algoritmo sempre produz resultados corretos",
         "O algoritmo é rápido em qualquer cenário", 
         "O algoritmo usa menos recursos para resolver um problema", 
         "O algoritmo tem menos linhas de código"], 
        correct: "O algoritmo usa menos recursos para resolver um problema"
    },
    {
        id: "3", 
        question: "Se um algoritmo A possui uma complexidade de O(n) e um algoritmo B possui uma complexidade de O(n²), como o desempenho deles se compara à medida que n aumenta?", 
        options: ["O algoritmo A sempre será mais rápido",
         "O algoritmo B sempre será mais rápido", 
         "Não é possível determinar sem mais informações", 
         "Ambos os algoritmos terão o mesmo desempenho"], 
        correct: "O algoritmo A sempre será mais rápido"
    },
    {
        id: "4", 
        question: "Numa busca sequencial por uma chave armazenada em um vetor, cujos elementos estão dispostos ordenadamente pelo valor da chave, a complexidade do algoritmo no pior caso é:", 
        options: ["O(1)",
         "O(n)", 
         "O(log n)", 
         "O(n²)"], 
        correct: "O(n)"
    },
    {
        id: "5", 
        question: "A complexidade de algoritmos considera o tempo de execução que um código usa para solucionar um problema. Selecione a alternativa que mostra a notação da menor complexidade entre as seguintes:", 
        options: ["O(n²)",
         "O(log n)", 
         "O(n)", 
         "O(c^n)"], 
        correct: "O(log n)"
    },
    {
        id: "6", 
        question: "A notação Big-O é utilizada para:", 
        options: ["Pior caso",
         "Caso médio", 
         "Melhor caso", 
         "Nenhuma das alternativas"], 
        correct: "Pior caso"
    },
    {
        id: "7", 
        question: "A complexidade do algoritmo de busca binária numa lista ordenada, com N elementos, é:", 
        options: ["O(log n)",
         "O(n log n)", 
         "O(n)", 
         "O(n/2)"], 
        correct: "O(log n)"
    },
    {
        id: "8", 
        question: "É correto afirmar que a complexidade assintótica de algoritmos é usada", 
        options: ["Quando são desprezados determinados tempos da função ou quando somente aproximações da função são possíveis de se obter",
         "Quando é possível determinar todos os tempos de uma função", 
         "Quando uma função é extremamente complexa, mas é possível calcular os seus tempos", 
         "Somente quando uma função é logarítmica"], 
        correct: "Quando são desprezados determinados tempos da função ou quando somente aproximações da função são possíveis de se obter"
    },
    {
        id: "9", 
        question: "Função de complexidade de algoritmos, cujo tempo de execução ocorre tipicamente em algoritmos que resolvem um problema quebrando-o em problemas menores, resolvendo cada um deles independentemente e, depois, ajuntando as soluções:", 
        options: ["f(n) = O(log n)",
         "f(n) = O(n)", 
         "f(n) = O(n log n)", 
         "f(n) = O(n²)"], 
        correct: "f(n) = O(n log n)"
    },
    {
        id: "10", 
        question: "Um algoritmo que apresenta a menor complexidade dentre todos os possíveis algoritmos para resolver o mesmo problema é considerado um algoritmo:", 
        options: ["Matriz",
         "Ótimo", 
         "Simplificado", 
         "Natural"], 
        correct: "Ótimo"
    },
    {
        id: "11", 
        question: "O que significa um algortimo ser O(1)?", 
        options: ["Ele é ineficiente",
         "Não depende do tamanho dos dados de entrada", 
         "Possui apenas uma instrução", 
         "Não é possível saber sua complexidade"], 
        correct: "Não depende do tamanho dos dados de entrada"
    },
    {
        id: "12", 
        question: "A notação Big-Omega é utilizado para:", 
        options: ["Pior caso",
         "Caso médio", 
         "Melhor caso", 
         "Nenhuma das alternativas"], 
        correct: "Melhor caso"
    },
    {
        id: "13", 
        question: "A notação Big-Theta é utilizado para:", 
        options: ["Pior caso",
         "Caso médio", 
         "Melhor caso", 
         "Nenhuma das alternativas"], 
        correct: "Caso médio"
    },
    {
        id: "14", 
        question: "O que significa dizer que o custo de um algoritmo é O(n²)", 
        options: ["O custo do algoritmo original é no máximo tão ruim quanto n²",
         "O custo do algoritmo original é no mínimo tão ruim quanto n²", 
         "O custo do algoritmo original é n² dentro de um fator constante acima e abaixo", 
         "O algoritmo não é eficiente"], 
        correct: "O custo do algoritmo original é no máximo tão ruim quanto n²"
    }
];
const listaQuiz = [
    {
        id: "0", 
        question: "O que é uma lista ligada?", 
        options: ["Uma estrutura de dados que armazena elementos em ordem aleatória",
         "Um tipo de array multidimensional", 
         "Uma coleção de elementos com tamanho fixo", 
         "Uma sequência de nós conectados, onde cada nó armazena um valor e uma referência ao próximo nó"], 
        correct: "Uma sequência de nós conectados, onde cada nó armazena um valor e uma referência ao próximo nó"
    },
    {
        id: "1", 
        question: "Quais são os tipos comuns de listas ligadas?", 
        options: ["Lista estática e lista dinâmica",
         "Lista simplesmente encadeada e lista duplamente encadeada", 
         "Lista linear e lista circular", 
         "Lista ordenada e lista desordenada"], 
        correct: "Lista simplesmente encadeada e lista duplamente encadeada"
    },
    {
        id: "2", 
        question: "Como você insere um novo elemento no início de uma lista ligada?", 
        options: ["Substituindo o primeiro elemento existente",
         "Criando um novo nó e tornando-o o novo primeiro nó", 
         "Movendo todos os outros elementos para a direita", 
         "Excluindo o último nó e inserindo o novo elemento no seu lugar"], 
        correct: "Criando um novo nó e tornando-o o novo primeiro nó"
    },
    {
        id: "3", 
        question: "O que é um \"nó\" em uma lista ligada?", 
        options: ["Um número inteiro armazenado em um elemento da lista",
         "Uma referência a outro elemento da lista", 
         "Uma estrutura de dados que armazena informações sobre a lista", 
         "Um índice que identifica a posição de um elemento na lista"], 
        correct: "Uma estrutura de dados que armazena informações sobre a lista"
    },
    {
        id: "4", 
        question: "Quais são as vantagens de uma lista ligada em relação a um array?", 
        options: ["Acesso aleatório rápido aos elementos",
         "Tamanho fixo e imutabilidade", 
         "Inserções e remoções eficientes", 
         "Menor uso de memória"], 
        correct: "Inserções e remoções eficientes"
    },
    {
        id: "5", 
        question: "Em uma particular estrutura de dados do tipo lista, o último elemento apresenta como próximo elemento o primeiro elemento dessa estrutura. Tal estrutura é denominada Lista:", 
        options: ["Circular",
         "Redundante", 
         "Repetitiva", 
         "Primitiva"], 
        correct: "Circular"
    },
    {
        id: "6", 
        question: "Na alocação dinâmica de memória, os dados são armazenados em posições de memória referenciadas e dispostos em uma dada organização não linear, sendo possível, a partir de um elemento, encontrar os próximos. Assinale a opção a que se referem as informações.", 
        options: ["Pilha",
         "Vetor", 
         "Matriz", 
         "Lista encadeada"], 
        correct: "Lista encadeada"
    },
    {
        id: "7", 
        question: "Selecione a estrutura de dados caracterizada por um conjunto de dados dispostos por uma sequência de nós, onde cada nó também armazena um ponteiro que indica a posição do próximo elemento, assim como a posição do elemento anterior:", 
        options: ["Lista encadeada",
         "Lista encadeada circular", 
         "Lista duplamente encadeada", 
         "Vetor"], 
        correct: "Lista duplamente encadeada"
    },
    
    {
        id: "8", 
        question: "A complexidade de algoritmos de busca em listas encadeadas é de O(n) para o caso médio e pior caso. Por quê?", 
        options: ["Porque as listas encadeadas têm um acesso mais eficiente aos elementos, tornando a busca mais rápida.",
         "Porque as listas encadeadas são mais simples de percorrer do que vetores", 
         "Porque as operações de busca em listas encadeadas dependem de percorrer os elementos sequencialmente", 
         "Porque as listas encadeadas têm um desempenho melhor em busca do que árvores binárias de busca"], 
        correct: "Porque as operações de busca em listas encadeadas dependem de percorrer os elementos sequencialmente"
    },
    {
        id: "9", 
        question: "A estrutura de dados denominada Lista Ligada (Lista Encadeada) é uma estrutura de dados:", 
        options: ["Linear e estática",
         "Hierárquica e dinâmica", 
         "Linear, composta por células, sendo que, de uma forma geral, cada uma aponta para o próximo elemento da lista", 
         "Estática, composta por células, sendo que uma célula aponta tanto para o próximo elemento da lista quanto para o elemento anterior da lista"], 
        correct: "Linear, composta por células, sendo que, de uma forma geral, cada uma aponta para o próximo elemento da lista"
    },
    {
        id: "10", 
        question: "Um dos exemplos de estrutura de dados é a lista encadeada simples. Com relação a esse tipo de lista, é correto afirmar", 
        options: ["Possui a característica de que o último elemento da lista possui um ponteiro para o primeiro elemento da lista",
         "É necessário definir o seu tamanho no momento da sua criação, pois se trata de uma estrutura de dados estática", 
         "Quando essa estrutura é utilizada, os elementos da lista sempre estarão armazenados sequencialmente na memória física", 
         "Na inserção de um novo elemento, é necessário realizar a atualização dos ponteiros dos elementos envolvidos, não sendo necessário realizar o deslocamento físico dos elementos"], 
        correct: "Na inserção de um novo elemento, é necessário realizar a atualização dos ponteiros dos elementos envolvidos, não sendo necessário realizar o deslocamento físico dos elementos"
    },
    {
        id: "11", 
        question: "Não existe, a priori, uma maneira considerada a melhor para implementar listas lineares, quer seja por contiguidade física (sobre arranjos), quer seja por encadeamento. Entretanto, há vantagens na implementação de listas lineares por contiguidade física, como:", 
        options: ["A movimentação de dados em operações de inserção e remoção no arranjo",
         "A necessidade de uma estimativa prévia do tamanho definido para o arranjo", 
         "O acesso direto a qualquer elemento da lista por meio do índice no arranjo", 
         "O tempo de acesso a dados diretamente proporcional ao tamanho do arranjo"], 
        correct: "O acesso direto a qualquer elemento da lista por meio do índice no arranjo"
    },
    {
        id: "12", 
        question: "Acerca de Estrutura de dados, selecione a alternativa correta:", 
        options: ["Na lista ligada, em cada nó possui um ou mais campos de informação e um apontador para o próximo nó da lista",
         "Na lista duplamente encadeada o último elemento aponta para o primeiro", 
         "Uma das vantagens da lista ligada é o acesso aleatório à seus nós", 
         "É necessário saber a priori a quantidade máxima de elementos da lista"], 
        correct: "Na lista ligada, em cada nó possui um ou mais campos de informação e um apontador para o próximo nó da lista"
    },
    {
        id: "13", 
        question: "Qual das estruturas é melhor para problemas de busca?", 
        options: ["Vetores",
         "Pilhas", 
         "Listas Ligadas", 
         "Lista duplamente encadeadas"], 
        correct: "Vetores"
    },
    {
        id: "14", 
        question: "Qual dos seguintes tipos de listas encadeadas permitem percorrer os elementos somente em uma direção?", 
        options: ["Lista encadeada simples",
         "Lista encadeada circular", 
         "Lista duplamente encadeada", 
         "Todas as opções"], 
        correct: "Lista encadeada simples"
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
        case "Complexidade":
            quizArray = complexQuiz;
            break;
        case "Lista Ligada":
            quizArray = listaQuiz;
            break;
        case "Recursividade":
            quizArray = recQuiz;
            break;
        case "TAD":
            quizArray = tadQuiz;
            break;
        case "Ordenação":
            quizArray = ordenaçãoQuiz;
            break;
    }
}
