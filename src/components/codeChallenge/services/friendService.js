import axios from "axios";
import * as helper from "../../../services/serviceHelper";


  const  endpoint = "https://api.remote.dev/api/friends";
 
  

  const friendPaginated = (pageIndex, pageSize) =>{
    console.log("getAllFriends is firing");
    
     const config = {
       method: "GET",
       url: `${endpoint}?pageIndex=${pageIndex}&pageSize=${pageSize}`,
       crossdomain: true,
       headers: { "Content-Type": "application/json" },
     };
     return axios(config).then(helper.onGlobalSuccess);
      
    }

 const deleteFriendService = (id) => {
    console.log("Delete is executing");
    const config = {
      method: "DELETE",
      url:  `${endpoint}/${id}`,
      data: id,
      crossdomain: true,
      headers: { "Content-Type": "application/json" },
    };
    console.log("in the middle");
     //closure id
    return axios(config);
  }; 

 
    
    //making another AJAX call with closure

  /*const deleteFriendService = (id) => {
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
  }; */

 const addFriend = (payload) =>{
    console.log("addFriend is firing");
    const config = {
        method: "POST",
        url: endpoint ,
        data: payload,
        crossdomain: true,
        headers: { "Content-Type": "application/json"},
      };
  
      return axios(config);
  
  }
      
  
      const updateFriend = (id, payload) => {
        console.log("friendsService Update is firing");
    const config = {
      method: "PUT",
      url:  `${endpoint}/${id}`,
      data:  payload,
      crossdomain: true,
      headers: { "Content-Type": "application/json" },
    };
     return axios(config);
  };

  const getFriendById = (id) => {
    const config = {
      method: "GET",
      url:  `${endpoint}/${id}`,
      data: id,
      crossdomain: true,
      headers: { "Content-Type": "application/json" },
    };
    
    
    return axios(config);
     
    }; 

   const searchFriends = (pageIndex, pageSize,searchQuery) =>{
      console.log("getQueryFriends is firing");
      console.log(searchQuery);
       const config = {
         method: "GET",
         url: `${endpoint}/search?pageIndex=${pageIndex}&pageSize=${pageSize}&q=${searchQuery}`,
         crossdomain: true,
         headers: { "Content-Type": "application/json" },
       };
      
       return axios(config)
        
      }

   /* friendsService.friendLogout = () =>{
      console.log("getFriendLogout is firing");
      
       const config = {
         method: "GET",
         url: `${friendsService.endpoint}/logout`,
         crossdomain: true,
         headers: { "Content-Type": "application/json" },
       };
      
       return axios(config)}*/

  export {friendPaginated, deleteFriendService,addFriend, updateFriend, getFriendById, searchFriends};