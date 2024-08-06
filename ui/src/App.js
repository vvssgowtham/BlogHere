import React, { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";

const Home = lazy(() => import("./components/Home"));
const Logins = lazy(() => import("./components/Logins"));
const SignUp = lazy(() => import("./components/Signup"));
const MyBlogs = lazy(() => import("./components/MyBlogs"));
const BlogsCreated = lazy(() => import("./components/BlogsCreated"));
const AllBlogs = lazy(() => import("./components/AllBlogs"));
const ReadBlog = lazy(() => import("./components/ReadBlog"));
const ReadAllBlogs = lazy(() => import("./components/ReadAllBlogs"));

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Logins />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/allblogs" element={<AllBlogs />} />
        <Route path="/allblogs/:id" element={<ReadAllBlogs />} />
        <Route
          path="/myblogs"
          element={<ProtectedRoute element={<MyBlogs />} />}
        />
        <Route
          path="/myblogs/:id"
          element={<ProtectedRoute element={<ReadBlog />} />}
        />
        <Route
          path="/createblog"
          element={<ProtectedRoute element={<BlogsCreated />} />}
        />
      </Routes>
    </Suspense>
  );
}

export default App;