import {BrowserRouter, Routes, Route } from "react-router-dom"
import HomePage from "./pages/HomePage";
import AddPage from "./pages/AddPage";
import UpdatePage from "./pages/UpdatePage";



function App() {
  return (
    <BrowserRouter>
      <Routes>
    
        <Route path="/" element = {<HomePage/>} />
        <Route path="/add" element = {<AddPage/>} />
        <Route path="/update" element = {<UpdatePage/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;