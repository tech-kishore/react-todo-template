import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { deleteTodoApi, retrieveAllTodosForUsernameApi, updateTodoApi } from "./api/TodoApi";
import { useAuth } from "./security/AuthContext";

function ListTodosComponent() {

    const [todos,setTodos] = useState([])

    const {username} =useAuth()
    
    useEffect(
        () => refreshTodos(),[]
    );
    
    function refreshTodos(){
        retrieveAllTodosForUsernameApi(username)
            .then(response => handleSuccess(response))
            .catch(error => handleError(error))
    }

    function handleSuccess(response){
        setTodos(response.data)
    }

    function handleError(error){
        console.log(error)
    }

    const [message,setMessage] = useState(null)

    function deleteTodo(username,id){
        deleteTodoApi(username,id)
            .then(
                ()=> {
                    setMessage(`Todo with id: ${id} deleted successfully`)
                    refreshTodos()
                }
            )
            .catch(error=>console.log(error))
    }

    const navigate = useNavigate()

    return(
        <div className="container">
            {message && <div className="text text-warning">{message}</div>}
            <table className="table">
                <thead>
                    <tr>
                        <th>DESCRIPTION</th>
                        <th>IS DONE</th>
                        <th>TARGET DATE</th>
                        <th>Action</th>
                    </tr>
                </thead>
        
                <tbody>
                    {
                        todos.map(todo=>(
                            <tr key={todo.id}>
                                <td>{todo.description}</td>
                                <td>{todo.done.toString()}</td>
                                <td>{todo.targetDate}</td>
                                <td>
                                    <button className="btn btn-warning" onClick={() => deleteTodo(username,todo.id)}>Delete</button> <button className="btn btn-success" onClick={() => navigate(`/todo/${todo.id}`)}>Update</button>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
            <button className="btn btn-success" onClick={() => navigate('/todo/-1')}>Add New Todo</button>
        </div>
    );
}
export default ListTodosComponent;


