import React, { useState, useEffect } from 'react';
import {
	addFriend,
	updateFriend,
	getFriendById,
} from './codeChallenge/services/friendService';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useLocation, useNavigate } from 'react-router-dom';

function NewFriend() {
	const [formData, setFormData] = useState({
		title: '',
		bio: '',
		summary: '',
		headline: '',
		slug: '',
		statusId: '',
		primaryImage: '',
	});
	/* const {friendId} = useParams(); */
	const navigate = useNavigate();
	const { state } = useLocation();
	const [userId, setUserId] = useState({ id: null });

	//AJAX call to get data when component first mounts
	useEffect(() => {
		if (state && state.id)
			getFriendById(state.id).then(onGetFriendSuccess).catch(onGetFriendError);
	}, [state]);

	function onGetFriendSuccess(response) {
		console.log(response);
		//set the response to state so that each form field now shows
		//friend's data for that field as the value
		setFormData(response.data.item);
	}

	function onGetFriendError(error) {
		console.log(error);
	}

	//function captures event
	const onClickChange = (e) => {
		//e.target represent the input
		const target = e.target;
		//the value user type in the text box
		const value = target.value;
		//the name of form fields
		const name = target.name;

		//set a new state by using old property name
		setFormData((prevState) => {
			//copy/clone data from state using the spread operator
			const newFormData = {
				...prevState,
			};
			//change the value of the copied object using name and bracket notation
			newFormData[name] = value;
			return newFormData;
		});
	};

	function onClickSubmit(e) {
		e.preventDefault();
		if (userId.id !== null) {
			updateFriend(userId, formData)
				.then(onUpdateFriendSuccess)
				.catch(onUpdateFriendError);
		} else {
			addFriend(formData).then(onAddFriendSuccess).catch(onAddFriendError);
		}
	}

	const onAddFriendSuccess = (response) => {
		console.log(response);
		toast.success('Successfully Registered');
		//check on response/id in the console
		setUserId((prevState) => {
			let userId = { ...prevState };
			return (userId.id = response.data.item);
		});
		navigate(`/newFriend/?=${response.data.item}`);
	};

	function onUpdateFriendSuccess(response) {
		console.log('Update is firing', response);
		toast.success('Successfully Updated');
		setUserId((prevState) => {
			let userId = { ...prevState };
			return (userId.id = response.data.item);
		});
	}

	function onUpdateFriendError(error) {
		console.error(error);
		toast.error('Error: Please try again');
	}

	function onAddFriendError(error) {
		console.error(error);
		toast.error('Error: Please try again');
	}

	return (
		<React.Fragment>
			<ToastContainer />
			<div className="container">
				<div className="p-5 mb-4 bg-light rounded-3">
					<div className="container-fluid py-5">
						<h3> Add Friend</h3>

						<form>
							<div className="form-row">
								<div className="form-group col-md-6">
									<label htmlFor="title">Title</label>
									<input
										type="text"
										className="form-control"
										name="title"
										value={formData.title}
										onChange={onClickChange}
										id="title"
									/>
								</div>
							</div>
							<div className="form-row">
								<div className="form-group col-md-6">
									<label htmlFor="bio">Bio</label>
									<input
										type="text"
										className="form-control"
										name="bio"
										value={formData.bio}
										onChange={onClickChange}
										id="bio"
									/>
								</div>
							</div>
							<div className="form-row">
								<div className="form-group col-md-6">
									<label htmlFor="summary">Summary</label>
									<input
										type="text"
										className="form-control"
										name="summary"
										value={formData.summary}
										onChange={onClickChange}
										id="summary"
									/>
								</div>
							</div>
							<div className="form-row">
								<div className="form-group col-md-6">
									<label htmlFor="headline">Headline</label>
									<input
										type="text"
										className="form-control"
										name="headline"
										value={formData.headline}
										onChange={onClickChange}
										id="headline"
									/>
								</div>
							</div>
							<div className="form-row">
								<div className="form-group col-md-6">
									<label htmlFor="slug">Slug</label>
									<input
										type="text"
										className="form-control"
										name="slug"
										value={formData.slug}
										onChange={onClickChange}
										id="slug"
									/>
								</div>
							</div>
							<div className="form-row">
								<div className="form-group col-md-6">
									<label htmlFor="statusId">StatusId</label>
									<input
										type="text"
										className="form-control"
										name="statusId"
										value={formData.statusId}
										onChange={onClickChange}
										id="statusId"
									/>
								</div>
							</div>
							<div className="form-row">
								<div className="form-group col-md-6">
									<label htmlFor="primaryImage">Primary Image</label>
									<input
										type="text"
										className="form-control"
										name="primaryImage"
										value={formData.primaryImage.imageUrl}
										onChange={onClickChange}
										id="primaryImage"
									/>
								</div>
							</div>
							<div className="form-group d-none">
								<label htmlFor="tenantId">id</label>
								<input
									type="text"
									className="form-control"
									value={formData.tenantId}
									onChange={onClickChange}
									id="tenantId"
									name="tenantId"
								/>
							</div>
							<button
								type="submit"
								className="btn btn-primary"
								onClick={onClickSubmit}
								name="submitBtn"
								id="submit"
							>
								Submit
							</button>
						</form>
					</div>
				</div>
			</div>
		</React.Fragment>
	);
}
export default NewFriend;
