import React, { useState, useEffect} from "react";
import {useNavigate} from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {userLogin,getCurrent, getUserById} from "../components/codeChallenge/services/usersService"


function Login(props){

  const [user, setUser]= useState({tenantId: "U04CVA74QTU" });
  const navigate = useNavigate(); 
 
useEffect(()=>{
  console.log(props);
}, []);

//function captures event  
const onClickChange = (e) =>{
//e.target represent the input
const target = e.target;
//the value user type in the text box
const value = target.value;
//the name of form fields 
const name = target.name;

//set a new state by using old property name
setUser((prevState) =>{
  //copy/clone data from state using the spread operator
          const newUser = {
            ...prevState,
          };
  //change the value of the copied object using name and bracket notation
          newUser[name] = value;
          return newUser;
})
}

  function onClickSubmit(e){
    e.preventDefault();
    e.stopPropagation();
   userLogin(user).then(onLoginSuccess).catch(onLoginError);
  }

  function onLoginSuccess (response){
    console.log(response);
    toast.success ("Successfully Logged in");
    getCurrent().then(onGetCurrentSuccess).catch(onGetCurrentError);
  }

  function onLoginError(error){
   console.error(error);
   toast.error("Please try again");
  }
  
  function onGetCurrentSuccess(response){
    console.log("getCurrent is firing", response);
    const currentUser =  response.data.item.id;
     console.log(currentUser);
     getUserById(currentUser)
     .then(onGetUserByIdSuccess)
     .catch(onGetUserByIdError);
  }

  function onGetCurrentError(error){
    console.error(error);}
  
    function onGetUserByIdSuccess(response){
      console.log(response);
      const currentUser = {
           firstName: response.data.item.firstName,
           lastName: response.data.item.lastName,
           isLoggedIn: true,
      };
      console.log(currentUser);
      props.setCurrentUser(currentUser);
       navigate("/"); 
    
  }
  
  
     function onGetUserByIdError(error){
      console.error(error);
    }
  
  return(

      <React.Fragment>
         <ToastContainer />
        <div className="container">
            <div className="p-5 mb-4 bg-light rounded-3">
            <div className="container-fluid py-5">
              <form>
  <div className="form-group">
    <label htmlFor="email">Email address</label>
    <input type="email" className="form-control" value={user.email} id="email" name="email" aria-describedby="emailHelp" onChange={onClickChange} placeholder="Enter email"/>
    <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
  </div>
  <div className="form-group">
    <label htmlFor="password">Password</label>
    <input type="password" className="form-control" value={user.password} id="password" name="password" placeholder="Password" onChange={onClickChange}/>
  </div>
  <button type="submit" className="btn btn-primary" onClick={onClickSubmit} name="submitBtn" id="submit">Submit</button>
</form>
        </div>
        </div>
        </div>
        </React.Fragment>
    )
}
export default Login;