import { getRandomTetrominoe} from"./functions/tetrominoes" 
import{ elements} from "./functions/grid";

//degisebilecek degerler
export const currentValues={
    position:4,
    rotation:0,
    tetrominoe:getRandomTetrominoe(),
    elements:null,
    timer:null,
}

//guncel degeri okumak icin
export const getCurrentValues=()=>{
    return currentValues;   
}

// degerleri degistirmek icin 
export const setValue=(key,value)=>{
currentValues[key]=value;

}