import { useParams } from "react-router-dom";
import Navbar from "./Navbar";
import parse from 'html-react-parser';
import { useQuery } from "@tanstack/react-query";
import { fetchReadAllBlogs } from "../fetchers/fetcherBlogs";

const ReadAllBlogs = () => {
  const { id } = useParams();

  const { data, error, isLoading } = useQuery({
    queryKey: ["readBlog", id],
    queryFn: () => fetchReadAllBlogs(id),
    retry: 2,
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <>
      <Navbar />
      <div className="container my-16 mx-auto md:px-6">
        {/* Section: Design Block */}
        <section className="mb-32">
          <center>
            <h3 className="mb-6 text-5xl font-bold">BLOGS</h3>
          </center>
          <hr style={{ borderTop: "2px solid black", width: "100%" }}></hr>
          <h1 className="mt-8 mb-8 text-5xl font-bold">{data.title}</h1>
          <img
            src={data.imageURL}
            className="mb-6 w-full h-96 rounded-lg shadow-lg dark:shadow-black/20"
            alt="image"
          />
          <p className="text-xl">{data.blogcontent && parse(data.blogcontent)}</p>
        </section>
        {/* Section: Design Block */}
      </div>
    </>
  );
};

export default ReadAllBlogs;
