import React, { useEffect, useState } from 'react';
import Vehicles from './Vehicles';

const Inventory = [
	{
		Make: 'Acura',
		Model: 'MDX',
		Price: 49550,
		Year: 2023,
		Condition: 'New',
		Color: 'Gray',
		Type: 'SUV',
	},
	{
		Make: 'Acura',
		Model: 'Integra',
		Price: 32800,
		Year: 2023,
		Condition: 'New',
		Color: 'White',
		Type: 'Car',
	},
	{
		Make: 'Audi',
		Model: 'A5',
		Price: 44100,
		Year: 2023,
		Condition: 'New',
		Color: 'White',
		Type: 'Car',
	},
	{
		Make: 'Ford',
		Model: 'Ranger',
		Price: 27400,
		Year: 2018,
		Condition: 'Used',
		Color: 'Red',
		Type: 'Truck',
	},
	{
		Make: 'Nissan',
		Model: 'Versa',
		Price: 15080,
		Year: 2020,
		Condition: 'Used',
		Color: 'Black',
		Type: 'Car',
	},
	{
		Make: 'Ford',
		Model: 'F-150',
		Price: 33695,
		Year: 2023,
		Condition: 'New',
		Color: 'Blue',
		Type: 'Truck',
	},
	{
		Make: 'Mazda',
		Model: 'Mazda3',
		Price: 22550,
		Year: 2022,
		Condition: 'Used',
		Color: 'Red',
		Type: 'Car',
	},
	{
		Make: 'Ram',
		Model: '1500',
		Price: 33975,
		Year: 2021,
		Condition: 'Used',
		Color: 'Blue',
		Type: 'Truck',
	},
	{
		Make: 'Hyundai',
		Model: 'Tucson',
		Price: 26450,
		Year: 2023,
		Condition: 'New',
		Color: 'Black',
		Type: 'SUV',
	},
	{
		Make: 'BMW',
		Model: 'X3',
		Price: 45400,
		Year: 2019,
		Condition: 'Used',
		Color: 'Gray',
		Type: 'SUV',
	},
	{
		Make: 'Kia',
		Model: 'Soul',
		Price: 19790,
		Year: 2023,
		Condition: 'New',
		Color: 'Red',
		Type: 'SUV',
	},
	{
		Make: 'Chevrolet',
		Model: 'Silverado',
		Price: 35600,
		Year: 2023,
		Condition: 'New',
		Color: 'Black',
		Type: 'Truck',
	},
];

function Dealership() {
	const [inventoryData, setInventoryData] = useState();
	const [formData, setFormData] = useState();

	useEffect(() => {
		setInventoryData((prevState) => {
			const obj = { ...prevState };
			obj.inventory = [...Inventory];
			obj.cars = obj.inventory.filter(filterCars);
			obj.suv = obj.inventory.filter(filterSuvs);
			obj.trucks = obj.inventory.filter(filterTrucks);
			obj.sortedInventory = [...obj.cars, ...obj.suv, ...obj.trucks];
			return obj;
		});
	}, []);

	const filterCars = (car) => {
		if (car.Type === 'Car') {
			return true;
		}
	};

	const filterSuvs = (suv) => {
		if (suv.Type === 'SUV') {
			return true;
		}
	};

	const filterTrucks = (truck) => {
		if (truck.Type === 'Truck') {
			return true;
		}
	};

	const mapVehicle = (vehicle) => {
		return <Vehicles vehicle={vehicle} onDeleteClicked={onParentDelete} />;
	};

	const onParentDelete = (vehicleObject, event) => {
		console.log(vehicleObject.Model);
		console.log(event);
		console.log('Parent Clicked');
		setInventoryData((prevState) => {
			const obj = { ...prevState };
			// THIS IS NOT THE USUAL WAY TO DO THIS!!!
			obj.sortedInventory = obj.sortedInventory.filter(
				//filters and then removes the vehicle obj. that matches the model of the
				//vehicleObject passed as an argument
				(vehicle) => vehicle.Model !== vehicleObject.Model
			);
			return obj;
		});
	};

	const onFormFieldChange = (event) => {
		console.log('onChange', { syntheticEvent: event });
		const target = event.target;
		const value = target.value;
		const name = target.name;
		setFormData((prevState) => {
			console.log('updater onChange');
			const newUserObject = {
				...prevState,
			};
			newUserObject[name] = value;
			return newUserObject;
		});
	};

	const highlight = () => {
		setInventoryData((prevState) => {
			const obj = { ...prevState };
			obj.sortedInventory = obj.sortedInventory.map(styleCard);
			return obj;
		});
		console.log(formData);
	};

	const styleCard = (vehicle) => {
		if (
			vehicle.Make === formData.search ||
			vehicle.Model === formData.search ||
			vehicle.Price === formData.search ||
			vehicle.Year === formData.search ||
			vehicle.Condition === formData.search ||
			vehicle.Color === formData.search ||
			vehicle.Type === formData.search
		) {
			const newVehicleObj = { ...vehicle };
			newVehicleObj.selected = true;
			return newVehicleObj;
		} else return vehicle;
	};

	return (
		<div className="container">
			<input
				className="form-control me-2 w-100"
				type="search"
				placeholder="Search"
				aria-label="Search"
				name="search"
				onChange={onFormFieldChange}
			/>
			<button
				className="btn btn-secondary w-100"
				type="button"
				onClick={highlight}
			>
				Search
			</button>
			<div className="row">
				{inventoryData && inventoryData.sortedInventory.map(mapVehicle)}
			</div>
		</div>
	);
}

export default Dealership;
