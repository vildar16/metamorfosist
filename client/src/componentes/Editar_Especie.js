import React from 'react';
import Style from './../css/Style-aporte.css';
import { Button, Form } from "react-bootstrap";
import axios from 'axios'

class Editar_especie extends React.Component {
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

    onSelectedChange = index => {
        this.setState(previousState => ({
          checked: {
            ...previousState.checked,
            [index]: !previousState.checked[index]
          }
        }));
      };

      
    componentDidMount(){
        axios.get('http://localhost:4000/api/species/getButterflies')
            .then(response=> {  
                this.setState({mariposas: response.data.result})
            })
            .catch(error => {
                this.handleSubmit(error)
            })
        axios.get('http://localhost:4000/api/species/getCaterpillars')
            .then(response=> {  
                this.setState({orugas: response.data.result})
            })
            .catch(error => {
                this.handleSubmit(error)
            })

    }

    handleChange = e => {
       
        this.setState({
                ...this.state,
                [e.target.name]: e.target.value
        })
    }



    selectMovement = (event) =>{
        var selectedIndex = event.target.options.selectedIndex;
        var customAtrribute= event.target.options[selectedIndex].getAttribute('si');
        this.setState({especieSeleccionada: customAtrribute})
        axios.get('http://localhost:4000/api/species/getSpeciesById/'+customAtrribute)
        .then(response=> {  
            console.log(response.data.result)
            this.setState({especie: response.data.result})
        })
        .catch(error => {
            this.handleSubmit(error)
        })
    }

    selectMovement2 = e => {
        console.log(e.target.value)
        this.setState({stage: e.target.value})
    }

    onSubmit = async (e) => {

      

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
            console.log(this.state.especieSeleccionada)
            await axios.put('http://localhost:4000/api/species/update/'+this.state.especieSeleccionada, {
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
           // this.setState({ok: error.response.data.ok, msg: error.response.data.msg})
            console.log(this.state)
                
        }
    }


    render() {
        const {mariposas,orugas,especie,index , name , scientificName, family, genus, description, stage} = this.state
        return (
            <div>
                {console.log("name:" + name)}
                {console.log("scientificName:" + scientificName)}
                {console.log("family:" + family)}
                {console.log("genus:" + genus)}
                {console.log("description:" + description)}
                {console.log("stage:" + stage)}
                <div class="center container  p-8 py-5 my-3 bg-dark text-white mt-5">

                    <p >
                        <h1 class="proceso">
                            Editar Especie
                        </h1>
                        <hr class="aporte" />
                        <br ></br>
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

                            <div class="aporteLeft">
                                <Form.Group onChange={this.handleChange}>
                                    <br />
                                    <h4> {especie.name} </h4>
                                    <Form.Control type="name" placeholder="Ingresa el nombre de la especie" name='name'  onChange={this.handleChange} />
                                    <br />
                                    <h4> {especie.scientificName} </h4>
                                    <Form.Control type="name" placeholder="Ingresa el nombre cientifico de la especie" name='scientificName'  onChange={this.handleChange}/>
                                    <br />
                                    <h4> {especie.family} </h4>
                                    <Form.Control type="name" placeholder="Ingresa la familia de la especie" name='family'  onChange={this.handleChange} />
                                    <br />
                                    <h4> {especie.genus} </h4>
                                    <Form.Control type="name" placeholder="Ingresa el genero" name='genus'  onChange={this.handleChange}/>
                                    <br />
                                </Form.Group>

                            </div>

                            <div class="aporteRight">
                                <br />
                                <h4> {especie.description} </h4>
                                <Form.Control as="textarea" rows="3" type="name" placeholder="Agrega una descripción de la especie" name='description' onChange={this.handleChange} />
                                <br />

                                <h4> {especie.stage} </h4>
                                <Form.Group controlId="formMovement">
                                    <select defaultValue="" className="custom-select" name='stage' onChange={this.selectMovement2}>
                                        <option disabled={true} value="">Selecciona la etapa de la especie</option>
                                        <option value="Oruga"> Oruga</option>
                                        <option value="Mariposa"> Mariposa</option>
                                    </select>
                                </Form.Group>
                                <br />
                                <h3>Fotos:</h3>
                                <div class="center_EliminarAporte">
                                    <img className="catalogo" src={especie.photos[index]} />
                                </div>
                                <Form.Group controlId="formMovement">
                                    <h4>Agrega una foto de la especie</h4>
                                    <br />
                                    <input
                                        type="file"
                                        onChange={(e) => this.setState({ photo: e.target.files[0] })}
                                    />
                                </Form.Group>

                            </div>

                        </Form>
                    </p >
                    <div class="btn">
                        <Button variant="secondary" type="submit" onClick={this.onSubmit} >
                            Guardar cambios
                    </Button>
                    </div>

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

export default Editar_especie;
