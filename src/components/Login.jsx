import React, { useState } from "react";
import axios from "axios";
import CryptoJS from "crypto-js";

const Login = () => {
  localStorage.removeItem("role");
  localStorage.removeItem("token");
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const baseUrl = process.env.REACT_APP_BASE_URL;

  const modalshow2 = () => {
    document.getElementById("modal2").showModal();
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${baseUrl}/signin`, {
        username,
        password,
      });

      modalshow2();
      console.log(response.data);
      localStorage.setItem("token", response.data.jwtToken);
      console.log(response.data.roles);
      const role = JSON.stringify(response.data.roles);
      console.log(role);

      localStorage.setItem("role", role);

      window.location.href = "/";
    } catch (error) {
      setError("Invalid username or password");
    }
  };

  const handleShowPasswordToggle = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div>
      <div className="hero min-h-screen relative">
        <img
          className="w-full h-full object-cover  top-0 left-0"
          src="loma.avif"
        />
        <p className=" absolute top-10 text-center   text-4xl text-pink-900  p-5 mb-14 mx-auto font-abc font-bold">
          Welcome to ImpactGraph
        </p>

        <p className=" absolute top-40 text-center   text-2xl text-pink-900  font-abc font-bold">
          Please Login to continue !!
        </p>

        <form onSubmit={handleLogin}>
          <div className="relative mt-10 z-10 mb-10 bg-white border-pink-900 border-2 bg-opacity-90 rounded shadow-2xl shadow-white w-[700px] h-auto p-10 mx-auto flex flex-col justify-center items-center">
            <label
              htmlFor="username"
              className="input input-bordered input-black flex items-center w-full gap-2"
            >
              <img className="h-6 w-6 mr-2" src="user.png"></img>
              Username :
              <input
                required
                type="text"
                id="username"
                name="username"
                className="grow"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </label>

            <label
              htmlFor="password"
              className="input input-bordered input-black flex items-center gap-2 w-full  mt-5"
            >
              <img className="h-6 w-6 mr-2" src="lock.png"></img>
              Password :
              <input
                required
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                className="grow"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </label>

            <label className="flex items-center gap-2 w-full  mt-5">
              <input
                type="checkbox"
                className="checkbox w-5 h-5 checkbox-secondary"
                id="Showpassword"
                checked={showPassword}
                onChange={handleShowPasswordToggle}
              />
              Show Password
            </label>

            {error && <div style={{ color: "red" }}>{error}</div>}

            <button
              className="btn btn-wide bg-white  shadow-md border-pink-900 border-2 shadow-pink-900 text-pink-900 mt-9 hover:bg-pink-900 hover:text-white "
              type="submit"
            >
              LOGIN
            </button>
          </div>
        </form>
      </div>

      <dialog id="modal2" className="modal">
        <div>
          <span className="loading loading-spinner w-20 h-20 border-3"></span>
        </div>
      </dialog>
    </div>
  );
};

export default Login;
