// import { usePlacesWidget } from "react-google-autocomplete";
import React, { useRef, useState } from "react";
import Form from "react-bootstrap/Form";

export default function AutoComplete({
  map,
  mapAPI,
  locationPlaceHolderText,
  setPlace,
  locationRef
}) {
  // const locationRef = useRef(null);

  const onPlaceChanged = (map) => {
    const place = autoCompleteInput.getPlace();

    if (!place.geometry) return;
    if (place.geometry.viewport) {
      map.fitBounds(place.geometry.viewport);
      setPlace({
        lat: place.geometry.location.lat(),
        lng: place.geometry.location.lng(),
        formatted_address: place.formatted_address,
      });
    } else {
      map.setCenter(place.geometry.location);
      map.setZoom(10);
    }
    // addplace(place);
    input.blur();
  };

  const input = locationRef.current;
  const options = {
    types: ["park"],
    componentRestrictions: { country: "ca" },
    fields: ["name", "formatted_address", "geometry"],
  };
  let autoCompleteInput;
  if (mapAPI) {
    autoCompleteInput = new mapAPI.places.Autocomplete(input, options);
    autoCompleteInput.addListener("place_changed", () => onPlaceChanged(map));
    autoCompleteInput.bindTo("bounds", map);
  }

  return (
    <>
      {/* <Form.Control
        required
        type="text"
        ref={locationRef}
        placeholder={locationPlaceHolderText}
        autoComplete="text"
      /> */}
    </>
  );
}
