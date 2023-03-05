import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const containerStyle = {
	width: '400px',
	height: '400px',
};

const center = {
	lat: -3.745,
	lng: -38.523,
};

function EventsModal(props) {
	console.log('this are my props', props);
	return (
		<Modal show={props.showModal} onHide={props.onClose}>
			<Modal.Header>
				<Modal.Title>{props.event.name}</Modal.Title>
			</Modal.Header>

			<Modal.Body>
				<p>{props.event.description}</p>
				<p>{props.event.metaData?.dateStart}</p>
				<LoadScript googleMapsApiKey="API_Key">
					<GoogleMap
						mapContainerStyle={containerStyle}
						center={center}
						zoom={10}
					>
						<Marker position={center} />
					</GoogleMap>
				</LoadScript>
			</Modal.Body>
			<Modal.Footer>
				<Button
					variant="secondary" /* onClick={() =>props.setShowModal(false)} */
				>
					Close
				</Button>
				<Button variant="primary">Save changes</Button>
			</Modal.Footer>
		</Modal>
	);
}

export default EventsModal;
