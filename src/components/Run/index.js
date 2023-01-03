import React, { useState, useEffect } from "react";
import ListGroup from "react-bootstrap/ListGroup";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../styles/Run.css";
import JoinButton from "./JoinButton";
import ShowRunInfo from "../ShowRunInfo";
import AddTimeButton from "./AddTimeButton";
import useTime from "../../hooks/useTime";

export default function Run(props) {
  const { run, type, canJoinRun, join, pastEvent, setUpdateData, updateData } =
    props;
  const { formatTime } = useTime();
  const joinStatus = canJoinRun(run.id) || false;
  const [time, setTime] = useState("");
  const [eventTime, setEventTime] = useState("");
  const [imageClass, setImageClass] = useState("run-image");
  const [showInfoModal, setShowInfoModal] = useState(false);

  const handleCloseInfoModal = () => {
    setShowInfoModal(false);
  };
  const handleShowInfoModal = () => {
    setShowInfoModal(true);
  };

  useEffect(() => {
    if (run.time !== 0 && type === "attended") {
      setTime(`${run.time} min`);
    }
    setEventTime(`${new Date(run.date).toDateString()} at ${formatTime(new Date(run.date))}`);

    if (pastEvent) {
      setImageClass((prev) => prev + " past-event");
    }
  }, [run.time, updateData]);

 
  return (
    <>
      <section className="run">
        <img
          id={`run-${run.id}`}
          alt="Shows running space"
          className={imageClass}
          src={`https://werun-server.herokuapp.com/api/runs/image/${run.id}`}
        />
        {pastEvent && <p className="past-event">past</p>}
        <div className="run-body">
          <div className="run-heading">
            {type === "available" && <span className="run-id">{run.id}</span>}
            <h3>{run.name}</h3>
              <button
                type="button"
                className="detail-button"
                onClick={handleShowInfoModal}
              >
                Details
              </button>
          </div>
          <p>{run.description}</p>
          <div className="run-desc">
            <ListGroup variant="flush">
              <ListGroup.Item>
                <strong>When:</strong> {eventTime}
              </ListGroup.Item>
              <ListGroup.Item>
                <strong>Distance:</strong> {run.distance}
              </ListGroup.Item>
              {run.time !== 0 && type === "attended" && (
                <ListGroup.Item>
                  <strong>Recorded Time:</strong> {time}
                </ListGroup.Item>
              )}
            </ListGroup>
            <JoinButton runType={type} joinStatus={joinStatus} join={join} />
            {type === "attended" && pastEvent && (
              <AddTimeButton run={run} update={() => setUpdateData(true)} />
            )}
          </div>
        </div>
      </section>
      <ShowRunInfo
        run={run}
        show={showInfoModal}
        handleClose={handleCloseInfoModal}
      />
    </>
  );
}
