import React from 'react';
import Style from './../css/Style-eliminarEspecie.css';
import { Button, Form } from "react-bootstrap";
import axios from 'axios'

class BloquearUsuario extends React.Component {
    state ={
        name: "",
        lastname1: "",
        lastname2: "",
        email: "",
        usuarioSeleccionado: "",
        usuarios: [],
        index: 0

    }


    componentDidMount(){
        axios.get('http://localhost:4000/api/users/findAll/')
            .then(response=> {  
                this.setState({usuarios: response.data.all})
            })
            .catch(error => {
                this.handleSubmit(error)
            })
    }


    selectMovement = (event) =>{
        var selectedIndex = event.target.options.selectedIndex;
        var customAtrribute= event.target.options[selectedIndex].getAttribute('si');
        console.log(this.state.customAtrribute)
        axios.get('http://localhost:4000/api/users/findByEmail/'+customAtrribute)
        .then(response=> {  
            this.setState({usuarioSeleccionado: response.data})
        })
        .catch(error => {
            this.handleSubmit(error)
        })
    }

    
    onSubmit = async (e) => {


        console.log(this.state.usuarioSeleccionado._id)
        try {
            console.log(this.state.especieSeleccionada)
            await axios.put('http://localhost:4000/api/users/blockUser/'+this.state.usuarioSeleccionado._id)


             this.setState({ok: true, errors: {}, msg: '', created: true})
          
        } catch (error) {
            console.log(error)
            
            console.log(this.state)
                
        }
    }
    
    render() {
        const {usuarioSeleccionado} = this.state
        return (
            <div>
                <div class="center container  p-8 py-5 my-3 bg-dark text-white mt-5">
                    <p >
                        <h1 class="proceso">
                            Bloquear Usuario
                        </h1>
                        <hr class="aporte" />
                        <Form>
                            <Form.Group controlId="formMovement">
                                    <select defaultValue="" className="custom-select" onChange={this.selectMovement}>
                                    <option disabled={true} value="">Selecciona un usuario</option>    
                                    {
                                        this.state.usuarios.length ?
                                        this.state.usuarios.map( (usuario ) => 
                                            <option key = {usuario.email} si = {usuario.email}  >  {usuario.name} {usuario.lastname1} {usuario.lastname2} : {usuario.email} </option>                             
                                        ):
                                        null
                                    }
        
                                    </select>
                                 </Form.Group>
                                 
                            <div class="textoAporte">
                                <div class="aporteLeft">
                                    <Form.Group onChange={this.handleChange}>
                                        <br />
                                        <Form.Label>Nombre:</Form.Label>
                                        <br />
                                        <h5 class="EliminarEspecie">{usuarioSeleccionado.name}</h5>
                                        <hr class="EliminarEspecie" />


                                        <Form.Label>Primer Apellido:</Form.Label>
                                        <h5 class="EliminarEspecie">{usuarioSeleccionado.lastname1}</h5>
                                        <hr class="EliminarEspecie" />
                                        <br />
                                        <Form.Label>Segundo Apellido:</Form.Label>
                                        <h5 class="EliminarEspecie">{usuarioSeleccionado.lastname2}</h5>
                                        <hr class="EliminarEspecie" />
                                        <br />
                                        <Form.Label>Correo:</Form.Label>
                                        <h5 class="EliminarEspecie">{usuarioSeleccionado.email}</h5>
                                        <hr class="EliminarEspecie" />
                                        <br />
                                    </Form.Group>

                                </div>

                                <div class="aporteRight">
                                    <br />
                                    <Form.Label>Administrador:</Form.Label>
                                    <h5 class="EliminarEspecie"> { (usuarioSeleccionado.isAdmin) ? <h4> Sí </h4> :   <h4> No </h4> } </h5>
                                    <hr class="EliminarEspecie" />
                                    
                                    <Form.Label>Bloqueado:</Form.Label>                                
                                    <h5 class="EliminarEspecie"> { (usuarioSeleccionado.blocked) ? <h4> Sí </h4> :   <h4> No </h4> } </h5>
                                    <hr class="EliminarEspecie" />
                                    <br />
                                </div>
                            </div>
                            <div class="btn center_EliminarAporte">
                                <Button variant="danger" type="submit"  onClick={this.onSubmit}  > Bloquear Usuario </Button>
                            </div>
                            
                        </Form>
                    </p >


                </div>
                <div>
                    <footer id="footerBottom" >
                        <div>Proyecto Metamorfosis</div>
                        <div>Versión 1.2 por Metamorfosis en Instituto Tecnológico de Costa Rica</div>
                        <div>Semestre II de 2020. Administración de Proyectos</div>
                    </footer>
                </div>
            </div>
        );
    }
}

export default BloquearUsuario;
