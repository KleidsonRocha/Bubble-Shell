const initialArray = [5, 2, 9, 12, 5, 6];
let bubbleArray = initialArray.slice();
let shellArray = initialArray.slice();

displayArray("bubble-array-container", bubbleArray.slice());
displayArray("shell-array-container", shellArray.slice());

document.addEventListener("DOMContentLoaded", function() {
    selectTab('Home');
});

function updateSpeed(algorithm) {
    const speedInput = document.getElementById(`speed-${algorithm}`);
    const newSpeed = parseInt(speedInput.value);

    Speed= newSpeed;
}

function selectTab(tabId) {
    const tabs = document.querySelectorAll(".section-sort");
    tabs.forEach(tab => {
        if (tab.id === tabId) {
            tab.style.display = "block";
        } else {
            tab.style.display = "none";
        }
    });

    const selectedTab = document.getElementById(tabId);
    selectedTab.style.display = "block";
}

function displayArray(containerId, array) {
    const container = document.getElementById(containerId);
    container.innerHTML = "";

    array.forEach((value) => {
        const element = document.createElement("div");
        element.classList.add("array-element");
        element.textContent = value;
        element.style.height = `${value}em`; // Ajusta a altura conforme o valor
        container.appendChild(element);
    });
}


async function bubbleSort(array) {
    let len = array.length;
    for (let i = 0; i < len - 1; i++) {
        for (let j = 0; j < len - i - 1; j++) {
            const containerId = "bubble-array-container";
            const container = document.getElementById(containerId);
            container.children[j].classList.add("selected");
            container.children[j + 1].classList.add("selected");

            if (array[j] > array[j + 1]) {
                let temp = array[j];
                array[j] = array[j + 1];
                array[j + 1] = temp;
                displayArray(containerId, array);

                container.children[j].classList.add("swapped");
                container.children[j + 1].classList.add("swapped");
                await sleep(Speed + 500);
                displayArray(containerId, array);

                container.children[j].classList.remove("swapped");
                container.children[j + 1].classList.remove("swapped");
            }

            container.children[j].classList.remove("selected");
            container.children[j + 1].classList.remove("selected");
        }
    }
}

async function shellSort(array) {
    let len = array.length;
    let gap = Math.floor(len / 2);
    while (gap > 0) {
        for (let i = gap; i < len; i++) {
            const containerId = "shell-array-container";
            const container = document.getElementById(containerId);
            container.children[i].classList.add("selected");
            let temp = array[i];
            let j = i;
            while (j >= gap && array[j - gap] > temp) {
                container.children[j].classList.add("swapped");
                container.children[j - gap].classList.add("swapped");

                array[j] = array[j - gap];
                await sleep(Speed + 500);

                container.children[j].classList.remove("swapped");
                container.children[j - gap].classList.remove("swapped");
                j -= gap;
            }
            array[j] = temp;
            displayArray(containerId, array);
            container.children[i].classList.remove("selected");
        }
        gap = Math.floor(gap / 2);
    }
}

// Função para gerar um array aleatório do tamanho especificado o valor 25 define o tamanho max
function generateRandomArrayOfSize(size) {
    const randomArray = [];
    for (let i = 0; i < size; i++) {
        randomArray.push(Math.floor(Math.random() * 25)+1);
    }
    return randomArray;
}

function generateRandomArray(containerId) {
    const container = document.getElementById(containerId);
    const size = container.children.length;
    const randomArray = generateRandomArrayOfSize(size);


    shellArray = randomArray.slice();
    bubbleArray = randomArray.slice(); 

    displayArray('shell-array-container', shellArray);
    displayArray('bubble-array-container', bubbleArray);
    
}

function setArraySize(size) {

    const randomArray = generateRandomArrayOfSize(size);

    shellArray = randomArray.slice();
    bubbleArray = randomArray.slice(); 
    
    displayArray('bubble-array-container', bubbleArray);
    displayArray('shell-array-container', shellArray);
    
}


async function runBubbleSort() {
    const containerId = "bubble-array-container";
    const array = getArrayFromContainer(containerId);
    await bubbleSort(array);
}

async function runShellSort() {
    const containerId = "shell-array-container";
    const array = getArrayFromContainer(containerId);
    await shellSort(array);
}

function getArrayFromContainer(containerId) {
    const container = document.getElementById(containerId);
    const arrayElements = container.getElementsByClassName("array-element");
    const array = Array.from(arrayElements).map(element => parseInt(element.textContent));
    return array;
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
