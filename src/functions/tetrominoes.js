import {tetrominoes} from "../constants/tetrominoes";
import {getCurrentValues} from"../currentValues";
import { GRID_WIDTH } from "../constants/grid";
import { setValue} from "../currentValues";
import { GRID_SIZE } from "../constants/grid";

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
    checkScore();
    checkIsGameOver();
 
}
export const checkScore=()=>{
    const {position,rotation,tetrominoe,elements,score}= getCurrentValues();
    for( let currentIndex=0; currentIndex<GRID_SIZE-1; currentIndex += GRID_WIDTH){
        const row=[currentIndex,currentIndex+1,currentIndex+2,currentIndex+3,currentIndex+4,currentIndex+5,currentIndex+6,currentIndex+7,currentIndex+8,currentIndex+9];
        const isWall=row.some((index)=>elements[index].classList.contains("wall"))
        if(row.every(index => elements[index].classList.contains("taken"))&&!isWall){
            const currentScore = score+10;
            setValue("score",currentScore);
            document.getElementById("score").innerHTML=`Score: ${currentScore}`;
            row.forEach((index)=>{
                elements[index].classList.remove("taken");
                elements[index].classList.remove("filled");
                });
        
        // tamami boyali olan satir silindi.
        //splice metodu mutate eder.
        const removeElements=elements.splice(currentIndex, GRID_WIDTH);

        console.log(removeElements)
        //silinmis olani basa aldik.
        const newEls=removeElements.concat(elements);
        console.log(newEls)
        setValue("elements",newEls);
        newEls.forEach(cell=>document.querySelector("#tetris-grid").appendChild(cell));  
        }
    }


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
    const {position,rotation,tetrominoe,elements,timer,score}= getCurrentValues();
    if(tetrominoe[rotation].some((index)=>{
        return elements[position+index].classList.contains("taken");
    })){
        //Game over
        clearInterval(timer);
        checkHighestScore(score);
        document.getElementById("score").innerHTML="Game Over";
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
export const checkHighestScore=(currentScore)=>{
    const highestScore=window.localStorage.getItem("highestScore")
    if(highestScore){
        if(currentScore>highestScore){
            window.localStorage.setItem("highestScore",currentScore)
        }
        const newHighScore=window.localStorage.getItem("highestScore")
        document.querySelector("#highest-score").innerHTML=newHighScore;
    }else{ 
        window.localStorage.setItem("highestScore",currentScore)
        document.querySelector("#highest-score").innerHTML=currentScore;
    }
}
