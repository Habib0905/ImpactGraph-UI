import React, { Component, useState } from 'react'

const Add = () => {

  const [selectedIncoming, setSelectedIncoming] = useState([]);
  const [selectedOutgoing, setSelectedOutgoing] = useState([]);
  const [incomingComponent, setIncomingComponent] = useState("");
  const [outgoingComponent, setOutgoingComponent] = useState("");


  const modalshow=()=>
    {
      document.getElementById('modal').showModal()
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






  return (

    <div className="hero min-h-screen relative">
      <video className='w-full h-full object-cover absolute top-0 left-0' src='bg.mp4' autoPlay loop muted />
      <div className="hero-overlay bg-opacity-30 absolute top-0 left-0 w-full h-full"></div>
   
   
      <div className="relative mt-10 z-10 mb-10 bg-black bg-opacity-70 rounded shadow-2xl shadow-white w-[500px] h-auto p-10 mx-auto flex flex-col justify-center items-center">
       
        
          <label htmlFor="name" className="input input-bordered input-black flex items-center w-full gap-2">
            Name
            <input type="text" id="name" className="grow" placeholder="e.g. Database" />
          </label>
          
         

          <label htmlFor='ip' className="input input-bordered input-black flex items-center gap-2 w-full  mt-5">
            IP
            <input type="Number" id='ip' min={0} className="grow"  placeholder="e.g. 192.168.1.30 " />
          </label>

          <label htmlFor="type" className="input input-bordered input-black flex items-center w-full gap-2 mt-5 ">
            Type
            <input type="text" id="type" className="grow" placeholder="e.g. Database" />
          </label>


          <div className="w-full mt-5">
            <h3 className='text-lg text-white font-bold'> Selected Incoming Components :</h3>
            <ul>
              {
                selectedIncoming.map((Component, index) =>(
                  <li  className="btn w-auto mt-3 mr-3" key={index}> {Component}</li>
                ))
              }
            </ul>
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
            <h3 className='text-lg text-white font-bold'> Selected Outgoing Components :</h3>
            <ul>
              {
                selectedOutgoing.map((Component, index) =>(
                  <li className='text-white' key={index}> {Component}</li>
                ))
              }
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

    <button className="btn btn-wide mt-5">Add</button>


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

export default Add
