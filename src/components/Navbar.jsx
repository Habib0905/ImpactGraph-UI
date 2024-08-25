import React, { useState , useEffect} from "react";
import { useNavigate } from "react-router-dom";
import CryptoJS from "crypto-js";


const Navbar = () => {
  const navigate = useNavigate();
  const [loginDone , setLoginDone] = useState("");

  useEffect(() => {

    const encryptedRole = localStorage.getItem("role");
    const secretKey = "lomatulhabibinterns2"; // Use the same secret key
    const bytes = CryptoJS.AES.decrypt(encryptedRole, secretKey);
    const decryptedRole = bytes.toString(CryptoJS.enc.Utf8);

    console.log(decryptedRole);
    const role = JSON.parse(decryptedRole);
    console.log(role);

    if(role.includes('ROLE_ADMIN'))
    {
      console.log("admin")
      setLoginDone(false);
    }
    else
    {
      console.log("user")
      setLoginDone(true);
    }
  }, []);

  const handleLogout = () => {
    console.log("logout")
    localStorage.setItem("role",null);
    localStorage.removeItem("token");
  };





  return (

    <div>

   
    {
    loginDone ? (
        <div className="navbar bg-black">
          <div className="flex-1">        
            <a href="/" className="btn btn-ghost text-2xl text-white">
            <img className="h-6 w-6" src="network.png"></img>
              ImpactGraph
            </a>
          </div>
          <div className="flex-none">
            <ul className="menu menu-horizontal px-1 text-xl text-white">
              <li className="hover:bg-pink-900 hover:rounded-md  hover:text-white font-abc font-bold ">
                <a href="/graph"> View Graph</a>
              </li>

              <li className="hover:bg-pink-900 hover:rounded-md  hover:text-white font-abc font-bold ">
                <a href="/update">Search</a>
              </li>
              <li className="hover:bg-pink-900 hover:rounded-md  hover:text-white  font-abc font-bold ">
                <a  href="/login" onClick={handleLogout}>Logout</a>
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
        <img className="h-8 w-8" src="network.png"></img>
          ImpactGraph
        </a>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1 text-xl text-white">
          <li className="hover:bg-pink-900 hover:rounded-md  hover:text-white font-abc font-bold ">
            <a href="/add">Add</a>
          </li>
          <li className="hover:bg-pink-900 hover:rounded-md  hover:text-white font-abc font-bold ">
            <a href="/graph">View Graph</a>
          </li>
          <li className="hover:bg-pink-900 hover:rounded-md  hover:text-white font-abc font-bold ">
            <a href="/update">Update</a>
          </li>

          <li className="hover:bg-pink-900 hover:rounded-md  hover:text-white  font-abc font-bold ">
            <a  href="/login" onClick={handleLogout}>Logout</a>
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
