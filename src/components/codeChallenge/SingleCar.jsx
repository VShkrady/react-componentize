import React from 'react';

const SingleCar = (props) => {
	//const {car, showButton, onCarClicked} = props;
	const onCarClicked = (e) => {
		props.onCarClicked(props.car, e);
	};
	return (
		<div className="card">
			<div className="card-body">
				<h5 className="card-title">{props.car.make}</h5>
				<p className="card-text">{props.car.model}</p>
				<p className="card-text">{props.car.year}</p>
				{/* <h5 className="card-title">{car.make}</h5>
            <p className="card-text">{car.model}</p>
            <p className="card-text">{car.year}</p> */}
				{props.showButton && (
					<button className="select-me btn-primary" onClick={onCarClicked}>
						Select Me
					</button>
				)}
			</div>
		</div>
	);
};

export default SingleCar;
