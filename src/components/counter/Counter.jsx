import { useState } from 'react';
import './Counter.css';
import CounterButton from "./CounterButton";

function Counter(){
    const [count,setCounter]=useState(0);
    
    function incrementCounter(by){
        setCounter(count+by)
    }
    function decrementCounter(by){
        setCounter(count-by)
    }
    function resetCounter(){
        setCounter(0)
    }
    return(
        <>
            <span className="count">{count}</span>
            <CounterButton by={1} incrementMethod={incrementCounter} decrementMethod={decrementCounter}/>
            <CounterButton by={2} incrementMethod={incrementCounter} decrementMethod={decrementCounter}/>
            <CounterButton by={3} incrementMethod={incrementCounter} decrementMethod={decrementCounter}/>
            
            <button className='resetButton' onClick={resetCounter}>Reset</button>
        </>
    );
}

export default Counter;
