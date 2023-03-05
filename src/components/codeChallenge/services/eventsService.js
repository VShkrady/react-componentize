import axios from "axios";
import * as helper from "../../../services/serviceHelper";


  const  endpoint = "https://api.remote.dev/api/events";
 
  

  const eventsPaginated = (pageIndex, pageSize) =>{
    console.log("getAllEventsPaginated is firing");
    
     const config = {
       method: "GET",
       url: `${endpoint}/feed?pageIndex=${pageIndex}&pageSize=${pageSize}`,
       crossdomain: true,
       headers: { "Content-Type": "application/json" },
     };
     return axios(config).then(helper.onGlobalSuccess);
      
    }

    const feedsEvents = () =>{
        console.log("getAllFeedEvents is firing");
        
         const config = {
           method: "GET",
           url: `${endpoint}/feeds`,
           crossdomain: true,
           headers: { "Content-Type": "application/json" },
         };
         return axios(config).then(helper.onGlobalSuccess);
          
        }

 /* const deleteTechCompaniesService = (id) => {
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
  }; */

 
    
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

 const addEvents = (payload) =>{
    console.log("addEvents is firing");
    const config = {
        method: "POST",
        url: endpoint ,
        data: payload,
        crossdomain: true,
        headers: { "Content-Type": "application/json"},
      };
  
      return axios(config);
  
  }
      
  
      const updateEvents = (id, payload) => {
        console.log("Events Update is firing");
    const config = {
      method: "PUT",
      url:  `${endpoint}/${id}`,
      data:  payload,
      crossdomain: true,
      headers: { "Content-Type": "application/json" },
    };
     return axios(config);
  };

  const getEventsBySlug = (slug) => {
    const config = {
      method: "GET",
      url:  `${endpoint}/${slug}`,
      data: slug,
      crossdomain: true,
      headers: { "Content-Type": "application/json" },
    };
    
    
    return axios(config);
     
    }; 

   const eventsSearch = (pageIndex, pageSize,dateStart, dateEnd) =>{
      console.log("getQueryEvents is firing");
       const config = {
         method: "GET",
         url: `${endpoint}/search?pageIndex=${pageIndex}&pageSize=${pageSize}&dateStart=${dateStart}&dateEnd=${dateEnd}`,
         crossdomain: true,
         headers: { "Content-Type": "application/json" },
       };
   
       return axios(config)
        
      }

      export {eventsSearch, eventsPaginated,getEventsBySlug,updateEvents, addEvents, feedsEvents};