import React, { Component, } from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import './App.css';


class App extends Component {
    
     state = {
        defaultposition:{
        lat:48.8588377,
        lng:2.2770203,
        zoom: 6,
        },
        render:{
            newrender: <Marker position={{lat:48.8588377,lng:2.2770203,zoom: 6}}><Popup>{"04"},{"robin"}Last-sync:{"sfdfw"}</Popup></Marker> 
            },
    }

    componentDidMount() {
        // permet de changer l'etat 
        this.findworkers().then(result => this.setState({
        newrender: result 
        
        }))
    }
   
    async findworkers() {
        var marker =[]
        let numberofworker ;
        //trouver le nombre de worker 
        const req = await fetch('http://localhost:4000/api/users/getall', {method:'GET'})
        numberofworker = await req.json()
        for (let i=0; i<numberofworker.length; i++)
        {
            //recuperer le num worke
            let phoneworker = numberofworker[i].phone;
            //recuperer la position worker
            let positionworkerlat = JSON.parse(numberofworker[i].lat);
            let positionworkerlng = JSON.parse(numberofworker[i].lng);
            const gps = [positionworkerlat,positionworkerlng ]
            
            //recuperer la lastsync worker
            let lastsyncworker = numberofworker[i].lastsync;
            //recuperer le nom worker
            let nameworker = numberofworker[i].nom;
            //recuperer la statut worker
            let workerinjob = numberofworker[i].isinjob;
            let color
            if (workerinjob === true)
            {
                marker[i] =  (<Marker position={gps}><Popup>{phoneworker}, {nameworker}, 🟢 <br /> Last-sync:{lastsyncworker}</Popup></Marker>)
            } else {
                marker[i] =  (<Marker position={gps}><Popup>{phoneworker}, {nameworker}, 🔴 <br /> Last-sync:{lastsyncworker}</Popup></Marker>)
            }
           
        } 
        return marker    
    }
    
    render() //permet de faire le rendu 
    {
        const defaultposition = [this.state.defaultposition.lat, this.state.defaultposition.lng] ;
        return (
        <div id="fullscreen">
        <MapContainer center={defaultposition} zoom={this.state.defaultposition.zoom} style={{height : '800px'}}>
            <TileLayer
            attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
        {this.state.newrender} 
        
        </MapContainer>
        
        </div>
        )
    }
}
 
 export default App;
