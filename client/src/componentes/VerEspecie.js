import React from 'react';
import Style from './../css/Style-verEspecie.css';
import Image from '../images/metamorfosis.jpg'
import axios from 'axios'
class Ver_especie extends React.Component{
    
    state = {
        idEspecie:'',
        especie: {},
        match: {}
    }

    async componentDidMount(){
        const esp = await axios.get("/api/species/getSpeciesByID/"+this.props.match.params.id)
        
        this.setState({especie: esp.data.result})
        if(this.state.especie.stage==="Mariposa"){
            const mt = await axios.post("/api/species/getMatchCaterpillar/", {scientificName: this.state.especie.scientificName})
            this.setState({match: mt.data.match})
        }else{
            const mt2 = await axios.post("/api/species/getMatchButterfly/", {scientificName: this.state.especie.scientificName})
            this.setState({match: mt2.data.match})
            if(this.state.match==={}){
                this.setState({match: {stage: "Sin informacion"}})
            }
        }
    }

    
    
    render(){
        
        return(
            <div>
                <div id="fondoVerEspecies">
                        <h1>{this.state.especie.name}</h1>
                </div>

                <h4 class="verEspecieCientifico">{this.state.especie.scientificName}</h4>
                <h5 class="verEspecieCientifico">   </h5>
                <hr class= "verEspecie"/>

                <div class="verEspecieLeft">
                    <h1 class="proceso">{this.state.especie.stage}:</h1>
                    <img className="verEspecie" src={this.state.especie.photos} />   
                </div>

                <div class="verEspecieRight">
                    <h1 class="proceso">{this.state.match.stage}:</h1>  
                    <img className="verEspecie" src={this.state.match.photos} />
                </div>
                <div>
                    <h4 class="verEspecie">Reino</h4>
                    <h5 class="verEspecie"> {this.state.especie.kingdom}  </h5>

                    <h4 class="verEspecie">Filo</h4>
                    <h5 class="verEspecie"> {this.state.especie.phylum}  </h5>

                    <h4 class="verEspecie">Clase</h4>
                    <h5 class="verEspecie">{this.state.especie.class}</h5>

                    <h4 class="verEspecie">Orden</h4>
                    <h5 class="verEspecie">{this.state.especie.order}</h5>

                    <h4 class="verEspecie">Familia</h4>
                    <h5 class="verEspecie">{this.state.especie.family}</h5>

                    <h4 class="verEspecie">Genero</h4>
                    <h5 class="verEspecie">{this.state.especie.genus}</h5>

                    <h4 class="verEspecie">Descripción</h4>
                    <h5 class="verEspecie">  {this.state.especie.description} </h5>
                </div>

                <div class="center"> 
                <img className="verEspecieG" src={this.state.especie.photos} />   
                
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

export default Ver_especie;
