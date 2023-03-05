import React from "react";

const AircraftCard = (props) => {
  return (
    <div className="row">
      <div
        className="card"
        style={{ backgroundColor: "blueviolet" }}
        // booleanOperation ? theThingYouWantIfTrue : theThingYouWantIfFalse
      >
        <h3>{`Id: ${props.aircraft.id} : Tail: ${props.aircraft.tailNumber}`}</h3>
        <p>manufacturer</p>
        <p>{props.aircraft.manufacturer}</p>
      </div>
    </div>
  );
};
export default AircraftCard;