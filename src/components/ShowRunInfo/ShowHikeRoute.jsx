import React from "react";
import GoogleMap from "../GoogleMap";
import "../../styles/Map.css";

const ShowHikeRoute = ({ zoom = 10, from, to }) => {
  // const [mapAPILoaded, setMapAPILoaded] = useState(false);
  // const [map, setMap] = useState(null);
  // const [mapAPI, setMapAPI] = useState(null);

  const handleApiLoaded = (map, maps) => {
    // setMapAPILoaded(true);
    // setMap(map);
    // setMapAPI(maps);
    showRouteOnMap(map, maps);
  };

  function showRouteOnMap(map, maps) {
    let directionsDisplay = new maps.DirectionsRenderer();
    let directionsService = new maps.DirectionsService();
    calculateAndDisplayRoute(
      maps,
      new maps.LatLng(from.lat, from.lng),
      new maps.LatLng(to.lat, to.lng),
      directionsService,
      directionsDisplay
    );
    directionsDisplay.setMap(map);
    directionsDisplay.setOptions({
      polylineOptions: {
        strokeColor: "#80B918CC",
        strokeWeight: "8",
      },
    });
    directionsDisplay.setPanel(document.getElementById("check-route-map"));
    const bounds = new maps.LatLngBounds();
    map.fitBounds(bounds);
  }

  function calculateAndDisplayRoute(
    maps,
    start,
    end,
    directionsService,
    directionsDisplay
  ) {
    directionsService.route(
      {
        origin: start,
        destination: end,
        travelMode: maps.TravelMode.WALKING,
      },
      function (response, status) {
        if (status === maps.DirectionsStatus.OK) {
          directionsDisplay.setDirections(response);
        } else {
          window.alert("Directions request failed due to " + status);
        }
      }
    );
  }

  return (
    <>
      <div
        id="check-route-map"
        className="map"
        style={{ width: "100%", height: "100%" }}
      >
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
