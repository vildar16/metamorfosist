import React from 'react';
import Style from './../css/Style-aporte.css';
import {Button, Form } from "react-bootstrap";
import axios from 'axios'

class agregarEspecie extends React.Component{
    state = {
        photo: null,
        name: '',
        scientificName: '',
        family: '',
        genus: '',
        description: '',
        stage: '',
        ok: true,
        msg: '',
        created: false
    }

    handleChange = e => {
       
        this.setState({
                ...this.state,
                [e.target.name]: e.target.value
        })
    }

    onSubmit = async (e) => {

        e.preventDefault();

        let fotoUrl

        if(this.state.photo === null){
            fotoUrl = "https://res.cloudinary.com/dhh7tuvtw/image/upload/v1610998076/e2cvgro6kwt7f7kijm5o.jpg"


        }else{
            
            console.log("ff xd")
            const formData = new FormData();
            formData.append('upload_preset','unitarum-img');
            formData.append('file',this.state.photo);

        
            const fotoRes = await axios.post('https://api.cloudinary.com/v1_1/dhh7tuvtw/upload', formData)
            console.log(fotoRes) 

            fotoUrl = fotoRes.data.secure_url;
        }
        try {
            await axios.post('http://localhost:4000/api/species/addSpecies', {
                name: this.state.name,
                scientificName: this.state.scientificName,
                family: this.state.family,
                genus: this.state.genus,
                description: this.state.description,
                stage: this.state.stage,
                photos: [fotoUrl],
                accepted: true
             })

             
             this.setState({ok: true, errors: {}, msg: '', created: true})
          
        } catch (error) {
            console.log(error)
            this.setState({ok: error.response.data.ok, msg: error.response.data.msg})
            console.log(this.state)
                
        }
    }

    selectMovement = e => {
        console.log(e.target.value)
        this.setState({stage: e.target.value})
    }

    render(){
        return(
            <div>
                <div class="center container  p-8 py-5 my-3 bg-dark text-white mt-5">
                    
                    <p >
                        <h1 class="proceso">
                            Agregar Especie
                        </h1>
                        <hr class = "aporte"/>
                        <br ></br>
                        {(this.state.created)&&   <div className="alert alert-info">
                                <p>Especie agregada</p>
                            </div>}
                        {(!this.state.ok)&&   <div className="alert alert-danger">
                                <n>{this.state.msg}</n>
                            </div>}
                        <Form>      
                            <div class= "aporteLeft">
                                    <Form.Group onChange= {this.handleChange}>
                                    <br/>
                                    <Form.Control type="name" placeholder="Ingresa el nombre de la especie" name = 'name' />
                                    <br/>
                                    <Form.Control type="name" placeholder="Ingresa el nombre cientifico de la especie" name = 'scientificName' />
                                    <br/>
                                    <Form.Control type="name" placeholder="Ingresa la familia de la especie" name = 'family' />
                                    <br/>
                                    <Form.Control type="name" placeholder="Ingresa el genero" name = 'genus' />
                                    <br/> 
                                    </Form.Group>
                                
                                </div>

                                <div class= "aporteRight">
                                    <br/> 
                                    <Form.Control as="textarea" rows="3" type="name" placeholder="Agrega una descripción de la especie" name = 'description' onChange={this.handleChange}/>
                                    <br/> 
                                    <Form.Group controlId="formMovement">
                                        <select defaultValue="" className="custom-select" onChange={this.selectMovement}>
                                            <option disabled={true} value="">Selecciona la etapa de la especie</option>
                                            <option value="Oruga"> Oruga</option>
                                            <option value="Mariposa"> Mariposa</option>
                                        </select>
                                    </Form.Group>
                                    <br/> 

                                    <Form.Group controlId="formMovement">
                                    <h4>Agrega una foto de la especie</h4>
                                    <br/> 
                                    <input
                                        type="file"                    
                                        onChange={(e)=> this.setState({photo: e.target.files[0]})}
                                        />
                                    </Form.Group>
                                
                                </div>
                        
                        </Form>
                    </p >
                    <div class="btn">
                    <Button variant="secondary" type="submit" onClick = {this.onSubmit} >
                            Agregar especie
                    </Button>
                    </div>
                    
                </div>
                


                <div>
                    <footer id="footerAbsolute" >   
                        <div>Proyecto Metamorfosis</div>
                        <div>Versión 1.2 por Metamorfosis en Instituto Tecnológico de Costa Rica</div>
                        <div>Semestre II de 2020. Administración de Proyectos</div>            
                    </footer>
                </div>
                
            </div>
        );
    }
}

export default agregarEspecie;
