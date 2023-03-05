import React, { useState, useEffect } from 'react';
import { getAll } from './services/usersService';
import SingleUser from './SingleUser';

function Users() {
	const [user, setUser] = useState({
		originalList: [],
	});

	useEffect(() => {
		getAll().then(onGetAllSuccess).catch(onGetAllError);
	}, []);

	function onGetAllSuccess(arr) {
		console.log('This is arr:', arr);
		setUser((prevState) => {
			const newObj = { ...prevState };
			newObj.originalList = arr.data;
			return newObj;
		});
	}

	function onGetAllError(error) {
		console.log(error);
	}

	const onConsoleLogId = (userId) => {
		console.log('Clicked on User with id:', userId);
	};

	const mappedUsers = (anUser) => {
		return (
			<SingleUser
				key={anUser.id}
				user={anUser}
				onConsoleLogId={() => onConsoleLogId(anUser.id)}
			/>
		);
	};

	const showUser = () => {
		console.log('This is showUser');
		setUser((prevState) => {
			const newUserObj = { ...prevState };
			newUserObj.showUsers = !prevState.showUsers;
			newUserObj.showSideCard = false;
			return newUserObj;
		});
	};
	return (
		<React.Fragment>
			<div className="row">
				<div className="col">
					<button id="show-all" onClick={showUser}>
						Show Users
					</button>
					{user.showUsers && user.originalList.map(mappedUsers)}
				</div>
			</div>
		</React.Fragment>
	);
}

export default Users;
