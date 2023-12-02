import React, { useContext,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { store } from '../App';

function AllBlogs() {
  const navigate = useNavigate();
  const [token, setToken] = useContext(store);
  useEffect(() => {
    console.log('Updated token in AllBlogs:', token);
  }, []);
  
  const handleClick = () => {
    navigate('/createblog');
  }

  return (
    <>
      <button className="btn btn-outline-primary me-2" onClick={handleClick}>
        Write a blog
      </button>
    </>
  );
}

export default AllBlogs;