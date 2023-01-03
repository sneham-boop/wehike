import React, { useEffect, useState } from "react";
import GoogleMapReact from "google-map-react";
import useLocalStorage from "../hooks/useLocalStorage";

const GoogleMap = ({ children, ...props }) => {
  const { getLocalStorage, setLocalStorage } = useLocalStorage();
  const defaultLocation = { lat: 43.6532, lng: -79.3832 };
  const [location, setLocation] = useState(
    getLocalStorage("location") || defaultLocation
  );
  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords;
      setLocation({ lat: latitude, lng: longitude });
      setLocalStorage("location", { lat: latitude, lng: longitude });
    });
  }, [setLocalStorage]);
  return (
    <GoogleMapReact
      bootstrapURLKeys={{
        key: process.env.REACT_APP_MAP_API_KEY,
      }}
      center={location}
      {...props}
    >
      {children}
    </GoogleMapReact>
  );
};

export default GoogleMap;
