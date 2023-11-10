import React,{useState,useContext,useEffect} from 'react';//Here we are using useEffect because ee component vacchina ventaney mana yokka user details get chesukovali kadha andhuku.
import { store } from '../App';
import { useNavigate } from "react-router-dom";
import axios from 'axios';

function MyBlogs(){
    const[token,setToken] = useContext(store);
    const[data,setData] = useState(null);
    const navigate = useNavigate();

    useEffect(() =>{
        axios.get("http://localhost:5000/myblogs",{
            headers : {
                'x-token' : token
            }
        }).then(res => setData(res.data))
        .catch((err)=> console.log(err));
    },[])//ikkada vastey user data anedhi response kindha vastundhi ala vacchina data ni storee chesukoni use chesukovali kadha so kottha useState create chesanu
    //here again we are checking if the token is invalid or null because if it is null they shouldn't access this page
    
    if(!token){
        return navigate('login');
    }
    return(
        <>
        <h1>MyBlogs</h1>
        </>
    )
} 

export default MyBlogs;