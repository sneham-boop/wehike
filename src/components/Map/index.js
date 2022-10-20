import React from "react";
import "../../styles/Map.css";
import { useRecoilValue } from "recoil";
import { userCoordinatesAtom } from "../../hooks/userCoords";
import { Link } from "react-router-dom";
import DefaultMap from "./DefaultMap";

export default function Map() {
  const center = useRecoilValue(userCoordinatesAtom);
  const zoom = 10;

  const handleClick = () => {
    const element = document.getElementById("available-runs");
    element.scrollIntoView();
  };

  return (
    <>
      <div className="map-container" style={{ height: "85vh", width: "100%" }}>
        <section className="map-info">
          <h2>Search</h2>
          <p>
            Find a run near you. Hover on the orange dots to see details about
            each run. Click to go to the run. You can also see a full list
            below.
          </p>

          <span className="material-symbols-rounded" onClick={handleClick}>
            expand_more
          </span>

          <p>
            Can't find a run near you? Plan one <Link to="/create">here</Link>.
          </p>
        </section>
        <DefaultMap center={center} zoom={zoom} />
      </div>
    </>
  );
}
