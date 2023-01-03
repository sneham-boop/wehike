import React, { useState, useEffect } from "react";
import GoogleMap from "../GoogleMap";
import AutoComplete from "./AutoComplete";
import "../../styles/Map.css";

const ShowHikeRoute = ({ center, zoom = 10 }) => {
  const [mapAPILoaded, setMapAPILoaded] = useState(false);
  const [map, setMap] = useState(null);
  const [mapAPI, setMapAPI] = useState(null);

  const handleApiLoaded = (map, maps) => {
    setMapAPILoaded(true);
    setMap(map);
    setMapAPI(maps);
  };

  return (
    <>
      <div className="map" style={{ width: "800px", height: "800px" }}>
      <AutoComplete loaded={mapAPILoaded} map={map} mapAPI={mapAPI} locationPlaceHolderText="From"/>
      <AutoComplete loaded={mapAPILoaded} map={map} mapAPI={mapAPI} locationPlaceHolderText="To"/>
        <GoogleMap
          defaultCenter={{ lat: 43.6532, lng: -79.3832 }}
          defaultZoom={zoom}
          yesIWantToUseGoogleMapApiInternals
          onGoogleApiLoaded={({ map, maps }) => handleApiLoaded(map, maps)}
        ></GoogleMap>
      </div>
    </>
  );
};

export default ShowHikeRoute;
