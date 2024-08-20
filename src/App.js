import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import AddPage from "./pages/AddPage";
import GraphPage from "./pages/GraphPage";
import UpdatePage from "./pages/UpdatePage";
import { ToastContainer, toast } from 'react-toastify';
import Toastmsg from "./components/Toastmsg";
import LoginPage from "./pages/LoginPage";
// import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <BrowserRouter>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/add" element={<AddPage />} />
        <Route path="/graph" element={<GraphPage />} />
        <Route path="/update" element = {<UpdatePage/>} />
        <Route path="/toast" element ={<Toastmsg/>}/>
        <Route path="/login" element ={<LoginPage/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
