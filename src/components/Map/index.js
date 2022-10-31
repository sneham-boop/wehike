import React from "react";
import "../../styles/Map.css";
import { useRecoilValue } from "recoil";
import { userCoordinatesAtom } from "../../hooks/userCoords";
import { Link } from "react-router-dom";
import DefaultMap from "./DefaultMap";
import expand from "../../images/expand_more_FILL0_wght400_GRAD0_opsz48.svg";

export default function Map() {
  const center = useRecoilValue(userCoordinatesAtom);
  const zoom = 10;

  const goToRunsList = () => {
    const element = document.getElementById("available-runs");
    element.scrollIntoView();
  };

  return (
    <>
      <div className="map-container" >
        <section className="map-info">
          <h2>Search</h2>
          <p>
            Find a run near you. Hover on the orange dots to see details about
            each run. Click to go to the run. You can also see a full list
            below.
          </p>
          <img alt="Icon to take user to the available runs" className="material-symbols-rounded" src={expand} onClick={goToRunsList}/>
          <p>
            Can't find a run near you? Plan one <Link to="/create">here</Link>.
          </p>
        </section>
        <DefaultMap center={center} zoom={zoom} />
      </div>
    </>
  );
}
