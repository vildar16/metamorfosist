import React from 'react';
import Style from './../css/Style-Register.css';
import axios from 'axios'
import { RegisterForm } from './auth/registro';
class Registrar extends React.Component{

    render(){
        
        return(
            <div>
                <div id="fondoRegister">
                        <h1>Registrar</h1>
                </div>


               
                <div className="auth__main">
                    <RegisterForm></RegisterForm>

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

export default Registrar;
