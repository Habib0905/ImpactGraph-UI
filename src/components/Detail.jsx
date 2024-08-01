import React, { useState } from 'react'
import Edit from './Edit';


const Detail = ({Component , edit}) => {

  const [isEditMode, setIsEditMode] = useState(false);


  
  const handleUpdate =()=> {
    setIsEditMode(true);
  }
  



  return (

    <div className="mt-6 p-6 bg-white rounded-md shadow-lg shadow-slate-300 w-full">

          { isEditMode ? 
          <Edit 
          Component={Component}
          />   
          
          
          : 
       
         <div className=' border-1 p-3 rounded-md shadow-lg shadow-pink-950 border-pink-950 '>
          <h2 className="text-xl text-center text-pink-950 font-bold mb-4">{Component.name}</h2>

            <p className='flex flex-row'> 
              <strong className='flex flex-row mr-2'>
              <img
              className="h-6 w-6 mr-2"
              src='com.png'>           
              </img>
              Type:</strong> {Component.type}</p>
            <hr className="h-px my-4 bg-gray-200 border-0 dark:bg-gray-700"></hr>


            <p className='flex flex-row'> 
              <strong className='flex flex-row mr-2'>
              <img
              className="h-6 w-6 mr-2"
              src='com.png'>           
              </img>
              Ip:</strong> {Component.ip}</p>
            <hr className="h-px my-4 bg-gray-200 border-0 dark:bg-gray-700"></hr>
        
      
            <div className="w-full mt-5">
              <h3 className='text-lg text-pink-950 font-bold'>Incoming Components :</h3>
              <div className="flex flex-wrap">
              <ul className="flex flex-wrap gap-3">
                {Component.incomingNodes.map((component, index) => (
                  <li className="border-2 border-pink-950 text-pink-950 shadow-md shadow-pink-300   rounded-md p-2 mt-3 flex items-center" key={index}>
                    {component}
                  </li>
                ))}
              </ul>
              </div>      
            </div>
      
      
      
      
            <div className="w-full mt-5">
              <h3 className='text-lg text-pink-950  font-bold'>Outgoing Components :</h3>
              <div className="flex flex-wrap">
              <ul className="flex flex-wrap gap-3">
                {Component.outgoingNodes.map((component, index) => (
                  <li className="  border-2 border-pink-950 text-pink-950 shadow-md shadow-pink-300 rounded-md p-2 mt-3 flex items-center" key={index}>
                    {component}
                  </li>
                ))}
              </ul>
              </div>      
            </div>





          <div className="flex flex-col">
          <button className="bg-gradient-to-br from-black to-pink-950 text-white hover:bg-black font-bold py-2 px-4 mt-10 rounded-lg " onClick={handleUpdate}> Update </button>
          </div>
        
      
      
      
        
        </div>
        
        }

        </div>

   
 

  )
}

export default Detail