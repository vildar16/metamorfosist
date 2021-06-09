import React, { useContext, useState } from 'react'
import '../../App.css'
import { useForm } from '../../hooks/useForm'
import {Link} from 'react-router-dom'
import { AuthContext } from './AuthContext'
import { types } from '../types/types'
import axios from 'axios'


export const LoginForm = () => {
    
    const {user, dispatch} = useContext(AuthContext)
    const [{ok, msg}, setValidation] = useState({ok:true, msg:''})
    
    const [formValues, handleInputChange] = useForm({ 
        email: "",
        password: ''})

    const {email, password} = formValues;

    const handleLogin = async (e) => {
        e.preventDefault();
        

            try {
                
                const res = await axios.post('http://localhost:4000/api/users/login',
                formValues);
            
                dispatch({
                    type: types.login,
                    payload: {
                        id: res.data.uid,
                        nombre: res.data.name,
                        isAdmin: res.data.admin
                    }
                })
                console.log(user)
                window.location.href = '/'; 
    
            } catch (error) {
    
                console.log(error)
                setValidation({ok: error.response.data.ok, msg: error.response.data.msg})
                
            }

    }

    return (
        <>
            
            
                 <form onSubmit= { handleLogin }>
                        <input
                            type="text"
                            placeholder="correo"
                            name="email"
                            className="form-control"
                            autoComplete="off"
                            value={ email }
                            onChange={handleInputChange}
                        />

                        <br/>

                        <input
                            type="password"
                            placeholder="password"
                            name="password"
                            className="form-control"
                            autoComplete="off"
                            value= { password}
                            onChange={handleInputChange}
                        />
                        <br/>
                        {(!ok)&&   <div className="alert alert-danger">
                                <n>{msg}</n>
                            </div>}

                        <button className="btn btn-primary btn-custom mt-2">
                            Login
                        </button>

                        <hr/>
                        <h6>¿No tienes una cuenta aún?</h6>


                        <Link 
                            to="/auth/register"
                            className="link">
                                ¡Crea una gratis!
                            
                        </Link>

                        



                    </form>
           
        </>
    )
}
