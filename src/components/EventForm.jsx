import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useLocation, useNavigate } from 'react-router-dom';
import {
	Form,
	Row,
	Col,
	Button,
	Container,
	FormControl,
} from 'react-bootstrap';
import {
	updateEvents,
	getEventsBySlug,
	addEvents,
} from './codeChallenge/services/eventsService';

function EventForm() {
	const [event, setEvent] = useState({
		metaData: {
			dateStart: '',
			dateEnd: '',
			location: {
				latitude: '',
				longitude: '',
				zipCode: '',
				address: '',
			},
		},
		name: '',
		headline: '',
		description: '',
		summary: '',
		slug: '',
		statusId: '',
	});

	const navigate = useNavigate();
	const { state } = useLocation();
	const [eventId, setEventId] = useState({ id: null });

	//AJAX call to get data when component first mounts
	useEffect(() => {
		if (state && state.id)
			getEventsBySlug(state.id)
				.then(onGetEventsBySlugSuccess)
				.catch(onGetEventsBySlugError);
	}, [state]);

	var onGetEventsBySlugSuccess = (response) => {
		console.log('This is response for Success:', response);
		//set the response to state so that each form field now shows
		//event's data for that field as the value
		setEvent((prevState) => {
			const updatedState = { ...prevState, ...response.data.item };
			updatedState.metaData = response.data.item?.metaData
				? {
						dateStart: response.data.item.metaData.dateStart,
						dateEnd: response.data.item.metaData.dateEnd,
						location: response.data.item.metaData.location,
						zipCode: response.data.item.metaData.location.zipCode,
						address: response.data.item.metaData.location.address,
						latitude: response.data.item.metaData.location.latitude,
						longitude: response.data.item.metaData.location.longitude,
				  }
				: {};
			/*   updatedState.skills = response.data.item?.skills?.map(skill=>skill.name).join(",")  // edit this
    updatedState.techCompanyId = response.data.item?.techCompany?.id */

			return updatedState;
		});
	};

	var onGetEventsBySlugError = (error) => {
		console.error({ error });
	};

	//function captures event
	const handleChange = (e) => {
		//e.target represent the input
		const target = e.target;
		//the value user type in the text box
		const value = target.value;

		//the name of form fields
		const name = target.name;

		setEvent((prevState) => {
			const newEvent = { ...prevState };
			//change the value of the copied object using name and bracket notation
			if (name === 'dateStart') {
				newEvent.metaData.dateStart = value;
			} else if (name === 'dateEnd') {
				newEvent.metaData.dateEnd = value;
			} else if (name === 'latitude') {
				newEvent.metaData.location.latitude = value;
			} else if (name === 'longitude') {
				newEvent.metaData.location.longitude = value;
			} else if (name === 'zipCode') {
				newEvent.metaData.location.zipCode = value;
			} else if (name === 'address') {
				newEvent.metaData.location.address = value;
			} else {
				newEvent[name] = value;
			}
			return newEvent;
		});
	};

	function onClickSubmit(e) {
		console.log('event is firing');
		e.preventDefault();
		if (eventId.id !== null) {
			updateEvents(eventId, event)
				.then(onUpdateEventsSuccess)
				.catch(onUpdateEventsError);
		} else {
			addEvents(event).then(onAddEventsSuccess).catch(onAddEventsError);
		}
	}

	//success handle if database request passed
	const onAddEventsSuccess = (response) => {
		console.log(response);
		toast.success('Successfully Registered');
		//check on response/id in the console
		setEventId((prevState) => {
			let eventId = { ...prevState };
			return (eventId.id = response.data.item);
		});
		navigate(`/eventForm/?id=${response.data.item}`);
	};

	//error handle if database request fails.
	const onAddEventsError = (error) => {
		console.error({ error });
		toast.error('Error adding record. Please try again.');
	};

	const onUpdateEventsSuccess = (response) => {
		console.log('Update is firing', response);
		toast.success('Successfully Updated');
		setEventId((prevState) => {
			let eventId = { ...prevState };
			return (eventId.id = response.data.item);
		});
	};

	const onUpdateEventsError = (error) => {
		console.error(error);
		toast.error('Error: Please try again');
	};

	return (
		<React.Fragment>
			<ToastContainer />
			<Container className="p-5 mb-4 bg-light rounded-3">
				<Row className="py-5">
					<Col>
						<h3>Add Event</h3>
						<Form>
							<Form.Group as={Row}>
								<Form.Label column md={2} htmlFor="dateStart">
									Date Start:
								</Form.Label>
								<Col md={6}>
									<FormControl
										type="date"
										name="dateStart"
										value={event.metaData?.dateStart}
										onChange={handleChange}
									/>
								</Col>
							</Form.Group>
							<Form.Group as={Row}>
								<Form.Label column md={2} htmlFor="dateEnd">
									Date End:
								</Form.Label>
								<Col md={6}>
									<FormControl
										type="date"
										name="dateEnd"
										value={event.metaData?.dateEnd}
										onChange={handleChange}
									/>
								</Col>
							</Form.Group>
							<Form.Group as={Row}>
								<Form.Label column md={2} htmlFor="latitude">
									Latitude:
								</Form.Label>
								<Col md={6}>
									<FormControl
										type="text"
										name="latitude"
										value={event.metaData?.location?.latitude}
										onChange={handleChange}
									/>
								</Col>
							</Form.Group>
							<Form.Group as={Row}>
								<Form.Label column md={2} htmlFor="longitude">
									Longitude:
								</Form.Label>
								<Col md={6}>
									<FormControl
										type="text"
										name="longitude"
										value={event.metaData?.location?.longitude}
										onChange={handleChange}
									/>
								</Col>
							</Form.Group>
							<Form.Group as={Row}>
								<Form.Label column md={2} htmlFor="address">
									Address:
								</Form.Label>
								<Col md={6}>
									<FormControl
										type="text"
										name="address"
										value={event.metaData?.location?.address}
										onChange={handleChange}
									/>
								</Col>
							</Form.Group>
							<Form.Group as={Row}>
								<Form.Label column md={2} htmlFor="zipCode">
									Zip Code:
								</Form.Label>
								<Col md={6}>
									<FormControl
										type="text"
										name="zipCode"
										value={event.metaData?.location?.zipCode}
										onChange={handleChange}
									/>
								</Col>
							</Form.Group>
							<Form.Group as={Row}>
								<Form.Label column md={2} htmlFor="name">
									Name:
								</Form.Label>
								<Col md={6}>
									<FormControl
										type="text"
										name="name"
										value={event.name}
										onChange={handleChange}
									/>
								</Col>
							</Form.Group>
							<Form.Group as={Row}>
								<Form.Label column md={2} htmlFor="headline">
									Headline:
								</Form.Label>
								<Col md={6}>
									<FormControl
										type="text"
										name="headline"
										value={event.headline}
										onChange={handleChange}
									/>
								</Col>
							</Form.Group>

							<Form.Group as={Row}>
								<Form.Label column md={2} htmlFor="description">
									Description:
								</Form.Label>
								<Col md={6}>
									<FormControl
										type="text"
										name="description"
										value={event.description}
										onChange={handleChange}
									/>
								</Col>
							</Form.Group>

							<Form.Group as={Row}>
								<Form.Label column md={2} htmlFor="summary">
									Summary:
								</Form.Label>
								<Col md={6}>
									<FormControl
										type="text"
										name="summary"
										value={event.summary}
										onChange={handleChange}
									/>
								</Col>
							</Form.Group>
							<Form.Group as={Row}>
								<Form.Label column md={2} htmlFor="slug">
									Slug:
								</Form.Label>
								<Col md={6}>
									<FormControl
										type="text"
										name="slug"
										value={event.slug}
										onChange={handleChange}
									/>
								</Col>
							</Form.Group>

							<Form.Group as={Row}>
								<Form.Label column md={2} htmlFor="statusId">
									StatusId:
								</Form.Label>
								<Col md={6}>
									<FormControl
										type="text"
										name="statusId"
										value={event.statusId}
										onChange={handleChange}
									/>
								</Col>
							</Form.Group>
							<Button
								type="submit"
								className="btn btn-primary"
								onClick={onClickSubmit}
								name="submitBtn"
								id="submit"
							>
								Submit
							</Button>
						</Form>
					</Col>
				</Row>
			</Container>
		</React.Fragment>
	);
}

export default EventForm;
