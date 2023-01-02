/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import ProfileActions from "./ProfileActions";
import Table from "react-bootstrap/Table";
import "../../styles/Profile.css";
import { userState } from "../../hooks/useAppData";
import useRuns from "../../hooks/useRuns";
import { useRecoilValue } from "recoil";
import useAppData from "../../hooks/useAppData";
import Stats from "./Stats";

export default function Profile() {
  const user = useRecoilValue(userState);
  const { pastEvent } = useAppData();
  const [updateData, setUpdateData] = useState(false);
  const { runnerRuns } = useRuns({ update: updateData });
  const [runData, setRunData] = useState({ distance: 0, minutes: 0, count: 0 });

  const profilePicture = (
    <img className="profile-pic" src="https://images.pexels.com/photos/3042160/pexels-photo-3042160.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="icon-profile" />
  );

  useEffect(() => {
    let distance = 0,
      minutes = 0,
      count = 0;
    for (const key in runnerRuns) {
      const eventDate = new Date(runnerRuns[key].date);

      if (pastEvent(eventDate)) {
        distance += parseInt(runnerRuns[key].distance);
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
    <section className="profile-header">
      <div className="profile-info">
        <div className="profile-welcome">
          <div>
            <h1>Welcome!</h1>
            {user && <p>{user.name}</p>}
          </div>
          <ProfileActions />
        </div>
        <Stats />
      </div>
      {profilePicture}
    </section>
  );
}
