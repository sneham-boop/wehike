// import { usePlacesWidget } from "react-google-autocomplete";
import React, { useRef, useState } from "react";
import Form from "react-bootstrap/Form";

export default function AutoComplete({ map, mapAPI, locationPlaceHolderText, setPlace }) {
  const locationRef = useRef(null);
  // const [place, setPlace] = useState(null);
  // const { ref: locationRef } = usePlacesWidget({
  //   apiKey: myKey,
  //   onPlaceSelected: (place) => {
  //     setAddress(
  //       place.formatted_address,
  //       place.geometry.location.lat(),
  //       place.geometry.location.lng()
  //     );
  //     setCalc(true);
  //   },
  //   options: {
  //     types: ["park"],
  //     componentRestrictions: { country: "ca" },
  //     fields: ["name", "formatted_address", "geometry"],
  //   },
  //   inputAutocompleteValue: "text",
  // });

  const onPlaceChanged = (map) => {
    const place = autoCompleteInput.getPlace();

    if (!place.geometry) return;
    if (place.geometry.viewport) {
      map.fitBounds(place.geometry.viewport);
      setPlace({lat: place.geometry.location.lat(), lng: place.geometry.location.lng()})
      // console.log(place.geometry.location.lat(), place.geometry.location.lng());
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
      <Form.Control
        required
        type="text"
        ref={locationRef}
        placeholder={locationPlaceHolderText}
        autoComplete="text"
      />
    </>
  );
}
