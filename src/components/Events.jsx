import React, { useState, useEffect } from 'react';
import 'rc-pagination/assets/index.css';
import {
	eventsSearch,
	eventsPaginated,
	feedsEvents,
} from '../components/codeChallenge/services/eventsService';
import Pagination from 'rc-pagination';
import locale from 'rc-pagination/lib/locale/en_US';
import moment from 'moment';
import { Container, Row, Col, Form, Button, Card } from 'react-bootstrap';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import { CardBody } from 'reactstrap';
import { useNavigate } from 'react-router-dom';
import EventsModal from './EventsModal';

const containerStyle = {
	width: '400px',
	height: '400px',
};

const center = {
	lat: -3.745,
	lng: -38.523,
};

function Events() {
	//left side card state
	const [eventData, setEventData] = useState({});
	//right side state
	const [events, setEvents] = useState({
		arrayOfEvents: [],
		eventComponents: [],
		totalEvents: '',
		currentPageSize: 10,
		currentPageIndex: 0,
	});
	const [searchQuery, setSearchQuery] = useState({
		q: '',
		dateStart: '',
		dateEnd: '',
	});

	const [selectedEvent, setSelectedEvent] = useState({});
	const navigate = useNavigate();
	const [showModal, setShowModal] = useState(false);

	console.log('eventData:', eventData);

	useEffect(() => {
		feedsEvents().then(onGetEventsSuccess).catch(onGetEventsError);
	}, []);

	function onGetEventsSuccess(data) {
		console.log('onGetEventsSuccess data:', data);
		const arrayOfNewEvents = data.item['090_Weekday'];

		setEvents((prevState) => {
			const newEvent = { ...prevState };
			newEvent.arrayOfEvents = arrayOfNewEvents;
			newEvent.eventComponents = arrayOfNewEvents.map(mapEvent);
			return newEvent;
		});
		setEventData(arrayOfNewEvents[0]);
	}

	function onGetEventsError(error) {
		console.error(error);
	}

	const mapEvent = (event) => {
		console.log('mapAnEvent is firing:', event);
		return (
			<Card key={event.id} className="mb-2">
				<Card.Body>
					<Card.Title>{event.name}</Card.Title>
					<Card.Subtitle>{event.summary}</Card.Subtitle>
					<Card.Text>{event.description}</Card.Text>
					<Card.Text>{event.metaData?.dateStart}</Card.Text>
				</Card.Body>
				<Button
					className="btn btn-primary"
					onClick={() => onViewMoreClick(event)}
				>
					View More
				</Button>
				<Button
					className="btn btn-success"
					onClick={() => onEditClick(event.id)}
					name="editBtn"
					id="editBtn"
				>
					Edit
				</Button>
			</Card>
		);
	};

	const onEditClick = (eventId) => {
		const eventToEdit = events.arrayOfEvents.find(
			(event) => event.id === eventId
		);
		navigate(`/eventForm`, { state: eventToEdit });
	};

	const onViewMoreClick = (event) => {
		console.log('this is my event', event);
		/* const eventToShow = events.arrayOfEvents.find(
			(event) => event.id === eventId
		);
		console.log('This is eventId for onViewMore:', eventId); */
		setSelectedEvent(event);
		setShowModal(true);
	};

	const eventModal = (
		<EventsModal
			showModal={showModal}
			setShowModal={setShowModal}
			selectedEvent={selectedEvent}
		/>
	);

	const onFormChange = (e) => {
		//e.target represent the input
		const target = e.target;
		//the value user type in the text box
		const value = target.value;
		//the name of form fields
		const name = target.name;

		//set a new state by using old property name
		setSearchQuery((prevState) => {
			//copy/clone data from state using the spread operator
			const newEventObj = { ...prevState };
			//change the value of the copied object using name and bracket notation
			newEventObj[name] = value;

			return newEventObj;
		});
	};

	const onSearchClicked = (e) => {
		e.preventDefault();
		console.log('searchQuery', searchQuery);

		const startMoment = moment(searchQuery.dateStart, 'YYYY-MM-DD');
		const endMoment = moment(searchQuery.dateEnd, 'YYYY-MM-DD');

		console.log('startMoment', startMoment);
		console.log('endMoment', endMoment);

		const formattedStart = startMoment.format('YYYY/MM/DD');
		const formattedEnd = endMoment.format('YYYY/MM/DD');

		eventsSearch(0, 10, formattedStart, formattedEnd)
			.then(onSearchSuccess)
			.catch(onSearchError);
	};

	function onSearchSuccess(data) {
		console.log('This is Search data:', data);
		const arrayOfNewEvents = data.data.item.pagedItems;

		setEvents((prevState) => {
			const newEvents = { ...prevState };
			newEvents.arrayOfEvents = arrayOfNewEvents;
			newEvents.eventComponents = newEvents.arrayOfEvents.map(mapEvent);
			newEvents.totalEvents = data.data.item.totalCount;
			console.log('This is newEvents.event:', newEvents.eventComponents);
			return newEvents;
		});
	}

	function onSearchError(error) {
		console.log(error);
	}

	const handleSearchDataChange = (e) => {
		e.preventDefault();

		const name = e.currentTarget.name;
		const value = e.currentTarget.value;

		console.log('name', name);
		console.log('value', value);

		setSearchQuery((prevState) => {
			const updatedState = { ...prevState };
			updatedState[name] = value;

			return updatedState;
		});
	};

	useEffect(() => {
		console.log('useEffect firing for pagination');
		eventsPaginated(events.currentPageIndex, events.currentPageSize)
			.then(onGetPageSuccess)
			.catch(onGetPageError);
	}, [events.currentPageIndex, events.currentPageSize]);

	function onGetPageSuccess(data) {
		console.log('This is PageSuccess Data', data);

		setEvents((prevState) => {
			const newEvents = { ...prevState };
			newEvents.arrayOfEvents = data.item.pagedItems;
			newEvents.totalEvents = data.item.totalCount;
			newEvents.currentPageSize = data.item.pageSize;
			newEvents.currentPageIndex = data.item.pageIndex;

			return newEvents;
		});
	}

	function onGetPageError(error) {
		console.error(error);
	}

	const onPageChange = (page) => {
		console.log('This is the page', page);

		setEvents((prevState) => {
			const newEvents = { ...prevState };
			newEvents.currentPageIndex = page;
			console.log('This is currentPageIndex:', page);
			return newEvents;
		});

		eventsPaginated(page, events.currentPageSize)
			.then(onGetPageSuccess)
			.catch(onGetPageError);
	};

	return (
		<React.Fragment>
			<Container>
				<Row>
					<Col md={6}>
						<div className="container-left">
							<div className="mb-2">
								<Card key={eventData.id} className="mb-2">
									<Card.Body>
										<Card.Title>{eventData.name}</Card.Title>
										<Card.Subtitle>
											{eventData.metaData?.location.address}
										</Card.Subtitle>
										<Card.Text>{eventData.description}</Card.Text>
										<Card.Text>{eventData.metaData?.dateStart}</Card.Text>
									</Card.Body>
								</Card>
							</div>
						</div>
						<div className="mapView">
							<LoadScript googleMapsApiKey="AIzaSyAlkYkBWlu9dHfLbJMgZSeHhiXgtuuO124">
								<GoogleMap
									mapContainerStyle={containerStyle}
									center={center}
									zoom={10}
								>
									<Marker position={center} />
								</GoogleMap>
							</LoadScript>
						</div>
					</Col>
					<Col md={6}>
						<Pagination
							onChange={onPageChange}
							current={events.currentPageIndex}
							total={events.totalEvents}
							locale={locale}
						/>
						<div className="container-right">
							<Form className="justify-content-end" onChange={onFormChange}>
								<Form.Group className="mb-2">
									<Form.Label htmlFor="start">
										Start Date:
										<Form.Control
											type="date"
											id="start"
											value={searchQuery.dateStart}
											name={'dateStart'}
											onChange={handleSearchDataChange}
										/>
									</Form.Label>
								</Form.Group>
								<Form.Group className="mb-2">
									<Form.Label htmlFor="end">
										End Date:
										<Form.Control
											type="date"
											id="end"
											value={searchQuery.dateEnd}
											name={'dateEnd'}
											onChange={handleSearchDataChange}
										/>
									</Form.Label>
								</Form.Group>
								<Form.Control
									type="text"
									name="q"
									onChange={(e) => setSearchQuery(e.target.value)}
								/>
								<Button
									variant="outline-success"
									className="my-2 my-sm-0"
									onClick={onSearchClicked}
									id="searchBtn"
								>
									Search
								</Button>
							</Form>
							<Button
								className="btn btn-primary"
								onClick={() => onViewMoreClick(events)}
							>
								View More On Map
							</Button>
							<div className="mb-2">
								{events.eventComponents.length > 0 && (
									<React.Fragment>
										<Card>
											<CardBody>{events.eventComponents}</CardBody>
										</Card>
									</React.Fragment>
								)}
								{showModal && (
									<EventsModal
										event={selectedEvent}
										onClose={eventModal}
										showModal={showModal}
									/>
								)}
							</div>
						</div>
					</Col>
				</Row>
			</Container>
		</React.Fragment>
	);
}

export default Events;
