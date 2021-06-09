import Principal from './principal';
import Proceso_metamorfosis from './Proceso_metamorfosis';
import Aporte from './Aporte';
import Administrador from './Administrador';
import AgregarEspecie from './AgregarEspecie';
import CatalogoOrugas from './CatalogoOrugas';
import CatalogoMariposas from './CatalogoMariposas';
import Propuestas from './Propuestas';
import Login from './Login';
import Registrar from './Registrar';
import Dato_curioso from './Agregar_dato_curioso';
import Eliminar_especies from './Eliminar_especies';
import Editar_Especie from './Editar_Especie';
import Registrar_Administrador from './Registar_administrador';
import EliminarDatoCurioso from './EliminarDatoCurioso';
import BloquearUsuario from './BloquearUsuario';
import Desbloquear_Usuario from './DesbloquearUsuario';
import QuienesSomos from './QuienesSomos';
import VerEspecie from './VerEspecie';


import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Avistamientos from './Avistamientos';

function rutas() {
  return (
    <div>
      <Router>
        <Switch>
          <Route path="/Pagina_principal">         <Principal />               </Route>
          <Route path="/Proceso_metamorfosis">     <Proceso_metamorfosis />    </Route>
          <Route path="/Aporte">                   <Aporte />                  </Route>
          <Route path="/Administrador">            <Administrador />           </Route>
          <Route path="/CatalogoOrugas">           <CatalogoOrugas />          </Route>
          <Route path="/CatalogoMariposas">        <CatalogoMariposas />       </Route>
          <Route path="/AgregarEspecie">           <AgregarEspecie />          </Route>
          <Route path="/Propuestas">               <Propuestas />              </Route>
          <Route path="/Avistamientos">            <Avistamientos />           </Route>
          <Route path="/Login">                    <Login />                   </Route>
          <Route path="/Register">                 <Registrar />               </Route>
          <Route path="/Agregar_dato_curioso">     <Dato_curioso />            </Route>
          <Route path="/Eliminar_especies">        <Eliminar_especies />       </Route>
          <Route path="/Editar_Especie">           <Editar_Especie />          </Route>
          <Route path="/Registrar_Administrador">  <Registrar_Administrador /> </Route>
          <Route path="/EliminarDatoCurioso">      <EliminarDatoCurioso />     </Route>
          <Route path="/BloquearUsuario">          <BloquearUsuario />         </Route>
          <Route path="/Desbloquear_Usuario">      <Desbloquear_Usuario />     </Route>
          <Route path="/QuienesSomos">             <QuienesSomos />     </Route>
          <Route path="/VerEspecie/:id"             component={VerEspecie}    />

          <Route path="/">  <Principal /> </Route>

        </Switch>
      </Router>


    </div>

  );
}

export default rutas;
