import React from "react";
import  {useNavigate} from "react-router-dom";




function Job(props){
    console.log("Job is firing", props.job);

const navigate = useNavigate();
const aJob = props.job


//local click handler serves as a way to communicate with parent by passing 
//friend data and event object to the function as a prop
    const onLocalJobClicked = (event)=>{
        event.preventDefault();
        props.onJobClicked(props.job,event);

       // onLocalFriendClicked
    }

    const handleViewMoreClicked =()=>{
        props.setShowModal(true);
        props.setCurrentJob(aJob);
     };

    const onEditClick = () =>{
    navigate(`/jobs/${aJob.id}`, {state: /* {currentJob: */ aJob});
             }
            

    
    return(
        <>
        <div style={{
           display: 'flex', flexDirection: 'row'}}>
        <div className="col-md-3">
        <div className="card" >
   <img className="card-img-top" src={aJob.techCompany?.images && aJob.techCompany.images[0].imageUrl} onClick={onLocalJobClicked} alt="I Love Code"/>
   <div className="card-body">
   <h5 className="card-title">{aJob.title}</h5>
   <p className="card-text">{aJob.summary}</p>
   <button className="btn btn-primary" onClick={onLocalJobClicked}>Delete</button>
   <button  className="btn btn-primary" onClick={()=> onEditClick(aJob.id)} name="editBtn" id="editBtn">Edit</button>
   <button  class="btn btn-success" data-toggle="modal" onClick={handleViewMoreClicked} name="viewMoreBtn" id="viewMoreBtn">View More</button>
   </div>
   </div>
   </div>
   </div>
   </>
    )
}   //React.memo tells react to re-render if props changed
export default React.memo (Job);