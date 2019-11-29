import React, {useState} from 'react';

import classnames from 'classnames';

import styles from './style.scss';

import ReactMapGL from "react-map-gl"

const MapToken  = require("../../../../map.json")

const cx = classnames.bind(styles)

export default function Mapz(infoFromApp){

    const [viewport, setViewport] = useState({
        latitude: 0,
        longitude: 0,
        width: "100vw",
        height: "50vh",
        zoom: 0
    })

    if (infoFromApp.coders && infoFromApp.searchers){
        console.log({infoFromApp})
    }

    const MapInfo = infoFromApp;

    return (
      <div>
        <ReactMapGL
            {... viewport}
            mapboxApiAccessToken={MapToken}
            mapStyle="mapbox://styles/ryanyeo/ck3jkvc8209p51crrtw6g4cdt"
            onViewportChange = {(viewport) => {
                setViewport(viewport);
            }}

        >
            {MapInfo.coders.map(x =>(
                <Marker key={MapInfo.coders.id} latitude={MapInfo.coders.lat} longitude={MapInfo.coders.long}>
                    <div>
                        WOOOOHOOOO
                    </div>
                </Marker>


            ))}
        </ReactMapGL>
      </div>
    );


}





// class Mapz extends React.Component {



//   constructor(){
//     super();

//     this.state = {
//       coders: "",
//       searchers: "",
//       counter: 0,
//     };
//   }



//   getMapInfo(){

//     this.setState({coders: this.props.coders})
//     this.setState({searchers: this.props.searchers})

//   }






//   clickHandler(){

//     this.setState({clicked:!this.state.clicked})
//   }

//   render() {

//     // =================================================================================
//     //                      Change css dynamically
//     // =================================================================================
//     // calling cx sets all the styles on the element in the display variable
//     const display = cx(
//       styles.myclass, // styles that never change
//       { // dynamic styles
//         [styles.clicked]: this.state.clicked // make the key the style name, and the value the dynamic boolean
//       }
//     )
//     // <button onClick={()=>{this.clickHandler()}}>click to change</button>
//     // =================================================================================


//     if(this.props.coders && this.props.searchers){
//         if(this.state.counter < 1){
//             this.setState({counter: this.state.counter + 1})
//             this.getMapInfo();
//         }
//     }

//     console.log(this.state)

//   }
// }

// export default Mapz;