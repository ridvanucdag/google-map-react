import React from "react";
import PropTypes from "prop-types";

const CustomZoomControls = ({ map }) => {
  const zoomIn = () => {
    map.setZoom(map.getZoom() + 1);
  };

  const zoomOut = () => {
    map.setZoom(map.getZoom() - 1);
  };

  return (
    <div className="zoomContainer">
      <button className="zoomButtonStyle" onClick={zoomIn}>
        +
      </button>
      <div className="zoomMinus" />
      <button className="zoomButtonStyle" onClick={zoomOut}>
        -
      </button>
    </div>
  );
};

CustomZoomControls.propTypes = {
  map: PropTypes.object,
};

export default CustomZoomControls;
