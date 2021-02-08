import"./reset.css";
import "./style.css";
import { setValue} from "./currentValues";
import {elements} from"./functions/grid";
import {start, bindEvents} from "./functions/tetrominoes"

const gridItems = elements;
setValue("elements", gridItems);

document.querySelector("#start-button").addEventListener("click",()=>{
    const startTetrisInterval=()=>{
        start();
    } 
    const timer= setInterval(startTetrisInterval,400)
    setValue("timer",timer);
    bindEvents();
})



// const blocks = createGrid();
// const getRandomNumber=(max)=>{
//    const randomNum= Math.floor(Math.random()*max);
//     return randomNum;
// }
// const currentTetromino=tetrominoes[getRandomNumber(5)];
// const currentRotation=currentTetromino[getRandomNumber(currentTetromino.length)];
// const startingPoint=Math.floor((GRID_WIDTH/2)-2);

// currentRotation.forEach(index => {
//     blocks[ startingPoint+index].classList.add("filled");
    
// });

