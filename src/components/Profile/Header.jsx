/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import ProfileActions from "./ProfileActions";
import Table from "react-bootstrap/Table";
import "../../styles/Profile.css";
import { userState } from "../../hooks/useAppData";
import useRuns from "../../hooks/useRuns";
import { useRecoilValue } from "recoil";
import useAppData from "../../hooks/useAppData";
import profilePhoto from "../../images/profile-photo.jpeg";

export default function Profile() {
  const user = useRecoilValue(userState);
  const { pastEvent } = useAppData();
  const [updateData, setUpdateData] = useState(false);
  const { runnerRuns } = useRuns({ update: updateData });
  const [runData, setRunData] = useState({ distance: 0, minutes: 0, count: 0 });

  const profilePicture = (
    <img className="profile-pic" src={profilePhoto} alt="icon-profile"/>
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
    return(()=>{
      setUpdateData(false);
    })
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
          <h4>YOU HAVE:</h4>
          <Table size="sm">
            <thead>
              <tr>
                <th>RUN FOR</th>
                <th>COVERED</th>
                <th>ATTENDED</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  {runData.minutes}
                  <span className="unit">min</span>
                </td>
                <td>
                  {runData.distance}
                  <span className="unit">km</span>
                </td>
                <td>
                  {runData.count}
                  <span className="unit">runs</span>
                </td>
              </tr>
            </tbody>
          </Table>
        </div>
        {profilePicture}
      </section>
  );
}
