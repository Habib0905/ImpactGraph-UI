import React, { useState } from 'react'
import Detail from './Detail';

const Search = () => {


    const suggestions = [

        {
            name:"Component A",
            type: "Database",
            ip: "192.90.81.11",
            incomingNodes: [
                "ComponentB", "ComponentC"
            ],
            outgoingNodes: [
                "ComponentD", "ComponentE"
            ]
        },

        {
            name:"Component B",
            type: "Database",
            ip: "192.90.81.11",
            incomingNodes: [
                "ComponentB", "ComponentC"
            ],
            outgoingNodes: [
                "ComponentD", "ComponentE"
            ]
        },

        {
            name:"Component C",
            type: "Database",
            ip: "192.90.81.11",
            incomingNodes: [
                "ComponentB", "ComponentC"
            ],
            outgoingNodes: [
                "ComponentD", "ComponentE"
            ]
        },
        {
            name:"Component D",
            type: "Database",
            ip: "192.90.81.11",
            incomingNodes: [
                "ComponentB", "ComponentC"
            ],
            outgoingNodes: [
                "ComponentD", "ComponentE"
            ]
        },
        {
            name:"Component E",
            type: "Database",
            ip: "192.90.81.11",
            incomingNodes: [
                "ComponentB", "ComponentC"
            ],
            outgoingNodes: [
                "ComponentD", "ComponentE"
            ]
        }
    ];

    const placevalue = "Component A";


    const [query, setQuery] = useState('');
    const [filteredSuggestions, setFilteredSuggestions] = useState([]);
    const [selectedItem, setSelectedItem] = useState(null);

    const handleChange = (e)=> {
        const value = e.target.value;
        setQuery(value);

        if(value)
            {
                const filtered = suggestions.filter( suggestion => 
                    suggestion.name.toLowerCase().includes(value.toLowerCase())
                );

                setFilteredSuggestions(filtered);
                
            }
            else
            {
                setFilteredSuggestions([]);
            }

    };

    const handleSelect = (suggestion) =>{
        setQuery(suggestion.name);
        setFilteredSuggestions([]);
    };

    

    const handleSearch = () =>{
        const item = suggestions.find(suggestion => suggestion.name== query);
        if(item)
            {
                setSelectedItem(item);
            }
    };




  return (
    
    <div className=" hero min-h-screen ">
        <img className='w-full h-full object-cover  top-0 left-0' src='upbg.jpg' />
        <p className="hero-overlay bg-opacity-0 text-6xl top-0  text-white p-5 mx-auto"> Search the Component you want to update</p>
    <div className=" top-40 absolute  mb-10 w-[500px] h-auto p-10 mx-auto flex flex-col justify-center items-center">
       
      <label className="input input-bordered flex items-center w-full gap-2">
        <input type="text" className="grow" placeholder={placevalue} value={query} onChange={handleChange} />

        <button
          className="rounded-r-md" 
          onClick={handleSearch}>
            <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="h-6 w-6 opacity-70">
            <path
            fillRule="evenodd"
            d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
            clipRule="evenodd" />
        </svg>
        </button>
        </label>
        {
            filteredSuggestions.length>0 && (
                <ul className="mt-2 border border-gray-300 w-full max-w-md rounded-md bg-white shadow-lg">
                    {filteredSuggestions.map((suggestion, index)=>(
                        <li key={index} 
                        onClick={() => handleSelect(suggestion)}>
                            {suggestion.name}
                        </li>
                    ))
                }
                </ul>
            )
        }


        {
        selectedItem && ( <Detail Component={selectedItem}/>)
        }

    </div>
    </div>
  )
}

export default Search