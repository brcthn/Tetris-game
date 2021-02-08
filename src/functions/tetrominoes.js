import {tetrominoes} from "../constants/tetrominoes";
import {getCurrentValues} from"../currentValues";
import { GRID_WIDTH } from "../constants/grid";
import { setValue} from "../currentValues";

export const getRandomTetrominoe=()=>{
const randomNum=Math.floor(Math.random()* tetrominoes.length);
return tetrominoes[randomNum];
}
export const unDraw=()=>{
const{position,rotation,tetrominoe,elements}=getCurrentValues();
tetrominoe[rotation].forEach((index)=>{
    elements[position+index].classList.remove("filled"); 
   })
}
export const draw=()=>{
    const {position,rotation,tetrominoe,elements}= getCurrentValues();
    tetrominoe[rotation].forEach((index)=>{
    elements[position+index].classList.add("filled")
   })
}

export const start=()=>{
    const{position}=getCurrentValues();
    if(document.querySelector(".filled")){
        unDraw();
        setValue("position", position+GRID_WIDTH);
    }
    draw();
    checkShouldStop();
    checkIsGameOver();
}
//control  for last tetromino
export const checkShouldStop=()=>{
    const {position,rotation,tetrominoe,elements}= getCurrentValues();
    const isLast= tetrominoe[rotation].some((index)=>elements[position+index+GRID_WIDTH].classList.contains("taken"))
    if(isLast){
        tetrominoe[rotation].forEach((index)=> elements[position+index].classList.add("taken"))
        setValue("tetrominoe",getRandomTetrominoe());
        setValue("position",4);
        draw();
    }
}
export const checkIsGameOver=()=>{
    const {position,rotation,tetrominoe,elements,timer}= getCurrentValues();
    if(tetrominoe[rotation].some((index)=>{
        return elements[position+index].classList.contains("taken");
    })){
        //Game over
        clearInterval(timer);
        alert("game over")
    }
}

export const moveLeft=()=>{
    const {position,rotation,tetrominoe,elements}=getCurrentValues();
    unDraw(); 
    const isLeftBorder=tetrominoe[rotation].some((index)=>(position+index)%GRID_WIDTH==0);
        if(!isLeftBorder){
            setValue("position",position-1);
        }
    draw();
}
export const moveRight=()=>{
    const {position,rotation,tetrominoe,elements}= getCurrentValues();
    unDraw(); 
    const isRightBorder=tetrominoe[rotation].some((index)=>(position+index)%GRID_WIDTH==GRID_WIDTH-1);
        if(!isRightBorder){
            setValue("position",position+1);
        }
    draw();
}

export const rotate=()=>{
    const {rotation,tetrominoe}= getCurrentValues();
    unDraw();
    setValue("rotation",rotation+1);
     if(rotation+1==tetrominoe.length){
      setValue("rotation",0);
     }
    draw();
}

export const bindEvents=()=>{
    document.addEventListener("keyup",(e)=>{
        handleControls(e);
    })
}
export const handleControls=(e)=>{
    if(e.keyCode==37){ moveLeft();}
    if(e.keyCode==39){ moveRight();}
    if(e.keyCode==38){ rotate();}
    if(e.keyCode==40){ start();} 
}
