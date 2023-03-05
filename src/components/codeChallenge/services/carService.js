import axios from "axios";

const  endpoint = "https://my-json-server.typicode.com/selvaicodes/cars/cars";

 const getAllCars = () =>{
       console.log("getAllCars is firing");
      
        const config = {
          method: "GET",
         url: endpoint,
          crossdomain: true,
          headers: { "Content-Type": "application/json" },
        };
      console.log("All the cars");
       return axios(config)}

       export {getAllCars};
        