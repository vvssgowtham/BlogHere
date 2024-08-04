import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import { useQuery } from "@tanstack/react-query";
import { fetchAllBlogs } from "../fetchers/fetcherBlogs";

function AllBlogs() {
  const navigate = useNavigate();

  // Fetch blogs using React Query
  const { data, error, isLoading } = useQuery({
    queryKey: ["allBlogs"],
    queryFn: fetchAllBlogs,
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
            <h1 className="mb-6 text-5xl font-bold">BLOGS</h1>
          </center>
          <hr style={{ borderTop: "2px solid black", width: "100%" }} />
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {data.map((item) => (
              <div
                key={item._id}
                className="card mb-4"
                style={{ width: "100%" }}
              >
                <img
                  className="card-img-top"
                  src={item.imageURL}
                  alt="Card image cap"
                />
                <div className="card-body">
                  <h5 className="card-title text-xl font-semibold antialiased">
                    {item.title}
                  </h5>
                  <p className="card-text mb-2 text-l">{item.description}</p>
                  <button
                    className="btn btn-primary"
                    onClick={() => navigate(`/allblogs/${item._id}`)}
                  >
                    Read More
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}

export default AllBlogs;
