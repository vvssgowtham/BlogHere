import React, {useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from './Navbar';


function AllBlogs() {
  const navigate = useNavigate();
  const[data,setData] = useState([]);
  
  const handleClick = () => {
    navigate('/createblog');
  }

  //axios get request to fetch all blogs
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("https://blogherewebservice.onrender.com/allblogs");
        setData(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);
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
            {data.map((item) => (
              <div key={item.id} className="card mb-4" style={{ width: "100%" }}>
                <img
                  className="card-img-top"
                  src={item.imageURL}
                  alt="Card image cap"
                />
                <div className="card-body">
                  <h5 className="card-title text-xl font-semibold antialiased">{item.title}</h5>
                  <p className="card-text mb-2 text-l">{item.description}</p>
                  <button
                    className="btn btn-primary"
                    onClick={(e) => {
                      navigate(`/allblogs/${item._id}`);
                    }}
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