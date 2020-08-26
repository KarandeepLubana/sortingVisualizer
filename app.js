const canvas = document.querySelector('canvas'); 
const ctx = canvas.getContext('2d'); // This obtains the rendering context of canvas 
let arr = []; 
let arrLength = 20; // will be modified with html slider 
let delay = 370;
const displaySpeed = document.querySelector('#displaySpeed');
const displayArrayLength = document.querySelector('#displayLength'); 
const startSortingBtn = document.querySelector('.cta'); 
const algoSelect = document.querySelector('#algo-select'); 
const sortSpeed = document.querySelector('#speed'); 
const arraySize = document.querySelector('#rangeArr'); 

// Initialize array 
generateNewArray(arrLength)
suffleArray(arr); 
drawArray(arr);


startSortingBtn.addEventListener('click', () => {
    const duplicated = [...arr];  
    duplicated.sort((a, b) => b - a) // Sorting descending order
        if(!(arr.length === duplicated.length && arr.every((value, index)=> value === duplicated[index]))){
            if (algoSelect.value === "bubbleSort"){
                bubbleSort(); 
                startSortingBtn.classList.add('disable-btn')
            }else if (algoSelect.value === "selectionSort"){
                selectionSort(); 
                startSortingBtn.classList.add('disable-btn')
            }else if (algoSelect.value === "insertionSort"){
                insertionSort(); 
                startSortingBtn.classList.add('disable-btn');
            }
        }
})

// Getting sorting speed from slider 
sortSpeed.addEventListener('input', () => {
    delay = sortSpeed.value;
    // console.log(delay);
    displaySpeed.innerHTML = delay;
})


// Getting array size from slider
arraySize.addEventListener('input', () => {
    arr = []
    generateNewArray(arraySize.value); 
    displayArrayLength.innerHTML = arraySize.value; 
    suffleArray(arr); 
    drawArray(arr);
})


// generating array 
function generateNewArray(arrLength){
    for(let i = 1; i <= arrLength; i++) {
        arr.push(i); 
    }
    return arr; 
}

// suffles(randomises) the array that was generated 
function suffleArray(arr) {
    arr.sort(()=> Math.random() - 0.5); 
    drawArray(arr);
    // return arr; 
}

// Draws array on canvas 
function drawArray(arr, idx1=-1, idx2=-1, operation) {
    let x = 0; 
    const barWidth = canvas.width/(arr.length);  // can subtract from barwidth to make it smaller
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    for(let i = 0; i < arr.length; i++) {
        if ((i === idx1 || i === idx2) && operation === 'compare'){
            ctx.fillStyle = 'rgb(255, 0, 0)'; 
        }
        else if((i === idx1 || i === idx2) && operation === 'swap'){
            ctx.fillStyle = 'rgb(0, 255, 0)';
        }else{
            ctx.fillStyle = 'rgb(64, 224, 208)'; 
        }
        ctx.fillRect(x, 0, barWidth-1, (canvas.height)-arr[i]*(barWidth/2)); 
        x += barWidth; 
    }
}


// slows down the sorting speed when used in async sorting function with await 
function sleep(miliseconds){
    return new Promise((resolve, reject)=>{
        setTimeout(() => {
            resolve();
        }, miliseconds)
    })
}

// takes in index of two compared values so that they can be displayed in different color
async function compare(idx1, idx2){
    await drawArray(arr, idx1, idx2, 'compare')
    // await sleep(20)
}


async function bubbleSort(){
    for(let i = 0; i < arr.length; i++){
        for(let j = 0; j < arr.length - i - 1; j++){
            await compare(j, j+1,);
            await sleep(delay);
            if (arr[j] < arr[j + 1]){
                // swap 
                let temp = arr[j]; 
                arr[j] = arr[j + 1]; 
                arr[j + 1] = temp; 
                console.log('hi')
                await drawArray(arr, j, j+1, 'swap'); 
                await sleep(delay);
            }
            // await drawArray(arr, -1, -1, 'valueSorted'); 
            // await sleep(100)
        }
    }
    await drawArray(arr); 
    startSortingBtn.classList.remove('disable-btn');

}

async function selectionSort(){
    for(let i = 0; i < arr.length; i++){
        let min = i; 
        for (let j = i + 1; j < arr.length; j++){
            // compare 
            await compare(min, j);
            await sleep(delay); 
            if(arr[min] < arr[j]) {
                min = j;
            }
        }
        if (min !== i) {
            // swap 
            let temp = arr[i]; 
            arr[i] = arr[min]; 
            arr[min] = temp;
            await drawArray(arr, i, min, 'swap'); 
            await sleep(delay); 
        }
    }
    drawArray(arr)
    startSortingBtn.classList.remove('disable-btn')
}

async function insertionSort(){
    for(let i = 1; i < arr.length; i++) {
        let key = arr[i]; 
        let j = i;

        await drawArray(arr);
        while(j > 0 && arr[j - 1] < key){
            compare(j - 1, j); 
            await sleep(delay);

            let temp = arr[j]; 
            arr[j] = arr[j-1]; 
            arr[j-1] = temp;
            
            await drawArray(arr, j-1, j, 'swap'); 
            await sleep(delay); 
            j--;            
        }
    }
    drawArray(arr);
    startSortingBtn.classList.remove('disable-btn');
}