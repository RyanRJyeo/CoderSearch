import React, {useState, useEffect} from 'react';

import classnames from 'classnames';

import styles from './style.scss';

import ReactMapGL, {Marker, Popup, NavigationControl} from "react-map-gl"

const MapToken  = require("../../../../map.json")

const cx = classnames.bind(styles)

export default function Mapz(infoFromApp){

// ====================================================================
//                 Setting up React-Map-GL
// ====================================================================
    const [viewport, setViewport] = useState({
        latitude: 0,
        longitude: 0,
        width: "100vw",
        height: "50vh",
        zoom: 0
    })

    const [selectedButton, setSelectedButton] = useState(null);

    useEffect(() => {
        const listener = (e) => {
            if(e.key === "Escape"){
                setSelectedButton(null);
            }
        };
        window.addEventListener("keydown", listener);


        return () => {
            window.removeEventListener("keydown", listener);
        }


    }, []);
// ====================================================================





// ====================================================================
//              Plotting markers on the map
// ====================================================================
    if (infoFromApp.coders && infoFromApp.searchers){
        console.log({infoFromApp})
    }


    let mapInfo = {
        coders: [],
        searchers: []
    };
    if(infoFromApp.coders || infoFromApp.searchers){
        mapInfo = infoFromApp;
    };

    let coders = null
    if(mapInfo.coders[0]){
        coders =    mapInfo.coders.map(x =>{
                        if(x.lat){
                            return  <Marker
                                        key={x.id}
                                        latitude={parseFloat(x.lat)}
                                        longitude={parseFloat(x.long)}
                                    >
                                        <button
                                            className={styles.coders}
                                            onClick={e => {
                                                e.preventDefault();
                                                setSelectedButton(x);
                                            }}
                                        >
                                            <i className='bx bx-code bx-sm align-bottom'></i>
                                        </button>
                                    </Marker>
                        } else {
                            return null
                        };
                    });
    };

    let searchers = null
    if(mapInfo.searchers[0]){
        searchers = mapInfo.searchers.map(x =>{
                        if(x.lat){
                            return  <Marker
                                        key={x.id}
                                        latitude={parseFloat(x.lat)}
                                        longitude={parseFloat(x.long)}
                                    >
                                        <button
                                            className={styles.coders}
                                            onClick={e => {
                                                e.preventDefault();
                                                setSelectedButton(x);
                                            }}
                                        >
                                            <i className='bx bx-search-alt bx-sm align-bottom'></i>
                                        </button>
                                    </Marker>
                        } else {
                            return null
                        };
                    });
    }

// ====================================================================


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

            <div style={{position: 'absolute', right: 0}}>
              <NavigationControl />
            </div>
            {coders}
            {searchers}


            {selectedButton ? (
                <Popup
                    latitude={parseFloat(selectedButton.lat)}
                    longitude={parseFloat(selectedButton.long)}
                    closeButton={false}
                    className={styles.popupButton}
                >
                    <div>
                        <div className={styles.closeButton}>
                            <button onClick={() => {setSelectedButton(null);}}><i className='bx bx-x bx-sm align-bottom'></i></button>
                        </div>
                        <h3>{selectedButton.name} <span className={styles.occupation}>{selectedButton.occupation_type}</span></h3>
                        <div className={styles.skills}>
                            <div>
                                <p><strong>Languages:</strong></p>
                                <p className={styles.border}>{selectedButton.language}</p>
                            </div>
                            <div>
                                <p><strong>Frameworks:</strong></p>
                                <p>{selectedButton.framework}</p>
                            </div>
                        </div>
                        <small>{selectedButton.street} {selectedButton.city} {selectedButton.country}</small>
                        <br/>
                        <br/>
                        <button className={styles.coderButton} onClick={()=>{console.log("ello")}}  >See More</button>
                    </div>
                </Popup>

            ) : null}
        </ReactMapGL>
        <div className={styles.mapDislaimer}>
            <small className="form-text text-muted">Map does not resize when the screen resizes</small>
        </div>
      </div>
    );


}