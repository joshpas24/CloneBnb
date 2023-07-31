import React from 'react';
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';
import './Maps.css'

const containerStyle = {
  // padding: '30px 70px',
  width: 'auto',
  height: '560px',
};

const center = {
  lat: 33.9072,
  lng: -118.1,
};

const Maps = ({ apiKey }) => {
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
        />
      )}
    </div>
  );
};

export default React.memo(Maps);
