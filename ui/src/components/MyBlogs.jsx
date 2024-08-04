import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchMyBlogs, deleteBlog } from "../fetchers/fetcherBlogs";

function MyBlogs() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const token = sessionStorage.getItem("token");

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["myblogs", token],
    queryFn: () => {
      if (!token) {
        throw new Error("No token found");
      }
      return fetchMyBlogs(token);
    },
    enabled: !!token, // Only fetch if token exists
    onError: (err) => {
      if (err.message === "No token found") {
        navigate("/login"); // Redirect to login if no token
      } else {
        console.error(err); // Handle other errors
      }
    },
  });

  const mutation = useMutation({
    mutationFn: (id) => {
      if (!token) {
        throw new Error("No token found");
      }
      return deleteBlog(id, token);
    },
    onSuccess: () => {
      alert("Blog Deleted Successfully");
      // Invalidate and refetch the blogs after successful deletion
      queryClient.invalidateQueries(["myblogs", token]);
    },
    onError: (err) => {
      if (err.message.includes("Failed to delete blog")) {
        alert("Blog Not Deleted");
      } else {
        console.error(err);
      }
    },
  });

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error: {error.message}</p>;

  return (
    <>
      <Navbar />
      <div className="container my-16 mx-auto md:px-6">
        {/* Section: Design Block */}
        <section className="mb-32">
          <center>
            <h1 className="mb-6 text-5xl font-bold">BLOGS</h1>
          </center>
          <hr style={{ borderTop: "2px solid black", width: "100%" }}></hr>
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {data && data.length > 0 ? (
              data.map((item) => (
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
                    <div className="d-flex justify-content-between">
                      <button
                        className="btn btn-primary"
                        onClick={() => navigate(`/myblogs/${item._id}`)}
                      >
                        Read More
                      </button>
                      <button
                        className="btn btn-danger"
                        onClick={() => mutation.mutate(item._id)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p>No blogs available.</p>
            )}
          </div>
        </section>
      </div>
    </>
  );
}

export default MyBlogs;
