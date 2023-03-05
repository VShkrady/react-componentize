import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { userLogout } from '../components/codeChallenge/services/usersService';
import toastr from 'toastr';

function SiteNav(props) {
	const { isLoggedIn } = props.user;
	const navigate = useNavigate();

	const logoutUser = (e) => {
		e.preventDefault();
		console.log('logout is clicked');
		userLogout().then(onUserLogoutSuccess).catch(onUserLogoutError);
	};

	const onUserLogoutSuccess = (response) => {
		console.log(response, 'logout success');
		toastr['success']('User Logged out');
		const currentUser = {
			firstName: 'Unknown',
			lastName: 'User',
			isLoggedIn: false,
		};
		props.setCurrentUser(currentUser);
		navigate('/');
	};

	const onUserLogoutError = (error) => {
		console.log(error);
	};

	return (
		<React.Fragment>
			<nav
				className="navbar navbar-expand-md navbar-dark bg-dark"
				aria-label="Fourth navbar example"
			>
				<h1>
					Welcome, {props.currentUser ? props.currentUser : 'Unknown User'}{' '}
				</h1>
				<div className="container">
					<a className="navbar-brand" href="/">
						<img
							src="https://images"
							width="30"
							height="30"
							className="d-inline-block align-top"
							alt="Code"
						/>
					</a>
					<button
						className="navbar-toggler"
						type="button"
						data-bs-toggle="collapse"
						data-bs-target="#navbarsExample04"
						aria-controls="navbarsExample04"
						aria-expanded="false"
						aria-label="Toggle navigation"
					>
						<span className="navbar-toggler-icon"></span>
					</button>
					<div className="collapse navbar-collapse" id="navbarsExample04">
						<ul className="navbar-nav me-auto mb-2 mb-md-0">
							<li className="nav-item">
								<Link to="/" className="nav-link px-2 text-white link-button">
									Home
								</Link>
							</li>
							<li className="nav-item">
								<Link
									to="/friends"
									className="nav-link px-2 text-white link-button"
								>
									Friends
								</Link>
							</li>
							<li className="nav-item">
								<Link
									to="/jobs"
									className="nav-link px-2 text-white link-button"
								>
									Jobs
								</Link>
							</li>
							<li className="nav-item">
								<Link
									to="/techCompaniesForm"
									className="nav-link px-2 text-white link-button"
								>
									Tech Companies
								</Link>
							</li>
							<li className="nav-item">
								<Link
									to="/events"
									className="nav-link px-2 text-white link-button"
								>
									Events
								</Link>
							</li>
							<li className="nav-item">
								<button
									href="#"
									className="nav-link px-2 text-white link-button"
								>
									Test and Ajax Call
								</button>
							</li>
						</ul>
						<div className="text-end">
							<Link
								to="/"
								href="/"
								className="align-items-center mb-2 me-2 mb-lg-0 text-white text-decoration-none"
							>
								{props.user.firstName}
								{props.user.lastName}
							</Link>
							{!isLoggedIn ? (
								<React.Fragment>
									<Link
										to="/login"
										type="button"
										className="btn btn-outline-light me-2"
									>
										Login
									</Link>
									<Link
										to="/register"
										type="button"
										className="btn btn-warning"
									>
										Register
									</Link>
								</React.Fragment>
							) : (
								<button
									onClick={logoutUser}
									type="button"
									className="btn btn-primary me-2"
								>
									Log Out
								</button>
							)}
							<Link
								to="/newFriend"
								type="button"
								className="btn btn-primary me-2"
							>
								Add Friend
							</Link>
							<Link
								to="/jobsForm"
								type="button"
								className="btn btn-primary me-2"
							>
								Add Job
							</Link>
							<Link
								to="/eventForm"
								type="button"
								className="btn btn-primary me-2"
							>
								Add Event
							</Link>
						</div>
					</div>
				</div>
			</nav>
		</React.Fragment>
	);
}
export default SiteNav;
