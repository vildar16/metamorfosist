import React from 'react';
import Style from './../css/Style-aporte.css';
import { Button } from "react-bootstrap";
import axios from 'axios';

class propuestas extends React.Component {
    state = {
        aportes: []
    }
    componentDidMount() {

        this.getAporte()

    }

    getAporte = async () => {
        const ap = await axios.get("/api/species/getAllContributions/")
        this.setState({ aportes: ap.data.result })
        console.log(ap.data.result)

    }

    handleAceptar = async (id) => {
        await axios.put("/api/species/accept/"+id)
        this.getAporte()
    }

    render() {

        return (
            <div>



                {(this.state.aportes.length > 0) && (

                    this.state.aportes.map((ap => (
                        <div className="center_VerAporte card_border mb-5">
                            
                                <img className="aporte" src={ap.photos[0]} alt="Card image cap"/>
                                    <div className="card-body">
                                        <h5 className="card-title">{ap.name}</h5>
                                        <p className="card-text">{ap.description}</p>
                                        <h6 className="card-title">Nombre Cientifico: {ap.scientificName}</h6>
                                        <h6 className="card-title">Familia: {ap.family}</h6>
                                        <h6 className="card-title">Género: {ap.genus}</h6>
                                        <h6 className="card-title">Etapa: {ap.stage}</h6>
                                    </div>
                                    <hr/>

                                    <button className="btn btn-primary" onClick={() => this.handleAceptar(ap._id)}>Aceptar</button>

                         
                        </div>
                        ))))}

                        </div>



                    );
    }
}

export default propuestas;
