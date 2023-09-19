import React from 'react';
import { useSelector } from 'react-redux';
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';
import './Maps.css'

const containerStyle = {
  // padding: '30px 70px',
  width: 'auto',
  height: '100%',
  zIndex: '0'
};

const center = {
  lat: 33.75,
  lng: -118.1,
};

const Maps = ({ apiKey }) => {

  const spotsObj = useSelector(state=>state.spots.allSpots);
  const spots = Object.values(spotsObj)

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: apiKey,
  });

  return (
    <div className='map-container'>
      {isLoaded && (
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={9}
        >
          {spots.map((spot) => (
            <Marker
              key={spot.id}
              position={{lat: spot.lat, lng: spot.lng}}
              title={spot.name}
              icon={{
                url: "CloneBnb_2/Icon.png",
                scaledSize: new window.google.maps.Size(38, 40)
              }}
            />
          ))}
        </GoogleMap>
      )}
    </div>
  );
};

export default React.memo(Maps);
