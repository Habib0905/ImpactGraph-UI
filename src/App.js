import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import AddPage from "./pages/AddPage";
import GraphPage from "./pages/GraphPage";
import UpdatePage from "./pages/UpdatePage";
import { ToastContainer } from "react-toastify";
import Toastmsg from "./components/Toastmsg";
import LoginPage from "./pages/LoginPage";
import Notfound from "./components/Notfound";
import ProtectedRoute from "./components/ProtectedRoute";
import React, { useState , useEffect} from "react";
import CryptoJS from "crypto-js";



function App() {
  const [loginDone , setLoginDone] = useState("");

  useEffect(() => {

    console.log(localStorage.getItem("role"));
    
    const encryptedRole = localStorage.getItem("role");
  
    console.log(encryptedRole);
    

    if(encryptedRole!== null)
    {
      const secretKey = "lomatulhabibinterns2"; 
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

    }

  }, []);


  return (
    <BrowserRouter>
      <ToastContainer />
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<LoginPage />} />

        {/* Protected Routes */}
        <Route path="/" element={<ProtectedRoute element={HomePage} />} />
        <Route path="/add" element={ loginDone ? <Notfound/> : <ProtectedRoute element={AddPage} />} />
        <Route path="/graph" element={<ProtectedRoute element={GraphPage} />} />
        <Route
          path="/update"
          element={<ProtectedRoute element={UpdatePage} />}
        />
        <Route path="/toast" element={<ProtectedRoute element={Toastmsg} />} />

        {/* 404 Page */}
        <Route path="*" element={<Notfound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
