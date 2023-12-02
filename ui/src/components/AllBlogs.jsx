import React, { useContext,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function AllBlogs() {
  const navigate = useNavigate();
  
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