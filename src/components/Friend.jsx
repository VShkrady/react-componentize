import React from 'react';
import { useNavigate } from 'react-router-dom';

function Friend(props) {
	console.log('Friend is firing', props.friend);
	const navigate = useNavigate();

	const aFriend = props.friend;

	//local click handler serves as a way to communicate with parent by passing
	//friend data and event object to the function as a prop
	const onLocalFriendClicked = (event) => {
		event.preventDefault();
		props.onFriendClicked(props.friend, event);

		// onLocalFriendClicked
	};

	const onEditClick = () => {
		//uses push method to add a new entry to the browesr's history and navigate
		//to newFriend page while passing friendId as param in URL
		navigate(`/friends/${aFriend.id}`, { state: aFriend });
	};
	return (
		<div className="col-md-3">
			<div className="card">
				<img
					className="card-img-top"
					src={aFriend.primaryImage && aFriend.primaryImage.imageUrl}
					onClick={onLocalFriendClicked}
					alt="I Love Code"
				/>
				<div className="card-body">
					<h5 className="card-title">{aFriend.title}</h5>
					<p className="card-text">{aFriend.summary}</p>
					<button className="btn btn-primary" onClick={onLocalFriendClicked}>
						Delete
					</button>
					<button
						className="btn btn-primary"
						onClick={() => onEditClick(aFriend.id)}
						name="editBtn"
						id="editBtn"
					>
						Edit
					</button>
				</div>
			</div>
		</div>
	);
} //React.memo tells react to re-render if props changed
export default React.memo(Friend);
