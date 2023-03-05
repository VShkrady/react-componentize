import React from "react";
import Modal from "react-bootstrap/Modal";
import Button from 'react-bootstrap/Button';

const JobModal = (props)=>{
    const job = props.job;



 return (
    <Modal
    show={props.showModal}
        onHide={props.onClose}>
    <Modal.Header>
      <Modal.Title>{job.title}</Modal.Title>
    </Modal.Header>

    <Modal.Body>
      <p>{job.description}</p>
      <p>{job.summary}</p>
      <p>{job.pay}</p>
    </Modal.Body>

    <Modal.Footer>
      <Button variant="secondary">Close</Button>
      <Button variant="primary">Save changes</Button>
    </Modal.Footer>
  </Modal>
    );
};

export default JobModal;


