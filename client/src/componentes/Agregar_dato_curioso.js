import React from 'react';
import Style from './../css/Style-Agregar_dato_curioso.css';
import axios from 'axios'
import {Button, Form } from "react-bootstrap";
class Agregar_dato_curioso extends React.Component{

    state= {
        datoCurioso: '',
        msg: '',
        ok: false
    }
    handleChange = e => {
        
        console.log(e)

        this.setState({
                [e.target.name]: e.target.value
        })
        console.log(this.state.datoCurioso)
    }

    onSubmit = async() =>{
       
        await axios.post("http://localhost:4000/api/facts/addFact", {fact: this.state.datoCurioso})
        this.setState({ok: true, msg: "Creado correctamente.", datoCurioso: ''})
    }
    render(){
        
        return(
            <div>
                <div id="fondoDato">
                        <h1>Agregar Datos curiosos</h1>
                </div>

                <div Class="centerDatoCurioso">
                    <h4 class="Cuerpo"> Escriba el dato curioso:</h4>
                    <br/> 
                        <Form.Control as="textarea" rows="3" type="name"  placeholder="¡Agrega un dato curioso!"  name="datoCurioso" onChange={this.handleChange}/>
                    <br/> 
                </div>
                {(this.state.ok)&&   <div className="alert alert-info">
                                <n>{this.state.msg}</n>
                            </div>}
                <div class="btn">
                    <Button variant="dark" type="submit" onClick = {this.onSubmit} >
                            Agregar
                    </Button>
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

export default Agregar_dato_curioso;
