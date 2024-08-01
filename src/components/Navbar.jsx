import React from 'react'

const Navbar = () => {
  return (
      <div className="navbar bg-pink-950" >
  <div className="flex-1">
    <a className="btn btn-ghost text-2xl text-white">ImpactGraph</a>
  </div>
  <div className="flex-none">
    <ul className="menu menu-horizontal px-1 text-xl text-white">
      <li><a href='/add'>Add</a></li>
      <li><a >View Graph</a></li>
      <li><a href='/update'>Update</a></li>
      <li><a>Delete</a></li>

    </ul>
  </div>

    </div>
  )
}

export default Navbar
