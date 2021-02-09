import"./reset.css";
import "./style.css";
import { setValue} from "./currentValues";
import {elements} from"./functions/grid";
import {start, bindEvents} from "./functions/tetrominoes"

const gridItems = elements;
 setValue("elements", gridItems);
// const userName=prompt("What is your name?");
// document.querySelector("#user").innerHTML=`Welcome, ${userName}`
// setValue("user", userName);

if(window.localStorage.getItem("highestScore")){
    document.querySelector("#highest-score").innerHTML = window.localStorage.getItem("highestScore");
}else{
    document.querySelector("#highest-score").innerHTML = 0;
}


document.querySelector("#start-button").addEventListener("click",()=>{
    const startTetrisInterval=()=>{
        start();
    } 
    const timer= setInterval(startTetrisInterval,1500)
    setValue("timer",timer);
    bindEvents();
})




