import React, { useState, createContext } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Logins from "./components/Logins";
import SignUp from "./components/Signup";
import MyBlogs from "./components/MyBlogs";
import BlogsCreated from "./components/BlogsCreated";
import AllBlogs from "./components/AllBlogs";

//using useState for storing token in the variable and ContextAPI
export const store = createContext();

function App() {
  return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Logins />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/myblogs" element={<MyBlogs />} />
          <Route path="/createblog" element={<BlogsCreated />} />
          <Route path="/allblogs" element={<AllBlogs />} />
        </Routes>
      </BrowserRouter>
  );
}

export default App;
