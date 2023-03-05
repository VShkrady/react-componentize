import React from "react";

function Home(props){
 
    return(
      <React.Fragment>
        <h1>
          Hello, {props.user.firstName}{props.user.lastName}
        </h1>
        <hr/>
      </React.Fragment>
    );    
}
export default Home;
