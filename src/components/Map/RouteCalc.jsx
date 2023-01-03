import React, { useState } from "react";

const RouteCalc = () => {
  const [distance, setDistance] = useState(0);

  return (
    <>
      <div id="run-path-distance">{distance}</div>
    </>
  );
};

export default RouteCalc;
