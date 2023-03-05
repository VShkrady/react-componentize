import axios from "axios";
import * as helper from "../../../services/serviceHelper";


  const  endpoint = "https://api.remote.dev/api/jobs";
 
  

  const jobsPaginated = (pageIndex, pageSize) =>{
    console.log("getAllJobs is firing");
    
     const config = {
       method: "GET",
       url: `${endpoint}?pageIndex=${pageIndex}&pageSize=${pageSize}`,
       crossdomain: true,
       headers: { "Content-Type": "application/json" },
     };
     return axios(config).then(helper.onGlobalSuccess);
      
    }

 const deleteJobsService = (id) => {
    console.log("Delete is executing");
    const config = {
      method: "DELETE",
      url:  `${endpoint}/${id}`,
      data: id,
      crossdomain: true,
      headers: { "Content-Type": "application/json" },
    };

     //closure id
    return axios(config);
  }; 

 
    
    //making another AJAX call with closure

 /*  const deleteJobsService = (id) => {
    console.log("Delete is executing");
    const config = {
      method: "DELETE",
      url:  `${endpoint}/${id}`,
      data: id,
      crossdomain: true,
      headers: { "Content-Type": "application/json" },
    };
     //closure id
    return axios(config).then(()=>{
      return id
    })
  };  */

 const addJobs = (payload) =>{
    console.log("addJob is firing");
    const config = {
        method: "POST",
        url: endpoint ,
        data: payload,
        crossdomain: true,
        headers: { "Content-Type": "application/json"},
      };
  
      return axios(config);
  
  }
      
  
      const updateJobs = (id, payload) => {
        console.log("jobsService Update is firing");
    const config = {
      method: "PUT",
      url:  `${endpoint}/${id}`,
      data:  payload,
      crossdomain: true,
      headers: { "Content-Type": "application/json" },
    };
     return axios(config);
  };

  const getJobsById = (id) => {
    const config = {
      method: "GET",
      url:  `${endpoint}/${id}`,
      data: id,
      crossdomain: true,
      headers: { "Content-Type": "application/json" },
    };
    
    
    return axios(config);
     
    }; 

   const jobsSearch = (pageIndex, pageSize,searchTerm) =>{
      console.log("getQueryJobs is firing");
      console.log(searchTerm);
       const config = {
         method: "GET",
         url: `${endpoint}/search?pageIndex=${pageIndex}&pageSize=${pageSize}&searchTerm=${searchTerm}`,
         crossdomain: true,
         headers: { "Content-Type": "application/json" },
       };
      
       return axios(config)
        
      }

      export {jobsSearch, jobsPaginated,getJobsById,updateJobs, addJobs,deleteJobsService};