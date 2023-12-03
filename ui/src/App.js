import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Logins from "./components/Logins";
import SignUp from "./components/Signup";
import MyBlogs from "./components/MyBlogs";
import BlogsCreated from "./components/BlogsCreated";
import AllBlogs from "./components/AllBlogs";
import ReadBlog from "./components/ReadBlog";
import ReadAllBlogs from "./components/ReadAllBlogs";


function App() {
  return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Logins />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/myblogs" element={<MyBlogs />} />
          <Route path="/myblogs/:id" element={<ReadBlog />} />
          <Route path="/createblog" element={<BlogsCreated />} />
          <Route path="/allblogs" element={<AllBlogs />} />
          <Route path="/allblogs/:id" element={<ReadAllBlogs />} />
        </Routes>
      </BrowserRouter>
  );
}

export default App;
