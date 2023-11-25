import React, { useState, useEffect } from "react";
import { imageDb } from "./config";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

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
    <div className="m-150">
      <input className="m-5" type="file" onChange={(e) => setImg(e.target.files[0])} />
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
            label="Multiline Placeholder"
            placeholder="Placeholder"
            multiline
            variant="standard"
          />
        </div>
      </Box>
    </div>
  );
}

export default BlogsCreated;
