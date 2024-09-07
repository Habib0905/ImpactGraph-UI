import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const User = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [userData, setUserData] = useState({
    username: "",
    password: "",
    role: "USER",
  });
  const [users, setUsers] = useState([]);
  const [userPresent, setUserPresent] = useState(false);

  const token = localStorage.getItem("token");

  useEffect(() => {
    axios
      .get("http://localhost:8081/getUsers", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the users!", error);
      });
  }, [token]);

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post("http://localhost:8081/addUser", userData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log("User created successfully!", response.data);
        toast.success("User Created");
        setUserData({ username: "", password: "", role: "USER" });
        setUsers([...users, response.data]); // Update the table with the new user
      })
      .catch((error) => {
        console.error("There was an error creating the user!", error);
        toast.error("Error creating user");
      });
  };

  const handleShowPasswordToggle = () => {
    setShowPassword(!showPassword);
  };

  const deleteUser = (id) => {
    console.log(id);

    axios
      .delete("http://localhost:8081/delete/" + id, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        toast.success("Successfully Deleted the User !");
        setTimeout(() => {
          window.location.reload();
        }, 1000);
        console.log(res.data);
      })
      .catch((err) => toast.error(err));
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? (checked ? "ADMIN" : "USER") : value, // Update the role based on checkbox
    }));
  };

  const checkUsernameAndSubmit = (e) => {
    e.preventDefault();

    axios
      .get(`http://localhost:8081/checkUsername/${userData.username}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log(response);
        if (response.data) {
          setUserPresent(true);
        } else {
          setUserPresent(false);
          handleSubmit(e);
        }
      })
      .catch((error) => {
        console.error("There was an error checking the username!", error);
      });
  };

  return (
    <div>
      <div className="hero min-h-screen relative bg-white flex flex-col justify-center items-center">
        <p className="absolute top-10 text-center text-4xl text-pink-900 p-5 mb-14 mx-auto font-abc font-bold">
          Add Users and Admins
        </p>

        <form onSubmit={checkUsernameAndSubmit}>
          <div className="relative mt-40 mb-10 bg-white border-pink-900 border-2 bg-opacity-90 rounded shadow-2xl shadow-white w-[700px] h-auto p-10 mx-auto flex flex-col justify-center items-center">
            <label
              htmlFor="username"
              className="input input-bordered input-black flex items-center w-full gap-2"
            >
              <img className="h-6 w-6 mr-2" src="user.png" alt="user icon" />
              Username :
              <input
                required
                type="text"
                id="username"
                name="username"
                className="grow"
                value={userData.username}
                onChange={handleInputChange}
              />
            </label>

            <label
              htmlFor="password"
              className="input input-bordered input-black flex items-center gap-2 w-full mt-5"
            >
              <img className="h-6 w-6 mr-2" src="lock.png" alt="lock icon" />
              Password :
              <input
                required
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                id="password"
                name="password"
                className="grow"
                value={userData.password}
                onChange={handleInputChange}
              />
            </label>

            <label className="flex items-center gap-2 w-full mt-5">
              <input
                type="checkbox"
                className="checkbox w-5 h-5 checkbox-secondary"
                id="showPassword"
                checked={showPassword}
                onChange={handleShowPasswordToggle}
              />
              Show Password
            </label>

            <label className="flex items-center gap-2 w-full mt-5">
              <input
                type="checkbox"
                className="checkbox w-5 h-5 checkbox-secondary"
                id="role"
                name="role"
                checked={userData.role === "ADMIN"}
                onChange={handleInputChange}
              />
              If Admin, Click here
            </label>
            {userPresent && (
              <div className="text-red-500 mt-7">
                Username already exists. Please choose a different username!
              </div>
            )}
            <button
              className="btn btn-wide bg-white shadow-md border-pink-900 border-2 shadow-pink-900 text-pink-900 mt-9 hover:bg-pink-900 hover:text-white"
              type="submit"
            >
              Add User
            </button>
          </div>
        </form>

        <div className="relative mt-10 z-10 mb-10 bg-white border-pink-900 border-2 bg-opacity-90 rounded shadow-2xl shadow-white w-[700px] h-auto p-10 mx-auto flex flex-col justify-center items-center">
          <h2 className="text-3xl text-center text-pink-900 font-bold mb-5">
            User Details
          </h2>
          <table className="min-w-full bg-white border-collapse border border-pink-900">
            <thead>
              <tr>
                <th className="px-6 py-3 border-b-2 border-pink-900 bg-gray-200 text-left text-xs leading-4 font-medium text-gray-600 uppercase tracking-wider">
                  Username
                </th>
                <th className="px-6 py-3 border-b-2 border-pink-900 bg-gray-200 text-left text-xs leading-4 font-medium text-gray-600 uppercase tracking-wider">
                  Role
                </th>
                <th className="px-6 py-3 border-b-2 border-pink-900 bg-gray-200 text-left text-xs leading-4 font-medium text-gray-600 uppercase tracking-wider"></th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id}>
                  <td className="px-6 py-4 border-b border-pink-900 text-sm leading-5 text-gray-800">
                    {user.username}
                  </td>
                  <td className="px-6 py-4 border-b border-pink-900 text-sm leading-5 text-gray-800">
                    {user.role}
                  </td>
                  <td className="px-6 py-4 border-b border-pink-900 text-sm leading-5 text-gray-800">
                    <button
                      className="bg-pink-900 p-3 text-white rounded-md hover:bg-black"
                      onClick={() => deleteUser(user.id)}
                    >
                      Delete User
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default User;
