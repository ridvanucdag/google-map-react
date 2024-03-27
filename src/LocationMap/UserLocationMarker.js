import React from "react";
import "./locationMap.scss";

const UserLocationMarker = ({ lat, lng }) => {
  const markerStyle = {
    position: "absolute",
    left: `${lng}px`,
    top: `${lat}px`,
    zIndex: 1,
  };

  return (
    <div className="user-location-marker" style={markerStyle}>
      <div className="user-location-marker-center" />
    </div>
  );
};

export default UserLocationMarker;
