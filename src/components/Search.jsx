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
                "ComponentA", "ComponentC"
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
                "ComponentA", "ComponentB"
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
                "ComponentA", "ComponentB"
            ],
            outgoingNodes: [
                "ComponentC", "ComponentE"
            ]
        },
        {
            name:"Component E",
            type: "Database",
            ip: "192.90.81.11",
            incomingNodes: [
                "ComponentA", "ComponentB"
            ],
            outgoingNodes: [
                "ComponentC", "ComponentD"
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
        <p className="hero-overlay bg-opacity-0 text-6xl top-0  text-white p-10 mb-4 mx-auto font-abc font-bold
        "> Search the Component you want to update</p>
       <div className=" font-abc top-40 absolute  mb-10 w-[600px] h-auto p-10 mx-auto flex flex-col justify-center items-center">
       
      <label className="input input-bordered flex items-center w-full gap-2">
        <input type="text" className="grow" placeholder={placevalue} value={query} onChange={handleChange} />

        <button
          className="rounded-r-md" 
          onClick={handleSearch}>
            <img
            className="h-10 w-10"
            src='search.png'>           
            </img>
        </button>
        </label>
        {
            filteredSuggestions.length>0 && (
                <ul className="mt-2 border  border-gray-300 w-full rounded-md bg-white shadow-lg">
                    {filteredSuggestions.map((suggestion, index)=>(
                        <li className='p-2 hover:bg-pink-100 hover:font-semibold'  key={index} 
                        onClick={() => handleSelect(suggestion)}>
                            {suggestion.name}
                        </li>
                    ))
                }
                </ul>
            )
        }


        {
        selectedItem && ( <Detail 
            Component={selectedItem}
        />)
        }


    </div>
    </div>
  )
}

export default Search