import React from "react";
import { Room as Pin } from "@mui/icons-material";
import "./locationMap.scss";

function MapMarker({ mapContainerRef, pinPosition, mapScreen }) {
  return (
    <div className="map-marker">
      {mapScreen ? (
        <Pin className="location-marker" />
      ) : (
        <>
          {mapContainerRef.current && (
            <div
              style={{
                position: "absolute",
                top: pinPosition.y,
                left: pinPosition.x,
                transform: "translate(-50%, -50%)",
              }}
            >
              <Pin className="location-marker" />
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default MapMarker;
