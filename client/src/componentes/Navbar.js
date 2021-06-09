import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import Style from './../css/Style-navbar.css';
import { AuthContext } from './auth/AuthContext';
import { types } from './types/types';


export const Navbar = () => {

    const {user:{logged, nombre, isAdmin}, dispatch} = useContext(AuthContext)
    const history = useHistory()
    const handleLogout = ()=>{

        dispatch({type: types.logout
        })



     }

    return (
        <font face="Arial">
            <nav className="navbar navbar-expand-sm bg-white navbar-light" >
                <a className="navbar-brand" href="/Pagina_principal"> 
                <img src="./images/icono.png" alt="Logo" width="55" height="40" alt=""/>
                </a> 
                
              <strong><a className="navbar-brand" href="/Pagina_principal"> {(logged)?nombre:"Metamorfosis"}</a></strong>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse justify-content-end" id="navbarNavDropdown" >
                    <ul className="navbar-nav ">

                    <li className="nav-item" id="elemento">
                        <a className="nav-link" href="/Pagina_principal"> Principal</a>
                    </li>
                    
                    <li className="nav-item" id="elemento">
                        <a className="nav-link" href="/Proceso_metamorfosis"> Proceso de metamorfosis</a>
                    </li>

                    <li className="nav-item" id="elemento">
                        <a className="nav-link" href="/Avistamientos"> Reporte de avistamientos</a>
                    </li>

                    <li className="nav-item dropdown" id="elemento">
                        <a className="nav-link dropdown-toggle" href="#" id="navadd" data-toggle="dropdown"> Catálogo </a>
                        <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                            <a className="dropdown-item" href="/CatalogoOrugas">Orugas</a>
                            <a className="dropdown-item" href="/CatalogoMariposas">Mariposas</a>
                        </div>
                    </li>

                    {(logged)&&<li className="nav-item" id="elemento">
                        <a className="nav-link" href="/Aporte"> Aporte</a>
                    </li>}

                    {(!logged)&&<li className="nav-item" id="elemento">
                        <a className="nav-link" href="/Register"> Registrar</a>
                    </li>}

                    {(!logged)&&<li className="nav-item" id="elemento">
                        <a className="nav-link" href="/Login"> Iniciar sesión</a>
                    </li>}

                    <li className="nav-item" id="elemento">
                        <a className="nav-link" href="/QuienesSomos"> ¿Quiénes somos?</a>
                    </li>

                   {(isAdmin)&&<li className="nav-item" id="elemento">
                
                        <a className="nav-link" href="/Administrador"> Administrador</a>
                    </li>}
                    
                    <a href="/Pagina_principal">
                    {(logged)&&<button              
                        
                        className="nav-item nav-link btn" 
                        onClick={handleLogout}                   
                    >
                        Logout
                    </button>}
                        
                    </a>
                    </ul>
                </div>
          </nav>
          </font>
    )
}
