import React from 'react';
import Style from './../css/Style-Catalogo.css';
import { Button } from "react-bootstrap";
import axios from 'axios'
class catalogoMariposas extends React.Component {


    state = {
        mariposas: [],
        qword: ''
    }
    componentDidMount(){
        this.getMariposas()
    }

    getMariposas = async () => {
        const mariposas = await axios.get("/api/species/getButterflies/")
        console.log(mariposas.data.result)
        this.setState({mariposas: mariposas.data.result})

    }


    onSearch = async (e) => {
        e.preventDefault()
        if(this.state.qword===''){
            this.getMariposas()
        }else{
        const marip = await axios.get("/api/species/searchMariposa/"+this.state.qword)
        this.setState({mariposas: marip.data})}

    }

    handleChange = e => {
        
        console.log(e)

        this.setState({
                [e.target.name]: e.target.value
        })
        console.log(this.state.qword)
    }

    render() {

        return (
            <div>
                    <div id="fondo" className="catalogo_mariposa">
                        <h1>Catálogo Mariposas</h1>
                    </div>


                    <div className="catalogo">

                    <form class="barra">
                            <input class="form-control mr-sm-2" name="qword" value={this.state.qword} type="search" placeholder="Buscar" aria-label="Search" onChange={this.handleChange}/>
                        <br/>
                            <button class="btn btn-outline-primary my-2 my-sm-0" type="submit" onClick={this.onSearch}>Buscar</button>
                        <br/>
                    </form>
                    <div className="row">
                    {this.state.mariposas.map((mariposa => (
                        <div className="col-md-4 auth_holder mr-10 p-2 " key={mariposa._id}>

                            <a href={"/VerEspecie/"+mariposa._id}>

                                
                                <div className="card" >
                                    <img className="catalogo" src={mariposa.photos[0]} />
                                    <div className="card-body">
                                        <h5 className="catalogo">{mariposa.name}</h5>
                                    </div>
                                </div>
                            </a>
                        </div>
                        
                        )))}
                    </div>
                    </div>
            </div>
            
        );
    }
}

export default catalogoMariposas;
