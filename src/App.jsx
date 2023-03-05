import React, { useState, useEffect } from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import SiteNav from './components/SiteNav';
import Home from './components/Home';
import Footer from './components/Footer';
import NewFriend from './components/NewFriend';
import Friends from './components/Friends';
import Jobs from './components/Jobs';
import JobsForm from './components/JobsForm';
import EventForm from './components/EventForm';
import TechCompaniesForm from './components/TechCompaniesForm';
import Login from './components/Login';
import Events from './components/Events';
import Register from './components/Register';
import Aircraft from './components/Aircraft';
import Users from './components/codeChallenge/Users';
import Dealership from './components/practice/Dealership';
import Cars from './components/codeChallenge/Cars';
import {
	getCurrent,
	getUserById,
} from './components/codeChallenge/services/usersService';

function App() {
	const [currentUser, setCurrentUser] = useState({
		firstName: 'Unknown',
		lastName: 'User',
		isLoggedIn: false,
	});

	useEffect(() => {
		getCurrent().then(onGetCurrentSuccess).catch(onGetCurrentError);
	}, [currentUser.isLoggedIn]);

	function onGetCurrentSuccess(response) {
		console.log('getCurrent is firing', response);
		const currentUser = response.data.item.id;

		getUserById(currentUser)
			.then(onGetUserByIdSuccess)
			.catch(onGetUserByIdError);
	}

	function onGetCurrentError(error) {
		console.error(error);
	}
	function onGetUserByIdSuccess(response) {
		console.log('Response is firing', response);
		const currentUser = {
			firstName: response.data.item.firstName,
			lastName: response.data.item.lastName,
			isLoggedIn: true,
		};
		console.log(currentUser);
		setCurrentUser(currentUser);
	}

	function onGetUserByIdError(error) {
		console.error(error);
	}

	return (
		<React.Fragment>
			<SiteNav user={currentUser} setCurrentUser={setCurrentUser} />
			<div className="container">
				{/* <Home/> */}
				<Routes>
					<Route path="/home" element={<Home user={currentUser} />}></Route>
					<Route
						path="/friends"
						element={<Friends formData={useState} />}
					></Route>
					<Route path="/users" element={<Users formData={useState} />}></Route>
					<Route path="/jobs" element={<Jobs formData={useState} />}></Route>
					<Route
						path="/jobsForm"
						element={<JobsForm formData={useState} />}
					></Route>
					<Route
						path="/jobs/:jobId"
						element={<JobsForm formData={useState} />}
					></Route>
					<Route
						path="/eventForm"
						element={<EventForm formData={useState} />}
					></Route>
					<Route
						path="/events/:eventId"
						element={<EventForm formData={useState} />}
					></Route>
					<Route
						path="/techCompaniesForm"
						element={<TechCompaniesForm formData={useState} />}
					></Route>
					<Route
						path="/newFriend"
						element={<NewFriend formData={useState} />}
					></Route>
					<Route
						path="/friends/:friendId"
						element={<NewFriend formData={useState} />}
					></Route>
					<Route
						path="/login"
						element={<Login setCurrentUser={setCurrentUser} />}
					></Route>
					<Route
						path="/events"
						element={<Events formData={useState} />}
					></Route>
					<Route
						path="/register"
						element={<Register formData={useState} />}
					></Route>
					<Route path="/aircraft" element={<Aircraft />} />
					<Route path="/dealership" element={<Dealership />} />
					<Route path="/cars" element={<Cars />} />
				</Routes>
			</div>
			<Footer />
		</React.Fragment>
	);
}

export default App;
