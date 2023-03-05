import React, {useState} from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {newUser} from "../components/codeChallenge/services/usersService";


function Register(){
  const [formData, setFormData]= useState({
    email: "",
    firstName: "",
    lastName: "",
    password: "",
    passwordConfirm: "",
    avatarUrl: "",
    tenantId: "U04CVA74QTU",

  });

  //function captures event
  const onClickChange = (e)=>{
    //e.target represent the input
    const target = e.target;
    //the value user type in the text box
    const value = target.value;
    //the name of form fields 
    const name = target.name;
    
    //set a new state by using old property name
    setFormData((prevState) =>{
      //copy/clone data from state using the spread operator
      const newFormData = {
        ...prevState,
      };
  //change the value of the copied object using name and bracket notation
      newFormData[name] = value;
      return newFormData;
    })
  }

  function onClickSubmit(e){
    e.preventDefault();
    
    newUser(formData).then(onAddSuccess).catch(onAddError);
  }

  function onAddSuccess (response){
    console.log(response);
    toast.success ("Successfully Registered");
  }

  function onAddError(error){
   console.error(error);
   toast.error("Error: Please try again");
  }

    return(

      <React.Fragment>
        <ToastContainer />
        <div className="container">
        <div className="p-5 mb-4 bg-light rounded-3">
        <div className="container-fluid py-5">
  <form>
    <div className="form-row">
          <div className="form-group col-md-6">
            <label htmlFor="email">Email address</label>
            <input type="text" className="form-control" name="email" value={formData.email} onChange={onClickChange}  id="email" placeholder="Enter Your Email Address" />
          </div>
          </div>
          <div className="form-row">
            <div className="form-group col-md-6">
              <label htmlFor="firstName">First Name</label>
              <input type="text" className="form-control" name="firstName" value={formData.firstName} onChange={onClickChange} id="firstName" placeholder="Enter Your First Name" />
            </div>
            </div>
            <div className="form-row">
             <div className="form-group col-md-6">
                  <label htmlFor="lastName">Last Name</label>
                  <input type="text" className="form-control" name="lastName" value={formData.lastName} onChange={onClickChange} id="lastName" placeholder="Enter Your Last Name" />
             </div>
            </div> 
          <div className="form-row">
          <div className="form-group col-md-6">
            <label htmlFor="password">Password</label>
            <input type="password" className="form-control" name="password" value={formData.password} onChange={onClickChange} id="password"placeholder="Enter Your Password"  />
          </div>
          </div>
          <div className="form-row">
          <div className="form-group col-md-6">
            <label htmlFor="passwordConfirm">Confirm Password</label>
            <input type="password" className="form-control" name="passwordConfirm" value={formData.passwordConfirm} onChange={onClickChange} id="passwordConfirm"placeholder="Re-Enter Your Password"  />
          </div>
          </div>
          <div className="form-row">
          <div className="form-group col-md-6">
            <label htmlFor="avatarUrl">Profile Url</label>
            <input type="text" className="form-control" name="avatarUrl" value={formData.avatarUrl} onChange={onClickChange} id="avatarUrl" placeholder="Provide a Url to an image"  />
          </div>
          </div>
          <div className="form-group d-none">
            <label htmlFor="tenantId">id</label>
            <input type="text" className="form-control" value={formData.tenantId} onChange={onClickChange} id="tenantId" name="tenantId" />
          </div>
          <button type="submit" className="btn btn-primary" onClick={onClickSubmit} name="submitBtn" id="submit">Submit</button>
        </form>
      </div>
    </div>
    </div>
    </React.Fragment>
      
    )
}
export default Register;