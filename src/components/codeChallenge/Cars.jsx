import React, { useState, useEffect } from 'react';
import { getAllCars } from '../codeChallenge/services/carService';
import SingleCar from './SingleCar';

function Cars() {
	const [car, setCar] = useState({
		originalList: [],
		filteredCar: [],
	});

	useEffect(() => {
		getAllCars().then(onGetAllCarsSuccess).catch(onGetAllCarsError);
	}, []);

	function onGetAllCarsSuccess(arr) {
		console.log('looking for success array');
		console.log(arr);

		setCar((prevState) => {
			const newObj = { ...prevState };
			newObj.originalList = arr.data;
			newObj.filteredCar = arr.data;
			return newObj;
		});
		/*
 if(arr.hasOwnProperty("data")){
    setCar((prevState)=>{
    const newCarObj = {...prevState};
    newCarObj.originalList = prevState.arr.data.map(mappedCars);
   console.log(newCarObj);
     return newCarObj;
    }); 
   }else {
    console.log("not an Array");
   }
   */
	}

	function onGetAllCarsError(error) {
		console.error(error);
	}

	const mappedCars = (aCar) => {
		return (
			<SingleCar
				key={aCar.id}
				car={aCar}
				showButton={true}
				oncarClicked={(selectedCar) => onCarClicked(selectedCar)}
			/>
		);
	};

	const showCar = () => {
		console.log('This is showCar firing');
		setCar((prevState) => {
			const newCarObj = { ...prevState };
			newCarObj.showCars = !prevState.showCars;
			newCarObj.showSideCard = false;
			return newCarObj;
		});
	};

	const filterCars = (year) => {
		setCar((prevState) => {
			const newCarObj = { ...prevState };
			newCarObj.filteredCar = car.originalList.filter((car) => {
				if (car.year === year) {
					return true;
				} else return false;
			});
			newCarObj.showSideCard = false;
			return newCarObj;
		});
	};

	const onCarClicked = (selectedCar) => {
		setCar((prevState) => {
			const newCarObj = { ...prevState };
			newCarObj.selectedCar = selectedCar;
			newCarObj.showModal = true;
			return newCarObj;
		});
	};

	return (
		<React.Fragment>
			<div className="row">
				<div className="col">
					<button id="show-all" onClick={showCar}>
						Show Cars
					</button>
					<button id="show-2018-cars" onClick={() => filterCars(2018)}>
						2018 Cars
					</button>
					<button id="show-2019-cars" onClick={() => filterCars(2019)}>
						2019 Cars
					</button>
					<button id="show-2020-cars" onClick={() => filterCars(2020)}>
						2020 Cars
					</button>
					<button id="show-2021-cars" onClick={() => filterCars(2021)}>
						2021 Cars
					</button>
					{car.showCars && car.filteredCar.map(mappedCars)}
				</div>
			</div>
		</React.Fragment>
	);
}

export default Cars;
