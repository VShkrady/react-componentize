import React from 'react';

const SingleUser = (props) => {
	const onConsoleLogId = (e) => {
		props.onConsoleLogId(props.user, e);
	};
	return (
		<div className="card">
			<div className="card-body">
				<h5 className="card-title">{props.user.name}</h5>
				<p className="card-text">{props.user.email}</p>
				<button className="select-me btn-primary" onClick={onConsoleLogId}>
					Console Log Id
				</button>
			</div>
		</div>
	);
};

export default SingleUser;
