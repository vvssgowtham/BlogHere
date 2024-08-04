import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import parse from "html-react-parser";
import { useQuery } from "@tanstack/react-query";
import { fetchBlog } from "../fetchers/fetcherBlogs";

const ReadBlog = () => {
  const { id } = useParams(); // Extract the blogID from params
  const navigate = useNavigate();
  const token = sessionStorage.getItem("token"); // Retrieve the token

  const {
    data: blog,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["blog", id],
    queryFn: () => fetchBlog(id, token),
    enabled: !!token, // Only run the query if the token exists
  });

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <>
      <Navbar />
      <div className="container my-16 mx-auto md:px-6">
        <section className="mb-32">
          <h3 className="mt-8 mb-8 text-5xl font-bold">{blog.title}</h3>
          <img
            src={blog.imageURL}
            className="mb-6 w-full h-96 rounded-lg shadow-lg dark:shadow-black/20"
            alt="Blog"
          />
          <p className="text-xl">
            {blog.blogcontent && parse(blog.blogcontent)}
          </p>
        </section>
      </div>
    </>
  );
};

export default ReadBlog;
