import axios from 'axios';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from './Navbar';

const ReadBlog = () => {
    const  blogID  = useParams();
    const [token, setToken] = useState(sessionStorage.getItem("token") || "");
    const [data, setData] = useState([]);

    useEffect(()=> {
        const fetchData = async () => {
            try {
                if (token) {
                    const res = await axios.get(`https://bloghereserver.onrender.com/myblogs/${blogID.id}`, {
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
    },[token])
   

    return(
  <>
  <Navbar />
  <div className="container my-16 mx-auto md:px-6">
    {/* Section: Design Block */}
    <section className="mb-32">
      
    <h1 className="mb-6 text-5xl font-bold">
      {data.title}
      </h1>
      <img
        src={data.imageURL}
        className="mb-6 w-full h-96 rounded-lg shadow-lg dark:shadow-black/20"
        alt="image"
      />
      <p className="text-xl">
      {data.blogcontent}
      </p>
    </section>
    {/* Section: Design Block */}
  </div>
  {/* Container for demo purpose */}
</>
    );
}

export default ReadBlog;