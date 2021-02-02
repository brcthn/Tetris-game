import"./reset.css";
import "./style.css";
import {createGrid} from "./functions/grid";
import {tetrominoes} from "./constants/tetrominoes"
import { GRID_WIDTH } from "./constants/grid";
const blocks = createGrid();

const getRandomNumber=(max)=>{
   const randomNum= Math.floor(Math.random()*max);
    return randomNum;
}
const currentTetromino=tetrominoes[getRandomNumber(5)];
const currentRotation=currentTetromino[getRandomNumber(currentTetromino.length)];
const startingPoint=Math.floor((GRID_WIDTH/2)-2);

currentRotation.forEach(index => {
    blocks[ startingPoint+index].classList.add("filled");
    
});

