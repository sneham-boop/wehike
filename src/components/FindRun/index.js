import React, { useState } from "react";
import Run from "../Run";
import Map from "../Map";
import JoiningStatus from "../JoiningStatus";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { userState, runsState } from "../../hooks/useAppData";
import useAppData from "../../hooks/useAppData";
import "../../styles/FindRun.css";

export default function FindRun() {
  const runs = useRecoilValue(runsState);
  const user = useRecoilValue(userState);
  const { joinRun, canJoinRun, pastEvent } = useAppData();
  const navigate = useNavigate();
  const [joinButtonPressed, setJoinButtonPressed] = useState(false);

  const join = (user_id, run_id) => {
    // Check if joining is possible
    if (!canJoinRun(run_id)) {
      console.log("You cannot join this run.");
      navigate("/");
      return;
    }
    // Join if possible
    joinRun(user_id, run_id).then((response) => {
      if (response) {
        setJoinButtonPressed(true);
      }
    });
  };

  const showAvailableRuns = (runs, type) => {
    return runs.map((run) => {
      const eventDate = new Date(run.date);
      const past= pastEvent(eventDate);
      return (
        past && <Run
          key={run.id}
          run={run}
          type={type}
          join={() => join(user.id, run.id)}
          canJoinRun={canJoinRun}
        />
      );
    });
  };

  return (
    <>
      <section id="find-run-page">
        <Map />
        <section id="available-runs">
          <h2>Available right now</h2>
          <p>
            Our runs are about being inclusive, community and wellbeing. Our
            mission is for people to feel part of a real local community brought
            together by physical activity, as well as our national weRun family
            across Canada. If you can't find an event near you, you can register
            with weRun and plan your own.
          </p>
        </section>
        <section className="runs-container">
          {runs && showAvailableRuns(runs, "available")}
        </section>
      </section>
      {user && (
        <JoiningStatus
          joinButtonPressed={joinButtonPressed}
          setJoinButtonPressed={setJoinButtonPressed}
          text="JOINING"
        />
      )}
    </>
  );
}
