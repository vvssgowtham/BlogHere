import React, { useState, useEffect } from "react";
import { imageDb } from "./config";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from '@mui/material/Button';
import "./createblog.css";

function BlogsCreated() {
  const [img, setImg] = useState("");
  const [imgUrl, setImgUrl] = useState([]);

  const handleClick = () => {
    if (img !== null) {
      const imgRef = ref(imageDb, `files/${v4()}`);
      uploadBytes(imgRef, img).then((value) => {
        console.log(value);
        getDownloadURL(value.ref).then((url) => {
          setImgUrl((data) => [...data, url]);
        });
      });
    }
  };

  return (
    <div className="centered-container"> {/* Add a class for centering */}
      <div className="form-container"> {/* Add a class for styling the form */}
        <h1 className="m-3 text-center text-lg font-semibold">WRITE YOUR BLOG</h1>
        <input className="m-5" type="file" onChange={(e) => setImg(e.target.files[0])} />
        <Box
          component="form"
          sx={{
            "& .MuiTextField-root": { m: 5, width: "20ch" },
          }}
          noValidate
          autoComplete="off"
        >
          <div>
            <TextField
              id="standard-textarea"
              label="TITLE"
              placeholder="Placeholder"
              multiline
              variant="standard"
            />
          </div>
        </Box>
        <Box
          component="form"
          sx={{
            "& .MuiTextField-root": { m: 5, width: "50ch" },
          }}
          noValidate
          autoComplete="off"
        >
          <div>
            <TextField
              id="standard-textarea"
              label="DESCRIPTION"
              placeholder="Description"
              multiline
              variant="standard"
            />
          </div>
        </Box>
        <Box
          component="form"
          sx={{
            "& .MuiTextField-root": { m: 5, width: "75ch" },
          }}
          noValidate
          autoComplete="off"
        >
          <div>
            <TextField
              id="standard-textarea"
              label="BLOG HERE"
              placeholder="BlogHere"
              multiline
              variant="standard"
            />
          </div>
        </Box>
        <center><Button className="mt-4 bg-green-800" variant="contained">Post</Button></center>
      </div>
    </div>
  );
}

export default BlogsCreated;
