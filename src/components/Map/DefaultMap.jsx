import React, { useEffect } from "react";
import GoogleMapReact from "google-map-react";
import Markers from "./Markers";
import { useRecoilState, useRecoilValue } from "recoil";
import { runsState } from "../../hooks/useRuns";
import "../../styles/Map.css";
import { userCoordinatesAtom } from "../../hooks/userCoords";
// import { useState } from "react";
import RouteCalc from "./RouteCalc";

const DefaultMap = ({ center, zoom }) => {
  const runs = useRecoilValue(runsState);
  const [currentLocation, setCurrentLocation] =
    useRecoilState(userCoordinatesAtom);
  // const [map, setMap] = useState("");
  // const [maps, setMaps] = useState("");
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

  const myKey = process.env.REACT_APP_MAP_API_KEY;
  useEffect(() => {
    function getLocation() {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        setCurrentLocation({ lat: latitude, lng: longitude });
      });
    }
    getLocation();
  }, []);

  const handleApiLoaded = (map, maps) => {
    let from = { lat: 43.4933573, lng: -79.8715752 };
    let to = { lat: 43.4861086, lng: -79.9545496 };

    const bounds = new maps.LatLngBounds();
    const markersArray = [];
    // const map = new maps.Map(document.getElementById("map"), {
    //   center: { lat: 55.53, lng: 9.4 },
    //   zoom: 10,
    // });
    // initialize services
    const geocoder = new maps.Geocoder();
    const service = new maps.DistanceMatrixService();
    // build request
    // const origin1 = { lat: 55.93, lng: -3.118 };
    // const origin2 = "Greenwich, England";
    // const destinationA = "Stockholm, Sweden";
    // const destinationB = { lat: 50.087, lng: 14.421 };
    const request = {
      origins: [{lat: from.lat, lng: from.lng}],
      destinations: [{lat: to.lat, lng: to.lng}],
      travelMode: maps.TravelMode.DRIVING,
      unitSystem: maps.UnitSystem.METRIC,
      avoidHighways: false,
      avoidTolls: false,
    };

    // get distance matrix response
    service.getDistanceMatrix(request).then((response) => {
      // put response
      console.log(response);
      // document.getElementById("run-path-distance").innerText = JSON.stringify(
      //   response,
      //   null,
      //   2
      // );

      // show on map
      // const originList = response.originAddresses;
      // const destinationList = response.destinationAddresses;


      // const showGeocodedAddressOnMap = (asDestination) => {
      //   const handler = ({ results }) => {
      //     map.fitBounds(bounds.extend(results[0].geometry.location));
      //     markersArray.push(
      //       new maps.Marker({
      //         map,
      //         position: results[0].geometry.location,
      //         label: asDestination ? "D" : "O",
      //       })
      //     );
      //   };
      //   return handler;
      // };

      // for (let i = 0; i < originList.length; i++) {
      //   const results = response.rows[i].elements;

      //   geocoder
      //     .geocode({ address: originList[i] })
      //     .then(showGeocodedAddressOnMap(false));

      //   for (let j = 0; j < results.length; j++) {
      //     geocoder
      //       .geocode({ address: destinationList[j] })
      //       .then(showGeocodedAddressOnMap(true));
      //   }
      // }
    });
  };

  // console.log(map, maps);

  return (
    <>
      <div className="map">
        <GoogleMapReact
          bootstrapURLKeys={{
            key: myKey,
          }}
          defaultCenter={{ lat: 43.6532, lng: -79.3832 }}
          center={currentLocation}
          defaultZoom={zoom}
          yesIWantToUseGoogleMapApiInternals
          onGoogleApiLoaded={({ map, maps }) => handleApiLoaded(map, maps)}
        >
          <Markers
            lat={center.lat}
            lng={center.lng}
            id="Me"
            description="You are here!"
          />
          {runs && showMarkers(runs)}
        </GoogleMapReact>
        <RouteCalc
        />
      </div>
    </>
  );
};

export default DefaultMap;
