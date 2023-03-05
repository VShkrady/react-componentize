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
	updateTechCompanies,
	getTechCompaniesById,
	addTechCompanies,
} from './codeChallenge/services/techCompaniesService';

function TechCompaniesForm() {
	const [techCompany, setTechCompany] = useState({
		name: '',
		profile: '',
		summary: '',
		headline: '',
		contactInformation: '',
		slug: '',
		statusId: '',
		images: [{ imageTypeId: 0, imageUrl: '' }],
		urls: [],
		tags: [],
		friendIds: [],
	});

	const navigate = useNavigate();
	const { state } = useLocation();
	const [techCompanyId, setTechCompanyId] = useState({ id: null });

	//AJAX call to get data when component first mounts
	useEffect(() => {
		if (state && state.id)
			getTechCompaniesById(state.id)
				.then(onGetTechCompaniesByIdSuccess)
				.catch(onGetTechCompaniesByIdError);
	}, [state]);

	var onGetTechCompaniesByIdSuccess = (response) => {
		console.log('This is response for Success:', response);
		//set the response to state so that each form field now shows
		//job's data for that field as the value
		setTechCompany((prevState) => {
			const updatedState = { ...prevState, ...response.data.item };
			updatedState.images = response.data.item?.images
				?.map((image) => ({
					imageTypeId: image.imageTypeId,
					imageUrl: image.imageUrl,
				}))
				.join(',');
			updatedState.urls = response.data.item?.urls
				?.map((url) => url.name)
				.join(',');
			updatedState.tags = response.data.item?.tags
				?.map((tag) => tag.name)
				.join(',');
			updatedState.friendIds = response.data.item?.friendIds
				?.map((friendId) => friendId.name)
				.join(',');

			return updatedState;
		});
	};

	var onGetTechCompaniesByIdError = (error) => {
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

		//set a new state by using old property name
		setTechCompany((prevState) => {
			//copy/clone data from state using the spread operator
			const newTechCompany = {
				...prevState,
			};
			//change the value of the copied object using name and bracket notation
			newTechCompany[name] = value;
			/*  newJob.skills = value.split(","); */

			return newTechCompany;
		});
	};

	function onClickSubmit(e) {
		e.preventDefault();
		console.log('event is firing');
		const payload = { ...techCompany };
		payload.images = [
			{
				imageUrl: payload.imageUrl,
				imageTypeId: payload.imageTypeId,
			},
		];
		payload.urls = payload.urls.split(',');
		payload.tags = payload.tags.split(',');
		payload.friendIds = payload.friendIds.split(',');

		console.log('event is firing', payload);

		if (techCompanyId.id !== null) {
			updateTechCompanies(payload, techCompany)
				.then(onUpdateTechCompaniesSuccess)
				.catch(onUpdateTechCompaniesError);
		} else {
			addTechCompanies(payload)
				.then(onAddTechCompaniesSuccess)
				.catch(onAddTechCompaniesError);
		}
	}

	//success handle if database request passed
	var onAddTechCompaniesSuccess = (response) => {
		console.log(response);
		toast.success('Successfully Registered');
		//check on response/id in the console
		setTechCompanyId((prevState) => {
			let techCompanyId = { ...prevState };
			return (techCompanyId.id = response.data.item);
		});
		navigate(`/techCompaniesForm/?id=${response.data.item}`);
	};

	//error handle if database request fails.
	var onAddTechCompaniesError = (error) => {
		console.error({ error });
		toast.error('Error adding record. Please try again.');
	};

	var onUpdateTechCompaniesSuccess = (response) => {
		console.log('Update is firing', response);
		toast.success('Successfully Updated');
		setTechCompanyId((prevState) => {
			let techCompanyId = { ...prevState };
			return (techCompanyId.id = response.data.item);
		});
	};

	var onUpdateTechCompaniesError = (error) => {
		console.error(error);
		toast.error('Error: Please try again');
	};

	return (
		<React.Fragment>
			<ToastContainer />
			<Container className="p-5 mb-4 bg-light rounded-3">
				<Row className="py-5">
					<Col>
						<h3>Add Tech Company</h3>
						<Form>
							<Form.Group as={Row}>
								<Form.Label column md={2} htmlFor="name">
									Name:
								</Form.Label>
								<Col md={6}>
									<FormControl
										type="text"
										name="name"
										value={techCompany.name}
										onChange={handleChange}
									/>
								</Col>
							</Form.Group>

							<Form.Group as={Row}>
								<Form.Label column md={2} htmlFor="profile">
									Profile:
								</Form.Label>
								<Col md={6}>
									<FormControl
										type="text"
										name="profile"
										value={techCompany.profile}
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
										value={techCompany.summary}
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
										value={techCompany.headline}
										onChange={handleChange}
									/>
								</Col>
							</Form.Group>
							<Form.Group as={Row}>
								<Form.Label column md={2} htmlFor="contactInformation">
									Contact Information:
								</Form.Label>
								<Col md={6}>
									<FormControl
										type="text"
										name="contactInformation"
										value={techCompany.contactInformation}
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
										value={techCompany.slug}
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
										value={techCompany.statusId}
										onChange={handleChange}
									/>
								</Col>
							</Form.Group>
							<Form.Group as={Row}>
								<Form.Label column md={2} htmlFor="imageTypeId">
									ImageTypeId:
								</Form.Label>
								<Col md={6}>
									<FormControl
										type="text"
										name="imageTypeId"
										value={techCompany.images.imageTypeId}
										onChange={handleChange}
									/>
								</Col>
							</Form.Group>
							<Form.Group as={Row}>
								<Form.Label column md={2} htmlFor="imageUrl">
									ImageUrl:
								</Form.Label>
								<Col md={6}>
									<FormControl
										type="text"
										name="imageUrl"
										value={techCompany.images.imageUrl}
										onChange={handleChange}
									/>
								</Col>
							</Form.Group>
							<Form.Group as={Row}>
								<Form.Label column md={2} htmlFor="urls">
									Urls:
								</Form.Label>
								<Col md={6}>
									<FormControl
										type="text"
										name="urls"
										value={techCompany.urls}
										onChange={handleChange}
									/>
								</Col>
							</Form.Group>
							<Form.Group as={Row}>
								<Form.Label column md={2} htmlFor="tags">
									Tags:
								</Form.Label>
								<Col md={6}>
									<FormControl
										type="text"
										name="tags"
										value={techCompany.tags}
										onChange={handleChange}
									/>
								</Col>
							</Form.Group>
							<Form.Group as={Row}>
								<Form.Label column md={2} htmlFor="friendIds">
									FriendIds:
								</Form.Label>
								<Col md={6}>
									<FormControl
										type="text"
										name="friendIds"
										value={techCompany.friendIds}
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

export default TechCompaniesForm;
