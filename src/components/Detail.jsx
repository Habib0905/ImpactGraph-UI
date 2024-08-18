import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Edit from './Edit';


const Detail = ({Component}) => {

  const [isEditMode, setIsEditMode] = useState(false);
  const [allComponents, setAllComponents] = useState([]);
  const [impactedComponents, setImpactedComponents] = useState([]);

  
  const handleUpdate =()=> {
    setIsEditMode(true);
  }
  

  const handleCancel = () => {
    setIsEditMode(false);
  }

  useEffect(() => {
    if (Component) {
      const fetchImpactedComponents = async () => {
        try {
          const response = await axios.get(
            `http://localhost:8081/api/graph/impact/${Component.id}`
          );
          setImpactedComponents(response.data);
        } catch (error) {
          console.error("Error fetching impacted components:", error);
        }
      };

      fetchImpactedComponents();
    } else {
      setImpactedComponents([]);
    }
  }, [Component]);


  useEffect(() => {
    const fetchAllComponents = async () => {
      try {
        const response = await axios.get('http://localhost:8081/api/components/all');
        setAllComponents(response.data);
      } catch (error) {
        console.error('Error fetching components:', error);
      }
    };

    fetchAllComponents();
  }, []);
       


  return (

    <div className="mt-6 p-6 bg-white rounded-md shadow-lg shadow-slate-300 w-full">

          { isEditMode ? 
          <Edit 
          Component={Component}
          func = {handleCancel}
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
              ID:</strong> {Component.id}</p>
            <hr className="h-px my-4 bg-gray-200 border-0 dark:bg-gray-700"></hr>


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
              <h3 className='text-lg text-pink-950  font-bold'>Incoming Components :</h3>
              <div className="flex flex-wrap">
                <ul className="flex flex-wrap gap-3">
                  {Component.incomingNodeIds.map((id) =>  {
                    const node = allComponents.find(
                      (component) => component.id === id
                    );
                  
                    return (
                      <li
                        className="bg-white border-2 border-pink-950 rounded-md p-2 mt-3 flex items-center"
                        key={id}
                      >
                         {node ? node.name : 
                         <div>
                         <span className="loading loading-dots loading-xs"></span>
                       </div>
                       }

                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>


      
            <div className="w-full mt-5">
              <h3 className='text-lg text-pink-950  font-bold'>Outgoing Components :</h3>
              <div className="flex flex-wrap">
              <ul className="flex flex-wrap gap-3">
                  {Component.outgoingNodeIds.map((id) => {
                    const node = allComponents.find(
                      (component) => component.id === id
                    );


                    return (
                      <li
                        className="bg-white border-2 border-pink-950 rounded-md p-2 mt-3 flex items-center"
                        key={id}
                      >
                      {node ? node.name : 
                         <div>
                         <span className="loading loading-dots loading-xs"></span>
                       </div>
                       }

                      </li>
                    );
                  })}
                </ul>
              </div>      
            </div>


            <div className="w-full mt-5">
              <h3 className='text-lg text-pink-950  font-bold'>Impacted Components :</h3>
              <div className="flex flex-wrap">
              <ul className="flex flex-wrap gap-3">
                  {impactedComponents.map((component, index) => {

                    return (
                      <li
                        className="bg-white border-2 border-pink-950 rounded-md p-2 mt-3 flex items-center"
                        key={index}
                      >
                      {component ? component.name : 
                         <div>
                         <span className="loading loading-dots loading-xs"></span>
                       </div>
                       }

                      </li>
                    );
                  })}
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