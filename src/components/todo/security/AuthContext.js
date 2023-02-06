import { createContext, useContext, useState } from "react";
import { apiClient } from "../api/ApiClient";
import {basicAuthApi, jwtAuthApi} from './AuthApi'

// Create a Context
export const AuthContext = createContext();

// important: use across application
export const useAuth= ()=> useContext(AuthContext)

// Share the created context with other components
function AuthProvider({children}){
    // Put some state into the context
    const [isAuthenticated,setAuthentication] = useState(false)

    const [username,setUsername]=useState(null)

    /**
     * BASIC AUTHENTICATION >> Checked
     * Commenting out!
     * 
    */
    // async function login(username,password){
    //     const baToken='Basic '+ window.btoa(username+":"+password)
        
    //     try {
    //         const response = await basicAuthApi(baToken)
            
    //         if(response.status===200){
    //             setAuthentication(true)
    //             setUsername(username)
    //             /*
    //             * VERY IMPORTANT ****************
    //             * << CONFIGURED CENTRALLY HERE IF LOGIN SUCCESSFUL >> 
    //             * > Interceptor to pass Authorization token in all
    //             * API requests
    //             */
    //             apiClient.interceptors.request.use(
    //                 config => {
    //                 config.headers.Authorization = baToken
    //                 return config
    //             })

    //             return true
    //         }
    //         else{
    //             logout()
    //             return false
    //         }
    //     } catch (error) {
    //         logout()
    //         return false
    //    }
    // }


     /**
     * JWT AUTHENTICATION >> Checked
     * Using now!
     * 
    */
    async function login(username,password){
        try {
            const response = await jwtAuthApi(username,password)
            
            if(response.status===200){
                const jwtToken='Bearer '+ response.data.token
                setAuthentication(true)
                setUsername(username)
                /*
                * VERY IMPORTANT ****************
                * << CONFIGURED CENTRALLY HERE IF LOGIN SUCCESSFUL >> 
                * > Interceptor to pass Authorization token in all
                * API requests
                */
                apiClient.interceptors.request.use(
                    config => {
                    config.headers.Authorization = jwtToken
                    return config
                })

                return true
            }
            else{
                logout()
                return false
            }
        } catch (error) {
            logout()
            return false
       }
    }

    function logout(){
        setAuthentication(false)
        setUsername(null)
    }
    
    return(
        <AuthContext.Provider value={{isAuthenticated,login,logout,username}}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthProvider;






