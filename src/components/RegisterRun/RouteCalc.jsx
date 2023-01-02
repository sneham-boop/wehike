import React from "react";
import GoogleMapReact from "google-map-react";
import { useRecoilState } from "recoil";
import { userCoordinatesAtom } from "../../hooks/userCoords";

const RouteCalc = ({ zoom, from, to, calculate, setCalc }) => {
  useRecoilState(userCoordinatesAtom);
  const myKey = process.env.REACT_APP_MAP_API_KEY;

  const handleApiLoaded = (mapp, maps) => {
    let map = mapp;

    function initialize() {
      map = new maps.Map(document.getElementById("run-path"), {
        mapId: "4493db09864aa939",
        center: new maps.LatLng(43.6532, -79.3832),
        zoom: 13,
        mapTypeId: maps.MapTypeId.ROADMAP,
        disableDefaultUI: true,
      });

      // let directionsDisplay = new maps.DirectionsRenderer();
      let directionsService = new maps.DirectionsService();
      calculateAndDisplayRoute(
        new maps.LatLng(from.lat, from.lng),
        new maps.LatLng(to.lat, to.lng),
        directionsService
        // directionsDisplay
      );
      // directionsDisplay.setMap(map);
      // directionsDisplay.setOptions({
      //   polylineOptions: {
      //     strokeColor: "#80B918CC",
      //     strokeWeight: "8",
      //   },
      // });
      // directionsDisplay.setPanel(document.getElementById("run-path"));
    }

    initialize();
    // maps.event.addDomListener(window, "load", initialize);
    function calculateAndDisplayRoute(
      start,
      end,
      directionsService
      // directionsDisplay
    ) {
      directionsService.route(
        {
          origin: start,
          destination: end,
          travelMode: maps.TravelMode.WALKING,
        },
        function (response, status) {
          if (status === maps.DirectionsStatus.OK) {
            // directionsDisplay.setDirections(response);
            console.log(response.routes[0].legs[0].distance.text);
          } else {
            window.alert("Directions request failed due to " + status);
          }
        }
      );
    }
  };

  return (
    <>
      <div id="run-path">
        <GoogleMapReact
          bootstrapURLKeys={
            {
              // key: myKey,
              // libraries: ['places'],
            }
          }
          defaultCenter={{ lat: 43.6532, lng: -79.3832 }}
          defaultZoom={zoom}
          yesIWantToUseGoogleMapApiInternals
          onGoogleApiLoaded={({ map, maps }) => handleApiLoaded(map, maps)}
        />
      </div>
    </>
  );
};

export default RouteCalc;
