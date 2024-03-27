import React, { useEffect, useState } from "react";
import MapSelectScreen from "./MapSelectScreen";
import Modal from "../Modal";

const LocationMap = ({ adressModal, setAdressModal, setLocationMap }) => {
  const [location, setLocation] = useState(null);
  const [locationSuccess, setLocationSuccess] = useState(null);
  const [isOpen, setIsOpen] = useState(adressModal);

  const toggleModal = () => {
    setIsOpen(!isOpen);
    setAdressModal(false);
  };

  useEffect(() => {
    if (locationSuccess) {
      setLocationMap(locationSuccess);
    }
  }, [locationSuccess]);

  const getLocation = () => {
    if (navigator.permissions) {
      navigator.permissions
        .query({ name: "geolocation" })
        .then((permissionStatus) => {
          if (permissionStatus.state === "denied") {
            console.log("Konum izni reddedildi. Lütfen konum iznini açın.");
            showNotification(
              "Konum İzni Reddedildi",
              "Lütfen konum iznini açın."
            );
          } else {
            navigator.geolocation.getCurrentPosition(
              (position) => {
                setLocation({
                  lat: position.coords.latitude,
                  lng: position.coords.longitude,
                });
              },
              (error) => {
                console.log(error.message);
              }
            );
          }
        });
    } else {
      console.log("Tarayıcınız konum bilgisini desteklemiyor.");
    }
  };

  const showNotification = (title, message) => {
    if ("Notification" in window && Notification.permission === "granted") {
      Notification(title, { body: message });
    } else if (
      "Notification" in window &&
      Notification.permission !== "denied"
    ) {
      Notification.requestPermission().then(function (permission) {
        if (permission === "granted") {
          Notification(title, { body: message });
        }
      });
    }
  };

  useEffect(() => {
    if (adressModal) {
      getLocation();
    }
  }, [adressModal]);

  return (
    <>
      <Modal isOpen={isOpen} onClose={toggleModal}>
        <MapSelectScreen
          location={location}
          setLocation={setLocation}
          setLocationSuccess={setLocationSuccess}
        />
      </Modal>
    </>
  );
};

export default LocationMap;
