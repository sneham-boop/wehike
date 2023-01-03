import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import { useNavigate } from "react-router-dom";

export default function ProfileActions(props) {
  const navigate = useNavigate();
  const [action, setAction] = useState("");

  const handleClick = (link) => {
    navigate(link);
  };

  const renderTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      {action}
    </Tooltip>
  );

  return (
    <>
      <Container className="profile-actions">
        <OverlayTrigger
          placement="left"
          delay={{ show: 250, hide: 50 }}
          overlay={renderTooltip}
        >
          <span
            className="material-symbols-rounded"
            onClick={() => handleClick("/create")}
            onMouseEnter={()=>setAction("Plan A Hike")}
          >
            group_work
          </span>
        </OverlayTrigger>
        <OverlayTrigger
          placement="left"
          delay={{ show: 250, hide: 50 }}
          overlay={renderTooltip}
        >
          <span
            className="material-symbols-rounded"
            onClick={() => handleClick("/hike")}
            onMouseEnter={()=>setAction("Join A Hike")}
          >
            run_circle
          </span>
        </OverlayTrigger>
      </Container>
    </>
  );
}
