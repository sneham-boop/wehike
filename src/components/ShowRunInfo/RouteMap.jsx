import React from "react";
import ShowHikeRoute from "./ShowHikeRoute";
import { useRecoilState } from "recoil";
import { userCoordinatesAtom } from "../../hooks/userCoords";

const RouteMap = ({ from, to }) => {
  useRecoilState(userCoordinatesAtom);
  return (
    <>
      <div id="run-path">
        <ShowHikeRoute from={from} to={to} />
      </div>
    </>
  );
};

export default RouteMap;
