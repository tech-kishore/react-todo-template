import { useState } from "react";
import { Link } from "react-router-dom";
import { retireveHelloWorldPathVarible } from "./api/HelloWorldApi";
import { useAuth } from "./security/AuthContext";
function WelcomeComponent() {
    
    const authContext = useAuth()
    const [message,setMessage] = useState()

    function callHelloWorldRestApi(){
        retireveHelloWorldPathVarible(authContext.username)
            .then(response => successResponse(response))
            .catch(error=>errorResponse(error))
            .finally(()=> console.log('clean up'))
    }

    function successResponse(response){
        setMessage(response.data)
        console.log(response)
    }

    function errorResponse(error){
        console.log(error)
    }

    return(
        <>
            <div className="WelcomeComponent">Welcome {authContext.username}</div>
            <div><Link to="/todos" >List Todos</Link></div>
            <div>
                <button className="btn btn-success" onClick={callHelloWorldRestApi}>Call a Rest Api</button>
            </div>
            <div className="text-info">{message}</div>
        </>
    );
}

export default WelcomeComponent;
