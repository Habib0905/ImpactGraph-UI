import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  const [loginDone , setLoginDone] = useState(false);

  return (

    <div>

   
    {
    loginDone ? (
        <div className="navbar bg-black">
          <div className="flex-1">
            <a href="/" className="btn btn-ghost text-2xl text-white">
              ImpactGraph
            </a>
          </div>
          <div className="flex-none">
            <ul className="menu menu-horizontal px-1 text-xl text-white">
              <li className="hover:bg-pink-950 hover:rounded-md  font-abc font-bold ">
                <a href="/login"> Login</a>
              </li>
            </ul>
          </div>
        </div>
    )
        :
    (
    <div className="navbar bg-black">
      <div className="flex-1">
        <a href="/" className="btn btn-ghost text-2xl text-white">
          ImpactGraph
        </a>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1 text-xl text-white">
          <li className="hover:bg-pink-950 hover:rounded-md  font-abc font-bold ">
            <a href="/add">Add</a>
          </li>
          <li className="hover:bg-pink-950 hover:rounded-md  font-abc font-bold ">
            <a href="/graph">View Graph</a>
          </li>
          <li className="hover:bg-pink-950 hover:rounded-md  font-abc font-bold ">
            <a href="/update">Update</a>
          </li>
        </ul>
      </div>
    </div>

    )
}
</div>
  );
};

export default Navbar;
