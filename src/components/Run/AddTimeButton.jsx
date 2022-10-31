import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useRecoilValue } from "recoil";
import { userState } from "../../hooks/useAppData";
import useAppData from "../../hooks/useAppData";
import { useNavigate } from "react-router-dom";
import JoiningStatus from "../JoiningStatus";

export default function AddTimeButton({ run, update }) {
  const [showModal, setShowModal] = useState(false);
  const [joinButtonPressed, setJoinButtonPressed] = useState(false);
  const [time, setTime] = useState(run.time);
  const { updateRunTime } = useAppData();
  const user = useRecoilValue(userState);
  const navigate = useNavigate();

  const handleCloseModal = () => {
    setShowModal(false);
  };
  const handleShowModal = () => {
    setShowModal(true);
  };

  const handleSubmit = () => {
    updateRunTime({ run_id: run.id, runner_id: user.id, time: time })
      .then((response) => {
        if (response) {
          setJoinButtonPressed(true);
          handleCloseModal();
        }
      })
      .then(() => {
        update();
        navigate("/profile");
      });
  };

  return (
    <>
      <button
        type="button"
        className="add-time-button"
        onClick={handleShowModal}
      >
        {run.time === 0 && "Add time"}
        {run.time !== 0 && "Update time"}
      </button>
      <Modal
        className="enter-time-modal"
        show={showModal}
        onHide={handleCloseModal}
        size="m"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Enter your time
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form className="add-time-form">
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>
                How did you do on this run? Enter your time below!
              </Form.Label>
              <Form.Control
                type="text"
                placeholder="00:00 min"
                size="lg"
                value={time}
                onChange={(e) => setTime(e.target.value)}
              />
            </Form.Group>

            <Button variant="primary" type="submit" onClick={handleSubmit}>
              Submit
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
      <JoiningStatus
        joinButtonPressed={joinButtonPressed}
        setJoinButtonPressed={setJoinButtonPressed}
        text="PLANNING"
      />
    </>
  );
}
