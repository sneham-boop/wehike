/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import "../../styles/Profile.css";
import useRuns from "../../hooks/useRuns";
import useAppData from "../../hooks/useAppData";

export default function Profile() {
  const { pastEvent } = useAppData();
  const [updateData, setUpdateData] = useState(false);
  const { runnerRuns } = useRuns({ update: updateData });
  const [runData, setRunData] = useState({ distance: 0, minutes: 0, count: 0 });

  useEffect(() => {
    let distance = 0,
      minutes = 0,
      count = 0;
    for (const key in runnerRuns) {
      const eventDate = new Date(runnerRuns[key].date);

      if (pastEvent(eventDate)) {
        let distCharType = runnerRuns[key].distance;
        distCharType = distCharType.slice(0, -3);
        distance += parseInt(distCharType);
        minutes += parseInt(runnerRuns[key].time);
        count += 1;
      }
    }
    setRunData({ distance, minutes, count });
    return () => {
      setUpdateData(false);
    };
  }, [runnerRuns]);

  return (
    <>
      <h4>Dashboard</h4>
      <section className="stats">
        <div className="stats-data">
          <p>TIME (min)</p>
          <span>{runData.minutes}</span>
        </div>
        <div className="stats-data">
          <p>DISTANCE (km)</p>
          <span>{runData.distance}</span>
        </div>
        <div className="stats-data">
          <p>HIKES (count)</p>
          <span>{runData.count}</span>
        </div>
      </section>
    </>
  );
}
