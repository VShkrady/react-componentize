import React, { useEffect, useState } from "react";

function Presidents(){
    const [president, setPresident] = useState({
        originalList: [],
        mappedList: [],
        democrats: [],
        republicans: [],
        totalCount: [],
    })

    console.log (president);

    useEffect(()=>{
        generateState(presidentsArr);
    })
   

    const generateState =(arr) =>{
        console.log(arr);

        //null check if arr exists
    if(arr?.length>0){
        setPresident((prevState)=>{
            console.log(prevState);
        const newPresidentObj = {...prevState};
        newPresidentObj.originalList = arr.map(mappedPresidents);
        newPresidentObj.democrats = arr.filter(filterDemocrats);
        newPresidentObj.republicans = arr.filter(filterRepublicans);
        console.log(newPresidentObj);
        return newPresidentObj;
        })
    }
    }
    const filterDemocrats =(singlePresident) =>{
        console.log("filteredDems", singlePresident);
        if(singlePresident.pp === "Democrat"){
            return singlePresident.pp;
        }
    }

    const filterRepublicans = (singlePresident)=>{
        console.log("filterReps", singlePresident);
        if( singlePresident.pp === "Republican"){
            return singlePresident.pp;
        }
    }

    const mappedPresidents = (president) =>{
        console.log("mappedPresident", president);
        return(
            <div className="col-md-4 mt-3" key={president.id}>
                <div className = "card" id={president.id} style={{width: "17rem"}}>
                    <div className="card-body">
                        <h5 classname="card-title">{president.nm}</h5>
                        <p className="card-text">
                            <strong>{president.pp}</strong>
                            </p>
                            <div className="card-footer">
                                <button type="button" className="btn btn-warning m-1" name="">
                                    EDIT
                                    </button>
                                    <button type="button" className="btn btn-danger m-1">DELETE</button>
                            </div>
                    </div>
                </div>
            </div>
        )
    }
    console.log(presidentsArr);
    return(
<React.Fragment>
    <div className="container">
     <div className="row">{president?.originalList}</div>
    <h1>DEMOCRATS: {president.democrats.length}</h1>
    <div className="row">{president?.democrats.map(mappedPresidents)}</div>
    <h1>REPUBLICANS: {president.republicans.length}</h1>
    <div className="row">
        {president?.republicans.map(mappedPresidents)}
    </div>
    <h1>{}</h1>
    </div>
 </React.Fragment>
    );
}

export default Presidents;