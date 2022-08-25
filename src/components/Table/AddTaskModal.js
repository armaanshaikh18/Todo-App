/**
 * Add Task Modal
 */
import React, { useRef, useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";

const AddModal = ({ show, handleClose, handleSubmit }) => {
  const taskRef = useRef();
  const startRef = useRef();
  const endRef = useRef();
  const statusRef = useRef();
  const [checkbox, setCheckbox] = useState(false);

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Task</Modal.Title>
        </Modal.Header>
        <Form
          onSubmit={(e) =>
            handleSubmit(
              e,
              taskRef.current.value,
              startRef.current.value,
              endRef.current.value,
              statusRef.current.value,
              checkbox
            )
          }
        >
          <Modal.Body>
            <Form.Group>
              <Form.Label>Task</Form.Label>
              <Form.Control
                placeholder="Enter Task Here..."
                type="text"
                ref={taskRef}
                required
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Start Date</Form.Label>
              <Form.Control
                placeholder="Enter Start Date Here..."
                type="date"
                ref={startRef}
                required
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>End Date</Form.Label>
              <Form.Control
                placeholder="Enter End Date Here..."
                type="date"
                ref={endRef}
                required
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Details</Form.Label>
              <Form.Control
                placeholder="Enter Detail Here..."
                type="text"
                ref={statusRef}
                required
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Status</Form.Label>
              <Form.Group className="mb-3" controlId="formBasicCheckbox">
                <Form.Check
                  type="checkbox"
                  label="Status Completed"
                  onChange={() => setCheckbox(!checkbox)}
                />
              </Form.Group>
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button type="submit" variant="success">
              Add
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
};

export default AddModal;
