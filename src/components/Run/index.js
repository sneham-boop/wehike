import React, { useState, useEffect } from "react";
import ListGroup from "react-bootstrap/ListGroup";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../styles/Run.css";
import JoinButton from "./JoinButton";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import ShowRunInfo from "../ShowRunInfo";
import useAppData from "../../hooks/useAppData";

export default function Run(props) {
  const { run, type, canJoinRun, join } = props;
  const joinStatus = canJoinRun(run.id) || false;
  const [time, setTime] = useState("");
  const [eventTime, setEventTime] = useState("");
  const { pastEvent } = useAppData();
  const [showInfoModal, setShowInfoModal] = useState(false);

  const handleCloseInfoModal = () => {
    setShowInfoModal(false);
  };
  const handleShowInfoModal = () => {
    setShowInfoModal(true);
  };

  const renderTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      <p>Event on: {run.date}</p>
      <p>Click for more</p>
    </Tooltip>
  );

  useEffect(() => {
    if (run.time !== 0 && type === "attended") {
      setTime(`${run.time} min`);
    }
    const eventDate = new Date(run.date);
    if (!pastEvent(eventDate)) {
      setEventTime(`On ${run.date} at ${run.event_time}`);
    } else {
      setEventTime(`Was on ${run.date} at ${run.event_time}`);
    }
  }, []);

  return (
    <>
      <section className="run">
        <img
          id={`run-${run.id}`}
          alt="Shows running space"
          className="run-image"
          src={`https://werun-server.herokuapp.com/api/runs/image/${run.id}`}
        ></img>

        <div className="run-body">
          <div className="run-heading">
            {type === "available" && <span className="run-id">{run.id}</span>}
            <h3>{run.name}</h3>

            <OverlayTrigger
              placement="left"
              delay={{ show: 250, hide: 50 }}
              overlay={renderTooltip}
            >
              <button
                type="button"
                className="detail-button"
                onClick={handleShowInfoModal}
              >
                Details
              </button>
            </OverlayTrigger>
          </div>
          <p>{run.description}</p>
          <div className="run-desc">
            <ListGroup variant="flush">
              <ListGroup.Item>
                <strong>When:</strong> {eventTime}
              </ListGroup.Item>
              <ListGroup.Item>
                <strong>Distance:</strong> {run.distance} km
              </ListGroup.Item>
              {time && (
                <ListGroup.Item>
                  <strong>Recorded Time:</strong> {time}
                </ListGroup.Item>
              )}
            </ListGroup>
            <JoinButton runType={type} joinStatus={joinStatus} join={join} />
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
