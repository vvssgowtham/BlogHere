import React,{useState,useEffect} from 'react';//Here we are using useEffect because ee component vacchina ventaney mana yokka user details get chesukovali kadha andhuku.
import { useNavigate } from "react-router-dom";
import axios from 'axios';

function MyBlogs(){
    const[data,setData] = useState([]);
    const [token, setToken] = useState(localStorage.getItem('token') || "");
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
          try {
            if (token) {
              const res = await axios.get("http://localhost:5000/myblogs", {
                headers: {
                  'x-token': token,
                },
              });
              setData(res.data);
            } else {
              // Redirect to login if token is null or undefined
              navigate('/login');
            }
          } catch (err) {
            console.log(err);
            // Handle errors, you might want to redirect to login page
          }
        };
      
        fetchData();
      }, [token,navigate]);
      
    return(
        <>
        
    <div className="card" style={{ width: "25rem" }}>
        {data.map((item) => (
          <div key={item.id}>
            <img
              className="card-img-top"
              src={item.imageURL}
              alt="Card image cap"
            />
            <div className="card-body">
              <h5 className="card-title">{item.title}</h5>
              <p className="card-text">{item.description}</p>
              <a href="#" className="btn btn-primary">
                Read Here
              </a>
            </div>
          </div>
        ))}
      </div>
        </>
    )
} 

export default MyBlogs;