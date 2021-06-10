import React from 'react';
import Style from './../css/Style-eliminarEspecie.css';
import { Button, Form } from "react-bootstrap";
import axios from 'axios'

class Eliminar_especies extends React.Component {
    state ={
        name: "",
        scientificName: "",
        family: "",
        genus: "",
        description: "",
        stage: "",
        photo: "",
        especieSeleccionada: "",
        especie: {photos:[]},
        mariposas: [],
        orugas: [],
        index: 0

    }

    componentDidMount(){
        axios.get('/api/species/getButterflies')
            .then(response=> {  
                this.setState({mariposas: response.data.result})
            })
            .catch(error => {
                this.handleSubmit(error)
            })
        axios.get('/api/species/getCaterpillars')
            .then(response=> {  
                this.setState({orugas: response.data.result})
            })
            .catch(error => {
                this.handleSubmit(error)
            })

    }


    selectMovement = (event) =>{
        var selectedIndex = event.target.options.selectedIndex;
        var customAtrribute= event.target.options[selectedIndex].getAttribute('si');
        this.setState({especieSeleccionada: customAtrribute})
        axios.get('/api/species/getSpeciesById/'+customAtrribute)
        .then(response=> {  
            console.log(response.data.result)
            this.setState({especie: response.data.result})
        })
        .catch(error => {
            this.handleSubmit(error)
        })
    }



    onSubmit = async (e) => {

        //e.preventDefault();

        
        try {
            console.log(this.state.especieSeleccionada)
            await axios.delete('/api/species/delete/'+this.state.especieSeleccionada, {})

             
             this.setState({ok: true, errors: {}, msg: '', created: true})
          
        } catch (error) {
            console.log(error)
            
            console.log(this.state)
                
        }
    }

    
    render() {
        const {mariposas,orugas,especie,index , name , scientificName, family, genus, description, stage} = this.state
        return (
            <div>
                <div class="center container  p-8 py-5 my-3 bg-dark text-white mt-5">
                    <p >
                        <h1 class="proceso">
                            Eliminar Especie
                        </h1>
                        <hr class="aporte" />
                        <Form>
                            <Form.Group controlId="formMovement">
                                    <select defaultValue="" className="custom-select" onChange={this.selectMovement}>
                                    <option disabled={true} value="">Seleccione una especie</option>    
                                    {
                                        mariposas.length ?
                                        mariposas.map( (especie ) => 
                                            <option key = {especie._id} si = {especie._id}  >  {especie.stage} - {especie.scientificName} : {especie.name} </option>                             
                                        ):
                                        null
                                    }
                                    {
                                        orugas.length ?
                                        orugas.map( (especie ) => 
                                            <option key = {especie._id}  si = {especie._id} > {especie.stage} - {especie.scientificName} : {especie.name} </option>                             
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
                                        <h5 class="EliminarEspecie">{especie.name}</h5>
                                        <hr class="EliminarEspecie" />

                                
                                    <Form.Label>Nombre cientifico de la especie:</Form.Label>
                                        <h5 class="EliminarEspecie">{especie.scientificName}</h5>
                                        <hr class="EliminarEspecie" />
                                        <br />
                                        <Form.Label>Familia de la especie:</Form.Label>
                                        <h5 class="EliminarEspecie">{especie.family}</h5>
                                        <hr class="EliminarEspecie" />
                                        <br />
                                        <Form.Label>Genero:</Form.Label>
                                        <h5 class="EliminarEspecie">{especie.genus}</h5>
                                        <hr class="EliminarEspecie" />
                                        <br />
                                        <div class="btn center_EliminarAporte">
                                            <Button variant="danger" type="submit"  onClick={this.onSubmit}  >
                                                Eliminar especie
                                            </Button>
                                        </div>
                                    </Form.Group>

                                </div>

                                <div class="aporteRight">
                                    <br />
                                    <Form.Label>Descripción:</Form.Label>
                                    <h5 class="EliminarEspecie">{especie.description}</h5>
                                    <hr class="EliminarEspecie" />
                                    
                                    <Form.Label>Etapa:</Form.Label>
                                    <h5 class="EliminarEspecie">{especie.stage}</h5>
                                    <hr class="EliminarEspecie" />
                                    <br />

                                    <Form.Group controlId="formMovement">
                                        <Form.Label>Fotos:</Form.Label>
                                        <br />
                                        <div class="center_EliminarAporte">
                                            <img className="catalogo" src={especie.photos[index]} />
                                        </div>
                                        <hr class="EliminarEspecie" />
                                    </Form.Group>
                                </div>
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

export default Eliminar_especies;
