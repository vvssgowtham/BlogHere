import React, { useState, useEffect } from "react"; //Here we are using useEffect because ee component vacchina ventaney mana yokka user details get chesukovali kadha andhuku.
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "./Navbar";

function MyBlogs() {
  const [data, setData] = useState([]);
  const [token, setToken] = useState(sessionStorage.getItem("token") || "");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (token) {
          const res = await axios.get("http://localhost:5000/myblogs", {
            headers: {
              "x-token": token,
            },
          });
          setData(res.data);
        } else {
          // Redirect to login if token is null or undefined
          navigate("/login");
        }
      } catch (err) {
        console.log(err);
        // Handle errors, you might want to redirect to login page
      }
    };

    fetchData();
  }, [token, navigate]);

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
          <div className="mt-4 row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
            {data.map((item) => (
              <div key={item.id} className="col mb-4">
                <div className="card" style={{ maxWidth: "25rem" }}>
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
                      onClick={(e) => {
                        navigate(`/myblogs/${item._id}`);
                      }}
                    >
                      Read More
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}

export default MyBlogs;
