import React, { useState } from "react";
import Run from "../Run";
import EmptyRuns from "./EmptyRuns";
import Header from "./Header";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import "../../styles/Profile.css";
import useRuns from "../../hooks/useRuns";
import useAppData from "../../hooks/useAppData";

export default function Profile() {
  const { joinRun, canJoinRun, pastEvent } = useAppData();
  const [updateData, setUpdateData] = useState(false);
  const { runnerRuns, plannerRuns } = useRuns({ update: updateData });

  const showRunnersRuns = (runs, type) => {
    const runsArray = Object.values(runs);
    if (runsArray.length === 0) return <EmptyRuns type={type} />;
    return runsArray.map((run) => {
      const eventDate = new Date(run.date);
      return (
        <Run
          key={run.id}
          run={run}
          type={type}
          join={joinRun}
          canJoinRun={canJoinRun}
          pastEvent={pastEvent(eventDate)}
          setUpdateData={setUpdateData}
          updateData={updateData}
        />
      );
    });
  };

  return (
    <main className="profile-section">
      <Header />

      <section className="profile-stats">
        <Tabs
          defaultActiveKey="attended"
          id="profile-tab"
          className="mb-3"
          fill
        >
          <Tab eventKey="attended" title="Attended">
            <section className="runs-tab runs-container">
              {runnerRuns && showRunnersRuns(runnerRuns, "attended")}
            </section>
          </Tab>
          <Tab eventKey="planned" title="Planned">
            <section className="runs-tab runs-container">
              {plannerRuns && showRunnersRuns(plannerRuns, "planned")}
            </section>
          </Tab>
        </Tabs>
      </section>
    </main>
  );
}
