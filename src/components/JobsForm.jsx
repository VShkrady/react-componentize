import React, {useState,useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useLocation, useNavigate } from "react-router-dom";
import { Form, Row, Col, Button, Container, FormControl } from "react-bootstrap";
import {updateJobs, getJobsById, addJobs} from "./codeChallenge/services/jobsService";


function JobsForm(){
    const [job, setJob] = useState({
     title: "",
     description: "",
     summary: "",
      pay: "",
      slug: "",
      statusId: "",
      techCompanyId: "",
      skills: []
    });

    const navigate = useNavigate();
    const {state} = useLocation();
    const [jobId, setJobId] = useState({id:null});

      //AJAX call to get data when component first mounts
   useEffect(()=>{
    if(state && state.id)
  getJobsById(state.id)
     .then(onGetJobsByIdSuccess)
     .catch(onGetJobsByIdError);
    },[state]);

    
   
 var onGetJobsByIdSuccess = (response) =>{
   console.log("This is response for Success:", response);
   //set the response to state so that each form field now shows 
//job's data for that field as the value
     setJob(prevState => {
      const updatedState = {...prevState, ...response.data.item};
       updatedState.skills = response.data.item?.skills?.map(skill=>skill.name).join(",")  // edit this
    updatedState.techCompanyId = response.data.item?.techCompany?.id
     
      return updatedState;
    });
      }

 var onGetJobsByIdError = (error) => {
       console.error({ error })}


//function captures event
 const handleChange = (e)=>{
//e.target represent the input
const target = e.target;
//the value user type in the text box
const value = target.value;

//the name of form fields 
const name = target.name;



//set a new state by using old property name
setJob((prevState) =>{
  //copy/clone data from state using the spread operator
  const newJob = {
    ...prevState,
  };
//change the value of the copied object using name and bracket notation
  newJob[name] = value;
  newJob.skills = value.split(",");

  return newJob;
})
 }


  function onClickSubmit(e){
     console.log("event is firing");
    e.preventDefault();
    if(jobId.id !==null){
        updateJobs(jobId, job)
        .then(onUpdateJobsSuccess)
        .catch(onUpdateJobsError)}
        else{
          addJobs(job)
          .then(onAddJobsSuccess)
          .catch(onAddJobsError)}
      }
      
   

 //success handle if database request passed
 var onAddJobsSuccess = (response) => {
       console.log(response);
       toast.success("Successfully Registered"); 
       //check on response/id in the console
      setJobId((prevState)=>{
        let jobId = {...prevState}
        return jobId.id = response.data.item
      });
      navigate(`/jobsForm/?id=${response.data.item}`)
    };
    

     //error handle if database request fails.
     var onAddJobsError = (error) => {
       console.error({ error });
       toast.error("Error adding record. Please try again.");
     };

   var onUpdateJobsSuccess = (response) =>{
     console.log("Update is firing", response);
     toast.success ("Successfully Updated");
     setJobId((prevState)=>{
      let jobId = {...prevState}
      return jobId.id = response.data.item
   });}
   
   var onUpdateJobsError = (error) => {
    console.error(error);
    toast.error("Error: Please try again");
   };


    return (
        <React.Fragment>
            <ToastContainer />
         <Container className="p-5 mb-4 bg-light rounded-3">
        <Row className="py-5">
         <Col>
            <h3>Add Job</h3>
            <Form>
           <Form.Group as={Row}>
              <Form.Label column md={2} htmlFor="title">Title:</Form.Label>
              <Col md={6}>
              <FormControl type="text"  name="title" value={job.title} onChange={handleChange} />
              </Col>
              </Form.Group>
            
              <Form.Group as={Row}>
              <Form.Label column md={2} htmlFor="description">Description:</Form.Label>
              <Col md={6}>
              <FormControl type="text"  name="description" value={job.description} onChange={handleChange} />
              </Col>
              </Form.Group>

              <Form.Group as={Row}>
              <Form.Label column md={2} htmlFor="summary">Summary:</Form.Label>
              <Col md={6}>
              <FormControl type="text"  name="summary" value={job.summary} onChange={handleChange} />
              </Col>
              </Form.Group>
              <Form.Group as={Row}>
              <Form.Label column md={2} htmlFor="pay">Pay:</Form.Label>
              <Col md={6}>
              <FormControl type="text"  name="pay" value={job.pay} onChange={handleChange} />
              </Col>
              </Form.Group>
              <Form.Group as={Row}>
              <Form.Label column md={2} htmlFor="slug">Slug:</Form.Label>
              <Col md={6}>
              <FormControl type="text"  name="slug" value={job.slug} onChange={handleChange} />
              </Col>
              </Form.Group>
              <Form.Group as={Row}>
              <Form.Label column md={2} htmlFor="statusId">StatusId:</Form.Label>
              <Col md={6}>
              <FormControl type="text"  name="statusId" value={job.statusId} onChange={handleChange} />
              </Col>
              </Form.Group>
              <Form.Group as={Row}>
              <Form.Label column md={2} htmlFor="techCompanyId">Tech Company Id:</Form.Label>
              <Col md={6}>
              <FormControl type="text"  name="techCompanyId" value={job.techCompanyId} onChange={handleChange} />
              </Col>
              </Form.Group>
              <Form.Group as={Row}>
              <Form.Label column md={2} htmlFor="skills">Skills:</Form.Label>
              <Col md={6}>
              <FormControl type="text"  name="skills" value={job.skills} onChange={handleChange} />
              </Col>
              </Form.Group>
            <Button type="submit" className="btn btn-primary" onClick={onClickSubmit} name="submitBtn" id="submit">Submit</Button>
            </Form>
            </Col>
            </Row>
            </Container>
                    </React.Fragment>

    )
}

export default JobsForm;