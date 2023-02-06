
import { PropTypes } from "prop-types";
function CounterButton({by,incrementMethod,decrementMethod}){
    return(
        <>
            <div>
            <button className="counerButton" onClick={()=> decrementMethod(by)}>-{by}</button>
            <button className="counerButton" onClick={()=> incrementMethod(by)}>+{by}</button> 
            </div>
        </>
    );
}

CounterButton.propType={
    by:PropTypes.number
}

CounterButton.defaultProps={
    by:1
}

export default CounterButton;