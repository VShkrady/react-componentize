import axios from "axios";


const  endpoint =  "https://api.remote.dev/api/users"; 
   
   
 const userLogin = (payload) =>{
  
    console.log("userLogin is executing");
        const config = {
      method: "POST",
      url: endpoint + "/login",
      data: payload,
      crossdomain: true,
      headers: { "Content-Type": "application/json" },
    };
  
    return axios(config);
  }
  
   const newUser = (payload) =>{

    console.log("addUser is firing");
    const config = {
       method: "POST",
        url: endpoint + "/register",
        data: payload,
        crossdomain: true,
        headers: { "Content-Type": "application/json"},
      };
    
      return axios(config);
  }
      
  
   const getCurrent = () =>{
   console.log("getCurrentUser is firing");
  
    const config = {
     method: "GET",
     url: "https://api.remote.dev/api/users/current",
     crossdomain: true,
     headers: { "Content-Type": "application/json" },
  };
  
   return axios(config)
    
   }
  
   const getAll = () =>{
     console.log("getAllUsers is firing");
    
      const config = {
        method: "GET",
        url: endpoint,
        crossdomain: true,
        headers: { "Content-Type": "application/json" },
      };
    
      return axios(config)
      
     }
    const getUserById = (id) => {
    console.log(id);
   const config = {
    method: "GET",
   url:  `${endpoint}/${id}`,
     data: id,
     crossdomain: true,
     headers: { "Content-Type": "application/json" },
   };
  
  
   return axios(config);
   
   }; 

    const userLogout = () =>{
     console.log("getUserLogout is firing");
    
     const config = {
       method: "GET",
      url: endpoint + "/logout",
       crossdomain: true,
      headers: { "Content-Type": "application/json" },
    };
    
      return axios(config)};
  
  
  
  
  //     usersService.update = (id, payload) => {
  //       console.log("usersServiceUpdate is firing");
  //   const config = {
  //     method: "PUT",
  //     url:  `${usersService.endpoint}/${id}`,
  //     data: payload,
  //     crossdomain: true,
  //     headers: { "Content-Type": "application/json" },
  //   };
  //    return axios(config)
  // };
  
  // usersService.deleteById = (id) => {
  //   console.log("Delete is executing");
  //   const config = {
  //     method: "DELETE",
  //     url:  `${usersService.endpoint}/${id}`,
  //     data: id,
  //     crossdomain: true,
  //     headers: { "Content-Type": "application/json" },
  //   };
  //   return axios(config)
  // }; 
  
   

  export {getAll, userLogout,  getUserById, getCurrent, newUser, userLogin };