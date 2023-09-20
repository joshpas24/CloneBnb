import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { GoogleMap, Marker, useJsApiLoader, InfoWindow } from '@react-google-maps/api';
import { thunkGetSpots } from '../../store/spots';
import ImageCarousel from '../Carousel';
import markerIcon from "./Icon.png"
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

const Maps = ({ apiKey, options = { overlay: true, marker: true } }) => {
  const { setLat, setLng, width, height, zoom, onZoomChange, draggable, overlay, offsetX, offsetY, overlayStyle, overlayContent, icon, marker, spot } = options;
  const dispatch = useDispatch()
  const history = useHistory()

  const spotsObj = useSelector(state=>state.spots.allSpots);
  const spots = Object.values(spotsObj)

  const [selectedMarker, setSelectedMarker] = useState(null);

  useEffect(() => {
    dispatch(thunkGetSpots())
  }, [dispatch])

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: apiKey,
  });

  const getDetails = (spotId) => {
    history.push(`/spots/${spotId}`)
  }

  return (
    <div className='map-container'>
      {isLoaded && spots && marker &&  (
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={9}
        >
          {marker && spots.map((spot) => (
            <Marker
              key={spot.id}
              position={{lat: spot.lat, lng: spot.lng}}
              title={spot.name}
              onClick={() => setSelectedMarker(spot)}
              // icon={{
              //   url: `${markerIcon}`,
              //   scaledSize: new window.google.maps.Size(38, 40)
              // }}
            />
          ))}
          {selectedMarker && (
            <InfoWindow
              position={{ lat: selectedMarker.lat, lng: selectedMarker.lng }}
              closeBoxUrl=""
            >
              <div className='spotWindow'
                key={selectedMarker.id} title={selectedMarker.name}
              >
                <div className='spotImageMapDiv'>
                  <button
                    className="custom-close-button"
                    onClick={() => setSelectedMarker(null)}
                  >
                    <i class="fa-solid fa-xmark"></i>
                  </button>
                  <ImageCarousel images={selectedMarker.images} type='map'/>
                </div>
                <div className='spotInfo' id="map-info" onClick={() => history.push(`/spots/${selectedMarker.id}`)}>
                    <div className='spotInfoTop' style={{ alignItems: 'center' }}>
                        <div style={{ fontWeight: '700', fontSize: '12pt' }}>{`${selectedMarker.city}, ${selectedMarker.state}`}</div>
                        <div className='spotInfoRating' style={{ fontSize: '12pt', alignItems: 'flex-start' }}>
                            <i className="fa-solid fa-star"></i>
                            <div>{!selectedMarker.avgRating ? "New" : `${selectedMarker.avgRating.toFixed(1)}`}</div>
                        </div>
                    </div>
                    <div className='spotInfoBottom' style={{ fontWeight: '300', fontSize: '10pt' }}>
                        {`$${selectedMarker.price.toLocaleString()} night`}
                    </div>
                </div>
              </div>
            </InfoWindow>
          )}
        </GoogleMap>
      )}
    </div>
  );
};

export default React.memo(Maps);
