import React from 'react';
import Style from './../css/Style-Catalogo.css';
import { Button } from "react-bootstrap";
import axios from 'axios'


class catalogo_oruga extends React.Component {


    state = {
        orugas: [],
        qword: ''
    }
    componentDidMount(){
        this.getOrugas()
    }
    getOrugas = async () => {
        const orugas = await axios.get("/api/species/getCaterpillars/")
        console.log(orugas.data.result)
        this.setState({orugas: orugas.data.result})

    }

    onSearch = async (e) => {
        e.preventDefault()
        if(this.state.qword===''){
            this.getOrugas()
        }else{
        const oru = await axios.get("/api/species/searchOruga/"+this.state.qword)
        this.setState({orugas: oru.data})}

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
                
                    <div id="fondo" className="catalogo_oruga">
                        <h1>Catálogo Orugas</h1>
                    </div>


                    <div className="catalogo">

                    <form class="barra">
                            <input class="form-control mr-sm-2" type="search" name="qword" placeholder="Buscar" aria-label="Search" onChange={this.handleChange}/>
                        <br/>
                            <button class="btn btn-outline-primary my-2 my-sm-0" type="submit" onClick={this.onSearch}>Buscar</button>
                        <br/>
                    </form>
                    <div className="row">
                    {this.state.orugas.map((oruga => (
                        <div className="col-md-4 auth_holder mr-10 p-2 " key={oruga._id}>

                            <a href={"/VerEspecie/"+oruga._id}>

                                
                                <div className="card" >
                                    <img className="catalogo" src={oruga.photos[0]} />
                                    <div className="card-body">
                                        <h5 className="catalogo">{oruga.name}</h5>
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

export default catalogo_oruga;
