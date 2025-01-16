/* eslint-disable react/prop-types */

import { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";

const ChangeParentPopup = ({ show, setShow }) => {
  // Close the modal
  const handleClose = () => {
    setShow(false);
  };

  // Manage focus state
  const [isFocused, setIsFocused] = useState({
    parentBroker: false,
  });

  // Handle focus for specific fields
  const handleFocus = (field) => {
    setIsFocused((prevState) => ({
      ...Object.keys(prevState).reduce((acc, key) => {
        acc[key] = false; // Reset all focus states
        return acc;
      }, {}),
      [field]: true, // Set focus for the active field
    }));
  };

  return (
    <div>
      {/* Popup Modal */}
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Body className="p-4">
          <h5 className="mb-4">Change Parent User</h5>
          <Form>
            {/* Form Group for Parent Broker */}
            <Form.Group controlId="parentBrokerSelect" className="mb-3 relative">
              <Form.Label
                className={`mb-1 text-primary_clr absolute left-2 z-10 duration-300 ${
                  isFocused.parentBroker
                    ? "text-xs top-0 -translate-y-1/2 bg-white text-primary_clr opacity-100 px-1.5"
                    : "top-1/2 -translate-y-1/2 opacity-0"
                }`}
              >
                Select Parent Broker
              </Form.Label>
              <Form.Select
                onFocus={() => handleFocus("parentBroker")}
                onBlur={() =>
                  setIsFocused((prevState) => ({
                    ...prevState,
                    parentBroker: false,
                  }))
                }
              >
                <option>No Parent</option>
                <option>Parent 1</option>
                <option>Parent 2</option>
                <option>Parent 3</option>
              </Form.Select>
            </Form.Group>
          </Form>
          <div className="d-flex justify-content-end gap-2">
            <Button variant="outline-danger" onClick={handleClose}>
              No
            </Button>
            <Button variant="danger">Yes, Change Broker</Button>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default ChangeParentPopup;
