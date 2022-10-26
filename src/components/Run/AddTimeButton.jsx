import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useRecoilValue } from "recoil";
import { userState } from "../../hooks/useAppData";
import { useNavigate } from "react-router-dom";

export default function AddTimeButton(props) {
  const [showModal, setShowModal] = useState(false);

  const handleCloseModal = () => {
    setShowModal(false);
  };
  const handleShowModal = () => {
    setShowModal(true);
  };

  return (
    <>
      <button
        type="button"
        className="add-time-button"
        onClick={handleShowModal}
      >
        Add Time
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
              <Form.Control type="email" placeholder="00:00 min" size="lg" />
            </Form.Group>

            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}
