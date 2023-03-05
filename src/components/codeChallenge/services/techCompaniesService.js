import axios from "axios";
import * as helper from "../../../services/serviceHelper";


  const  endpoint = "https://api.remote.dev/api/techcompanies";
 
  

  const techCompaniesPaginated = (pageIndex, pageSize) =>{
    console.log("getAllTechCompanies is firing");
    
     const config = {
       method: "GET",
       url: `${endpoint}?pageIndex=${pageIndex}&pageSize=${pageSize}`,
       crossdomain: true,
       headers: { "Content-Type": "application/json" },
     };
     return axios(config).then(helper.onGlobalSuccess);
      
    }

 const deleteTechCompaniesService = (id) => {
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

 /*  const deleteTechCompaniesService = (id) => {
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

 const addTechCompanies = (payload) =>{
    console.log("addTechCompanies is firing");
    const config = {
        method: "POST",
        url: endpoint ,
        data: payload,
        crossdomain: true,
        headers: { "Content-Type": "application/json"},
      };
  
      return axios(config);
  
  }
      
  
      const updateTechCompanies = (id, payload) => {
        console.log("techCompaniesService Update is firing");
    const config = {
      method: "PUT",
      url:  `${endpoint}/${id}`,
      data:  payload,
      crossdomain: true,
      headers: { "Content-Type": "application/json" },
    };
     return axios(config);
  };

  const getTechCompaniesById = (id) => {
    const config = {
      method: "GET",
      url:  `${endpoint}/${id}`,
      data: id,
      crossdomain: true,
      headers: { "Content-Type": "application/json" },
    };
    
    
    return axios(config);
     
    }; 

   const techCompaniesSearch = (pageIndex, pageSize,searchTerm) =>{
      console.log("getQueryTechCompanies is firing");
      console.log(searchTerm);
       const config = {
         method: "GET",
         url: `${endpoint}/search?pageIndex=${pageIndex}&pageSize=${pageSize}&searchTerm=${searchTerm}`,
         crossdomain: true,
         headers: { "Content-Type": "application/json" },
       };
      
       return axios(config)
        
      }

      export {techCompaniesSearch, techCompaniesPaginated,getTechCompaniesById,updateTechCompanies, addTechCompanies,deleteTechCompaniesService};