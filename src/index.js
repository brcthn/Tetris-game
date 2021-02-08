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




