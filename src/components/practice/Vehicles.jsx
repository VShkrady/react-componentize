import React from "react";

function Vehicles(props) {
  const onDeleteClicked = (e) => {
    props.onDeleteClicked(props.vehicle, e);
  };
  console.log(props);
  return (
    <React.Fragment>
      <div className="card mt-3 mb-3 me-3" style={{ width: "13.8rem" }}>
        <div
          className="card-body"
          style={
            props.vehicle.selected && {
              backgroundColor: "Green",
            }
          }
        >
          <h5 className="card-title">
            {props.vehicle.Make} {props.vehicle.Model}
          </h5>
          <p className="card-text">${props.vehicle.Price}</p>
        </div>
        <div className="row">
          <div className="col">
            <button className="button w-100" onClick={onDeleteClicked}>
              Delete
            </button>
          </div>
          <div className="col">
            <button className="button w-100">Buy</button>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
export default Vehicles;