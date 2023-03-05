import React, { useState, useEffect } from 'react';
import 'rc-pagination/assets/index.css';
import Pagination from 'rc-pagination';
import locale from 'rc-pagination/lib/locale/en_US';
import Job from './Job';
import JobModal from './JobModal';

import {
	jobsSearch,
	jobsPaginated,
} from './codeChallenge/services/jobsService';

function Jobs() {
	const [jobs, setJobs] = useState({ arrayOfJobs: [], jobsComponents: [] });
	const [searchTerm, setSearchTerm] = useState(' ');
	const [currentPage, setCurrentPage] = useState({
		totalJobs: 0,
		currentPageSize: 10,
		currentPageIndex: 0,
	});

	const [currentJob, setCurrentJob] = useState({});
	const [showModal, setShowModal] = useState(false);

	console.log('This is jobs:', jobs);

	const onFormChange = (e) => {
		//e.target represent the input
		const target = e.target;
		//the value user type in the text box
		const value = target.value;
		//the name of form fields
		const name = target.name;

		//set a new state by using old property name
		setSearchTerm((prevState) => {
			//copy/clone data from state using the spread operator
			const newJobObj = { ...prevState };
			//change the value of the copied object using name and bracket notation
			newJobObj[name] = value;

			return newJobObj;
		});
	};

	const onSearchClicked = (e) => {
		e.preventDefault();
		jobsSearch(0, 10, searchTerm.q)
			.then(onGetJobsSuccess)
			.catch(onGetJobsError);
	};

	function onGetJobsSuccess(data) {
		console.log('This is first Data:', data);
		let arrayOfPrevJobs = data.data.item.pagedItems;

		setJobs((prevState) => {
			const newJobs = { ...prevState };
			newJobs.arrayOfJobs = arrayOfPrevJobs;
			newJobs.jobsComponents = arrayOfPrevJobs.map(mapJob);
			return newJobs;
		});
	}

	function onGetJobsError(error) {
		console.log(error);
	}

	const mapJob = (aJob) => {
		console.log('mapJob is firing', aJob);
		return (
			<Job
				setShowModal={setShowModal}
				setCurrentJob={setCurrentJob}
				job={aJob}
				key={aJob.id}
			></Job>
		);
	};

	useEffect(() => {
		console.log('useEffect firing for pagination');

		jobsPaginated(currentPage.currentPageIndex, currentPage.currentPageSize)
			.then(onGetPageSuccess)
			.catch(onGetPageError);
	}, [currentPage.currentPageSize, currentPage.currentPageIndex]);

	function onGetPageSuccess(data) {
		console.log('This is Data:', data);

		setJobs((prevState) => {
			const newJobs = { ...prevState };
			newJobs.arrayOfJobs = data.item.pagedItems;
			newJobs.totalJobs = data.item.totalCount;
			newJobs.currentPageSize = data.item.pageSize;
			newJobs.currentPageIndex = data.item.pageIndex;
			newJobs.jobsComponents = newJobs.arrayOfJobs.map(mapJob);

			return newJobs;
		});
	}

	function onGetPageError(error) {
		console.error(error);
	}

	const onPageChange = (page) => {
		console.log('This is the page:', page);

		setCurrentPage((prevState) => {
			const newJobs = { ...prevState };
			newJobs.currentPageIndex = page;
			return newJobs;
		});
		jobsPaginated(currentPage.currentPageSize, currentPage.currentPageIndex)
			.then(onGetPageSuccess)
			.catch(onGetPageError);
	};

	const handleModalClose = () => {
		setShowModal(false);
	};

	return (
		<React.Fragment>
			<div className="container">
				{showModal && (
					<JobModal
						job={currentJob}
						onClose={handleModalClose}
						showModal={showModal}
					/>
				)}

				<Pagination
					onChange={onPageChange}
					current={currentPage.currentPageIndex}
					total={currentPage.totalJobs}
					locale={locale}
				/>
				<form onChange={onFormChange}>
					<input
						type="text"
						/* value={searchQuery} */ name="q"
						onChange={(e) => setSearchTerm(e.target.value)}
					/>
					<button onClick={onSearchClicked}>Search</button>
				</form>
			</div>
			<div className="row">{jobs.jobsComponents}</div>
		</React.Fragment>
	);
}
export default Jobs;
