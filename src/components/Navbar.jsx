import React from "react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  return (
    <div className="navbar bg-black">
      <div className="flex-1">
        <a
          className="btn btn-ghost text-2xl text-white"
          onClick={() => navigate("/")}
        >
          ImpactGraph
        </a>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1 text-xl text-white">
          <li>
            <a onClick={() => navigate("/add")}>Add</a>
          </li>
          <li>
            <a>View Graph</a>
          </li>
          <li>
            <a>Update</a>
          </li>
          <li>
            <a>Delete</a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
