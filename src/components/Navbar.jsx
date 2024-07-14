import React from 'react'

const Navbar = () => {
  return (
      <div className="navbar bg-blue-200" >
  <div className="flex-1">
    <a className="btn btn-ghost text-xl">ImpactGraph</a>
  </div>
  <div className="flex-none">
    <ul className="menu menu-horizontal px-1">
      <li><a>Add</a></li>
      <li><a>View Graph</a></li>
      <li><a>Update</a></li>
      <li><a>Delete</a></li>

    </ul>
  </div>

    </div>
  )
}

export default Navbar
