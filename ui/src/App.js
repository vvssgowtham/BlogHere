import React, { lazy, Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

// eslint-disable-next-line react/prop-types
const ProtectedRoute = ({ element, isAuthenticated }) => {
  return isAuthenticated ? element : <Navigate to="/login" />;
};

const Home = lazy(() => import("./components/Home"));
const Logins = lazy(() => import("./components/Logins"));
const SignUp = lazy(() => import("./components/Signup"));
const MyBlogs = lazy(() => import("./components/MyBlogs"));
const BlogsCreated = lazy(() => import("./components/BlogsCreated"));
const AllBlogs = lazy(() => import("./components/AllBlogs"));
const ReadBlog = lazy(() => import("./components/ReadBlog"));
const ReadAllBlogs = lazy(() => import("./components/ReadAllBlogs"));

function App() {
  const isAuthenticated = !!sessionStorage.getItem('token'); // Check authentication status

  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Logins />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/allblogs" element={<AllBlogs />} />
          <Route path="/allblogs/:id" element={<ReadAllBlogs />} />
          <Route
            path="/myblogs"
            element={<ProtectedRoute element={<MyBlogs />} isAuthenticated={isAuthenticated} />}
          />
          <Route
            path="/myblogs/:id"
            element={<ProtectedRoute element={<ReadBlog />} isAuthenticated={isAuthenticated} />}
          />
          <Route
            path="/createblog"
            element={<ProtectedRoute element={<BlogsCreated />} isAuthenticated={isAuthenticated} />}
          />
        </Routes>
      </Suspense>
    </>
  );
}

export default App;
