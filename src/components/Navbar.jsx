import React from "react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  return (
      <div className="navbar bg-black" >
  <div className="flex-1">
    <a className="btn btn-ghost text-2xl text-white">ImpactGraph</a>
  </div>
  <div className="flex-none">
    <ul className="menu menu-horizontal px-1 text-xl text-white">
      <li className='hover:bg-pink-950 hover:rounded-md  font-abc font-bold ' ><a href='/add'>Add</a></li>
      <li className='hover:bg-pink-950 hover:rounded-md  font-abc font-bold ' ><a href="/graph">View Graph</a></li>
      <li className='hover:bg-pink-950 hover:rounded-md  font-abc font-bold ' ><a href='/update'>Update</a></li>
      <li className='hover:bg-pink-950 hover:rounded-md  font-abc font-bold ' ><a>Delete</a></li>

    </ul>
  </div>

    </div>
  );
};

export default Navbar;
