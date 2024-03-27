import React, { useEffect, useState, useRef } from "react";
import GoogleMapReact from "google-map-react";
import ReactDOM from "react-dom";
import MapMarker from "./Marker";
import Search from "./search";
import { NearMe as NearMeIcon } from "@mui/icons-material";
import LocationMap from ".";
import CustomZoomControls from "./CustomZoomControls";
import "./locationMap.scss";
import UserLocationMarker from "./UserLocationMarker";

const googleMapsApiKey = "API_KEY";

const MapSelectScreen = ({ location, setLocation, setLocationSuccess }) => {
  const [addressText, setAddressText] = useState(null);
  const mapContainerRef = useRef(null);
  const [pinPosition, setPinPosition] = useState({ x: 0, y: 0 });
  const [mapKey, setMapKey] = useState(0);
  const [modalActive, setModalActive] = useState(false);
  const [mapCenter, setMapCenter] = useState({
    lat: 40.92895913013314,
    lng: 29.115388246389955,
  });

  async function fetchAddressFromCoordinates(lat, lng) {
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=API_KEY`
    );
    const data = await response.json();
    if (data.results && data.results.length > 0) {
      return data.results[0].formatted_address;
    }
    return null;
  }

  const handleMapChange = async ({ center }) => {
    setLocationSuccess(center);
    const fetchedAddress = await fetchAddressFromCoordinates(
      center.lat,
      center.lng
    );
    setAddressText(fetchedAddress);
  };

  function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            lat: position?.coords?.latitude,
            lng: position?.coords?.longitude,
          });
        },
        (error) => {
          console.log(error?.message);
        }
      );
    }
  }

  useEffect(() => {
    if (location) {
      setMapKey((prevKey) => prevKey + 1);
      setMapCenter({ lat: location?.lat, lng: location?.lng });
      const fetchLocationAddress = async () => {
        const fetchedAddress = await fetchAddressFromCoordinates(
          location.lat,
          location.lng
        );
        setAddressText(fetchedAddress);
      };

      fetchLocationAddress();
    }
  }, [location]);

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
    <div>
      <div ref={mapContainerRef} className="mapSelectContainer">
        <Search text={addressText} />
        <GoogleMapReact
          key={mapKey}
          bootstrapURLKeys={{ key: googleMapsApiKey }}
          defaultCenter={mapCenter}
          defaultZoom={14}
          onChange={handleMapChange}
          onGoogleApiLoaded={({ map }) => {
            const zoomControlDiv = document.createElement("div");
            ReactDOM.render(<CustomZoomControls map={map} />, zoomControlDiv);
            map.controls[window.google.maps.ControlPosition.LEFT_BOTTOM].push(
              zoomControlDiv
            );
          }}
          options={() => ({
            zoomControl: false,
            fullscreenControl: false,
          })}
          yesIWantToUseGoogleMapApiInternals
        >
          {location && (
            <UserLocationMarker lat={location?.lat} lng={location?.lng} />
          )}
        </GoogleMapReact>

        <MapMarker
          mapContainerRef={mapContainerRef}
          pinPosition={pinPosition}
          location={location}
        />
        <div
          className="NearMeContainer"
          role="button"
          tabIndex={0}
          onClick={() => getLocation()}
        >
          <NearMeIcon className="NearMeIcon" />
        </div>
        <button className="currenLocation" onClick={getLocation}>
          Bulunduğun Konumu Kullan
        </button>
        <div className="custom-message">Adresini doğru seçtiğine emin ol</div>
      </div>
      {modalActive && (
        <LocationMap
          setAdressModal={setModalActive}
          adressModal={modalActive}
        />
      )}
    </div>
  );
};

export default MapSelectScreen;
