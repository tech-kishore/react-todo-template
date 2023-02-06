
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import FooterComponent from "./FooterComponent";
import HeaderComponent from "./HeaderComponent";
import ListTodosComponent from "./ListTodosComponent";
import ErrorComponent from "./ErrorComponent";
import LogoutComponent from "./LogoutComponent";
import WelcomeComponent from "./WelcomeComponent";
import LoginComponent from "./LoginComponent";
import AuthProvider, { useAuth } from "./security/AuthContext";
import TodoComponent from "./TodoComponent";

import "./TodoApp.css";


function AuthenticatedRoute({children}){

    const authContext=useAuth()
    if(authContext.isAuthenticated)    
        return children

    return <Navigate to="/"/>
}

function TodoApp(){
    return(
        
        <div className="TodoApp">
            <AuthProvider>
                <BrowserRouter>
                <HeaderComponent/>
                    <Routes>
                        <Route path="/" element={<LoginComponent/>}/>
                        <Route path="/login" element={<LoginComponent/>}/>
                        
                        <Route path="/welcome" element={
                            <AuthenticatedRoute>
                                <WelcomeComponent/>
                            </AuthenticatedRoute>
                        }/>

                        <Route path="/todo/:id" element={
                            <AuthenticatedRoute>
                                <TodoComponent/>
                            </AuthenticatedRoute>
                        }/>

                        <Route path="/todos" element={
                            <AuthenticatedRoute>
                                <ListTodosComponent/>
                            </AuthenticatedRoute>
                        }/>

                        <Route path="/logout" element={<LogoutComponent/>}/>
                        
                        <Route path="*" element={<ErrorComponent/>}/>
                    </Routes>
                <FooterComponent/>
                </BrowserRouter>
            </AuthProvider>
        </div>
    );
}
export default TodoApp;







