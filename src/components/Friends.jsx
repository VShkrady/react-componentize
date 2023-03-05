import React, {useState, useEffect, useCallback} from "react";
import "rc-pagination/assets/index.css";
import {friendPaginated,deleteFriendService, searchFriends} from "../components/codeChallenge/services/friendService";
import Friend from "./Friend";
import Pagination from "rc-pagination"
import locale from "rc-pagination/lib/locale/en_US";




function Friends(){
//arrayOfFriends will be living in pageData and 
//and pageData has the property arrayOfFriends
const [pageData, setPageData] = useState({arrayOfFriends:[], friendComponents: []});
//const [arrayOfFriends, setArrayOfFriends] = useState([]);
const [count, setCount] = useState(0);
//state for controlling visibility of friends
//only renders when the state is true
const [showFriends, setShowFriends] = useState(true);
const [searchQuery, setSearchQuery]= useState("");
const [currentPage, setCurrentPage] = useState({
  totalFriends: 0,
  currentPageSize: 10,
  currentPageIndex: 0,
  
});



const onFormChange= (e)=>{
   //e.target represent the input
  const target = e.target;
      //the value user type in the text box
 const value = target.value;
      //the name of form fields 
  const name = target.name;

//set a new state by using old property name
  setSearchQuery((prevState)=>{
     //copy/clone data from state using the spread operator
    const newFriendObj = {...prevState};
     //change the value of the copied object using name and bracket notation
    newFriendObj[name] = value;

    return newFriendObj;
  })
}


const onSearchClicked = (e)=>{
  e.preventDefault();

searchFriends(0, 10, searchQuery.q).then(onSearchSuccess).catch(onSearchError);
};

function onSearchSuccess(data){
  console.log("Data", data);


   setPageData((prevState)=>{
    const newPageData =  {...prevState};
    newPageData.arrayOfFriends = data.data.item.pagedItems;
   newPageData.friendComponents =newPageData.arrayOfFriends.map(mapFriend);
  newPageData.totalFriends= data.data.item.totalCount;
    return newPageData;
  }); 
}


  function onSearchError(error){
  console.log(error);
}



 //grabs the data from paginated function when the component rendered
 //and populates pageData state
useEffect(()=>{
    console.log("useEffect firing for friends")
                        
   friendPaginated(0, 10).then(onGetSuccess).catch(onGetError)},[]);
 

   //onGlobal handler can optIn or optOut
//.then(onGlobalSuccess) in service file it's unpacks the response 
//and returns it as "data" instead of "response"
//onSuccess updating pageData with all the data which was fetched
 function onGetSuccess (data){
   console.log(data);
  let arrayOfGoodFriends =data.item.pagedItems;

  //completeley replacing the prevState with arrayOfGoodFriends
   setPageData((prevState)=>{
    //copying prevState
    const pd = {...prevState};
    pd.arrayOfFriends = arrayOfGoodFriends;
    pd.friendComponents = arrayOfGoodFriends.map(mapFriend);
    return pd;
   });
  };

 function onGetError(error){
  console.error(error);
 
 }
//useCallback hook recreating callback function only when one of the values
//in dependency array changes. Dependency array is empty [], which means
//callback function will be created only once. This fucntion passed to the 
//child as a prop; This function only logging passed data;
 const onDeleteRequested = useCallback((myFriend, eObj)=>{
  //data came in,in this case want to delete
  console.log (myFriend.id, {myFriend, eObj});
  //currying/carring data forward
  const handler = getDeleteSuccessHandler(myFriend.id);

  deleteFriendService(myFriend.id)
  .then(handler)
  .catch(onDeleteError);


  }, []);

  //identify an id what want to delete
 const getDeleteSuccessHandler = (idToBeDeleted)=>{
  console.log("getDeleteSuccessHandler", idToBeDeleted);

  return() =>{
    console.log("onDeleteSuccess", idToBeDeleted);
    //copied entire state/object
    setPageData(prevState =>{
      const pd ={...prevState};
      pd.arrayOfFriends = [...pd.arrayOfFriends];
  
      //then using index function trying to find that thing in the array
      const indexOf = pd.arrayOfFriends.findIndex(friend=>{
        let result = false;
  
       if(friend.id === idToBeDeleted){
        result = true;
       }
        return result;
      });
  //once found something that >=0, then I can cut one of or splice
      if(indexOf >= 0){
        pd.arrayOfFriends.splice(indexOf, 1);
  //and then generate a new array of components based of the array generated above
  //and as the result should be left with one less item/card
        pd.friendComponents = pd.arrayOfFriends.map(mapFriend);
      }
      return pd;
    });
   }

 }
     //another way to delete friend/card
 /* //identify an id what want to delete
 const onDeleteSuccess = idToBeDeleted =>{
  console.log("onDeleteSuccess", idToBeDeleted);
  //copied entire state/object
  setPageData(prevState =>{
    const pd ={...prevState};
    pd.arrayOfFriends = [...pd.arrayOfFriends];

    //then using index function trying to find that thing in the array
    const indexOf = pd.arrayOfFriends.findIndex(friend=>{
      let result = false;

     if(friend.id === idToBeDeleted){
      result = true;
     }
      return result;
    });
//once found something that >=0, then I can cut one of or splice
    if(indexOf >= 0){
      pd.arrayOfFriends.splice(indexOf, 1);
//and then generate a new array of components based of the array generated above
//and as the result should be left with one less item/card
      pd.friendComponents = pd.arrayOfFriends.map(mapFriend);
    }
    return pd;
  });
 }
*/

  

 function onDeleteError(error){
  console.error("Deleting", error);
 
 }
//component maps over the pageData.arrayOfFrineds state by calling mapFriend function
//which returns friend's data and render's it
 const mapFriend = (aFriend)=>{
   console.log("mapping is firing", aFriend);
   
   return(
   <Friend friend={aFriend} key={aFriend.id} onFriendClicked={onDeleteRequested}></Friend>
   )

 }
 //everytime the header is clicked (it's updates it will render and when it renders it will
 //find arrayOfFriends and will map(looping) each friend)
  const onHeaderClicked= ()=>{
     //updates the state count
     setCount((prevState)=>{
         return prevState + 1;
     })
  }



  useEffect(()=>{
    console.log("useEffect firing for pagination")
                        
   friendPaginated(currentPage.currentPageIndex, currentPage.currentPageSize)
   .then(onGetPageSuccess)
   .catch(onGetPageError)

  },[currentPage.currentPageSize, currentPage.currentPageIndex]);
 

   //onGlobal handler can optIn or optOut
//.then(onGlobalSuccess) in service file it's unpacks the response 
//and returns it as "data" instead of "response"
//onSuccess updating pageData with all the data which was fetched
function onGetPageSuccess(data){
  console.log("This is Data", data);

 setPageData((prevState)=>{
    const newPD =  {...prevState};
    newPD.arrayOfFriends = data.item.pagedItems;
    newPD.totalFriends= data.item.totalCount;
   newPD.currentPageSize = data.item.pageSize;
   newPD.currentPageIndex= data.item.currentPageIndex;
   newPD.friendComponents =newPD.arrayOfFriends.map(mapFriend);
 
    return newPD;
  }); 
}

 function onGetPageError(error){
  console.error(error);
 
 }

  
   const onPageChange = (page) =>{
    console.log("This is the page", page);
   
    setCurrentPage((prevState)=>{
     const newPD = {...prevState}
     newPD.currentPageIndex= page;
     return newPD;
    });
  
      friendPaginated(currentPage.currentPageIndex, currentPage.currentPageSize)
      .then(onGetPageSuccess)
      .catch(onGetPageError)
    }
   

    return(

<React.Fragment>
 <div className="container">
 <Pagination 
onChange={onPageChange}  
current = {currentPage.currentPageIndex} 
total={currentPage.totalFriends}
locale={locale}/>
  
  <form onChange={onFormChange}>
    <input type="text" /* value={searchQuery} */name="q" onChange={e=>setSearchQuery(e.target.value)}/>
    <button onClick={onSearchClicked}>Search</button>
  </form>
 <div>
    <button onClick = {()=> setShowFriends(!showFriends)}>Toggle Friends List</button>
     {showFriends ? pageData.friendComponents : null}
     </div> 
 <h3 onClick={onHeaderClicked}>Rendering {count}</h3>
<div className="row">
</div>
{/* 
  Pagination controller -> this is something from rc-pagination

  which is a 3-rd party API

  awesome

  it takes specific properties which are listed inside the API documenation

  one of the important props is called total

  total represents the total amount of items available

  SO that means

  total should be dynamic

  link total to a variable inside state

  total is a value used to help calculate how many pages to display

  AKA the 1-2-3-4-5-6 button in the pagination controlller

  Total helps calculate that by dividing itself by pageSize

  EX
  You have 50 items total

  pageSize is 10

  Meaning you have 5 pages

  1-2-3-4-5 in the pagination ocntroller in chrome
*/}

 </div>
 </React.Fragment>
    );
    }

export default Friends;
