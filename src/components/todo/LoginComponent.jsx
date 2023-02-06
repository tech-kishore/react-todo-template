import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./security/AuthContext";

function LoginComponent() {
    const [usernameState,setUsername]=useState('kishore')
    const [passwordState,setPassword]=useState('dummy')

    function handleUserNameChange(event){
        setUsername(event.target.value)
    }
    
    function handleUserPasswordChange(event){
        setPassword(event.target.value)
    }
    
    const [authFailed,setAuthFailed]=useState(false)

    const navigate=useNavigate()
    // auth context
    const authContext=useAuth()

   async function authenticate(){
        if(await authContext.login(usernameState, passwordState)){
            navigate('/welcome')
        }else{
            setAuthFailed(true)
        }
    }

    return(
        <div className="LoginComponent">
            {authFailed && <div className="loginStatus">Authentication failed!</div>}
            
            <div className="LoginForm">
                <label>Username</label>
                <input type="text" name="username" value={usernameState} onChange={handleUserNameChange}/>
            </div>
            <div>
                <label>Password</label>
                <input type="password" name="password" value={passwordState} onChange={handleUserPasswordChange}/>
            </div>
            <div>
                <button name="loginButton" onClick={authenticate}>login</button>
            </div>
        </div>
    );
}

export default LoginComponent;