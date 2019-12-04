import React, {useState, useEffect} from 'react';

import classnames from 'classnames';

import styles from './style.scss';

import ReactMapGL, {Marker, Popup, NavigationControl} from "react-map-gl"

const MAPTOKEN = require("../../../../map.json")

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

    // CLOSE ALL POPUPS WHEN USER PRESS ESCAPE KEY
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





// =============================================================================================
//      Plotting markers on the map (NOT DONE YET, NEED TO WORK ON THE SEE MORE BUTTON)
// =============================================================================================
    if (infoFromApp.coders && infoFromApp.searchers){
        console.log({infoFromApp})
    }

    //            DO THIS TO PREVENT NULL ERROR
    // =================================================================
    let mapInfo = {
        coders: [],
        searchers: []
    };
    // =================================================================


    //      GET INFO FROM PARAMS PASSED INTO HERE FROM APP.JSX
    // =================================================================
    if(infoFromApp.coders || infoFromApp.searchers){
        mapInfo = infoFromApp;
    };
    // =================================================================


    // PLOT THE CODERS
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

    // PLOT THE SEARCHERS
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



// RESULTS ARE SHOWN AND RUN THESE FUNCTIONS IF USER PRESS THE BUTTON SEE MORE
// ====================================================================
    const handleClick = function(event){
        infoFromApp.selectedProfile(event);
        infoFromApp.showProfile();
    }
// ====================================================================



    return (
      <div>
        <ReactMapGL
            {... viewport}
            mapboxApiAccessToken={MAPTOKEN}
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