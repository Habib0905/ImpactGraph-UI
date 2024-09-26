import React, { useEffect, useState } from "react";
import axios from "axios";
import Detail from "./Detail";
import CryptoJS from "crypto-js";

const Search = () => {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const token = localStorage.getItem("token");
  const encryptedRole = localStorage.getItem("role");
  const secretKey = process.env.REACT_APP_SECRET_KEY;
  const bytes = CryptoJS.AES.decrypt(encryptedRole, secretKey);
  const decryptedRole = bytes.toString(CryptoJS.enc.Utf8);
  const baseUrl = process.env.REACT_APP_BASE_URL;

  console.log(decryptedRole);
  const role = JSON.parse(decryptedRole);
  console.log(role);
  useEffect(() => {
    const fetchComponents = async () => {
      try {
        const response = await axios.get(`${baseUrl}/api/components/all`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setSuggestions(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching components:", error);
      }
    };

    fetchComponents();
  }, []);

  const handleChange = (e) => {
    const value = e.target.value;
    setQuery(value);

    if (value) {
      const filtered = suggestions.filter(
        (suggestion) =>
          suggestion.name.toLowerCase().includes(value.toLowerCase()) ||
          suggestion.ip.includes(value)
      );

      if (filtered.length == 0) {
        setFilteredSuggestions([{ name: "No results found" }]);
      } else {
        setFilteredSuggestions(filtered);
      }
    } else {
      setFilteredSuggestions([]);
    }
  };

  const handleSelect = (suggestion) => {
    setQuery(suggestion.name);
    setFilteredSuggestions([]);
  };

  const handleSearch = () => {
    const item = suggestions.find((suggestion) => suggestion.name == query);
    if (item) {
      setSelectedItem(item);
    }
  };

  return (
    <div className=" hero min-h-screen ">
      <img
        className="w-full h-full object-cover  top-0 left-0"
        src="loma.avif"
      />
      <p className="hero-overlay bg-opacity-0 text-4xl text-center text-pink-900 p-10 mb-4 mx-auto font-abc font-bold">
        {role == "ROLE_ADMIN"
          ? "Search the component you want to update"
          : "Search Components"}
      </p>
      <div className=" font-abc top-40 absolute  mb-10 w-[600px] h-auto p-10 mx-auto flex flex-col justify-center items-center">
        <label className="input input-bordered text-pink-900 border-pink-950 border-2 shadow-md shadow-pink-950 bg-white flex items-center w-full gap-2">
          <input
            type="text"
            className="grow"
            placeholder="Component A"
            value={query}
            onChange={handleChange}
          />

          <button className="rounded-r-md " onClick={handleSearch}>
            <img className="h-11 w-11" src="search.png"></img>
          </button>
        </label>
        {filteredSuggestions.length > 0 && (
          <ul className="mt-2 border  border-gray-300 w-full rounded-md bg-white shadow-lg">
            {filteredSuggestions.map((suggestion, index) => (
              <li
                className="p-2 text-black hover:bg-pink-100 hover:font-semibold"
                key={index}
                onClick={() => handleSelect(suggestion)}
              >
                {suggestion.name} - {suggestion.ip}
                <hr className="h-px  bg-gray-200 dark:bg-gray-700"></hr>
              </li>
            ))}
          </ul>
        )}

        {selectedItem && <Detail Component={selectedItem} />}
      </div>
    </div>
  );
};

export default Search;
