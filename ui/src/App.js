import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Logins from "./components/Logins";
import SignUp from "./components/Signup";
import CreateBlog from "./components/CreateBlog";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Logins />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path='/createblog' element={<CreateBlog />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
