import React, { useEffect, useReducer } from 'react';
import './includes/bootstrap'
import './App.css';
import Rutas from'../src/componentes/Rutas'
import {Navbar} from './componentes/Navbar'
import { AuthContext } from './componentes/auth/AuthContext';
import { authReducer } from './componentes/auth/authReducer';


const init = () => {

  return JSON.parse(localStorage.getItem('user'))|| {logged: false}

}

function App() {
  
  const [user, dispatch] = useReducer(authReducer, { }, init)

  useEffect( () => {
    localStorage.setItem('user', JSON.stringify(user)) 
  }, [user])

  return (
    <div className="App">
    
    <AuthContext.Provider value={{user, dispatch}}>
      <Navbar /> 
      <Rutas />
    </AuthContext.Provider>
    </div>
  );
}

export default App;
