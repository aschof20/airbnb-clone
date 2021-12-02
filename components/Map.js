import React, { useState } from 'react';
import ReactMapGL, { Popup, Marker } from 'react-map-gl';
import { getCenter } from 'geolib';


function Map({ searchResults }) {
    const [seletedLocation, setSelectedLocation] = useState({});

    //Transform the search results into the required format for latitute and longitude.
    const coordinates = searchResults?.map(result => ({
        // Direct return
        longitude: result.long,
        latitude: result.lat
    }));

    // Determine the center of the map relative to all the search results.
    const center = getCenter(coordinates);

    // State 
    const [viewport, setViewport] = useState({
        width: '100%',
        height: '100%',
        latitude: center.latitude,
        longitude: center.longitude,
        zoom: 11
    });

    return (
        <ReactMapGL
            mapStyle='mapbox://styles/aschof20/ckwoj3sos9emh17qvhwr1j59i'
            mapboxApiAccessToken={process.env.mapbox_key}
            {...viewport}
            onViewportChange={(nextViewport) => setViewport(nextViewport)}
            width="100vw" height="100vh"
        >
            {searchResults.map((result) => (
                <div key={result.long}>
                    <Marker latitude={result.lat} longitude={result.long} offsetLeft={-20} offsetTop={-10}>
                        <p onClick={() => {
                            setSelectedLocation(result);
                        }} className="cursor-pointer text-2xl animate-bounce z-50" aria-label="push-pin">📍</p>

                    </Marker>
                    {/** Popup to show when click on marker */
                        seletedLocation.long === result.long ? (
                            <Popup
                                onClose={() => setSelectedLocation({})}
                                closeOnClick={true}
                                latitude={result.lat}
                                longitude={result.long}
                            >{result.title}</Popup>
                        ) : (false)
                    }
                </div>
            ))}
        </ReactMapGL>
    );
}

export default Map;
