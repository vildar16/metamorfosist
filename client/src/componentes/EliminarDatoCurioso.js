import React from 'react';
import Style from './../css/Style-Agregar_dato_curioso.css';
import axios from 'axios'
import {Button, Form } from "react-bootstrap";
class EliminarDatoCurioso extends React.Component{
    state= {
        facts:[]
    }
    async componentDidMount(){
        this.getFacts()
    }

    getFacts = async () =>{
        const all =  await axios.get("http://localhost:4000/api/facts/getAll");
        console.log(all.data.allFacts)
        this.setState({facts:all.data.allFacts})
    }

    handleDelete = async ( id) => {
        await axios.delete("http://localhost:4000/api/facts/delete/"+id)
        this.getFacts()
    }
    render(){
        
        return(
            <div>
                <div id="fondoDato">
                        <h1>Doble Click para eliminar dato curioso</h1>
                </div>

                <div Class="centerDatoCurioso">
                    <h4 class="Cuerpo"> Buscar dato curioso:</h4>
                    <form class="barra">
                               {this.state.facts.map((fact=>(

                                <ul class="list-group" key={fact._id}>
                                    <li class="list-group-item" >
                                        {fact.fact} <button className="btn btn-danger m-4" onClick={() => this.handleDelete(fact._id)}>Borrar</button></li>

                                    
                                
                                </ul>

                               )))}
                                
                            </form>
                    <br/> 
                        
                    <br/> 
                </div>
              
                
                <div>
                    {/* {<footer id="footerAbsolute">   
                        <div>Proyecto Metamorfosis</div>
                        <div>Versión 1.2 por Metamorfosis en Instituto Tecnológico de Costa Rica</div>
                        <div>Semestre II de 2020. Administración de Proyectos</div>            
                    </footer>} */}
                </div>
            </div>
        );
    }
}

export default EliminarDatoCurioso;
