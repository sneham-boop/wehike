import React from "react";
import GoogleMap from "../GoogleMap";
import Markers from "./Markers";
import { useRecoilValue } from "recoil";
import { runsState } from "../../hooks/useRuns";
import "../../styles/Map.css";

const ShowRunsOnMap = ({ center, zoom }) => {
  const runs = useRecoilValue(runsState);
  const showMarkers = (runs) => {
    const runsArray = Object.values(runs);
    return runsArray.map((run) => (
      <Markers
        key={run.id}
        id={run.id}
        name={run.name}
        description={run.name}
        distance={run.distance}
        date={run.date}
        lat={run.latitude}
        lng={run.longitude}
      />
    ));
  };

  // useEffect(() => {
  //   function getLocation() {
  //     navigator.geolocation.getCurrentPosition((position) => {
  //       const { latitude, longitude } = position.coords;
  //       setCurrentLocation({ lat: latitude, lng: longitude });
  //     });
  //   }
  //   getLocation();
  // }, []);

  return (
    <>
      <div className="map">
        <GoogleMap
          defaultCenter={{ lat: 43.6532, lng: -79.3832 }}
          center={center}
          defaultZoom={zoom}
        >
          <Markers
            lat={center.lat}
            lng={center.lng}
            id="Me"
            description="You are here!"
          />
          {runs && showMarkers(runs)}
        </GoogleMap>
      </div>
    </>
  );
};

export default ShowRunsOnMap;
