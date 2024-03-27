import React, { useEffect, useState, useRef } from "react";
import GoogleMapReact from "google-map-react";
import MapMarker from "./Marker";
import LocationMap from ".";
import "./locationMap.scss";

const googleMapsApiKey = "API_KEY";

const MapScreen = () => {
  const mapContainerRef = useRef(null);
  const [mapKey, setMapKey] = useState(0);
  const [modalActive, setModalActive] = useState(false);
  const [pinPosition, setPinPosition] = useState({ x: 0, y: 0 });
  const [locationMap, setLocationMap] = useState({});

  useEffect(() => {
    setMapKey((prevKey) => prevKey + 1);
  }, [pinPosition, locationMap]);

  useEffect(() => {
    const updatePinPosition = () => {
      const mapContainer = mapContainerRef.current;
      if (mapContainer) {
        const { width, height } = mapContainer.getBoundingClientRect();
        setPinPosition({ x: width / 2, y: height / 2 });
      }
    };

    window.addEventListener("resize", updatePinPosition);
    updatePinPosition();

    return () => window.removeEventListener("resize", updatePinPosition);
  }, []);

  return (
    <div className="mapScreenContainer">
      <div ref={mapContainerRef} className="mapScreenMap">
        <GoogleMapReact
          key={mapKey}
          bootstrapURLKeys={{ key: googleMapsApiKey }}
          defaultCenter={
            locationMap?.lat
              ? { lat: locationMap?.lat, lng: locationMap?.lng }
              : { lat: 40.92895913013314, lng: 29.115388246389955 }
          }
          defaultZoom={14}
          options={() => ({
            draggable: false,
            scrollwheel: false,
            zoomControl: false,
            fullscreenControl: false,
          })}
          yesIWantToUseGoogleMapApiInternals
        />

        <div
          style={{
            position: "absolute",
            top: pinPosition.y,
            left: pinPosition.x,
            transform: "translate(-50%, -50%)",
          }}
        >
          <MapMarker
            mapContainerRef={mapContainerRef}
            pinPosition={pinPosition}
            mapScreen
          />
        </div>
      </div>

      <button className="currenLocation" onClick={() => setModalActive(true)}>
        Yeni Konum Belirle
      </button>

      {modalActive && (
        <LocationMap
          setAdressModal={setModalActive}
          setLocationMap={setLocationMap}
          adressModal={modalActive}
          MapScreen
        />
      )}
    </div>
  );
};

export default MapScreen;
