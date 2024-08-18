import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Edit = ({ Component, func }) => {
  const [selectedIncoming, setSelectedIncoming] = useState(Component.incomingNodeIds);
  const [selectedOutgoing, setSelectedOutgoing] = useState(Component.outgoingNodeIds);
  const [incomingComponent, setIncomingComponent] = useState("");
  const [outgoingComponent, setOutgoingComponent] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const navigate = useNavigate();


  const [updateComponent, setUpdateComponent] = useState({
    id: Component.id,
    name: Component.name,
    ip: Component.ip,
    type: Component.type,
    incomingNodeIds: Component.incomingNodeIds,
    outgoingNodeIds: Component.outgoingNodeIds,
  });

  useEffect(()=> {
    setUpdateComponent({
      id: Component.id,
      name: Component.name,
      ip: Component.ip,
      type: Component.type,
    });
  }, [Component]);


  useEffect(()=> {
    setSelectedIncoming(Component.incomingNodeIds);
  }, [Component]);

  useEffect(()=> {
    setSelectedOutgoing(Component.outgoingNodeIds);
  }, [Component]);




  useEffect(() => {
    axios.get("http://localhost:8081/api/components/all")
      .then(res => {
        setSuggestions(res.data);
      })
      .catch(err => console.log(err));
  }, []);



  useEffect(() => {
    setUpdateComponent(prev => ({
      ...prev,
      incomingNodeIds: selectedIncoming, 
      outgoingNodeIds: selectedOutgoing  
    }));
  }, [selectedIncoming, selectedOutgoing]);




  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(updateComponent); 

    axios.put("http://localhost:8081/api/components/update", updateComponent)
      .then(res => {
        navigate('/graph');
        console.log("Successfully updated component:", res.data);
        console.log(res.data); 
      })
      .catch(err => console.log(err));
  };

  const handleIncoming = () => {

    if (incomingComponent !== '' && incomingComponent !== null && incomingComponent !== undefined) {
      if (selectedIncoming.includes(incomingComponent)) {
        modalshow();
      } else {
        setSelectedIncoming([...selectedIncoming, incomingComponent]);
      }
      setIncomingComponent('');
    }
  };

  const handleOutgoing = () => {
    
    if (outgoingComponent !== '' && outgoingComponent !== null && outgoingComponent!== undefined) {
      if (selectedOutgoing.includes(outgoingComponent)) {
        modalshow();
      } else {
        setSelectedOutgoing([...selectedOutgoing, outgoingComponent]);
      }
      setOutgoingComponent('');
    }
  };

  const handleRemoveIncoming = (component) => {
    console.log(updateComponent);
    setSelectedIncoming(selectedIncoming.filter(item => item !== component));
  };

  const handleRemoveOutgoing = (component) => {
    console.log(updateComponent);
    setSelectedOutgoing(selectedOutgoing.filter(item => item !== component));
  };

  const modalshow = () => {
    document.getElementById('modal').showModal();
  };

  const modalshow2 = () => {
    document.getElementById('modal2').showModal();
  };


  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name" className="input input-bordered input-black flex items-center w-full gap-2 ">
          Name
          <input
            type="text"
            id="name"
            className="grow"
            value={updateComponent.name}
            onChange={e => setUpdateComponent({ ...updateComponent, name: e.target.value })}
          />
        </label>

        <label htmlFor="type" className="input input-bordered input-black flex items-center w-full gap-2 mt-3 mb-3">
          Type
          <input
            type="text"
            id="type"
            className="grow"
            value={updateComponent.type}
            onChange={e => setUpdateComponent({ ...updateComponent, type: e.target.value })}
          />
        </label>

        <label htmlFor="ip" className="input input-bordered input-black flex items-center w-full gap-2">
          IP
          <input
            type="text"
            id="ip"
            className="grow"
            value={updateComponent.ip}
            onChange={e => setUpdateComponent({ ...updateComponent, ip: e.target.value })}
          />
        </label>

        <div className="w-full mt-5">
          <h3 className='text-lg text-pink-950 font-bold'>Selected Incoming Components:</h3>
          <ul className="flex flex-wrap gap-3">
            {selectedIncoming.map((id, index) => {                    
              const node = suggestions.find(
              (component) => component.id === id
            );
            return (
              <li className="bg-white border-2 border-pink-950 rounded-md p-2 mt-3 flex items-center" key={index}>
                 {node ? node.name : 
                         <div>
                         <span className="loading loading-dots loading-xs"></span>
                       </div>
                       }
                
                <button className="ml-2 text-red-500" onClick={() => handleRemoveIncoming(id)}>
                  &times;
                </button>
              </li>
            );
          })}
          </ul>
        </div>

        <div className="w-full mt-5">
          <select className="select select-bordered w-full max-w-xs" value={incomingComponent} onChange={(e) => setIncomingComponent( parseInt( e.target.value , 10 ))}>
          <option value="" disabled>Incoming Components</option>
            {suggestions.map((component) => (
              
              <option key={component.id} value={component.id}>
                {component.name} - {component.ip}
              </option>
            ))}
          </select>
          <button type="button" className="btn ml-5 w-20" onClick={handleIncoming}>Add</button>
        </div>

        <div className="w-full mt-5">
          <h3 className='text-lg text-pink-950 font-bold'>Selected Outgoing Components:</h3>
          <ul className="flex flex-wrap gap-3">
          {selectedOutgoing.map((id, index) => {                    
              const node = suggestions.find(
              (component) => component.id === id
            );
            return (
              <li className="bg-white border-2 border-pink-950 rounded-md p-2 mt-3 flex items-center" key={index}>
                 {node ? node.name : 
                         <div>
                         <span className="loading loading-dots loading-xs"></span>
                       </div>
                       }
                
                <button className="ml-2 text-red-500" onClick={() => handleRemoveOutgoing(id)}>
                  &times;
                </button>
              </li>
            );
          })}
          </ul>
        </div>

        <div className="w-full mt-5">
          <select className="select select-bordered w-full max-w-xs" value={outgoingComponent} onChange={(e) => setOutgoingComponent(parseInt(e.target.value, 10))}>
            <option value="" disabled>Outgoing Components</option>
            {suggestions.map((component) => (
              <option key={component.id} value={component.id}>
                {component.name} - {component.ip}
              </option>
            ))}
          </select>
          <button type="button" className="btn ml-5 w-20" onClick={handleOutgoing}>Add</button>
        </div>

        <div className="flex flex-row justify-center items-center space-x-5 ">
          <button type="submit" className="bg-gradient-to-br from-black to-pink-950 text-white hover:bg-black font-bold py-2 px-10 mt-5 rounded-lg" onClick={modalshow2}>
            Update
          </button>
          <button type="button" className="bg-gradient-to-br from-black to-pink-950 text-white hover:bg-black font-bold py-2 px-10 mt-5 rounded-lg" onClick={func}>
            Cancel
          </button>
        </div>
      </form>

      <dialog id="modal" className="modal">
        <div className="modal-box">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
          </form>
          <p className="py-4">The Component is Already Selected</p>
        </div>
      </dialog>


      <dialog id="modal2" className="modal">
        <div >        
        <span  className="loading loading-spinner w-20 h-20 border-3" ></span>
        </div>
      </dialog>


    </div>
  );
};

export default Edit;
