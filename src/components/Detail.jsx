import React, { useState } from 'react'


const Detail = ({Component}) => {

  const [isEditMode, setIsEditMode] = useState(false);


  const handleUpdate =()=> {
    setIsEditMode(true);
  }


  return (

    <div className="mt-6 p-6 bg-white rounded-md shadow-md w-full max-w-md">

          { isEditMode ? 
          
          
          <label htmlFor="name" className="input input-bordered input-black flex items-center w-full gap-2">
          Name
          <input type="text" id="name" className="grow" placeholder="e.g. Database"  value={Component.name}/>
        </label>
          
          
          
          
          
          : 
       
         <div>
          <h2 className="text-xl font-bold mb-4">{Component.name}</h2>
          <p><strong>Type:</strong> {Component.type}</p>
      
      
          <div className="w-full mt-5">
            <h3 className='text-lg text-black font-bold'>Incoming Components :</h3>
            <div className="flex flex-wrap">
            <ul className="flex flex-wrap gap-3">
              {Component.incomingNodes.map((component, index) => (
                <li className="bg-white shadow-md shadow-slate-500  rounded-md p-2 mt-3 flex items-center" key={index}>
                  {component}
                </li>
              ))}
            </ul>
            </div>      
          </div>
      
      
      
      
          <div className="w-full mt-5">
            <h3 className='text-lg text-black font-bold'>Outgoing Components :</h3>
            <div className="flex flex-wrap">
            <ul className="flex flex-wrap gap-3">
              {Component.outgoingNodes.map((component, index) => (
                <li className="bg-white shadow-md shadow-slate-500 rounded-md p-2 mt-3 flex items-center" key={index}>
                  {component}
                </li>
              ))}
            </ul>
            </div>      
          </div>
      
      
          <button className="btn btn-wide mt-5 " onClick={handleUpdate}> Update </button>
      
        </div>
        
        }

        </div>

   
 

  )
}

export default Detail