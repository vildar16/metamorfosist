import Navbar from "./Navbar"

import React, {createRef} from 'react';
import {MapContainer, TileLayer, GeoJSON} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import Loader from 'react-loader-spinner';
import axios from 'axios'
import mapData from '../assets/data.json'

class Avistamientos extends React.Component{
    
    state = {
        codigo: "",
        mariposas: 0
    };

    componentDidMount(){
        //console.log(mapData.features[0]);
    }

    countryStyle = {
        fillOpacity: 0.7,
        color: "black",
        weight: 1,
    };

    highlightFeature(e) {
        var layer = e.target;
  
        layer.setStyle({
            weight: 3,
            color: '#933535',
            dashArray: '',
            fillOpacity: 0.7
        });
    }
      
    resetHighlight(e) {
        
        var layer = e.target;

        layer.setStyle({
            fillOpacity: 0.7,
            color: "black",
            weight: 1,
        });
    }
    
    getVal = async(cod)=>{
        try{
            return await axios.get('/api/dm/getByCode/' + cod);
        } catch(err){
            console.log("Surgio el error " + err);
        }
        
    }

    onEachDistrito = async(distrito, layer) =>{
        const mariposasDistr = distrito.properties.NOM_DIST;
        const idMar = distrito.properties.CODIGO;
        //console.log(mariposasDistr);
        //console.log(Object.keys(response.data.result).lenght + "Para el cod: " + idMar);
        //////////////////////////////////

        this.getVal(idMar)
        .then(response => {
            console.log("mariposas " + response.data.mariposas + " Y el codigo: " + response.data.codigo);
            
                //console.log("AAAAAAAAAA si entré :D");
                var cant = response.data.mariposas;
                var name = response.data.codigo;
                layer.bindPopup("¡" + mariposasDistr + " tiene: " + cant + " avistamientos de mariposas!");
                layer.options.fillColor = this.getColor(cant);
            
            
            
        })
        .catch(e => {
            console.log("Algo salio mal con " + e);
        });


        ///////////////////////////////

        /*layer.bindPopup("¡" + mariposasDistr + " tiene: " + mariposas + " avistamientos de mariposas!");
        layer.options.fillColor = this.getColor(mariposas);*/

        ///////////////////////////////


        layer.on({
            mouseover: (event) => {
                this.highlightFeature(event);
            },
            mouseout: (event) => {
                this.resetHighlight(event);
            }
            
        });
    }

    getColor(d){
        return d > 40 ? '#730202' :
               d > 30  ? '#730202' :
               d > 20  ? '#E50E0E' :
               d > 10  ? '#FC7050' :
               d > 1   ? '#FF9280' :
                          '#FFFFFF';
    };


    render(){
        
        //<TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"/>
        return (
                <div align="center">
                    
                    <br />
                    <Loader type="Rings" color="#00BFFF" height={100} width={100} timeout={15000} ></Loader>
                    <br />
                    <MapContainer ref="foo" center={{lat: '9.9333', lng: '-84.0833'}} zoom={9} >
                    
                        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"/>
                        <GeoJSON style={this.countryStyle} data={mapData.features} onEachFeature={this.onEachDistrito} />
                        
                    </MapContainer>
                </div>
        );
    }

}


export default Avistamientos;
