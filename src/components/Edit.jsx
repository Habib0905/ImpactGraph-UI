import React, { useState } from 'react'
import Detail from './Detail';

const Edit = ({Component}) => {

    const [isEditMode, setIsEditMode] = useState(false);




    const [selectedIncoming, setSelectedIncoming] = useState(Component.incomingNodes);
    console.log(Component.incomingNodes);
    const [selectedOutgoing, setSelectedOutgoing] = useState(Component.outgoingNodes);
    const [incomingComponent, setIncomingComponent] = useState("");
    const [outgoingComponent, setOutgoingComponent] = useState("");
  
  
    const modalshow=()=>
      {
        document.getElementById('modal').showModal()
      }
  
  

    const handleCancel = () => {
      setIsEditMode(false);
    }
  
  
    const handleIncoming =()=> {
      if(incomingComponent)
        {
          if(selectedIncoming.includes(incomingComponent))
            {
                          
              modalshow();
        } else 
            {
            
              setSelectedIncoming([...selectedIncoming, incomingComponent]);
            }
            setIncomingComponent('');
        }
    }
  
  
    const handleOutgoing = ()=> {
      if(outgoingComponent)
        {
          if(selectedOutgoing.includes(outgoingComponent))
            {
              modalshow();
            }
  
          else 
          {
            setSelectedOutgoing([...selectedOutgoing, outgoingComponent]);
          }
  
          setOutgoingComponent('');
        }
    }
  
  
  
    const handleRemoveIncoming = (component) => {
      setSelectedIncoming(selectedIncoming.filter(item => item !== component));
    };
  
    const handleRemoveOutgoing = (component) => {
      setSelectedOutgoing (selectedOutgoing.filter(item => item !== component));
    };
  

    


  return (
    <div>

             <label htmlFor="name" className="input input-bordered input-black flex items-center w-full gap-2 ">
                    Name
              <input type="text" id="name" className="grow"   value={Component.name}/>
              </label>

              <label htmlFor="Type" className="input input-bordered input-black flex items-center w-full gap-2 mt-3 mb-3">
              Type
              <input type="text" id="type" className="grow"  value={Component.type}/>
              </label>

              <label htmlFor="ip" className="input input-bordered input-black flex items-center w-full gap-2">
              Ip
              <input type="Number" id="ip" className="grow"  value={Component.ip}/>
              </label>

              <div className="w-full mt-5">
            <h3 className='text-lg text-pink-950 font-bold'> Selected Incoming Components :</h3>
            <div className="flex flex-wrap">

            <ul className="flex flex-wrap gap-3">
            {selectedIncoming.map((component, index) => (
                <li className="bg-white border-2 border-pink-950 rounded-md p-2 mt-3 flex items-center" key={index}>
                  {component}
                  <button
                    className="ml-2 text-red-500"
                    onClick={() => handleRemoveIncoming(component)}
                  >
                    &times;
                  </button>
                </li>
              ))}
            </ul>

            </div>      
          </div>



          <div className="w-full mt-5">
          <select className="select select-bordered w-full max-w-xs"value={incomingComponent} onChange={(e) => setIncomingComponent(e.target.value)} >
            <option value="" disabled selected>Incoming Components</option>
            <option value='Com A' > Com A</option>
            <option value="Com B" > Com B</option>
            <option value="Com C"> Com C</option>
            <option value="Com D"> Com D</option>
            <option value="Com E"> Com E</option>
            </select>
          <button className=" btn ml-5 w-20" onClick={handleIncoming}>Add</button>
        </div>



        <div className="w-full mt-5">
            <h3 className='text-lg text-pink-950  font-bold'> Selected Outgoing Components :</h3>
            <ul className="flex flex-wrap gap-3">
            {selectedOutgoing.map((component, index) => (
                <li className="bg-white border-2 border-pink-950  rounded-md p-2 mt-3 flex items-center" key={index}>
                  {component}
                  <button
                    className="ml-2 text-red-500"
                    onClick={() => handleRemoveOutgoing(component)}
                  >
                    &times;
                  </button>
                </li>
              ))}
            </ul>
          </div>


          <div className="w-full mt-5">
          <select className="select select-bordered w-full max-w-xs" value={outgoingComponent} onChange={(e) => setOutgoingComponent(e.target.value)}>
            <option value="" disabled selected> Outgoing Components</option>
            <option value='Com A' > Com A</option>
            <option value="Com B" > Com B</option>
            <option value="Com C"> Com C</option>
            <option value="Com D"> Com D</option>
            <option value="Com E"> Com E</option>
            </select>
            <button className="btn ml-5 w-20" onClick={handleOutgoing}>Add</button>          
        </div>

          
        <div className="flex flex-row justify-center items-center space-x-5 ">
          
              <button className="bg-gradient-to-br from-black to-pink-950 text-white hover:bg-black font-bold py-2 px-10 mt-5 rounded-lg "> Update </button>
              <button className="bg-gradient-to-br from-black to-pink-950 text-white hover:bg-black  font-bold py-2 px-10 mt-5 rounded-lg  " onClick={handleCancel}> Cancel </button>
        </div>

              <dialog id="modal" className="modal">
                <div className="modal-box">
                  <form method="dialog">
                    <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                  </form>
                  <p className="py-4"> The Component is Already Selected </p>
                </div>
              </dialog>

                
        </div>


    
  )
}

export default Edit
