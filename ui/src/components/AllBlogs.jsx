import React from 'react'; 
import { useNavigate } from 'react-router-dom';

function AllBlogs() {
  const navigate = useNavigate();

  function handleClick() {
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