import * as React from 'react';
import Button from 'react-bootstrap/Button';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
// import jwt from 'jsonwebtoken';


function CreateBlog() {

  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  async function blog() {
    const response = await axios.get('http://localhost:5000/api/createblog', {
            headers: {
              'x-access-token': token,
            },
          });
          const data = await response.json();
          if(data.status === 'ok'){
            navigate('/createblog')
          }
          else{
            alert('error')
          }
  }

    useEffect(() => {
        const token = localStorage.getItem('token');
        if(token) {
          const user = jwt.decode(token);
          if(!user) { 
            localStorage.removeItem('token');
            navigate('/login');
          } else {
            blog();
          }
        }
      }, [navigate]);

    return(
        <Button variant="warning">Warning</Button>
    )
}

export default CreateBlog;