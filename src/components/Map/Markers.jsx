import React, {useState, useEffect} from "react";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import useTime from "../../hooks/useTime";
import "../../styles/Marker.css";

const Markers = ({ id, $hover, description, distance, date }) => {
  const { formatTime } = useTime();
  const [eventTime, setEventTime] = useState("");
  const renderTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      <p>
        {description}
        {distance && ` (${distance})`}
      </p>
      <p>{date && `${eventTime}`}</p>
    </Tooltip>
  );

  useEffect(() => {
    setEventTime(`${new Date(date).toDateString()} at ${formatTime(new Date(date))}`);
  }, [date]);

  const goToRun = (id) => {
    const element = document.getElementById(`run-${id}`);
    element.scrollIntoView();
  };

  return (
    <OverlayTrigger
      placement="left"
      delay={{ show: 100, hide: 100 }}
      overlay={renderTooltip}
    >
      {/* <a href={`#run-${id}`}> */}
        <div
          className={$hover ? "circle hover" : "circle"}
          onClick={()=>goToRun(id)}
        >
          <span className="circleText">
            {id}
          </span>
        </div>
      {/* </a> */}
    </OverlayTrigger>
  );
};

export default Markers;
