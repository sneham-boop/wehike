/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useRef } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../styles/RegisterUser.css";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import JoiningStatus from "../JoiningStatus";
import DatePicker from "react-datepicker";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { userState } from "../../hooks/useAppData";
import useAppData from "../../hooks/useAppData";
import useTime from "../../hooks/useTime";
import "react-datepicker/dist/react-datepicker.css";
import ShowHikeRoute from "./ShowHikeRoute";

export default function RegisterRun() {
  const fromRef = useRef(null);
  const toRef = useRef(null);
  const user = useRecoilValue(userState);
  const [joinButtonPressed, setJoinButtonPressed] = useState(false);
  const { currentTime } = useTime();

  const [runData, setRunData] = useState({
    planner_id: "",
    name: "",
    description: "",
    distance: "",
    time: "",
    date: new Date(),
    file: "",
    lat: "",
    lng: "",
    address: "",
    lat_to: "",
    lng_to: "",
    address_to: "",
  });

  const navigate = useNavigate();
  const { createRun } = useAppData();

  const handleChange = (e) => {
    const key = e.target.name;
    const val = e.target.value;
    setRunData((prev) => {
      return { ...prev, [key]: val };
    });
  };

  //Submit to database
  const handleSubmit = (e) => {
    e.preventDefault();
    const response = createRun({ ...runData });
    response && setJoinButtonPressed(true);
  };

  const datePick = () => {
    return (
      <Form.Group controlId="date" className="mb-3" style={{ width: "100%" }}>
        <Form.Label>Date</Form.Label>
        <DatePicker
          className="date-picker"
          required
          name="date"
          selected={new Date(runData.date)}
          onChange={(date) =>
            setRunData((prev) => {
              return { ...prev, date: date.toDateString() };
            })
          }
          key={runData.date}
        />
      </Form.Group>
    );
  };

  useEffect(() => {
    if (!user) {
      navigate("/signin");
    }
    if (user) {
      setTimeout(() => {
        setRunData((prev) => {
          return { ...prev, planner_id: user.id, time: currentTime };
        });
      }, 100);
    }
  }, [currentTime]);

  return (
    <div id="register-run-container">
      <div className="forms">
        <Form
          className="form-container"
          encType="multipart/form-data"
          onSubmit={handleSubmit}
        >
          <div className="form-container-text">
            <Form.Text as="h3">Create a new Hike!</Form.Text>
            <Form.Text as="p">
              Don't see a hiking event near you? Just tell us where and when and
              the rest is on us.
            </Form.Text>
          </div>
          <FloatingLabel controlId="name" label="Name" className="mb-3">
            <Form.Control
              required
              type="text"
              placeholder="Name"
              name="name"
              value={runData.name}
              onChange={(e) => handleChange(e)}
            />
          </FloatingLabel>
          <FloatingLabel
            controlId="description"
            label="Description"
            className="mb-3"
          >
            <Form.Control
              required
              as="textarea"
              type="text"
              name="description"
              placeholder="Description"
              value={runData.description}
              onChange={handleChange}
            />
          </FloatingLabel>

          <Row>
            <Col>
              <FloatingLabel
                controlId="location"
                label="From..."
                className="mb-3"
              >
                <Form.Control
                  required
                  type="text"
                  ref={fromRef}
                  placeholder="From"
                  autoComplete="text"
                />
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                <Form.Control.Feedback type="invalid">
                  Enter a valid address.
                </Form.Control.Feedback>
              </FloatingLabel>
            </Col>
            <Col>
              <FloatingLabel
                controlId="location"
                label="To..."
                className="mb-3"
              >
                <Form.Control
                  required
                  type="text"
                  ref={toRef}
                  placeholder="To"
                  autoComplete="text"
                />
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                <Form.Control.Feedback type="invalid">
                  Enter a valid address.
                </Form.Control.Feedback>
              </FloatingLabel>
            </Col>
          </Row>
          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm="2">
              Distance
            </Form.Label>
            <Col sm="10">
              <Form.Control
                disabled
                readOnly
                value={
                  runData.distance || "Enter 'From..' & 'To..' to see distance."
                }
              />
            </Col>
          </Form.Group>

          <Row>
            <Col>{datePick()}</Col>
            <Col>
              <Form.Group controlId="time" className="mb-3">
                <Form.Label>Time</Form.Label>
                <Form.Control
                  required
                  key={runData.time}
                  type="time"
                  name="time"
                  value={runData.time}
                  onChange={(event) => {
                    const time = event.target.value;
                    setRunData((prev) => {
                      return { ...prev, time: time };
                    });
                  }}
                />
              </Form.Group>
            </Col>
          </Row>
          <Form.Group controlId="formFileLg" className="mb-3">
            <Form.Label>Upload an image</Form.Label>
            <Form.Control
              required
              name="file"
              type="file"
              onChange={(e) =>
                setRunData({ ...runData, file: e.target.files[0] })
              }
            />
          </Form.Group>
          <Button variant="custom" type="submit" className="btn">
            Create
          </Button>
        </Form>
        <JoiningStatus
          joinButtonPressed={joinButtonPressed}
          setJoinButtonPressed={setJoinButtonPressed}
          text="THANK YOU FOR PLANNING A HIKE!"
        />
        <ShowHikeRoute
          fromRef={fromRef}
          toRef={toRef}
          setRunData={setRunData}
        />
      </div>
    </div>
  );
}
