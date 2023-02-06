import { Formik,Form, Field, ErrorMessage } from "formik";
import moment from "moment";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { createTodoApi, retrieveTodoApi, updateTodoApi } from "./api/TodoApi";
import { useAuth } from "./security/AuthContext";

function TodoComponent(){

    const {username} =useAuth()
    const {id} = useParams()

    const [description,setDescription] = useState('')
    const [targetDate,setTargetDate] = useState('')

    useEffect(
        () => retrieveTodo(),[id]
    )

    function retrieveTodo(){
        if(id!=='-1'){ // -1 is for new todo
            retrieveTodoApi(username,id)
                .then((response)=>{
                    setDescription(response.data.description)
                    setTargetDate(response.data.targetDate)
                })
                .catch(error=>console.log(error))
        }
    }
  
    const navigate = useNavigate()

    function onSubmit(values){
        const todo = {
                id: id,
                username: username,
                description: values.description,
                targetDate: values.targetDate,
                done: false
        }

        if(id==='-1'){
            createTodoApi(username,todo)
            .then(response=>{
                console.log(response)
                navigate('/todos')
            })
            .catch(error=>console.log(error))
        }else{
            updateTodoApi(username,id,todo)
            .then(response=>{
                navigate('/todos')
            })
            .catch(error=>console.log(error))
        }
    }
    
    function validate(values){
        let errors={}

        if(values.description.length<5){
            errors.description='Minimum 5 characters required!'
        }
        
        if(values.targetDate===null || values.targetDate==='' || !moment(values.targetDate).isValid()){
            errors.targetDate='Enter a valid date!'
        }

        return errors
    }

    return(
        <div className="container">
            <h1>Enter Todo details</h1>
            <div>
                <Formik initialValues={{description,targetDate}} 
                        enableReinitialize={true} 
                        onSubmit={onSubmit}
                        validate={validate}
                        validateOnBlur={false}
                        validateOnChange={false}
                        >
                    {
                        (props) => (
                            <Form>
                                <ErrorMessage name="description"
                                              component="div"
                                              className="alert alert-warning"/>

                                <ErrorMessage name="targetDate"
                                              component="div"
                                              className="alert alert-warning"/>

                                <fieldset className="form-group">
                                    <label>Description</label>
                                    <Field type="text" className="form-control" name="description" />
                                </fieldset>

                                <fieldset className="form-group">
                                    <label>Target Date</label>
                                    <Field type="date" className="form-control" name="targetDate"/>
                                </fieldset>
                                <div>
                                    <button className="btn btn-success m-5" type="Submit" onSubmit={onSubmit}>Submit</button>
                                </div>
                            </Form>
                        )
                    }       
                </Formik>
            </div>
        </div>
    );
}

export default TodoComponent;