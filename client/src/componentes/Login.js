import React from 'react';
import Style from './../css/Style-Login.css';
import axios from 'axios'
import {LoginForm} from "../componentes/auth/login"
class Login extends React.Component{

    render(){
        
        return(
            <div>
                <div id="fondoLogin">
                        <h1>Iniciar Sesión</h1>
                </div>

                <div className="auth__main">
                    <LoginForm></LoginForm>

                </div>
                
                <div>
                    <footer id="footerAbsolute">   
                        <div>Proyecto Metamorfosis</div>
                        <div>Versión 1.2 por Metamorfosis en Instituto Tecnológico de Costa Rica</div>
                        <div>Semestre II de 2020. Administración de Proyectos</div>            
                    </footer>
                </div>
            </div>
        );
    }
}

export default Login;
